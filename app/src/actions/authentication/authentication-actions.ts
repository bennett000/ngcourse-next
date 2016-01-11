import {AUTHENTICATION_ACTIONS} from '../action-constants';
import {Injectable, Inject} from 'ng-forward';
import {DispatcherService} from '../../services/dispatcher/dispatcher-service';

@Injectable('authenticationActions')
@Inject(DispatcherService)
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
