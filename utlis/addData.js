const inquirer = require("inquirer");
const cTable = require('console.table');

const departmentQ = [{
    type: 'input',
    message: 'What is the name of the department?',
    name: 'name'
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
    await inquirer.prompt([{
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
        .then(async function (response) {
            switch (response.table) {
                case "Department":
                    await inquirer.prompt(departmentQ)
                        .then(async (response) => {
                            const query = "INSERT INTO department (name) VALUES (?);";
                            await connection.query(query, [response.name]);
                            console.log(response.name + " department added to database");
                        })
                    break;
                case "Role":
                    let departmentData;
                    await connection.query("SELECT * FROM department;")
                        .then((data) => {
                            const departmentNames = [];
                            data.forEach(element => departmentNames.push(element.name));
                            roleQ[2].choices = departmentNames;
                            departmentData = data;
                        })
                    await inquirer.prompt(roleQ)
                        .then(async (response) => {
                            let department_id;
                            for (let i = 0; i < departmentData.length; i++) {
                                if (departmentData[i].name === response.department) department_id = departmentData[i].id;
                            }
                            const query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);";
                            await connection.query(query, [response.title, response.salary, department_id]);
                            console.log(response.title + " role added to database");
                        })

                    break;
                case "Employee":
                    let roleData;
                    let employeeData;
                    await connection.query("SELECT title, id FROM role;")
                        .then((data) => {
                            const roleTitles = [];
                            data.forEach(element => roleTitles.push(element.title));
                            employeeQ[2].choices = roleTitles;
                            roleData = data;
                        })
                    await connection.query("SELECT CONCAT(first_name, ' ', last_name) AS name, id FROM employee;")
                        .then((data) => {
                            let employeesList = [];
                            data.forEach(element => employeesList.push(element.name));
                            employeeQ[3].choices = employeesList;
                            employeeData = data;
                        })
                    await inquirer.prompt(employeeQ)
                        .then(async (response) => {
                            let role_id;
                            for (let i = 0; i < roleData.length; i++) {
                                if (roleData[i].title === response.role) role_id = roleData[i].id;
                            }
                            let manager_id;
                            for (let i = 0; i < employeeData.length; i++) {
                                if (employeeData[i].name === response.manager) manager_id = employeeData[i].id;
                            }
                            const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);";
                            await connection.query(query, [response.first_name, response.last_name, role_id, manager_id]);
                            console.log(`${response.first_name} ${response.last_name} added to employee database`);
                        })


                    break;
            }
        })
}

module.exports = addData;