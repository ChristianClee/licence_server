const server = 'http://localhost:3000/api'
const headers = {
  'Content-Type': 'application/json;charset=utf-8'
}
  const licence_count = document.getElementById("licence_count")
  const contract_price = document.getElementById("contract_price")
  const company_name = document.getElementById("company_name")
  const licence_type = document.getElementById("licence_type")
  const company_name_list = document.getElementById("company_name_list")
  const change_licence_container = document.getElementById("change_licence_container")

document.getElementById('licenceForm').addEventListener('submit', async (e) => {
  e.preventDefault();
    if(!company_name.value) return;
    try{
      await(
        (await fetch(
          `${server}/companies/${company_name.value}/licences_free`, 
          {
            method: 'POST',
            headers,
            body: JSON.stringify(
              {
                licence_count: Number(licence_count.value),
                contract_price: Number(contract_price.value),
                id_licence_type: Number(licence_type.value),
                id_super_admin: 1
              }
            )
          }
          )
        ).json()
      )
    }catch(err)
    {
      console.error(err)
    }
    await allgetDate()
});

async function fetchGetParams(path) {
  let data = null
  try{
    data = (await(await fetch(path, {
      method: 'GET',
      headers
    })).json()).data
  }catch(err){
    console.error(err)
  }
  return data
}



async function allgetDate(){
  const data_company = await fetchGetParams(`${server}/companies`)

  company_name_list.replaceChildren(
    ...data_company.map(item => {
      const opt = document.createElement('div');
      opt.textContent = item.name
      return opt
    })
  )
  company_name.replaceChildren(
    ...data_company.map(item => {
      const opt = document.createElement('option');
      opt.value = item.id
      opt.textContent = item.name
      return opt
    })
  )

  const data_licence_type = await fetchGetParams(`${server}/licences_type_route`)
  licence_type.replaceChildren(
    ...data_licence_type.map(item => {
      const opt = document.createElement('option');
      opt.value = item.id;
      opt.textContent = item.name;
      return opt
    })
  )

  const data_mother_boards = await fetchGetParams(`${server}/companies/${company_name.value}/mother_boards`)
  console.log(data_mother_boards)
  console.log(change_licence_container)
  change_licence_container.replaceChildren(
    ...data_mother_boards.map(item => {
      const opt_1 = document.createElement('div');
      const opt_2 = document.createElement('span');
      const opt_3 = document.createElement('span');
      opt_1.className = 'motherboard_container'
      opt_1.append(opt_2);
      opt_1.append(opt_3);
      opt_2.textContent = `serial_number = ${item.serial_number};`
      opt_3.textContent = `model_number = ${item.model_number};`
      return opt_1
    })
  )
  console.log(data_mother_boards)
  // data_mother_boards

}

allgetDate()
