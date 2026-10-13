import { setDeleteCompanyDb, getAllCompanyDb  } from '@/services/companiesService.js'
import { pool } from '@/db.js'

export class TestServices {
    constructor(){
        // this.testCompany_setDeleteCompanyDb()
        this.testCompany_getAllCompanyDb()
    }
    private async testCompany_getAllCompanyDb(){
        try{
            // await getAllCompanyDb('all', true);
            await getAllCompanyDb('count', false);
        }catch(e){
            console.error(e)
        }
    }
    private async testCompany_setDeleteCompanyDb(){
        try{
            await setDeleteCompanyDb(1);
            await pool.query('UPDATE Company SET Company.deleted_date_time = NULL WHERE id = 1;')
        }catch(e){
            console.error(e)
        }
    }
}