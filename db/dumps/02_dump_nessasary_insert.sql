USE mishkov_db;



INSERT INTO Passwords (hash, email) VALUES 
('$2b$10$NvzSZ7Gp206T9oM.wlJ2s.YBVgQ1kngPuBLenvoId78M0HvfOXSNy', 'mrv@kvazar.dev');

INSERT INTO Super_admin (id_Passwords) VALUES 
(1);

INSERT INTO Licence_type (name) VALUES
('base'),
('server'),
('extend');

INSERT INTO Average_price( id_Licence_type ) VALUES
(1),
(2),
(3);

INSERT INTO Permission(name) VALUES
('administrator'),
('auditor'),
('operatorProduction'),
('operatorGuarantee');