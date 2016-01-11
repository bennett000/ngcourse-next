import {USER_ACTIONS} from '../action-constants';
import * as Rx from 'rx';
import {Injectable, Inject} from 'ng-forward';

@Injectable('userActions')
@Inject('dispatcher')
export class UserActions {

  constructor(private dispatcher: Rx.Subject<any>) { }

  getUsers() {
    this.dispatcher.onNext({
      actionType: USER_ACTIONS.GET_USERS
    });
  }

}
