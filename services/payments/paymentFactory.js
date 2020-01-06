const Openpay = require("./openpayService");
const Stripe = require("./stripeService");
const paymentPlatformType = { Openpay, Stripe };

module.exports = {
    createPaymentPlatform(type) {
        const PaymentPlatform = paymentPlatformType[type];
        return new PaymentPlatform();
    }
};