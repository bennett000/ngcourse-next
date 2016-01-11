import {AUTHENTICATION_ACTIONS} from '../action-constants';
import {Injectable, Inject} from 'ng-forward';

@Injectable('authenticationActions')
@Inject('dispatcher')
export class AuthenticationActions {

  constructor(
    private dispatcher: Rx.Subject<any>) { }

  login(credentials) {
    this.dispatcher.onNext({
      actionType: AUTHENTICATION_ACTIONS.LOGIN,
      credentials: credentials
    });
  }

  logout() {
    this.dispatcher.onNext({
      actionType: AUTHENTICATION_ACTIONS.LOGOUT
    });
  }

}
