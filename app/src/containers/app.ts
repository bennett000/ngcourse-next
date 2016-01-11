import {Component} from 'ng-forward';

@Component({
  selector: App.SELECTOR,
  template: `
    <div>
      <ngc-main>
        <main class="container mt4" ui-view></main>
      </ngc-main>
    </div>
  `
})
export class App {
  static SELECTOR:string = 'ng-course-next';

}
