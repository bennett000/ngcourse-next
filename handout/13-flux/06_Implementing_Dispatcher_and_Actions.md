## Implementing Dispatcher and Actions

Our dispatcher is very simple, let's modify our *app/src/app.ts* file

```javascript
  angular.module('ngcourse.dispatcher', [])
    .service('dispatcher', Rx.Subject);
```

In Chapter 12 - RxJS we have subscribed to Observables with Observers that implemented the `onNext`, `onError` and `onCompleted` methods. Rx.Subject is a combination of an Observer and Observable in one class. It is used here for convenience as you will see later.

Now, let add some actions to push onto our dispatcher later. Create a new file in *app/src/actions/task-actions.ts*

```javascript

  export class TaskActions {

    static $inject = ['dispatcher'];
    constructor(private dispatcher) {
      this.dispatcher = dispatcher;
    }

    getTasks() {
      this.dispatcher.onNext({
        actionType: 'GET_TASKS'
      });
    }
  }
```

It is a poor practice to use hardcoded strings like `'GET_TASKS'` above. We should extract our constants into a separate file, *app/src/actions/action-constants.ts*

```javascript
  export const TASK_ACTIONS = {
    GET_TASKS: 'GET_TASKS',
  };
```

and let's use those constants in *task-actions.ts* instead

``` javascript
  ...
  import {TASK_ACTIONS} from '../action-constants';

  export class TaskActions {
    ...
    getTasks() {
      this.dispatcher.onNext({
        actionType: TASK_ACTIONS.GET_TASKS
      });
    }
  }

```

Great! Now we can create our first store.
