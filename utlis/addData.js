const inquirer = require("inquirer");
const cTable = require('console.table');

const findId = require('./findId')

const departmentQ = [{
    type: 'input',
    message: 'What is the name of the department?',
    name: 'name' //add a validate?
}]

const roleQ = [
    {
        type: 'input',
        message: 'What is the title of this role?',
        name: 'title'
    },
    {
        type: 'number',
        message: 'What is the salary of this role?',
        name: 'salary' //insure the users enteres a good number? 
    },
    {
        type: 'list',
        message: 'Which department is this role apart of?',
        name: 'department',
        choices: [], //will change this array to be department names when question is asked
    }
]

const employeeQ = [
    {
        type: 'input',
        message: 'What is the employee\'s first name?',
        name: 'first_name'
    },
    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'last_name'
    },
    {
        type: 'list',
        message: 'Which role does this employee hold?',
        name: 'role',
        choices: [] //will change to array of roles in company when question is asked
    },
    {
        type: 'list',
        message: 'Do this employee have a manager?',
        name: 'manager',
        choices: [] //will change to array of employees (in this department?) in company when question is asked
    },
]

const addData = async function (connection) {
    const { table } = await inquirer.prompt([{
        type: "list",
        name: "table",
        message: "Which table do you want to add data to?",
        choices: [
            "Department",
            "Role",
            "Employee",
            "Go back"
        ]
    }])
    switch (table) {
        case "Department":
            const { name } = await inquirer.prompt(departmentQ)
            const departmentQuery = "INSERT INTO department (name) VALUES (?);";
            await connection.query(departmentQuery, [name]);
            console.log(name + " department added to database");
            break;

        case "Role":
            const departmentData = await connection.query("SELECT * FROM department;")
            roleQ[2].choices = departmentData.map(element => element.name)
            const roleRes = await inquirer.prompt(roleQ)
            let department_id = findId(departmentData, 'name', roleRes.department);
            const roleQuery = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);";
            await connection.query(roleQuery, [roleRes.title, roleRes.salary, department_id]);
            console.log(roleRes.title + " role added to database");
            break;

        case "Employee":
            const roleData = await connection.query("SELECT title, id FROM role;")
            employeeQ[2].choices = roleData.map(element => element.title);

            const employeeData = await connection.query("SELECT CONCAT(first_name, ' ', last_name) AS name, id FROM employee;")
            employeeQ[3].choices = employeeData.map(element => element.name);
            employeeQ[3].choices.push('NULL')

            const employeeRes = await inquirer.prompt(employeeQ)
            let role_id = findId(roleData, 'title', employeeRes.role);
            let manager_id = findId(employeeData, 'name', employeeRes.manager);

            const employeeQuery = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);";
            await connection.query(employeeQuery, [employeeRes.first_name, employeeRes.last_name, role_id, manager_id]);
            console.log(`${employeeRes.first_name} ${employeeRes.last_name} added to employee database`);


            break;
    }

}

module.exports = addData;