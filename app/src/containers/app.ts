import {Component, StateConfig} from 'ng-forward';

@Component({
  selector: App.SELECTOR,
  template: `
    <div>
      <ngc-main>
        <main class="container mt4"><ng-outlet></ng-outlet></main>
      </ngc-main>
    </div>
  `
})
export class App {

  static SELECTOR: string = 'ng-course-next';

}
