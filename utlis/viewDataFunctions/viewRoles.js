function viewRoles(connection) {
    connection.query("SELECT * FROM role", function (err, data) {
        console.table(data);
    })
}

module.exports = viewRoles;