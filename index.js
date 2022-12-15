const mysql = require("mysql2");
const inquirer = require("inquirer");
const {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
} = require("./queries");
require("dotenv").config();

// const db = mysql.createConnection({
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: "localhost",
// });

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
    .then(function (answers) {
      switch (answers.welcome) {
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

        case "I'm done":
          process.exit();
      }
    });
}

startPrompt();
