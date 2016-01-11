import {TASK_ACTIONS} from '../action-constants';
import {Injectable, Inject} from 'ng-forward';

@Injectable('taskActions')
@Inject('dispatcher')
export class TaskActions {

  constructor(
    private dispatcher: Rx.Subject<any>) { }

  getTasks() {
    this.dispatcher.onNext({
      actionType: TASK_ACTIONS.GET_TASKS
    });
  }

  addTask(newTask) {
    this.dispatcher.onNext({
      actionType: TASK_ACTIONS.ADD_TASK,
      newTask: newTask
    });
  }

  updateTask(task) {
    this.dispatcher.onNext({
      actionType: TASK_ACTIONS.UPDATE_TASK,
      task: task
    });
  }
}
