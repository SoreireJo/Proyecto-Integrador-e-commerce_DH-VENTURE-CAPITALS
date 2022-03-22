const fs = require('fs');
const path = require('path');

const pahtLog = path.join(__dirname, '../userLogs.txt');


function userLog(req, res, next){
    fs.appendFileSync(pahtLog, 'El usuario ingreso a: '+ req.url + "\n")
    next();
}

module.exports= userLog;