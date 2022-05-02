INSERT INTO departments (name)
VALUES
    ('Engineering'),
    ('Sales'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Lead Engineer', 150000, 1),
    ('Software Engineer', 120000, 1),
    ('Salesperson', 80000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Timothy', 'Bunt', 4, NULL),
    ('June', 'Law', 6, NULL),
    ('Terry', 'Strong', 2, 1),
    ('Emma', 'Fielder', 7, 3),
    ('Julie', 'Heisenberg', 5, 2),
    ('Bug', 'Jameson', 3, 2),
    ('Fiora', 'Tithe', 7, 3),
    ('Paul', 'Clover', 2, 1),
    ('Simone', 'Knopf', 3, 2),
    ('Mary', 'Felra', 5, 2);