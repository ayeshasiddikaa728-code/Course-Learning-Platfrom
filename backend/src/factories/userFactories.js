class Student {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.role = 'Student';
    this.permissions = ['view_courses', 'enroll_course'];
  }
}

class Instructor {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.role = 'Instructor';
    this.permissions = ['view_courses', 'create_course', 'manage_students'];
  }
}

class UserFactory {
  static createUser(role, userData) {
    switch (role) {
      case 'Student':
        return new Student(userData);
      case 'Instructor':
        return new Instructor(userData);
      default:
        throw new Error(`Unsupported user role: ${role}`);
    }
  }
}

module.exports = UserFactory;