const inquirer = require("inquirer");
mysql = require("mysql2");
require("console.table");
const {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateRole,
} = require("./queries");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

console.log(`Connected to the Ska Band database.`);
startPrompt();

function startPrompt() {
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
        "I'm done",
      ],
    })
    .then(function (answer) {
      console.log(answer);
      switch (answer.welcome) {
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

        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateRole();
          break;

        case "I'm done":
          process.exit();
      }
    });
    
}
