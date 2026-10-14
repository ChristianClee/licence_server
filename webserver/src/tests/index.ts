import { setDeletedCompanyDb, getAllCompanyDb  } from '@/services/companiesService.js'
import { addFreeLicencesDb } from '@/services/licencesFreeService.js'
import { addAveragePriceDb } from '@/services/averagePriceService.js'
import { pool } from '@/db.js'

export class TestServices {
    constructor(){
        // this.testCompany_setDeleteCompanyDb()
        // this.testCompany_getAllCompanyDb()
        // addFreeLicencesDb(1, 1, 1, 5);
        addAveragePriceDb(3, 450)
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
            await setDeletedCompanyDb(1);
            await pool.query('UPDATE Company SET Company.deleted_date_time = NULL WHERE id = 1;')
        }catch(e){
            console.error(e)
        }
    }
}