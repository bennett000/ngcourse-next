import {Injectable, Inject} from 'ng-forward';

@Injectable
@Inject('$http', 'API_BASE_URL')
export class ServerService {

  constructor(
    private $http: angular.IHttpService,
    private API_BASE_URL
  ) { }

  public get(path) {
    return this.$http.get(this.API_BASE_URL + path)
      .then(response => response.data);
  }

  public post(path, data) {
    return this.$http.post(this.API_BASE_URL + path, data)
      .then(response => response.data);
  }

  public put(path, id, data) {
    return this.$http.post(this.API_BASE_URL + path + '/' + id, data)
      .then(response => response.data);
  }
}
