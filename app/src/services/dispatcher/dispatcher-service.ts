import * as Rx from 'rx';
import {Injectable} from 'ng-forward';

@Injectable
export class DispatcherService extends Rx.Subject<any> {
}
