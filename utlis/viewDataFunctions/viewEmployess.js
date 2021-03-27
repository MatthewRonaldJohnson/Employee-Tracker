function viewEmployees(connection) {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
    })
}

module.exports = viewEmployees;