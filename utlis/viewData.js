const inquirer = require("inquirer");

const viewData = async function (connection) {
    await inquirer.prompt([{
        type: "list",
        name: "table",
        message: "Which table do you want to view?",
        choices: [
            "Department",
            "Role",
            "Employee",
            "Go back"
        ]
    }]).then(async function (response) {
        switch (response.table) {
            case 'Department':
                await connection.query("SELECT * FROM department")
                .then((data) => console.table(data))
                break;
            case 'Role':
                await connection.query("SELECT title, salary, name AS department from role left join department on role.department_id = department.id;")
                .then((data) => console.table(data))
                break;
            case 'Employee':
                await connection.query(`SELECT e.id, e.last_name, e.first_name, title, name AS department, salary, CONCAT (m.first_name, " ", m.last_name) as manager
                FROM employee e
                LEFT JOIN role ON e.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee m ON e.manager_id = m.id;`)
                .then((data) => console.table(data))
                break;
        }
    })
}

module.exports = viewData;