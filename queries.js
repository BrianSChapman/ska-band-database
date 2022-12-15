const inquirer = require("inquirer");

function viewDepartments() {
  db.query("SHOW TABLE department", function (err, results) {
    console.table(results);
  });
}

function viewRoles() {
  db.query("SHOW TABLE role", function (err, results) {
    console.table(results);
  });
}

function viewEmployees() {
  db.query("SHOW TABLE employees", function (err, results) {
    console.table(results);
  });
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "Please provide a name for the new department:",
      name: "addDepartment",
    })
    .then(function (answers) {
      db.query("INSERT INTO department (name)");
      VALUES(answers.addDepartment);
    });
}

function addRole() {
  inquirer
    .prompt({
      type: "input",
      message: "Please provide a title for the new role:",
      name: "newTitle",
    },
    {
      type: "input",
      message: "Please provide a starting salary for the new role:",
      name: "newSalary",
    },
    {
      type: "input",
      message: "Please designate the new role's department:",
      name: "newDepartment",
    })

  .then(function (answers) {
    db.query("INSERT INTO role (title, salary, department_id")
    VALUES(answers.newTitle, answers.newSalary, answers.newDepartment);
  }
// START HERE BUILDING OUT THE FUNCTION FOR UPDATING AN EMPLOYEE ROLE (SIMILAR TO addRole right above)
  )}

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
};
