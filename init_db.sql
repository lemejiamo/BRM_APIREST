#  CREATE A DATABASE
DROP DATABASE IF EXISTS BRM_STORE;
CREATE DATABASE IF NOT EXISTS BRM_STORE;
CREATE USER IF NOT EXISTS 'BRM_DEV'@'localhost' IDENTIFIED BY 'BRMDEV';
GRANT ALL PRIVILEGES ON `BRM_STORE`.* TO 'BRM_DEV'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'BRM_DEV'@'localhost';
FLUSH PRIVILEGES;


USE BRM_STORE;


CREATE TABLE IF NOT EXISTS Inventory(
    product_id VARCHAR(10) PRIMARY KEY,
    product_name VARCHAR(30) not null unique,
    price double (8,2) NOT NULL,
    quantity int NOT NULL,
    date_in DATETIME NOT NULL,
    lot_number VARCHAR(10)NOT NULL,
    cost double (8,2)
);

CREATE TABLE IF NOT EXISTS Users(
    user_id int PRIMARY KEY,
    user_name VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    celphone VARCHAR(15) NOT NULL,
    role enum('client', 'Administrator') DEFAULT 'client',
    passwd VARCHAR(512)NOT NULL
);

CREATE TABLE IF NOT EXISTS Sales(
    invoice VARCHAR(10) NOT NULL,
    FK_product_id VARCHAR(10) NOT NULL,
    CONSTRAINT `FK_product_id`
     FOREIGN KEY (`FK_product_id`)
     REFERENCES Inventory(product_id)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    FK_product_name VARCHAR(30) NOT NULL,
    CONSTRAINT `FK_product_name`
     FOREIGN KEY (`FK_product_name`)
     REFERENCES Inventory(product_name)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    price double (8,2) NOT NULL,
    discount tinyint,
    invoice_date DATETIME NOT NULL,
    quantity int NOT NULL,
    FK_customer_id int NOT NULL,
    CONSTRAINT `FK_customer_id`
     FOREIGN KEY (`FK_customer_id`)
     REFERENCES Users(user_id)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION
);
