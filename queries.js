const inquirer = require('inquirer');

function viewDepartments () {
    db.query('SHOW TABLE department', function (err, results) {
  console.table(results);})
}

function viewRoles() {
    db.query('SHOW TABLE role', function (err, results) {
        console.table(results);})
}

function viewEmployees() {
    db.query('SHOW TABLE employees', function(err, results) {
        console.table(results);})
}

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        message: 'Please provide a new department name',
        name: 'addDepartment' 
    })
    .then(function (answers) {
    
})
}






module.exports = { viewDepartments, viewRoles, viewEmployees,  }