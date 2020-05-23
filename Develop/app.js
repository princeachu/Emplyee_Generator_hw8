const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "main.html");

const render = require("./lib/htmlRenderer");

// create a variable [your_team_members] to store an empty array, later to be populated with your team members
const teamMembers = [];

// create variable [id_array] to store ids for the employees (not the office number)
const idArray = [];

function startApp() {
  function createEmpManager() {
    console.log("Please build your team");

    // inquriy prompt with array of questions for manager name, manager id, email, and office number
    inquirer
      .prompt([
        {
          // ask for manager's name
          type: "input",
          message: "What is your name?",
          name: "name",
          validate: function (value) {
            if (value === "") {
              return "You need a name";
            } else {
              return true;
            }
          },

          // validate user input for not a empty string. return true or if false, return a message
        },
        {
          // ask for manager's id
          // validate user input for numbers; return true or if false, return a message
          type: "input",
          message: "What is your id?",
          name: "id",
          validate: function (value) {
            if (/[1-100]/gi.test(value)) {
              return true;
            } else {
              return "Please eneter a valid id";
            }
          },
        },
        {
          // ask for manager's email
          // validate user input for correct email format; return true or if false, return a message
          type: "input",
          message: "What is your email?",
          name: "email",
          validate: function (value) {
            if (
              /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gi.test(value)
            ) {
              return true;
            } else {
              return "Please eneter a valid email";
            }
          },
        },
        {
          // ask for manager's office number
          // validate user answer for number; return true or if false, return a message
          type: "input",
          message: "What is your office number?",
          name: "officeNumber",
          validate: function (value) {
            if (/[1-100]/gi.test(value)) {
              return true;
            } else {
              return "Please eneter a valid office number";
            }
          },
        },
      ])
      .then((answers) => {
        // create a manager variable to store new manager object created with the imported Manager class
        // initialize it with user answers for name, id, email, office number.
        const manager = new Manager(
          answers.name,
          answers.id,
          answers.email,
          answers.officeNumber
        );
        // push newly created manager object to [your_team_members]
        teamMembers.push(manager);
        // push id from user answer to [id_array]
        idArray.push(answers.id);
        // call createEmpTeam to start creat the team for the manager
        createEmpTeam();
      });
  }

  // create createEmpTeam function with logic to create manager's team
  function createEmpTeam() {
    // prompt with a list of choices for the types of employees to create - "Engineer", ""Intern", and "No more team member to add"
    inquirer
      .prompt([
        {
          // ask for choice for type of employee to create
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members",
          ],
        },
      ])
      .then((userChoice) => {
        //
        switch (userChoice.memberChoice) {
          case "Engineer":
            // call function to add engineer
            addEmpEngineer();
            break;
          case "Intern":
            // call function to add intern
            addEmpIntern();
            break;
          default:
            // call function to build team
            buildEmpTeam();
        }
      });
  }

  // const team = [];
  // render(team)

  function addEmpEngineer() {
    inquirer
      .prompt([
        {
          // ask for engineer's name
          // validate the name is not empty; return true or if false, return a message
          type: "input",
          message: "What is your name?",
          name: "name",
          validate: function (value) {
            if (value === "") {
              return "You need a name";
            } else {
              return true;
            }
          },
        },
        {
          // ask for engineer's id
          // validate the id is numbers and the id has not been taken; return true or
          // if false, just return a reminder message
          type: "input",
          message: "What is your id?",
          name: "id",
          validate: function (value) {
            if (/[1-100]/gi.test(value)) {
              return true;
            } else {
              return "Please eneter a valid id";
            }
          },
        },
        {
          // ask for engineer's email
          // validate email for correct email format
          type: "input",
          message: "What is your email?",
          name: "email",
          validate: function (value) {
            if (
              /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gi.test(value)
            ) {
              return true;
            } else {
              return "Please eneter a valid email";
            }
          },
        },
        {
          // ask for gibhub user name
          // validate user name is not empty; return true or if false, just return a user friendly message
          type: "input",
          message: "What is your Github username?",
          name: "username",
          validate: function (value) {
            if (/[a-zA-Z0-9._]/gi.test(value)) {
              return true;
            } else {
              return "Please eneter a valid username";
            }
          },
        },
      ])
      .then((answers) => {
        // create an engineer object with user answers and store it to a constant variable
        const engineer = new Engineer(
          answers.email,
          answers.id,
          answers.name,
          answers.username
        );
        // push newly created engineer object to [your_team_members]
        teamMembers.push(engineer);
        // push engineer id to id array
        idArray.push(answers.id);
        // call function createEmpTeam
        createEmpTeam();
      });
  }

  function addEmpIntern() {
    inquirer
      .prompt([
        {
          // ask for intern's name
          // validate name is not empty; return true or if false, return a message
          type: "input",
          message: "What is your name?",
          name: "name",
          validate: function (value) {
            if (value === "") {
              return "You need a name";
            } else {
              return true;
            }
          },
        },
        {
          // ask for intern's id
          // validate id is number and id has not been taken; return true or if false, return a message
          type: "input",
          message: "What is your id?",
          name: "id",
          validate: function (value) {
            if (/[1-100]/gi.test(value)) {
              return true;
            } else {
              return "Please eneter a valid id";
            }
          },
        },
        {
          // ask for intern's email
          // validate email for correct email format; return trur or if false, return a message
          type: "input",
          message: "What is your email?",
          name: "email",
          validate: function (value) {
            if (
              /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gi.test(value)
            ) {
              return true;
            } else {
              return "Please eneter a valid email";
            }
          },
        },
        {
          // ask for intern's school
          // validate school is not empty;  return true or if false, return a message
          type: "input",
          message: "What is your school?",
          name: "school",
          validate: function (value) {
            if (value === "") {
              return "You need a school";
            } else {
              return true;
            }
          },
        },
      ])
      .then((answers) => {
        // create an intern object and intialize it wirh user's answers; assign it to a constant variable
        const intern = new Intern(
          answers.id,
          answers.name,
          answers.email,
          answers.school
        );
        // push the newly created intern object to [your_team_members]
        teamMembers.push(intern);
        // push id to id array
        idArray.push(answers.id);
        // call function createEmpTeam
        createEmpTeam();
      });
  }

  function buildEmpTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }

    // call function 'render' passing [your_team_members] array as input argument
    // use the return value from render function as data to fs.writeFileSync function
    render(teamMembers);
    fs.writeFileSync(outputPath, "main.html", teamMembers);
  }

  createEmpManager();
}

startApp();
