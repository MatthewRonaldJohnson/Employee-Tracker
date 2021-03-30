const inquirer = require("inquirer");

const findId = require('./findId')

const updateData = async function (connection) {
    const employeeData = await connection.query("SELECT CONCAT(e.first_name, ' ', e.last_name) as name, title, e.id, CONCAT(m.first_name, ' ', m.last_name) as manager from employee e left join role on e.role_id = role.id left join employee m on e.manager_id = m.id;")
    const { employee, attribute } = await inquirer
        .prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee's data do you want to update?",
                choices: employeeData.map(element => element.name)
            },
            {
                type: "list",
                name: "attribute",
                message: "Which attribute do you want to update?",
                choices: [
                    "Role",
                    "Manager",
                    "Go back"
                ]
            },
        ])
    let target; 
    for (let i = 0; i < employeeData.length; i++) {
        if (employeeData[i].name === employee) target = employeeData[i];
    }
    switch (attribute){
        case "Role":
            console.log(`${employee}'s role is currently ${target.title}`)
            const roleData = await connection.query("SELECT title, id FROM role;")
            const {newRoleId} = await inquirer.prompt([{
                type: 'list',
                name: 'newRoleId',
                message: `What is ${employee}'s new role?`,
                choices: roleData.map(element => ({name: element.title,value: element.id}))
            }])
            connection.query("UPDATE employee SET role_id = ? where id = ?;", [newRoleId, target.id])
            break;
        case "Manager":
            if (target.manager){
                console.log(`${employee}'s manager is currently ${target.manager}`)
            } else {
                console.log(`${employee}'s currently has no manager`)
            }
            const employeeList = employeeData.map(element => ({name: element.name, value: element.id}))
            employeeList.push({name: "None", value: 'NULL'})
            const {newManagerId} = await inquirer.prompt([{
                type: 'list',
                name: 'newManagerId',
                message: `Who is ${employee}'s new manager?`,
                choices: employeeList
            }])
            if (newManagerId) connection.query("UPDATE employee SET manager_id = ? where id = ?;", [newManagerId, target.id])
            else connection.query("UPDATE employee SET manager_id = NULL where id = ?;", [target.id])
            break;
    }
}










// switch (table) {
//     case 'Employee':



//         const { employee } = await inquirer.prompt(employeeQ)
//         let target;
//         for (let i = 0; i < employeeData.length; i++) {
//             if (employeeData[i].name === employee) target = employeeData[i];
//         }
//         console.log(`${target.name}'s current role is ${target.title}`);
//         const roleData = await connection.query("SELECT title, id FROM role;")
//         const { newRole } = await inquirer.prompt([{
//             type: 'list',
//             message: `What is ${target.name}'s new role?`,
//             choices: roleData.map(element => element.title),
//             name: 'newRole'
//         }])
//         let newRoleId = findId(roleData, 'title', newRole)
//         const query = "UPDATE employee set role_id = ? WHERE id = ?;"
//         await connection.query(query, [newRoleId, target.id]);
//         console.log(`${target.name}'s role was updated.`)




module.exports = updateData;

