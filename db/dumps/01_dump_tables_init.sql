CREATE DATABASE IF NOT EXISTS mishkov_db;
USE mishkov_db;


CREATE TABLE Passwords (
    id INT PRIMARY KEY AUTO_INCREMENT,
    hash VARCHAR(512) NOT NULL,
    email VARCHAR(256) UNIQUE NOT NULL
);

CREATE TABLE Super_admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_Passwords INT UNIQUE NOT NULL,
    FOREIGN KEY (id_Passwords) REFERENCES Passwords(id)
);

CREATE TABLE Company (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_Super_admin INT NOT NULL DEFAULT 1 ,
    name VARCHAR(256) NOT NULL,
    created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_date_time DATETIME DEFAULT NULL,
    FOREIGN KEY (id_Super_admin) REFERENCES Super_admin(id)
);

CREATE TABLE Licence_type(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(256) NOT NULL
);

CREATE TABLE Url(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_Licence_type INT NOT NULL,
    id_Company INT NOT NULL,
    url VARCHAR(256) NOT NULL,
    FOREIGN KEY (id_Licence_type) REFERENCES Licence_type(id),
    FOREIGN KEY (id_Company) REFERENCES Company(id)
);
CREATE TABLE Bad_request(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_Url INT,
    serial_number VARCHAR(512) NOT NULL,
    model_number VARCHAR(512) NOT NULL,
    created_ip VARCHAR(256) DEFAULT NULL,
    error_message VARCHAR(2048) NOT NULL,
    created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Average_price(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_Licence_type INT NOT NULL,
    price DECIMAL(10,2) DEFAULT NULL,
    created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_date_time DATETIME DEFAULT NULL,
    FOREIGN KEY (id_Licence_type) REFERENCES Licence_type(id)
);
CREATE TABLE Price(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_Average_price INT NOT NULL,
    contract_price DECIMAL(10,2) DEFAULT NULL,
    FOREIGN KEY (id_Average_price) REFERENCES Average_price(id)
);

CREATE TABLE Licence_free(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_Company INT NOT NULL,
    id_Price INT NOT NULL,
    id_Super_admin INT NOT NULL DEFAULT 1,
    created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_date_time DATETIME DEFAULT NULL,
    FOREIGN KEY (id_Super_admin) REFERENCES Super_admin(id),
    FOREIGN KEY (id_Company) REFERENCES Company(id), 
    FOREIGN KEY (id_Price) REFERENCES Price(id)
); 

CREATE TABLE Licence_subscribe(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_Licence_free INT UNIQUE NOT NULL,
    id_Url INT NOT NULL, 
    created_ip VARCHAR(256) DEFAULT NULL,
    created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_date_time DATETIME DEFAULT NULL,
    FOREIGN KEY (id_Licence_free) REFERENCES Licence_free(id),
    FOREIGN KEY (id_Url) REFERENCES Url(id)
);

CREATE TABLE Mother_board(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_Licence_subscribe INT NOT NULL,
    serial_number VARCHAR(512) NOT NULL,
    model_number VARCHAR(512) NOT NULL,
    created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_date_time DATETIME DEFAULT NULL,
    FOREIGN KEY (id_Licence_subscribe) REFERENCES Licence_subscribe(id)
);

CREATE TABLE Permission(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(256) NOT NULL
);

CREATE TABLE User(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_Company INT NOT NULL,
    id_Permission INT NOT NULL,
    id_Passwords INT UNIQUE NOT NULL,
    created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_date_time DATETIME DEFAULT NULL,
    FOREIGN KEY (id_Company) REFERENCES Company(id),
    FOREIGN KEY (id_Permission) REFERENCES Permission(id),
    FOREIGN KEY (id_Passwords) REFERENCES Passwords(id)
);

CREATE TABLE Changed_licence_req(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_User INT NOT NULL,
    id_Mother_board INT UNIQUE NOT NULL,
    serial_number_new_board VARCHAR(512) NOT NULL,
    model_number_new_board VARCHAR(512) NOT NULL,
    created_ip VARCHAR(256) DEFAULT NULL,
    created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_date_time DATETIME DEFAULT NULL,
    FOREIGN KEY (id_User) REFERENCES User(id),
    FOREIGN KEY (id_Mother_board) REFERENCES Mother_board(id)
);
