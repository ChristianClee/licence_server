import {pool} from './db.js'
import { app } from './app.js'
import { getAllAveragePriceDb, addAveragePrice_Tr_Db } from '@/services/averagePriceService.js'
import { addSubscribedLicenceController } from '@/controllers/licencesSubscribeController.js'

const PORT = 3000;


const httpServer = app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
})

async function shutdown(signal:string) {
    console.log(`${signal} received, shutting down...`);
    httpServer.close(async() => {
        try{
            await pool.end()
        }finally{
            process.exit(0)
        }
    })
    setTimeout(() => process.exit(1), 1000).unref()
}

process.on('SIGINT',  () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))