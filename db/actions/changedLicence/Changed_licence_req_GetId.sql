SELECT Mother_board.id 
FROM Mother_board 
JOIN Changed_licence_req ON Changed_licence_req.id_Mother_board = Mother_board.id 
WHERE Mother_board.deleted_date_time IS NULL 
AND Changed_licence_req.deleted_date_time IS NULL 
AND Changed_licence_req.serial_number_new_board = ? 
AND Changed_licence_req.model_number_new_board = ? 
;