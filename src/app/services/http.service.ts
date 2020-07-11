import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public url: string;
  public token;
  public ip;

  constructor(private http: Http) {
    this.url = GLOBAL.url;
  }

  /*************** Services ***************/

  getService() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + '/service', { headers: headers });
  }

  getServiceById(i) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + '/service/'+i, { headers: headers });
  }

  /*************** Token Decoded ***************/

  decodedToken() {
    const token = JSON.parse(localStorage.getItem('access_token'));
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': token, 'Ages': 'testing' });
    return this.http.get(this.url + '/token', { headers: headers }).map(res => res.json());
  }

  getTokenUser() {
    const _token = "Bearer " + JSON.parse(localStorage.getItem('access_token'));
    if (_token !== 'undefined') {
      this.token = _token;
    } else {
      this.token = null;
    }
    return this.token;
  }

}
