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

  /*************** Auth ***************/

  SignIn(data) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'Ages': data });
    return this.http.get(this.url + '/signin', { headers: headers });
  }

  /*************** Privilege ***************/

  Category() {
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/privilege/getCategory/list', { headers: headers }).map(res => res.json());
  }

  Privileges(id) {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/role-privilege/' + id, { headers: headers }).map(res => res.json());
  }

  listPrivileges() {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/privilege/getAll/list', { headers: headers }).map(res => res.json());
  }

  listAssignPrivileges() {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/privilege', { headers: headers }).map(res => res.json());
  }

  listPrivilegesRole(id) {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/role-privilege/' + id, { headers: headers }).map(res => res.json());
  }

  assignRolePrivileges(id, data) {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.put(this.url + '/role-privilege/' + id, data, { headers: headers }).map(res => res.json());
  }

  /*************** Role ***************/

  createRole(data) {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token, 'Ages': data });
    return this.http.get(this.url + '/role/create/post', { headers: headers }).map(res => res.json());
  }

  listRole() {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/role', { headers: headers }).map(res => res.json());
  }

  listRoleOperation() {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/role/operation', { headers: headers }).map(res => res.json());
  }

  deleteRole(idRole) {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.delete(this.url + '/role/' + idRole, { headers: headers }).map(res => res.json());
  }

  /*************** User ***************/

  saveUser(data) {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token, 'Ages': data });
    return this.http.get(this.url + '/signup', { headers: headers }).map(res => res.json());
  }

  updateUser(id, data) {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token, 'Ages': data });
    return this.http.get(this.url + '/user/update/' + id, { headers: headers }).map(res => res.json());
  }

  listUser() {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/user', { headers: headers }).map(res => res.json());
  }

  profileUser(id) {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/user/' + id, { headers: headers }).map(res => res.json());
  }

  updatePassword(data, id) {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.put(this.url + '/user/updatePass/' + id, data, { headers: headers }).map(res => res.json());
  }

  stateUser(id) {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/user/updateState/' + id, { headers: headers }).map(res => res.json());
  }

  resetPasswordUser(id) {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/user/generate/' + id, { headers: headers }).map(res => res.json());
  }

  /*************** Client ***************/

  saveClient(data) {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token, 'Ages': data });
    return this.http.get(this.url + '/client', { headers: headers }).map(res => res.json());
  }

  listClient() {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/client', { headers: headers }).map(res => res.json());
  }

  getClient(id) {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/client/' + id, { headers: headers }).map(res => res.json());
  }

  searchClient(name) {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/client/search/' + name, { headers: headers }).map(res => res.json());
  }

  /*************** Panel Digital ***************/

  getStreamingUser(userId, grilla, paginate){
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/panel-digital/pagination/'+userId+'/'+grilla+'/'+paginate, { headers: headers }).map(res => res.json());
  }

  getPanelLatLong() {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/panel-digital', { headers: headers }).map(res => res.json());
  }

  getPanelLatLongById(id) {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/panel-digital/' + id, { headers: headers }).map(res => res.json());
  }

  getPanelStreaming(id) {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/user-panel/streaming/' + id, { headers: headers }).map(res => res.json());
  }

  getPanelById(id){
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/panel-digital/' + id, { headers: headers }).map(res => res.json());
  }

  updatePanel(id, data){
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.put(this.url + '/panel-digital/' + id, data, { headers: headers }).map(res => res.json());
  }

  deletePanel(id){
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/panel-digital/delete/'+id, { headers: headers }).map(res => res.json());
  }

  searchPanel(data){
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.post(this.url + '/panel-digital/search/panels', data, { headers: headers }).map(res => res.json());
  }

  makeFileRequest(
    files: Array<File>, url:string, image: string,
    panel_name: string, panel_address: string,
    lat: string, long: string,
    panel_type: string, size_panel: string,
    reference: string, frecuence: string, impact: string,
    scope: string, objective_group: string,
    ip_access: string,user_access: string,
    key_access: string,port_access: string,
    url_streaming: string,
    token: string
    ) {
    return new Promise(function (resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        // @ts-ignore
        formData.append(image, files[i], files[i].image);
        formData.append('panel_name', panel_name);
        formData.append('panel_address', panel_address);
        formData.append('lat', lat);
        formData.append('long', long);
        formData.append('panel_type', panel_type);
        formData.append('size_panel', size_panel);
        formData.append('reference', reference);
        formData.append('frecuence', frecuence);
        formData.append('impact', impact);
        formData.append('scope', scope);
        formData.append('objective_group', objective_group);
        formData.append('ip_access', ip_access);
        formData.append('user_access', user_access);
        formData.append('key_access', key_access);
        formData.append('port_access', port_access);
        formData.append('url_streaming', url_streaming);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            console.log(xhr.response);
            resolve(JSON.parse(xhr.response));
          } else {
            console.log(xhr.response);
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", url + "/panel-digital", true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
      console.log(xhr);
    });
  }

  updateMakeFileRequest(
    files: Array<File>, id: string, url:string, image: string,
    panel_name: string, panel_address: string,
    lat: string, long: string,
    panel_type: string, size_panel: string,
    reference: string, frecuence: string, impact: string,
    scope: string, objective_group: string,
    ip_access: string,user_access: string,
    key_access: string,port_access: string,
    url_streaming: string, state: string,
    token: string
    ) {
    return new Promise(function (resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        // @ts-ignore
        formData.append(image, files[i], files[i].image);
        formData.append('panel_name', panel_name);
        formData.append('panel_address', panel_address);
        formData.append('lat', lat);
        formData.append('long', long);
        formData.append('panel_type', panel_type);
        formData.append('size_panel', size_panel);
        formData.append('reference', reference);
        formData.append('frecuence', frecuence);
        formData.append('impact', impact);
        formData.append('scope', scope);
        formData.append('objective_group', objective_group);
        formData.append('ip_access', ip_access);
        formData.append('user_access', user_access);
        formData.append('key_access', key_access);
        formData.append('port_access', port_access);
        formData.append('url_streaming', url_streaming);
        formData.append('state', state);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            console.log(xhr.response);
            resolve(JSON.parse(xhr.response));
          } else {
            console.log(xhr.response);
            reject(xhr.response);
          }
        }
      }
      xhr.open("PUT", url + "/panel-digital/"+id, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
      console.log(xhr);
    });
  }

  /*************** Point ***************/

  listPoint() {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/panel-digital', { headers: headers }).map(res => res.json());
  }

  addPointUser(id, data) {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.put(this.url + '/user-panel/' + id, data, { headers: headers }).map(res => res.json());
  }

  getPointUser(id) {
    this.getTokenUser();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.token });
    return this.http.get(this.url + '/user-panel/' + id, { headers: headers }).map(res => res.json());
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
