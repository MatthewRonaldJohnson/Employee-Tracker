const inquirer = require("inquirer");

const deleteData = async function(connection){
    const {table} = await inquirer.prompt([{
        type: "list",
        name: "table",
        message: "Which table do you want to delet data from?",
        choices: [
            //"Department",
            //"Role",
            "Employee",
            "Go back"
        ]
    }])
    switch(table){
        case 'Employee':
            const employeeList = await connection.query("SELECT CONCAT(first_name, ' ', last_name) as name, id from employee")
            const {employeeId} = await inquirer.prompt({
                type: "list",
                name: "employeeId",
                message: "Which employee do you want to remove from the database?",
                choices: employeeList.map(element => ({
                    name: element.name,
                    value: element.id
                }))
            })
            console.log(employeeId);
            await connection.query('Delete From employee where id=?', [employeeId])
            console.log(`Removed from Database`)
            break;
    }
}

module.exports = deleteData;