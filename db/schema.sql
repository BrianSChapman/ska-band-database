DROP DATABASE IF EXISTS employeedirectory_db;
CREATE DATABASE employeeDirectory_db;

USE employeeDirectory_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(8,2), 
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department (id)
    ON DELETE SET NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT, 
    FOREIGN KEY (role_id)
    REFERENCES role (id)
    ON DELETE SET NULL,
    PRIMARY KEY (id)
);