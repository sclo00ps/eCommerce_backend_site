-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

USE ecommerce_db;

CREATE TABLE Category (
  -- Create a numeric column called "id" which will automatically increment its default value as we create new rows. --
 id INT NOT NULL AUTO_INCREMENT,
  -- Create remaining table columns --
 category__name VARCHAR(100) NOT NULL,
  -- Set the id as this table's primary key
  PRIMARY KEY (id)
);

CREATE TABLE Product (
  -- Create a numeric column called "id" which will automatically increment its default value as we create new rows. --
 id INT NOT NULL AUTO_INCREMENT,
  -- Create remaining table columns --
 product_name VARCHAR(100) NOT NULL,
 price DECIMAL(10,4),
 stock INT default 10,
 category_id INT,
  -- Set the id as this table's primary key
  PRIMARY KEY (id)
);

CREATE TABLE Tag (
  -- Create a numeric column called "id" which will automatically increment its default value as we create new rows. --
 id INT NOT NULL AUTO_INCREMENT,
  -- Create remaining table columns --
 tag_name VARCHAR(100) NOT NULL,
  -- Set the id as this table's primary key
 PRIMARY KEY (id)
);

CREATE TABLE ProductTag (
  -- Create a numeric column called "id" which will automatically increment its default value as we create new rows. --
 id INT NOT NULL AUTO_INCREMENT,
  -- Create remaining table columns --
 product_id INT NOT NULL,
 tag_id INT NOT NULL,
  -- Set the id as this table's primary key
 PRIMARY KEY (id)
);