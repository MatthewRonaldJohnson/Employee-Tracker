DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE table department (
    id INT auto_increment not null,
    PRIMARY KEY (id),
    name varchar(30)
);

CREATE table role (
    id INT auto_increment not null,
    PRIMARY KEY (id),
    title varchar(30),
    salary DECIMAL,
    department_id int
);

CREATE table employee (
    id INT auto_increment not null,
    PRIMARY KEY (id),
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int
);
