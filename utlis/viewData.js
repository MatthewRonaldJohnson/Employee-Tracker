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
                const departmentTable = await connection.query("SELECT name as department FROM department")
                console.table(departmentTable)
                break;
            case 'Role':
                const roleTable = await connection.query("SELECT title, salary, name AS department from role left join department on role.department_id = department.id ORDER BY DEPARTMENT;")
                console.table(roleTable)
                break;
            case 'Employee':
                const employeeTable = await connection.query(`SELECT e.last_name, e.first_name, title, name AS department, salary, CONCAT (m.first_name, " ", m.last_name) as manager
                FROM employee e
                LEFT JOIN role ON e.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee m ON e.manager_id = m.id ORDER BY department;`)
                console.table(employeeTable)
                break;
        }
    })
}

module.exports = viewData;