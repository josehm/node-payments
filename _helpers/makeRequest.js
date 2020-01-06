const querystring = require('querystring');

class MakeRequest {

  constructor(host, port, protocol) {
    this.host = host;
    this.port = port;
    this.protocol = protocol;
    this.headers = {
      "Accept" : "*/*",
      "User-agent" : "Pagos"
    };
  }

  setBasicAuth(user, password) {
    this.authMethod = "Basic " + Buffer.from(user + ":" + password).toString("base64");
  }

  setBearerAuth(token) {
    this.authMethod = "Bearer " + token;
  }

  setHeaders(params) {
    this.headers = {...this.headers, ...params}
  }

  getHeaders() {
    if(this.authMethod) {
      this.headers.Authorization = this.authMethod;
    }
    return this.headers;
  }

  get(path) {
    const options = {
      hostname: this.host,
      port: this.port,
      method: 'GET',
      path: path,
      headers: this.getHeaders()
    };
    return this.request(options);
  }

  post(path, data) {
    const options = {
      hostname: this.host,
      port: this.port,
      method: 'POST',
      path: path,
      headers: this.getHeaders()
    };
    return this.request(options, data);
  }

  request(options, data) {
    let http = require(this.protocol);
    const headers = this.getHeaders();
    let response = {
      status: 0,
      body: '',
      headers: {}
    };

    return new Promise(function(resolve, reject) {
      let body = [];
      const request = http.request(options, (incomingMessage) => {
        
        incomingMessage.on('data', (chunk) => {
          body.push(chunk);
        });
        incomingMessage.on('end', () => {
          try {
            if (incomingMessage.statusCode < 200 || incomingMessage.statusCode >= 300) {
              return reject( new Error( Buffer.concat(body).toString() ));
            }
            response.status = incomingMessage.statusCode;
            response.headers = incomingMessage.headers;
            response.body = JSON.parse(Buffer.concat(body).toString());
          } catch(error) {
            return reject(error);
          }
          resolve(response);
        });
      });

      if(data != undefined && data != null) {

        const body = headers['Content-Type'] == "application/x-www-form-urlencoded"
          ? querystring.stringify(data)
          : JSON.stringify(data);
        
        request.setHeader('Content-Lenght', Buffer.byteLength(body));
        request.write(body);
      }
      
      request.on('error', (error) => {
        return reject(error);
      });

      request.end();
    });
  }
}

module.exports = MakeRequest;