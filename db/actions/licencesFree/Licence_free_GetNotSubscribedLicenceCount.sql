SELECT Licence_free.id  
FROM Licence_free 
LEFT JOIN Licence_subscribe ON Licence_subscribe.id_Licence_free = Licence_free.id 
JOIN Company ON Licence_free.id_Company = Company.id 
JOIN Price ON Licence_free.id_Price = Price.id 
JOIN Average_price ON Price.id_Average_price = Average_price.id 
JOIN Licence_type ON Average_price.id_Licence_type = Licence_type.id 
JOIN Url ON Licence_type.id = Url.id_Licence_type 
WHERE 
Licence_subscribe.id IS NULL 
AND Company.id = ? 
AND Url.id = ? 
AND Licence_free.deleted_date_time IS NULL;