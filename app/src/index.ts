import 'angular-ui-router';
import 'lodash-compat';
import 'koast-angular';

import 'basscss/css/basscss.css';
import 'font-awesome/css/font-awesome.css';
import '../css/styles.css';

import * as angular from 'angular';
import * as Rx from 'rx';
import 'reflect-metadata';
import {bundle, bootstrap} from 'ng-forward';
import {App} from './containers/app';

import {
  ServerService,
  RouterService,
  RouterConfig
} from './services';

import {
  TasksStore,
  UsersStore,
  AuthenticationStore
} from './stores';

import {
  LoginFormComponent,
  TaskListComponent,
  TaskComponent,
  TaskAddComponent,
  TaskEditComponent,
  MainComponent
} from './components';

import {
  TaskActions,
  UserActions,
  AuthenticationActions
} from './actions';

bundle('ng-course-next.ng-forward', [ RouterService ]);
bundle('ng-course-next.ng-forward-auth', [
  AuthenticationStore, AuthenticationActions
]);
bundle('ng-course-next.ng-forward-users', [
  UserActions, UsersStore
]);
bundle('ng-course-next.ng-forward-tasks', [
  TaskComponent, TaskEditComponent, TaskListComponent, TaskActions, TasksStore,
  TaskAddComponent
]);

angular.module('ngcourse.router', ['ui.router', 'ng-course-next.ng-forward'])
 .config(RouterConfig);

angular.module('ngcourse.authentication', ['ng-course-next.ng-forward-auth'])
  .directive(
  LoginFormComponent.selector,
  LoginFormComponent.directiveFactory);

angular.module('ngcourse.server', [])
  .service('server', ServerService);

angular.module('ngcourse.dispatcher', [])
  .service('dispatcher', Rx.Subject);

angular.module('ngcourse', [
  'ngcourse.authentication',
  'ng-course-next.ng-forward-tasks',
  'ng-course-next.ng-forward-users',
  'ngcourse.server',
  'ngcourse.router',
  'ngcourse.dispatcher',
  'koast'])
  .directive(
    MainComponent.selector,
    MainComponent.directiveFactory)
  .constant('API_BASE_URL', 'http://ngcourse.herokuapp.com')
  .run((koast, API_BASE_URL) => {
    koast.init({
      baseUrl: API_BASE_URL
    });
    koast.setApiUriPrefix('/api/v2/');
    koast.addEndpoint('tasks', ':_id', {
      useEnvelope: true
    });
    koast.addEndpoint('users', ':_id', {
      useEnvelope: true
    });
  });

bootstrap(App, ['ngcourse']);
