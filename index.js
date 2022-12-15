const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'TikiVibes12!',
    database: 'employeedirectory_db',
  },
  console.log(`Connected to the employeedirectory_db database.`)
);

inquirer
  .prompt({
    type: 'list',
    message: 'Welcome! What would you like to do?',
    name: 'welcome',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
    ],
  })
  .then(function (answers) {
    switch (answers.welcome) {
      case 'View all departments':
        viewDepartments();
        break;

      case 'View all roles':
        viewRoles();
        break;

      
    }
  });
