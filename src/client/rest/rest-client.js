import RestResponse from 'client/rest/rest-response';
import Utils from 'client/utils';

export default class RestClient {
  constructor(baseUrl, headers = {}) {
    this.baseUrl = baseUrl || '';
    this.headers = headers;
  }

  async makeRequest(method, url, data = null) {
    var fullUrl = this.baseUrl + url;

    try {
      var opts = {
        method: method,
        headers: Utils.defaults({
          'Accept': 'application/json'
        }, this.headers)
      };

      if (data) {
        opts.headers['Content-Type'] = 'application/json';
        body: JSON.stringify(data);
      }

      var response = await fetch(fullUrl, opts);

      var responseData;

      try {
        responseData = await response.json();
      } catch (e) { }

      return new RestResponse(response.status, responseData);
    } catch (e) {
      // Handle exception
      console.error(e);

      return new RestResponse(-1, null);
    }
  }

  get(url) {
    return this.makeRequest('GET', url);
  }

  post(url, data) {
    return this.makeRequest('POST', url, data);
  }

  put(url, data) {
    return this.makeRequest('PUT', url, data);
  }

  delete(url) {
    return this.makeRequest('DELETE', url);
  }
}
