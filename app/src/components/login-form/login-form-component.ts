import {Component, Input, Output, EventEmitter} from 'ng-forward';

@Component({
  selector: LoginFormComponent.SELECTOR,
  template: `
<div class="flex flex-center login">

  <form class="mx-auto sm-col-6"
    name="loginFormCtrl.form"
    novalidate>

    <h1 class="mt0 mb3 center">
      <i class="h1 fa fa-bullseye fa-lg blue"></i> ngCourse App
    </h1>

    <div class="bold center p2 mb2 white bg-red rounded"
      ng-show="ctrl.errorMessage">
      {{ ctrl.errorMessage }}
    </div>

    <label>Enter username</label>
    <input
      id="qa-login-form-username"
      class="block col-12 mb1 field"
      type="text"
      ng-model="ctrl.username"
      name="username"
      ng-pattern="/^[a-z]+$/"
      required>

    <label>Password</label>
    <input
      id="qa-login-form-password"
      class="block col-12 mb1 field"
      type="password"
      ng-model="ctrl.password"
      name="password"
      required>

    <button class="btn btn-primary block col-12 mt2"
      id="login-button"
      type="submit"
      ng-click="ctrl.submit()"
      ng-disabled="loginFormCtrl.form.$invalid">
      Login
    </button>
  </form>
</div>
  `
})
export class LoginFormComponent {


  @Input() errorMessage: string;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  private _username: string;
  private _password: string;

  static SELECTOR = 'ngcLoginForm';

  constructor() { }

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }

  set username(value: string) {
    this._username = value;
  }

  set password(value: string) {
    this._password = value;
  }

  submit() {
    this.onSubmit.next({
      data: {
        username: this.username,
        password: this.password
      }
    })
  }

}
