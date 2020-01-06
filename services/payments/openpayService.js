'use stric'

const MakeRequest = require('../../_helpers/MakeRequest');
var env = process.env.NODE_ENV || 'development';
const openpay = require('../../config/payments')[env]['openpay'];

class OpenpayService {

  constructor() {
    this.baseUri = openpay.baseUri;
    this.merchantId = openpay.merchantId;
    this.secretKey = openpay.secretKey;
    this.publicKey = openpay.publicKey;
    this.redirectUrl = openpay.redirectUrl;
  }

  async handlePayment(data) {
    //verify data
    const paymentData = {
      "source_id" : data.sourceId,//"kobzqmt9cu5z992gu4b0",
      "method" : "card",
      "amount" : data.amount,
      "currency" : data.currency,
      "description" : data.description,
      "device_session_id" : "kR1MiQhz2otdIuUlQkbEyitIqVMiI16f",// data.sessionId
      "redirect_url": this.redirectUrl,
      "use_3d_secure": true
    };

    try {
      const order = await this.createOrder(paymentData);
      return order.payment_method.url;
    } 
    catch (error) {
      return error;
    }
  }
  
  handleApproval(){}
  
  async createOrder(paymentData) {
    const openpayClient = new MakeRequest(this.baseUri, '443', 'https');
    openpayClient.setBasicAuth(this.secretKey, '');
    openpayClient.setHeaders({'Content-Type': 'application/json'});
    try {
      const transactions = await openpayClient.post(`/v1/${this.merchantId}/customers/aytpn6bwpxt5incuke9k/charges`, paymentData);
      return transactions.body;
    } 
    catch (error) {
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
module.exports = OpenpayService;