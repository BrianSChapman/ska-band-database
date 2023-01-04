mysql = require("mysql2");
require("dotenv").config();
const inquirer = require("inquirer");

const db = mysql.createConnection({
  host: "localhost",
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(`Connected to the Ska Band database.`);
  startPrompt();
});

// Initial List of tasks for user
function startPrompt() {
  inquirer
    .prompt({
      type: "list",
      message: "Welcome! What would you like to do?",
      name: "welcome",
      choices: [
        "View all",
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
    // Function triggered by user's choice in initial prompt
    .then((answer) => {
      switch (answer.welcome) {
        case "View all":
          viewAll();
          break;

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

function viewAll() {
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",
    function (err, results) {
      if (err) {
        console.log(err)
      } else {
        console.table(results);
        startPrompt();
      }
    }
  );
}

function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
      startPrompt();
    }
  });
}

function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
      startPrompt();
    }
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
      startPrompt();
    }
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
      db.query("INSERT INTO department SET ?;", {
        department_name: answers.addDepartment,
      });
      viewDepartments();
      startPrompt();
    });
}

function addRole() {
  db.query("SELECT * FROM department", function (err, data) {
    const department = data.map((data) => ({
      name: data.department_name,
      value: data.id,
    }));
    inquirer
      .prompt([
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
          type: "list",
          message: "Please designate the new role's department:",
          name: "newDepartment",
          choices: department,
        },
      ])
      .then(function (answers) {
        db.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);",
          [answers.newTitle, answers.newSalary, answers.newDepartment],
          function (err, data) {
            if (err) {
              console.log(err);
            }
            viewDepartments();
            startPrompt();
          }
        );
      });
  });
}

function addEmployee() {
  db.query("SELECT * FROM employee", function (err, employees) {
    db.query("SELECT * FROM role", function (err, roles) {
      const employeeArray = employees.map((employee) => {
        return {
          name: employee.first_name + " " + employee.last_name,
          value: employee.id,
        };
      });
      const roleArray = roles.map((roleChoice) => {
        return {
          name: roleChoice.title,
          value: roleChoice.id,
        };
      });
      inquirer
        .prompt([
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
            type: "list",
            message: "Please provide employee's role in the organization:",
            name: "newRole",
            choices: roleArray,
          },
          {
            type: "list",
            message: "Please designate the employee's manager:",
            name: "newManager",
            choices: employeeArray,
          },
        ])
        .then((answers) => {
          db.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
            [
              answers.firstName,
              answers.lastName,
              answers.newRole,
              answers.newManager,
            ]
          );
          viewAll()
          startPrompt()
        });
    });
  });
}

function updateRole() {
  db.query("SELECT * FROM employee", function (err, employees) {
    db.query("SELECT * FROM role", function (err, roles) {
      const employeeArray = employees.map((employeeName) => {
        return {
          name: employeeName.first_name + " " + employeeName.last_name,
          value: employeeName.id,
        };
      });
      const roleArray = roles.map((roleChoice) => {
        return {
          name: roleChoice.title,
          value: roleChoice.id,
        };
      });

      // console.log(roleArray);

      inquirer
        .prompt([
          {
            type: "list",
            message: "Please choose employee",
            name: "employee",
            choices: employeeArray,
          },
          {
            type: "list",
            message: "Please choose a new role",
            name: "newRole",
            choices: roleArray,
          },
        ])
        .then((data) => {
          db.query('UPDATE employee SET ? WHERE ?',[ 
            {
              role_id: data.newRole
              
            },
            {
              id: data.employee
            }
          ]
          )
          viewAll();
          startPrompt();
        })
        .catch(err => {
          if (err) throw err
        }) 
    });
  });
}
