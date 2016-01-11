import {TaskActions} from '../../actions/task/task-actions';
import {RouterService} from '../../services/router/router-service';
import {Component, Inject} from 'ng-forward';

@Component({
  selector: TaskAddComponent.SELECTOR,
  template: `
<div class="sm-col-8 mx-auto border rounded">
  <div class="p2 gray bg-darken-1">
    <h4 class="m0 caps">Add Task</h4>
  </div>
  <form class="p2 bg-white">
    <label>Owner</label>
    <input class="block col-12 mb1 field"
      type="text"
      ng-model="newTask.owner">
    <label>Description</label>
    <input class="block col-12 mb2 field"
      type="text"
      ng-model="newTask.description">
    <button class="btn btn-primary"
      ng-click="ctrl.save(newTask)">
      Save
    </button>
    <button class="btn btn-primary bg-gray"
      ng-click="ctrl.cancel()">
      Cancel
    </button>
  </form>
</div>
  `
})
@Inject(RouterService, TaskActions)
export class TaskAddComponent {

  static SELECTOR = 'ngc-task-add';

  constructor(
    private router: RouterService,
    private tasksActions: TaskActions
   ) {}

  save(task) {
    this.tasksActions.addTask(task);
    this.router.goToTaskList();
  }

  cancel() {
    this.router.goToTaskList();
  }
}
