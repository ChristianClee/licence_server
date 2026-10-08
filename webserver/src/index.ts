import { pool } from './db.js'
import { app } from './app.js'

// const app = express();
const PORT = 3000;






app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
})
process.on('SIGINT', async() => {
    await pool.end();
    process.exit(0);
})