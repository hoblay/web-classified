CREATE DATABASE sosneaker;

CREATE TABLE users 
(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_prefix INT,
  phone INT,
  img VARCHAR(255),
  store_credit FLOAT,
  notes VARCHAR(255)
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE user_role (
  user_id INT,
  role_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  parent_id INT REFERENCES categories(id),
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  img VARCHAR(255),
  is_visible BOOLEAN,
  sort_order INT,
  page_title VARCHAR(255),
  meta_keywords VARCHAR(255),
  meta_description VARCHAR(255)
);

CREATE TABLE brands (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  img VARCHAR(255) NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  brand_id INT,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price FLOAT,
  is_visible BOOLEAN,
  stock INT,
  total_sold INT,
  page_title VARCHAR(255),
  meta_keywords VARCHAR(255),
  meta_description VARCHAR(255),
  order_quantity_minimum INT,
  availability INT,
  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE
);

ALTER TABLE products
ADD COLUMN default_image VARCHAR(255) NOT NULL,
ADD COLUMN default_color VARCHAR(255) NOT NULL;

CREATE TABLE product_category (
  product_id INT,
  category_id INT,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE 
);

CREATE TABLE colors (
  id SERIAL PRIMARY KEY,
  product_id INT,
  color VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL, 
  sort_order INT,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  color_id INT,
  img VARCHAR(255) NOT NULL,
  sort_order INT,
  FOREIGN KEY (color_id) REFERENCES colors(id) ON DELETE CASCADE
);

CREATE TABLE sizes (
  id SERIAL PRIMARY KEY,
  color_id INT,
  size VARCHAR(255) NOT NULL,
  sort_order INT,
  FOREIGN KEY (color_id) REFERENCES colors(id) ON DELETE CASCADE
);
