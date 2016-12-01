import {
  SuccessStatus,
  UnauthenticatedStatus,
  UnauthorisedStatus
} from 'client/apis/statuses';

export default class Response {
  get isOk() { return this.status instanceof SuccessStatus }

  get isUnauthenticated() { return this.status instanceof UnauthenticatedStatus; }

  get isUnauthorised() { return this.status instanceof UnauthorisedStatus; }

  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
}
