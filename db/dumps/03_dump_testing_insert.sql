USE mishkov_db;
INSERT INTO Super_admin(name, password) VALUES
('ilya', '123');

INSERT INTO Company(id_Super_admin, name) VALUES
(1, 'ICL'); 

INSERT INTO Url(id_Licence_type, id_Company, url) VALUES
(1,1, '/test_url_base'),
(2,1, '/test_url_server'),
(3,1, '/test_url_extend');


INSERT INTO Average_price( id_Licence_type,price ) VALUES
(1, 100),
(2, 200),
(3, 300);

INSERT INTO Price(id_Average_price, contract_price) VALUES
(1, 110),
(2, 210),
(3, 310);

INSERT INTO Licence_free(id_Company, id_Price ) VALUES
(1,1),
(1,1),
(1,1),
(1,1),
(1,2),
(1,2),
(1,2),
(1,3),
(1,3);

INSERT INTO Licence_subscribe(id_Licence_free, id_Url) VALUES
(1,1),
(2,1),
(5,1),
(8,1);

INSERT INTO Mother_board(id_Licence_subscribe, serial_number, model_number) VALUES
(1, 'SERIAL_1', 'MODEL_1'),
(2, 'SERIAL_2', 'MODEL_2'),
(3, 'SERIAL_3', 'MODEL_3'),
(4, 'SERIAL_4', 'MODEL_4');

INSERT INTO User(id_Company, id_Permission, password, email, phone) VALUES
(1, 1, 'QWERTY', 'ilya.mishkov@gmail.com', NULL),
(1, 2, '1234567', 'sergey.ivanov@gmail.com', '97-43-94');

INSERT INTO Changed_licence_req(id_User, id_Mother_board, serial_number_new_board, model_number_new_board) VALUES
(2, 1, 'SERIAL_1', 'MODEL_1'),
(1, 2, 'SERIAL_XXX', 'MODEL_XXX');

-- transaction
UPDATE Mother_board SET deleted_date_time = CURRENT_TIMESTAMP  WHERE serial_number = 'SERIAL_1' and model_number = 'MODEL_1';
INSERT INTO Mother_board(id_Licence_subscribe, serial_number, model_number) VALUES
(1, 'SERIAL_1', 'MODEL_1');
-- transaction

-- transaction
UPDATE Mother_board SET deleted_date_time = CURRENT_TIMESTAMP  WHERE serial_number = 'SERIAL_2' and model_number = 'MODEL_2';
INSERT INTO Mother_board(id_Licence_subscribe, serial_number, model_number) VALUES
(2, 'SERIAL_XXX', 'MODEL_XXX');
-- transaction