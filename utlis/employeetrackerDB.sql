-- reference file for db commands, not meant to be run

-- commands used to create db and its tables

CREATE DATABASE employee_db;

USE employee_db;

CREATE table department (
    id INT auto_increment not null,
    PRIMARY KEY (id),
    name varchar(30) not null
);

CREATE table role (
    id INT auto_increment not null,
    PRIMARY KEY (id),
    title varchar(30) not null,
    salary DECIMAL not null,
    department_id int not null
);

CREATE table employee (
    id INT auto_increment not null,
    PRIMARY KEY (id),
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int
);

-- example command to add to the department table

INSERT INTO department (name) VALUES (?);

-- example command to add to the role table

INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);

-- example command to add to the employee table

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);