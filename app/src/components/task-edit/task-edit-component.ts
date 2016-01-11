import {TaskActions} from '../../actions/task/task-actions';
import {RouterService} from '../../services/router/router-service';
import {TasksStore} from '../../stores/tasks/tasks-store';
import {Component, Input, Inject} from 'ng-forward/index';

@Component({
  selector: TaskEditComponent.SELECTOR,
  template: `
<div class="sm-col-8 mx-auto border rounded">
  <div class="p2 gray bg-darken-1">
    <h4 class="m0 caps">Edit Task</h4>
  </div>
  <form class="p2 bg-white">
    <label>Owner</label>
    <input class="block col-12 mb1 field"
      type="text"
      ng-model="ctrl.task.owner">
    <label>Description</label>
    <input class="block col-12 mb2 field"
      type="text"
      ng-model="ctrl.task.description">
    <button class="btn btn-primary"
      ng-click="ctrl.updateTask(ctrl.task)">
      Update
    </button>
    <button class="btn btn-primary bg-gray"
      ng-click="ctrl.cancel()">
      Cancel
    </button>
  </form>
</div>
  `
})
@Inject('$scope', TaskActions, TasksStore, '$stateParams', RouterService)
export class TaskEditComponent {
  private _task: any;
  private _errorMessage: string;

  static SELECTOR = 'ngc-task-edit';

  constructor(
    private $scope: angular.IScope,
    private tasksActions: TaskActions,
    private tasksStore: TasksStore,
    private $stateParams,
    private router: RouterService
  ) {
    let tasksSubscription =
      this.tasksStore.tasksSubject.subscribe(
        tasks =>
          this._task = this.tasksStore.getTaskById(this.$stateParams._id),
        error => this._errorMessage = error);

    this.$scope.$on('$destroy', () => {
      tasksSubscription.dispose();
    });
  }

  updateTask(task) {
    this.tasksActions.updateTask(task);
    this.router.goToTaskList();
  }

  cancel() {
    this.router.goToTaskList();
  }

  get task() {
    return this._task;
  }

  get errorMessage() {
    return this._errorMessage;
  }
}
