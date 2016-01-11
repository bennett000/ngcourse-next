import {AuthenticationStore}
from '../../stores/authentication/authentication-store';
import {UsersStore} from '../../stores/users/users-store';
import {AuthenticationActions}
from '../../actions/authentication/authentication-actions';
import {Component, Inject} from 'ng-forward';

@Component({
  selector: MainComponent.SELECTOR,
  template: `
<ngc-login-form
  ng-hide="ctrl.user.isAuthenticated"
  (on-submit)="ctrl.login(data)"
  [error-message]="ctrl.errorMessage">
</ngc-login-form>

<div class="clearfix white bg-blue"
  ng-show="ctrl.user.isAuthenticated">
  <div class="left col-4 aqua">
    <p class="btn py2 m0 truncate">
      <i class="fa fa-bolt px1"></i>
      Hello,
      <span>
        {{ctrl.displayName}}
      </span>!
    </p>
  </div>
  <div class="right">
    <a class="btn py2 m0"
      ui-sref="tasks.add">
      <i class="fa fa-plus-circle"></i> Add Task
    </a>
    <a id="qa-logout-link"
      class="btn py2 m0"
      href="#"
      ng-click="ctrl.logout()">
      Logout
    </a>
  </div>
</div>

<div class="px2"
  ng-show="ctrl.user.isAuthenticated"
  ng-transclude>
</div>
  `
})
@Inject('$scope', AuthenticationStore, AuthenticationActions, UsersStore)
export class MainComponent {

  private _user: any;
  private _displayName: string;
  private _errorMessage: string;

  static SELECTOR = 'ngc-main';

  constructor(
    private $scope: angular.IScope,
    private authenticationStore: AuthenticationStore,
    private authenticationActions: AuthenticationActions,
    private usersStore: UsersStore) {

    let authSubscription =
      this.authenticationStore.userSubject.subscribe(
        user => this._user = user,
        error => this._errorMessage = error);

    let usersSubscription =
      this.usersStore.usersSubject.subscribe(
        users => this._displayName = users[this.user.data.username].displayName,
        error => this._errorMessage = error);

    this.$scope.$on('$destroy', () => {
      authSubscription.dispose();
      usersSubscription.dispose();
    });
  }

  private login(form) {
    this.authenticationActions.login(form);
  }

  private logout() {
    this.authenticationActions.logout();
  }

  get user() {
    return this._user;
  }

  get displayName() {
    return this._displayName;
  }

  get errorMessage() {
    return this._errorMessage;
  }
}
