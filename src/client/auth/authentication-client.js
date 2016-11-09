import RestClient from 'client/rest/rest-client';
import RestResponse from 'client/rest/rest-response';
import Response from 'client/apis/response';
import tokenStore from 'client/apis/token-store';
import authenticationApi from 'client/apis/authentication-api';
import config from 'client/config';
import {
  SuccessStatus,
  UnauthenticatedStatus
} from 'client/apis/statuses';

export class AuthenticatedClient {
  constructor(baseUrl, authApi, tokenStore) {
    this.client = new RestClient(baseUrl);
    this.authApi = authApi;
    this.tokenStore = tokenStore;
  }

  initialise() {
    var tokens = this.tokenStore.loadTokens();
    if (tokens == null) {
      this.clearTokens()
    } else {
      this.setTokens(tokens);
    }
  }

  setTokens(tokens) {
    this.tokenStore.saveTokens(tokens);
    this.tokens = tokens;
    this.client.headers = {
      'Authorization': 'Bearer ' + tokens.accessToken
    };
  }

  clearTokens() {
    this.tokenStore.saveTokens(null);
    this.tokens = null;
    this.client.headers = {};
  }

  async login(username, password) {
    this.clearTokens();
    var response = await this.authApi.login(username, password);

    if (response.status instanceof SuccessStatus) {
      this.setTokens(response.data);
    }

    return response;
  }

  async refresh() {
    this.clearTokens();
    var response = await this.authApi.refreshToken(this.tokens.refreshToken);

    if (response.status instanceof SuccessStatus) {
      this.setTokens(response.data);
    } else if (response.status instanceof UnauthenticatedStatus) {
      if (this.onUnauthenticated) this.onUnauthenticated();
    }

    return response;
  }

  async request(method, url, data = null) {
    if (this.tokens == null) return new RestResponse(401);

    var restResponse = await this.client.makeRequest(method, url);

    if (restResponse.statusCode == 401) {
      var refreshResponse = await this.refresh();

      // If the refresh failed, return the original response with the 401 code
      if (!(refreshResponse.status instanceof SuccessStatus)) return restResponse;

      restResponse = await this.client.makeRequest(method, url, data);
    }

    return restResponse;
  }

  get(url) {
    return this.request('GET', url);
  }

  post(url, data) {
    return this.request('POST', url, data);
  }

  put(url, data) {
    return this.request('PUT', url, data);
  }

  delete(url) {
    return this.request('DELETE', url);
  }
}

export default new AuthenticatedClient(config.host, authenticationApi, tokenStore);
