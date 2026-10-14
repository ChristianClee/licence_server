USE mishkov_db;

INSERT INTO Licence_type (name) VALUES
('base'),
('server'),
('extend');

INSERT INTO Permission(name) VALUES
('administrator'),
('auditor'),
('operatorProduction'),
('operatorGuarantee');