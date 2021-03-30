USE employee_db;

INSERT INTO department (name) VALUES 
('Sales'),
('Human Resources'),
('Legal'),
('IT'),
('Customer Service'),
('Accounting')
;

INSERT INTO role (title, salary, department_id) VALUES 
('Sales Lead', 125000, 1),
('Salesperson', 85000, 1),
('HR Manager', 100000, 2),
('HR Specialist', 70000, 2), 
('Legal Team Lead', 175000, 3), 
('Lawyer', 135000, 3),
('IT Manager', 110000, 4),
('IT Specialist', 80000, 4), 
('Customer Service Manager', 100000, 5), 
('Customer Service Specialist', 75000, 5), 
('Accounting Team Lead', 145000, 6), 
('Accountant', 115000, 6)
;

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('LeBron', 'James', 1, null),
('Anthony', 'Davis', 2, 1),
('Marc', 'Gasol', 2, 1),

('Stephen', 'Curry', 3, null),
('Klay', 'Thompson', 4, 4),
('Draymond', 'Green', 4, 4),

('Luka', 'Dončić', 5, null),
('Kristaps', 'Porziņģis', 6, 7),
('Boban', 'Marjanović', 6, 7),

('Zion', 'Williamson', 7, null),
('Brandon', 'Ingram', 8, 10),

('Russell', 'Westbrook', 9, null),
('Bradley', 'Beal', 10, 12),

('Kevin', 'Durant', 11, null),
('James', 'Harden', 12, 14),
('Kyrie', 'Irving', 12, 14),
('Joe', 'Harris', 12, 14)
;