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
    await inquirer.prompt([{
        type: "list",
        name: "table",
        message: "Which table do you want to update?",
        choices: [
            //"Department",clear
            //"Role",
            "Employee",
            "Go back"
        ]
    }]).then(async function (response) {
        switch (response.table) {
            case 'Employee':
                let employeeData;
                let roleData;
                let target;
                await connection.query("SELECT CONCAT(first_name, ' ', last_name) as name, title, employee.id from employee left join role on employee.role_id = role.id;")
                    .then((data) => {
                        employeeQ[0].choices = data.map(element => element.name);
                        employeeData = data;
                    })
                await inquirer.prompt(employeeQ)
                    .then((response) => {
                        for (let i = 0; i < employeeData.length; i++) {
                            if (employeeData[i].name === response.employee) target = employeeData[i];
                        }
                        console.log(target)
                        console.log(`${target.name}'s current role is ${target.title}`);
                    })
                await connection.query("SELECT title, id FROM role;")
                    .then((data) => {
                        roleData = data;
                    })
                await inquirer.prompt([{
                    type: 'list',
                    message: `What is ${target.name}'s new role?`,
                    choices: roleData.map(element => element.title),
                    name: 'newRole'
                }])
                    .then(async (response) => {
                        let newRoleId = findId(roleData, 'title', response.newRole)
                        const query = "UPDATE employee set role_id = ? WHERE id = ?;"
                        await connection.query(query, [newRoleId, target.id]);
                        console.log(`${target.name}'s role was updated.`)
                    })


        }
    })
}


module.exports = updateData;

