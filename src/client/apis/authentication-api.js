import RestClient from 'client/rest/rest-client';
import Response from 'client/apis/response';
import Utils from 'client/utils';
import config from 'client/config';

import {
  defaultStatus
} from 'client/apis/statuses';

export class AuthenticationApi {
  constructor(baseUrl = '/auth') {
    this.client = new RestClient(baseUrl);
  }

  async login(username, password, longExpiry) {
    this.client.headers = {
      'Authorization': 'Basic ' + Utils.textToBase64(`${username}:${password}`)
    };

    var restResponse = await this.client.get('/auth-token' + (longExpiry ? '?long-expiry=true' : ''));

    return new Response(defaultStatus(restResponse.statusCode), restResponse.data);
  }

  async refreshToken(refreshToken) {
    this.client.headers = {
      'Authorization': 'Bearer ' + refreshToken
    };
    var restResponse = await this.client.get('/auth-token');

    return new Response(defaultStatus(restResponse.statusCode), restResponse.data);
  }
}

export default new AuthenticationApi((config.host || '') + '/auth');
