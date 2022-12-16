const mysql = require("mysql2");
const cTable = require("console.table");

const db = mysql.createConnection({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
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
          `INSERT INTO role (title, salary, department_id) 
          VALUES (${answers.newTitle}, ${answers.newSalary}, ${answers.newDepartment})`
        );
      }
      //   write a .catch here
    );
}
function addEmployee() {
  inquirer
    .prompt(
      {
        type: "input",
        message: "Please provide employee's first name:",
        name: "firstName",
      },
      {
        type: "input",
        message: "Please provide employee's last name:",
        name: "lastName",
      },
      {
        type: "input",
        message: "Please provide employee's role in the organization:",
        name: "newRole",
      },
      {
        type: "input",
        message: "Please designate the employee's manager:",
        name: "newManager",
      }
    )

    .then(function (answers) {
      return db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id)
         VALUES (${answers.firstName}, ${answers.lastName}, ${answers.newRole}, ${answers.newManager})`
      );
    });
}
// function updateRole() {
//   db.query("SELECT * FROM employee", function (err, result) {
//     console.log(result);
// })
//   inquirer.prompt(
//     {
//       type: "list",
//       message: "Please choose employee",
//       name: "employee",
//       choices: [result],
//     },
//     {
//       type: "input",
//     }
//   );
// }

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateRole,
};
