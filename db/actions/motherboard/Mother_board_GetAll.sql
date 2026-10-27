SELECT Mother_board.* 
FROM Mother_board 
JOIN Licence_subscribe ON Mother_board.id_Licence_subscribe = Licence_subscribe.id 
JOIN Licence_free ON Licence_subscribe.id_Licence_free = Licence_free.id 
JOIN Company ON Licence_free.id_Company = Company.id 
WHERE Company.id = ?;