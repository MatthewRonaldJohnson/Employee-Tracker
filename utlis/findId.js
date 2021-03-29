const findID = function (data, target, response) {
    for (let index = 0; index < data.length; index++) {
        if (data[index][target] === response) {
            return data[index].id;
        }
    }
}

module.exports = findID;