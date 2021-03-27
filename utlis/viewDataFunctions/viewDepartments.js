function viewDepartments(connection) {
    connection.query("SELECT * FROM department", function (err, data) {
        console.table(data);
    })
}

module.exports = viewDepartments;