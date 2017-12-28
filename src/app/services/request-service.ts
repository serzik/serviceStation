import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {Response, RequestMethod, BaseRequestOptions, Request, Http} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class RequestService {
  private apiAccessUrl: string = 'http://5a43a639342c490012f3fcab.mockapi.io/car-service';

  constructor(private http: Http) {}

  private httpRequest(method: RequestMethod, id?: number, body?: any): Observable<Response> {
    let options = new BaseRequestOptions();
    options.url = this.apiAccessUrl + (id ? ('/' + id) : '');
    options.method = method;
    options.body = body;
    let request = new Request(options);
    return this.http.request(request);
  }

  public getAllItems() {
    return this.httpRequest(RequestMethod.Get).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
  }

  public updateItem(id, data) {
    return this.httpRequest(RequestMethod.Put, id, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
  }
}