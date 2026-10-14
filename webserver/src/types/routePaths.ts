export enum e_route {
    users = '/users',
    companies = '/companies', 
    average_price = '/average_price',
    price = '/price',
    changed_licences = '/changed_licences',
    licences_free = '/licencesFree',
    licences_type = '/licences_type_route',
    licences_subscribed = '/licenses_subscribed',
    mother_boards = '/mother_boards',
    urls = '/urls_route',
    super_users = '/super_users',
    permission = '/permission'
};
export enum e_params {
    id_company = ':id_company',
    id_licenceFree = ':id_licenceFree',
    id_licenceType = ':id_licenceType',
}