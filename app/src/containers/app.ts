import {Component, StateConfig} from 'ng-forward';
import {MainComponent} from '../components/main/main-component';

@Component({
  selector: App.SELECTOR,
  template: `
    <div>
      <ngc-main>
        <main class="container mt4"><ng-outlet></ng-outlet></main>
      </ngc-main>
    </div>
  `,
  directives: [MainComponent]
})
export class App {

  static SELECTOR: string = 'ng-course-next';

}
