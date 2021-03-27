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
    }]).then(function (response) { //init runs before th console.table, convert this to promises to use async await?
        switch (response.table) {
            case 'Department':
                connection.query("SELECT * FROM department",function (err, data) {
                    console.table(data);
                })
                break;
            case 'Role':
                connection.query("SELECT * FROM role", function (err, data) {
                    console.table(data);
                })
                break;
            case 'Employee':
                connection.query("SELECT * FROM employee", function (err, data) {
                    console.table(data);
                })
                break;
        }
    })
}

module.exports = viewData;