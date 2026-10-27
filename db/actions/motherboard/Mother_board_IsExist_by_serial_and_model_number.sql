SELECT EXISTS (
    SELECT * 
    FROM Mother_board 
    WHERE Mother_board.serial_number = ? 
    AND Mother_board.model_number = ? 
    AND Mother_board.deleted_date_time IS NULL 
) AS exists_flag;