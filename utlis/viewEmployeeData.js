const inquirer = require("inquirer")

const viewEmployeeData = async function (connection) {
    const { view } = await inquirer.prompt({
        type: 'list',
        name: 'view',
        message: 'Do you want to view all data or a smaller selection?',
        choices: [
            'All',
            'Employees w/ specific manager',
            //'Employees w/ specific role',
            //'Employees in specific department'
        ]
    })
    switch (view) {
        case 'All':
            const { orderBy } = await inquirer.prompt({
                type: 'list',
                name: 'orderBy',
                message: 'Which attribute should the data be sorted by?',
                choices: [
                    { name: 'Department', value: 'role.department_id' },
                    { name: 'Manager', value: 'e.manager_id' },
                    { name: 'last_name', value: 'e.last_name' },
                    { name: 'first_name', value: 'e.first_name' }
                ]
            })
            const query = "SELECT e.first_name, e.last_name, title, name AS department, salary, CONCAT (m.first_name, \" \", m.last_name) as manager FROM employee e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id ORDER BY ??;"
            const employeeTable = await connection.query(query, [orderBy])
            console.table(employeeTable)
            break;
        case 'Employees w/ specific manager':
            const employeeData = await connection.query("SELECT DISTINCT CONCAT(m.first_name, ' ', m.last_name) AS name, m.id from employee e INNER JOIN employee m on e.manager_id = m.id;")
            const {managerId} = await inquirer.prompt({
                type: 'list',
                name: 'managerId',
                message: 'Which manager\'s employees do you want to view?',
                choices: employeeData.map(element => ({name: element.name, value: element.id}))
            })
            const employeeByManager = await connection.query("SELECT e.first_name, e.last_name, title, name AS department, salary, CONCAT (m.first_name, \" \", m.last_name) as manager FROM employee e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id WHERE e.manager_id = ?;", [managerId]);
            console.table(employeeByManager)
            break;
        // case 'Employees w/ specific role':
        //     break;
        // case 'Employees in specific department':
        //     break;
    }
}

module.exports = viewEmployeeData;