module.exports = {
	development: {
    openpay: {
      "baseUri": "sandbox-api.openpay.mx",
      "merchantId": "",
      "secretKey": "",
      "publicKey": "",
      "redirectUrl": ""
		},
		stripe: {
      "baseUri": "api.stripe.com",
      "secretKey": "",
      "publicKey": "",
      "redirectUrl": ""
    }
	},
	test: {
		openpay: {
      "baseUri": "",
      "merchantId": "",
      "secretKey": "",
      "publicKey": "",
      "redirectUrl": ""
		},
		stripe: {
      "baseUri": "api.stripe.com",
      "secretKey": "",
      "publicKey": "",
      "redirectUrl": ""
    }
	},
	production: {
		openpay: {
      "baseUri": "",
      "merchantId": "",
      "secretKey": "",
      "publicKey": "",
      "redirectUrl": ""
		},
		stripe: {
      "baseUri": "api.stripe.com",
      "secretKey": "",
      "publicKey": "",
      "redirectUrl": ""
    }
	}
}