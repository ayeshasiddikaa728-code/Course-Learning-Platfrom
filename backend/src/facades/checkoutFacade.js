const db = require('../config/db');
const { PaymentContext, BkashPayment, CardPayment } = require('../strategies/paymentStrategy');
const { EnrollmentSubject, EmailNotifier, AnalyticsLogger } = require('../observers/enrollmentObserver');

class CheckoutFacade {
  constructor() {
    this.enrollmentSubject = new EnrollmentSubject();
    this.enrollmentSubject.subscribe(new EmailNotifier());
    this.enrollmentSubject.subscribe(new AnalyticsLogger());
  }

  async completeCheckout(userId, courseId, amount, paymentMethod) {
    const paymentContext = new PaymentContext();
    if (paymentMethod === 'bkash') {
      paymentContext.setStrategy(new BkashPayment());
    } else {
      paymentContext.setStrategy(new CardPayment());
    }

    const paymentResult = await paymentContext.pay(amount);

    if (paymentResult.success) {
      const query = `INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2) RETURNING *`;
      const res = await db.query(query, [userId, courseId]);

      this.enrollmentSubject.notify({ userId, courseId });

      return { success: true, enrollment: res.rows[0] };
    }
    throw new Error("Payment failed");
  }
}

module.exports = new CheckoutFacade();