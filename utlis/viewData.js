const inquirer = require("inquirer");
const viewEmployeeData = require('./viewEmployeeData')

const viewData = async function (connection) {
    const { table } = await inquirer.prompt([{
        type: "list",
        name: "table",
        message: "Which table do you want to view?",
        choices: [
            "Department",
            "Role",
            "Employee",
            "Go back"
        ]
    }])
    switch (table) {
        case 'Department':
            const departmentTable = await connection.query("SELECT name as department FROM department")
            console.table(departmentTable)
            break;
        case 'Role':
            const roleTable = await connection.query("SELECT title, salary, name AS department from role left join department on role.department_id = department.id ORDER BY DEPARTMENT;")
            console.table(roleTable)
            break;
        case 'Employee':
            await viewEmployeeData(connection);
            break;
    }

}

module.exports = viewData;