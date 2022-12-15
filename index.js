const mysql = require("mysql2");
const inquirer = require("inquirer");
const queries = require("./queries");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "TikiVibes12!",
    database: "employeeDirectory_db",
  },
  console.log(`Connected to the employeeDirectory_db database.`)
);

inquirer
  .prompt({
    type: "list",
    message: "Welcome! What would you like to do?",
    name: "welcome",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
    ],
  })
  .then(function (answers) {
    switch (answers.welcome) {
      case "View all departments":
        viewDepartments();
        break;

      case "View all roles":
        viewRoles();
        break;

      case "View all employees":
        viewEmployees();
        break;

      case "Add a department":
        addDepartment();
        break;

        case "Add a role":
        addRole();
        break;
    }
  });
