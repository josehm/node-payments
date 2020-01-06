'use stric'

const MakeRequest = require('../../_helpers/MakeRequest');
var env = process.env.NODE_ENV || 'development';
const stripe = require('../../config/payments')[env]['stripe'];
// https://stripe.com/docs/payments/payment-intents
// https://stripe.com/docs/api/payment_intents

class StripeService {

  constructor() {
    this.baseUri = stripe.baseUri;
    this.secretKey = stripe.secretKey;
    this.redirectUrl = stripe.redirectUrl;
  }
  
  async handlePayment(data) {
    //verify data
    const paymentIntentData = {
      amount: data.amount,
      currency: data.currency,
      //payment_method: paymentMethod.body.id,
      confirmation_method: "manual"
    }

    try {
      const intent = await this.createIntent(paymentIntentData);
      return `https://${this.baseUri + intent.charges.url}`;
    } catch (error) {
      return error;
    }
  }

  handleApproval() {}
  
  async createIntent(paymentIntentData) {

    const stripeClient = new MakeRequest(this.baseUri, '443', 'https');
    stripeClient.setBearerAuth(this.secretKey);
    stripeClient.setHeaders({
      "Content-Type":"application/x-www-form-urlencoded"
    });

    try {
      const paymentMethod = await this.createCard();
      paymentIntentData.payment_method = paymentMethod.id;
      const paymentIntent = await stripeClient.post('/v1/payment_intents', paymentIntentData );
      return paymentIntent.body;
    }
    catch (error) {
      return error;
    }
  }

  async createCard(cardData = {}) {
    const stripeClient = new MakeRequest(this.baseUri, '443', 'https');
    stripeClient.setBearerAuth(this.secretKey);
    stripeClient.setHeaders({
      "Content-Type":"application/x-www-form-urlencoded"
    });

    const paymentData = {
      type: 'card',
      'card[number]': '4242424242424242',
      'card[exp_month]': 8,
      'card[exp_year]': 2021,
      'card[cvc]': '314'
    };

    try {
      const paymentMethod = await stripeClient.post('/v1/payment_methods', paymentData );
      return paymentMethod.body;
    } catch (error) {
      return error;
    }
  }

}
/*
  decodeResponse(response) {}
  resolveAccessToken() {}
  confirmPayment(paymentIntentId) {}
  resolveFactor(currency) {}
*/
module.exports = StripeService;