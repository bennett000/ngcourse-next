/// <reference path="../../../../typings/tsd.d.ts" />
import {Inject} from 'utils/di';
import {UsersStore} from 'stores/users/users-store';
import {TasksStore} from 'stores/tasks/tasks-store';
import 'rx';

export class TaskComponent {

  private static selector = 'ngc-task';
  private static options = {
    scope: {
      task: '=',
      user: '='
    }
  };
  private static template = `
      <div class="flex flex-center py1"
        ng-class="{ 'border-bottom': !$last }">
        <i class="fa px3 py2"
          ng-class="{
            'fa-square-o': !ctrl.task.done,
            'fa-check-square': ctrl.task.done
          }">
        </i>
        <div class="flex-auto">
          <p class="m0 h6 gray">
            {{ ctrl.user.displayName || 'Owner not specified' }}
          </p>
          <p class="m0">{{ctrl.task.description}}</p>
        </div>
    
        <div class="px2">
          <a ng-show="ctrl.task.can.edit"
            ui-sref="tasks.details({_id: ctrl.task._id})">
            <i class="fa fa-pencil-square p1 gray"></i>
          </a>
          
          <a ng-show="ctrl.task.can.edit"
            ng-click="ctrl.deleteTask()"
            ui-sref="tasks.details({_id: ctrl.task._id})">
            <i class="fa fa-trash p1 gray"></i>
          </a>
        <div>
      </div>
    `;

  private task;
  private user;
  private errorMessage;

  constructor(
    @Inject('$log') private $log,
    @Inject('router') private router,
    @Inject('tasksActions') private tasksActions
    ) {
    this.$log.log('task-component');
  }
  
  private deleteTask() {
    this.tasksActions.deleteTask(this.task);
  }
};