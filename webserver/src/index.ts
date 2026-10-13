import {pool} from './db.js'
import { app } from './app.js'
import { TestServices } from '@/tests/index.js'

const PORT = 3000;

// new TestServices();


app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
})
process.on('SIGINT', async() => {
    await pool.end();
    process.exit(0);
})