const inquirer = require("inquirer");

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
        type: 'number',
        message: 'Which department is this role apart of?',
        name: 'department_id' //change this to list of deparments in db?
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
        type: 'input',
        message: 'Which role does this employee hold?',
        name: 'role_id' //change this to list of roles in db?
    },
    {
        type: 'input',
        message: 'Do this employee have a manager?',
        name: 'manager_id' //change this to list of employees in db?
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
                    await inquirer.prompt(departmentQ).then((response) => {
                        const query = "INSERT INTO department (name) VALUES (?);";
                        connection.query(query, [response.name]);
                        console.log(response.name + " department added to database");
                    })
                    break;
                case "Role":
                    await inquirer.prompt(roleQ).then((response) => {
                        const query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);";
                        connection.query(query, [response.title, response.salary, response.department_id]);
                        console.log(response.title + " role added to database");
                    })
                    break;
                case "Employee":
                    await inquirer.prompt(employeeQ).then((response) => {
                        const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);";
                        connection.query(query, [response.first_name, response.last_name, response.role_id, response.manager_id]);
                        console.log(`${response.first_name} ${response.last_name} added to database`);
                    })
                    break;
            }
        })
}

module.exports = addData;


