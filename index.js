//pulling in requires packages and ulti files
const mysql = require('mysql');
const inquirer = require("inquirer");
const viewEmployees = require('./utlis/viewDataFunctions/viewEmployess')
const viewRoles = require('./utlis/viewDataFunctions/viewRoles')
const viewDepartments = require('./utlis/viewDataFunctions/viewDepartments')
const addData = require('./utlis/addData')

//defines details of connection 
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'employee_db',
});

//opens connection to db
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    init();
});

const init = function() {
    //ask user what to do (add data, update data, view data, exit program)

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
    }]).then(async function (response) {
        switch (response.action) {
            case "Add New Data":
                await addData(connection);
                init();
                break;
            case "Update Existing Data":
                //updateData();
                break;
            case "View Data":
                //viewData();
                break;
            default:
                connection.end();
                break;
        }
    })

    //add data
    //ask which table to add data to
    //collect needed info
    //execute sql command to add data to table 
    //initialization()
    //update data
    //ask what you want to update
    //collect info w/ inquirer
    //execute sql command to update data
    //initialization()
    //view data
    //ask which table to view
    //get data from db
    //console.table(data)
    //initialization()
    //exit
    //close out connection 
    //end program
}