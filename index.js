const inquirer = require("inquirer");

const addData = require('./utlis/addData')
const viewData = require('./utlis/viewData')
const updateData = require('./utlis/updateData')
const deleteData = require('./utlis/deleteData')

const connection = require('./utlis/connection')

console.log(`
███████╗███╗░░░███╗██████╗░██╗░░░░░░█████╗░██╗░░░██╗███████╗███████╗
██╔════╝████╗░████║██╔══██╗██║░░░░░██╔══██╗╚██╗░██╔╝██╔════╝██╔════╝
█████╗░░██╔████╔██║██████╔╝██║░░░░░██║░░██║░╚████╔╝░█████╗░░█████╗░░
██╔══╝░░██║╚██╔╝██║██╔═══╝░██║░░░░░██║░░██║░░╚██╔╝░░██╔══╝░░██╔══╝░░
███████╗██║░╚═╝░██║██║░░░░░███████╗╚█████╔╝░░░██║░░░███████╗███████╗
╚══════╝╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚══════╝╚══════╝

███╗░░░███╗░█████╗░███╗░░██╗░█████╗░░██████╗░███████╗██████╗░
████╗░████║██╔══██╗████╗░██║██╔══██╗██╔════╝░██╔════╝██╔══██╗
██╔████╔██║███████║██╔██╗██║███████║██║░░██╗░█████╗░░██████╔╝
██║╚██╔╝██║██╔══██║██║╚████║██╔══██║██║░░╚██╗██╔══╝░░██╔══██╗
██║░╚═╝░██║██║░░██║██║░╚███║██║░░██║╚██████╔╝███████╗██║░░██║
╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚═╝░░╚═╝░╚═════╝░╚══════╝╚═╝░░╚═╝`, '\n')

const init = async function () {
    const { action } = await inquirer.prompt([{
        type: "list",
        name: "action",
        message: "Which action would you like to take?",
        choices: [
            "View Data",
            "Add New Data",
            "Update an employee's Data",
            "Delete Data",
            "Exit the Program"
        ]
    }])
    switch (action) {
        case "View Data":
            await viewData(connection);
            init();
            break;
        case "Add New Data":
            await addData(connection);
            init();
            break;
        case "Update an employee's Data":
            await updateData(connection);
            init();
            break;
        case "Delete Data":
            await deleteData(connection);
            init();
            break;
        default:
            connection.end();
            break;
    }
}


init();