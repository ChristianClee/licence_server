import {pool} from './db.js'
import { app } from './app.js'
// import { addCompanyController, getAllCompanyController, setDeleteCompanyController } from './controllers/companyController.js'

// const app = express();
const PORT = 3000;


// await addCompanyController()
// await addCompanyController()
// await addCompanyController()
// await getAllCompanyController()
// await setDeleteCompanyController()


app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
})
process.on('SIGINT', async() => {
    await pool.end();
    process.exit(0);
})