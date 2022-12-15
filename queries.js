const db = mysql.createConnection({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "localhost",
  });

const inquirer = require("inquirer");

function viewDepartments() {
  return db.query("SHOW TABLE department", function (err, results) {
    console.table(results);
  });
}

function viewRoles() {
  return db.query("SHOW TABLE role", function (err, results) {
    console.table(results);
  });
}

function viewEmployees() {
  return db.query("SHOW TABLE employees", function (err, results) {
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
      return db.query(
        `INSERT INTO department (name) VALUES ('${answers.addDepartment}')`
      );
    });
}

function addRole() {
  inquirer
    .prompt(
      {
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
      }
    )

    .then(
      function (answers) {
        return db.query(
          `INSERT INTO role (title, salary, department_id) VALUES (${answers.newTitle}, ${answers.newSalary}, ${answers.newDepartment})`
        );
      }
    //   write a .catch here
    );
}
// START HERE BUILDING OUT THE FUNCTION FOR UPDATING AN EMPLOYEE ROLE

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
};
