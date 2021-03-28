-- reference file for db commands, not meant to be run

-- commands used to create db and its tables

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

-- example command to add to the department table

INSERT INTO department (name) VALUES (?);

-- example command to add to the role table

INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);

-- example command to add to the employee table

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);

--command to display all employees w/ all info

SELECT e.id, e.last_name, e.first_name, title, name AS department, salary, CONCAT (m.first_name, ", ", m.last_name) as manager
FROM employee e
LEFT JOIN role ON e.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee m ON e.manager_id = m.id;

--command to dispaly all roles 

SELECT title, salary, name as department from role left join department on role.department_id = department.id;

--show all roles in IT department

Select title, salary, name as deparment from role left join department on role.department_id = department.id where name = 'it';

--show all employes in IT
 
Select first_name, last_name, title, salary, name as department from employee left join role on employee.role_id = role.id left join department on role.department_id = department.id where name = "it";