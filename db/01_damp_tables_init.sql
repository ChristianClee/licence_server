CREATE DATABASE IF NOT EXISTS mishkov_db;
USE mishkov_db;

CREATE TABLE Super_admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Company (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_Super_admin INT NOT NULL DEFAULT 1 ,
    name VARCHAR(255) NOT NULL,
    created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_date_time DATETIME DEFAULT NULL,
    FOREIGN KEY (id_Super_admin) REFERENCES Super_admin(id)
);

CREATE TABLE Licence_type(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Url(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_Licence_type INT NOT NULL,
    id_Company INT NOT NULL,
    url VARCHAR(1024) NOT NULL,
    FOREIGN KEY (id_Licence_type) REFERENCES Licence_type(id),
    FOREIGN KEY (id_Company) REFERENCES Company(id)
);
CREATE TABLE Average_Price(
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
    FOREIGN KEY (id_Average_price) REFERENCES Average_Price(id)
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
    created_ip VARCHAR(255) DEFAULT NULL,
    created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_date_time DATETIME DEFAULT NULL,
    FOREIGN KEY (id_Licence_free) REFERENCES Licence_free(id),
    FOREIGN KEY (id_Url) REFERENCES Url(id)
);

CREATE TABLE Mother_board(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_Licence_subscribe INT NOT NULL,
    serial_number VARCHAR(1024) NOT NULL,
    model_number VARCHAR(1024) NOT NULL,
    created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_date_time DATETIME DEFAULT NULL,
    FOREIGN KEY (id_Licence_subscribe) REFERENCES Licence_subscribe(id)
);

CREATE TABLE Permission(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE User(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_Company INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    id_Permission INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) DEFAULT NULL,
    created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_date_time DATETIME DEFAULT NULL,
    FOREIGN KEY (id_Company) REFERENCES Company(id),
    FOREIGN KEY (id_Permission) REFERENCES Permission(id)
);

CREATE TABLE Change_license_req(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_User INT NOT NULL,
    id_Mother_board INT UNIQUE NOT NULL,
    serial_number_new_board VARCHAR(1024) NOT NULL,
    model_number_new_board VARCHAR(1024) NOT NULL,
    created_ip VARCHAR(255) DEFAULT NULL,
    created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_date_time DATETIME DEFAULT NULL,
    FOREIGN KEY (id_User) REFERENCES User(id),
    FOREIGN KEY (id_Mother_board) REFERENCES Mother_board(id)
);
