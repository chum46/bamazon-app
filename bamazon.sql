DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE bamazonTable (
  item_id INT(5) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(75) NOT NULL,
  price INT(50) NOT NULL,
  stock_quantity INT(40) NOT NULL
);

SELECT * FROM bamazonTable;

INSERT INTO bamazonTable (product_name, department_name, price, stock_quantity) 
values ('Play-Doh', 'Toys & Games', 7, 10000), 
('Super Mario Party - Nintendo Switch', 'Video Games', 60, 23), 
('Uno Card Game', 'Toys & Games', 5, 200),
('Deadpool 2 Blu-ray', 'Movies & TV', 23, 2000), 
('Fujifilm Instax Mini 9', 'Camera & Photo', 60, 356), 
('Nalgene Tritan BPA-Free Water Bottle', 'Sports & Outdoors', 20, 325), 
('To Kill a Mockingbird - paperback', 'Books', 9, 300), 
('Bamazon Basic Power Strip', 'Electronics', 10, 548), 
('Magic Bullet Blender', 'Home & Kitchen', 30, 45), 
('GoPro HERO5 Black 4K Camera', 'Camera & Photo', 250, 55);
