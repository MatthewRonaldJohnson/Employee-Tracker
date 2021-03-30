const inquirer = require("inquirer");
const { connect, listenerCount } = require("./connection");

const findId = require('./findId')

const employeeQ = [{
    type: 'list',
    message: 'Which employee\'s role would you like to update?',
    name: 'employee',
    choices: [] //will change to array of employees once question answered
}]


const updateData = async function (connection) {
    const { table } = await inquirer.prompt([{
        type: "list",
        name: "table",
        message: "Which table do you want to update?",
        choices: [
            //"Department",
            //"Role",
            "Employee",
            "Go back"
        ]
    }])
    switch (table) {
        case 'Employee':
            const employeeData = await connection.query("SELECT CONCAT(first_name, ' ', last_name) as name, title, employee.id from employee left join role on employee.role_id = role.id;")
            employeeQ[0].choices = employeeData.map(element => element.name);
            const { employee } = await inquirer.prompt(employeeQ)
            let target;
            for (let i = 0; i < employeeData.length; i++) {
                if (employeeData[i].name === employee) target = employeeData[i];
            }
            console.log(`${target.name}'s current role is ${target.title}`);
            const roleData = await connection.query("SELECT title, id FROM role;")
            const { newRole } = await inquirer.prompt([{
                type: 'list',
                message: `What is ${target.name}'s new role?`,
                choices: roleData.map(element => element.title),
                name: 'newRole'
            }])
            let newRoleId = findId(roleData, 'title', newRole)
            const query = "UPDATE employee set role_id = ? WHERE id = ?;"
            await connection.query(query, [newRoleId, target.id]);
            console.log(`${target.name}'s role was updated.`)
    }
}


module.exports = updateData;

