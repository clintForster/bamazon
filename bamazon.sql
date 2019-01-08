DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(75),
    department_name VARCHAR(75),
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toilet paper", "Bathroom", 6.99, 5), 
("bandaids", "First Aid", 1.50, 12),
("skateboard", "Sporting Goods", 54.99, 4),
("bananas", "Produce", 2.00, 4),
("watch", "For Him", 115.00, 2),
("bedsheets", "Bedroom", 14.99, 10),
("flipflops", "Footwear", 12.99, 23),
("diamond necklace", "For Her", 850.00, 1), 
("back scratcher", "Home Goods", 9.99, 4),
("taylor swift album", "Music", .01, 280);


select * from products where item_id = 7;


