//pulling in requires packages and ulti files
const mysql = require('mysql');
const inquirer = require("inquirer");
const viewEmployees = require('./utlis/viewDataFunctions/viewEmployess')
const viewRoles = require('./utlis/viewDataFunctions/viewRoles')
const viewDepartments = require('./utlis/viewDataFunctions/viewDepartments')

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

function init() {
    //ask user what to do (add data, update data, view data, exit program)
    inquirer.prompt([
        {
            message: "What action do you wish to take?",
            type: "list",
            name: "action",
            choices: ["Add New Data", "Update Existing Data", "View Data", "Exit"]
        }
    ])
    .then (console.log(response))
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    //add data
        //ask which table to add data to
        //collect needed info
        //execute sql command to add data to table 
        //init()
    //update data
        //ask what you want to update
        //collect info w/ inquirer
        //execute sql command to update data
        //init()
    //view data
        //ask which table to view
        //get data from db
        //console.table(data)
        //init()
    //exit
        //close out connection 
        //end program
}