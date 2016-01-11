import {Component, Input} from 'ng-forward/index';

@Component({
  selector: TaskComponent.SELECTOR,
  template: `
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
  <div>
</div>
  `
})
export class TaskComponent {

  static SELECTOR: string = 'ngc-task';

  @Input() task: any;
  @Input() user: any;
  @Input() errorMessage: string;
}
