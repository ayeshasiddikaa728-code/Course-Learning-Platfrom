class EnrollmentSubject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class EmailNotifier {
  update(data) {
    console.log(`[Email Service] Notification sent to User #${data.userId} for Course #${data.courseId}`);
  }
}

class AnalyticsLogger {
  update(data) {
    console.log(`[Analytics] Logged enrollment event for Course #${data.courseId}`);
  }
}

module.exports = { EnrollmentSubject, EmailNotifier, AnalyticsLogger };