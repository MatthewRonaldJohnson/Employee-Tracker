const inquirer = require("inquirer");

const addData = require('./utlis/addData')
const viewData = require('./utlis/viewData')

const connection = require('./utlis/connection')


const init = function () {
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "Which action would you like to take?",
        choices: [
            "Add New Data",
            "Update Existing Data",
            "View Data",
            "Exit the Program"
        ]
    }])
    .then(async function (response) {
        switch (response.action) {
            case "Add New Data":
                await addData(connection);
                init();
                break;
            case "Update Existing Data":
                //updateData();
                //init();
                break;
            case "View Data":
                await viewData(connection);
                init();
                break;
            default:
                connection.end();
                break;
        }
    })
}

init();