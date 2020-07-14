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

  /*************** Users ***************/

  signin(data) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/user/signin', data, { headers: headers }).map(res => res.json());
  }

  signup(data) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/user/signup', data, { headers: headers }).map(res => res.json());
  }

  getUser(i) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + '/user/'+i, { headers: headers }).map(res => res.json());
  }

  getUsers() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + '/user/list', { headers: headers }).map(res => res.json());
  }

  saveUser(data) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/user/create', data, { headers: headers }).map(res => res.json());
  }

  /*************** Services ***************/

  getService() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + '/services/list', { headers: headers }).map(res => res.json());
  }

  getServiceById(i) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + '/services/'+i, { headers: headers }).map(res => res.json());
  }

  newServices( url: string, files: Array<File>, name: string, title: string, description: string, price: string, clothingId: string ) {
    return new Promise(function (resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('clothingId', clothingId);
        formData.append(name, files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) { resolve(JSON.parse(xhr.response));}
          else { reject(xhr.response); }
        }
      }
      xhr.open("POST", url + "/services/create", true);
      xhr.send(formData);
    });
  }

  /*************** User Services ***************/

  addUserServices(data) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/userServices/add', data, { headers: headers }).map(res => res.json());
  }

  getUserServices() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + '/userServices/getList', { headers: headers }).map(res => res.json());
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
