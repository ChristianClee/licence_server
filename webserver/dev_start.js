import { execSync, exec } from "child_process"
import { spawn } from "child_process"
import fs from 'fs/promises'
import chokidar from "chokidar"
import path from "path"
import { fileURLToPath } from "url"
import chalk from "chalk"

const __nameSrcFolder = "src"
const __nameCompiledDevFilesJS = "build_dev"
const __nameEntryPointDevFilesJS = "index.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __srcDir = path.join(__dirname, __nameSrcFolder);
const __buildDevDir = path.join(__dirname, __nameCompiledDevFilesJS);
const __buildDevFile = path.join(__buildDevDir, __nameEntryPointDevFilesJS);

const options = {
  ignoreInitial: true,        // не выкидывать add для уже существующих файлов
  persistent: true,           // не завершать процесс (по умолчанию true)
  ignored: /node_modules/,    // игнорировать
  awaitWriteFinish: {         // ждать окончания записи (важно для tsc)
    stabilityThreshold: 200,
    pollInterval: 50
  }
}


let server = null;
let timer = null;
// let building = false;
// let pending = false;


async function clearDir(dir, isLogFunc) {
  try {
    const entries = await fs.readdir(dir);
    if(isLogFunc){
      console.log(entries);
    }
    await Promise.all(
      entries.map(entry =>
        fs.rm(path.join(dir, entry), { recursive: true, force: true })
      )
    );
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
}
async function tsCompilation(isLogFunc) {
  try {
      execSync('npx tsc -b', { encoding: 'utf-8' }) // ts compilation
      execSync('npx tsc-alias') // alias compilation
    if(isLogFunc){
      console.log('✅ Компиляция успешна');
    }
  } catch (error) {
    if (error.stdout) console.log(error.stdout.toString());
    if (error.stderr) console.error(error.stderr.toString());
      console.error('❌ Ошибка компиляции');
  }
}
function startServer(){
  // server = exec(`node ${__buildDevFile}`);
  // server.stdout?.pipe(process.stdout);
  // server.stderr?.pipe(process.stderr);
  server = spawn('node', [__buildDevFile], {stdio: 'inherit'});
  server.on('exit', (code, signal) => {
    console.log(`node exited: code =${code} signal=${signal}`);
  })
  // server.on('exit', (code, signal) => {
    // console.log(`node exited: code=${code} signal=${signal}`)
  // })
}
function stopServer(){
  // server.kill();
  // server = null;
    return new Promise((resolve) => {
    if (!server) return resolve();
    const proc = server;
    server = null;

    let done = false;
    const finish = () => { if (!done) { done = true; resolve(); } };

    proc.once('exit', finish);
    proc.kill('SIGTERM');

    setTimeout(() => {
      try { proc.kill('SIGKILL'); } catch {}
      finish();
    }, 3000);
  });
}
async function buildDev(isLogFunc = false) {
  try{
    if(server){
      await stopServer()
    }
    await clearDir(__buildDevDir)
    await tsCompilation(isLogFunc)
    if(!server){
      startServer()
    }
    if(isLogFunc){
      console.log("buildDev полностью отработала")
    }
  }catch(err){
    console.log("функция buildDev ошибка")
    console.log(err)
  }
}
// async function scheduleBuild() {
//   pending = true;
//   if (building) return;
//   building = true;
//   try{
//     while (pending) {
//       pending = false;
//       await buildDev();
//     }
//   }finally{
//     building = false;
//   }
// }
async function scheduleBuild() {
  if(!timer){
    timer = true;
    await new Promise(res => setTimeout( res, 500))
    await buildDev(false);
    timer = null;
  }
}

const watcher = chokidar.watch(__srcDir, options);


watcher
  .on('add', async( path ) => {
    console.log( chalk.bgBlue("chokidar"), '➕ файл  добавлен:', path, "\n\n")
    await scheduleBuild()
  })
  .on('change',  async (path) => {
    console.log(chalk.green("chokidar"), '✏️ файл изменён:', path, "\n\n")
      await scheduleBuild()
  }) 
  .on('unlink',  async (path) => {
    console.log(chalk.green("chokidar"),'➖ файл удалён:', path, "\n\n")
    await scheduleBuild()
  })
  // .on('addDir',  path => {
  //   console.log('📁 папка добавлена:', path, "\n\n")
  // }) // 1
//   .on('unlinkDir', path => {
//     console.log('📁 папка удалена:', path, "\n\n")
//   })
  .on('ready',   async() => {
    console.log(chalk.green("chokidar"), '✅ первичное сканирование завершено\n')
    await scheduleBuild()
  })
  .on('error',   err  => {
    console.error(chalk.red("chokidar"), '❌ chokidar ошибка:\n\n', err)
  })