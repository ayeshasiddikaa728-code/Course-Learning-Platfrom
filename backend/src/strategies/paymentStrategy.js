class BkashPayment {
  async process(amount) {
    console.log(`Processing bKash payment of $${amount}`);
    return { success: true, transactionId: `BK-${Date.now()}` };
  }
}

class CardPayment {
  async process(amount) {
    console.log(`Processing Credit Card payment of $${amount}`);
    return { success: true, transactionId: `CARD-${Date.now()}` };
  }
}

class PaymentContext {
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  async pay(amount) {
    if (!this.strategy) throw new Error("Payment strategy not set");
    return await this.strategy.process(amount);
  }
}

module.exports = { PaymentContext, BkashPayment, CardPayment };