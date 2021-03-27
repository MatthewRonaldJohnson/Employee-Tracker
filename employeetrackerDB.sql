-- command used to create db and its table

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

INSERT INTO department (title, salary, department_id) VALUES (?, ?, ?);

-- example command to add to the employee table

INSERT INTO department (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);