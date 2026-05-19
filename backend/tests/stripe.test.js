const stripe = require('../src/config/stripe');

describe('Stripe Configuration', () => {
  it('should import stripe correctly', () => {
    expect(stripe).toBeDefined();
    expect(stripe.paymentIntents).toBeDefined();
  });
});
