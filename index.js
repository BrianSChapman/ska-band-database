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
    .then((answer) => {
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
  return db.query("SHOW TABLE role", function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });
}

function viewEmployees() {
  return db.query("SHOW TABLE employee", function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
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
  const departments = db.query("SELECT * FROM department");

  inquirer.prompt(
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
      message: "Please designate the new role's department ID:",
      name: "newDepartment",
      choices: departments.map((newDepartment) => {
        return {
          name: newDepartment.department.name,
          value: departmentId.id,
        };
      }),
    }
  );

  for (let i = 0; i < departments.length; i++) {
    let departmentAnswer;
    if (departments[i].department.id === newDepartment) {
      departmentAnswer = departments[i];
    }
  }
  (answers) => {
    return db.query("INSERT INTO department SET ?;", {
      title: answers.newTitle,
      salary: answers.newSalary,
      department: answers.newDepartment,
    });
  };
}

function addEmployee() {
  db.query(
    "SELECT role.id, role.title FROM role ORDER BY role.id",
    function (err, results) {
      if (err) {
        console.log(err);
      }

      const roleList = results.role.title;

      inquirer.prompt(
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
          choices: [roleList],
        },
        {
          type: "List",
          message: "Please designate the employee's manager:",
          name: "newManager",
        }
      );
    }
  ).then(function (answers) {
    return db.query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id)
         VALUES (${answers.firstName}, ${answers.lastName}, ${answers.newRole}, ${answers.newManager})`
    );
  });
}

function updateRole() {
  let employees = db.query("SELECT * FROM employee", function (err, result) {
    console.log(result);
  });
  inquirer.prompt({
    type: "list",
    message: "Please choose employee",
    name: "employee",
    choices: employees.map((employeeName) => {
      return {
        name: employeeName.first_name + " " + employeeName.last_name,
        value: employeeName.id,
      };
    }),
  });
  let roles = db.query("SELECT * FROM role");
  inquirer.prompt({
    type: "list",
    message: "Please choose a new role",
    choices: roles.map((roleChoice) => {
      return {
        name: roleChoice.title,
        value: roleChoice.id,
      };
    }),
  });
}
