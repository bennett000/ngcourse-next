import {TasksStore} from '../../stores/tasks/tasks-store';
import {UsersStore} from '../../stores/users/users-store';
import {RouterService} from '../../services/router/router-service';
import {AuthenticationStore}
from '../../stores/authentication/authentication-store';
import {TaskActions} from '../../actions/task/task-actions';
import {Component, Inject} from 'ng-forward';
import {TaskComponent} from '../task/task-component';

@Component({
  selector: TaskListComponent.SELECTOR,
  template: `
<div>
  <header class="flex mb4 header">
    <i class="h1 fa fa-bullseye fa-5x mr2 blue"></i>
    <div class="flex-auto">
      <h3 id="qa-display-name"
        class="mb0 mt1 caps">
        {{ctrl.displayName}}
      </h3>
      <p class="h1 mb0">We've Got {{ctrl.tasks.length}} Tasks</p>
    </div>
  </header>
  <div class="mt4 mb4" ui-view="actionArea"></div>
  <div class="md-col-8 mx-auto rounded tasks-list mb4">
    <ngc-task ng-repeat="task in ctrl.tasks"
      [task]="task"
      [user]="ctrl.users[task.owner]">
    </ngc-task>
  </div>
</div>
  `
})
@Inject('$scope', RouterService, AuthenticationStore, TasksStore, UsersStore)
export class TaskListComponent {

  private _tasks: any[];
  private _users: {};
  private _user: any;
  private _displayName: String;
  private _errorMessage: String;

  static SELECTOR = 'ngc-tasks';

  constructor(
    private $scope: ng.IScope,
    private router: RouterService,
    private authenticationStore: AuthenticationStore,
    private tasksStore: TasksStore,
    private usersStore: UsersStore
  ) {

    let authSubscription = this.authenticationStore.userSubject.subscribe(
      user => this._user = user,
      error => this._errorMessage = error);

    let tasksSubscription = this.tasksStore.tasksSubject.subscribe(
      tasks => this._tasks = tasks,
      error => this._errorMessage = error);

    let usersSubscription = this.usersStore.usersSubject.subscribe(
      users => {
        this._users = users;
        this._displayName = users[this.user.data.username].displayName;
      },
      error => this._errorMessage = error);

    this.$scope.$on('$destroy', () => {
      authSubscription.dispose();
      tasksSubscription.dispose();
      usersSubscription.dispose();
    });
  }

  get tasks() {
    return this._tasks;
  }

  get displayName() {
    return this._displayName;
  }

  get user() {
    return this._user;
  }

  get users() {
    return this._users;
  }

  get errorMessage() {
    return this._errorMessage;
  }
}
