// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
// const employee = require("./Employee");
class intern {
  constructor(name, role, email, id, school) {
    this.name = name;
    this.role = role;
    this.email = email;
    this.id = id;
    this.school = school;
  }
}

module.exports = intern;
