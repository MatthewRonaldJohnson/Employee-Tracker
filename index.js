const inquirer = require("inquirer");

const addData = require('./utlis/addData')
const viewData = require('./utlis/viewData')
const updateData = require('./utlis/updateData')

const connection = require('./utlis/connection')


const init = async function () {
    const { action } = await inquirer.prompt([{
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
    switch (action) {
        case "Add New Data":
            await addData(connection);
            init();
            break;
        case "Update Existing Data":
            await updateData(connection);
            init();
            break;
        case "View Data":
            await viewData(connection);
            init();
            break;
        default:
            connection.end();
            break;
    }
}


init();