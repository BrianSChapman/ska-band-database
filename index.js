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
  // updateRole,
} = require("./queries");
require("dotenv").config();

console.log(`Connected to the Ska Band database.`);

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
          viewDepartments().then(() => setTimeout(startPrompt(), 2000));
          break;

        case "View all roles":
          viewRoles().then(() => setTimeout(startPrompt(), 2000));
          break;

        case "View all employees":
          viewEmployees().then(() => setTimeout(startPrompt(), 2000));
          break;

        case "Add a department":
          addDepartment().then(() => setTimeout(startPrompt(), 2000));
          break;

        case "Add a role":
          addRole().then(() => setTimeout(startPrompt(), 2000));
          break;

        case "Add an employee":
          addEmployee().then(() => setTimeout(startPrompt(), 2000));
          break;

        case "I'm done":
          process.exit();
      }
    });
}

startPrompt();
