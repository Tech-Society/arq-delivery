import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { GLOBAL } from '../../../services/global';
import { ToastrService } from 'ngx-toastr';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.scss'],
  providers: [HttpService]
})
export class CestaComponent implements OnInit {

  public listCesta = [];
  public sumCesta = 0;
  public users = {
    userId : 0,
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  };
  public address;
  public detail;
  public type_delivery = "0";

  constructor(private toastr: ToastrService, private _route: ActivatedRoute, private _router: Router, private http: HttpService) { }

  ngOnInit(): void {
    this.getCesta();
    this.validateSession();
  }

  validateSession() {
    const users = JSON.parse(localStorage.getItem('users'));
    if(users != null){
      const userId = users.userId;
      this.http.getUser(userId).subscribe(
        data => {
          const data_user = data.data[0];
          this.users.userId = data_user.userId;
          this.users.first_name = data_user.first_name;
          this.users.last_name = data_user.last_name;
          this.users.email = data_user.email;
          this.users.phone = data_user.phone;
        }
      );
    }
  }

  getCesta(){
    const cesta = JSON.parse(localStorage.getItem('cesta'));
    if(cesta != null){
      this.http.getService().subscribe(
        data => {
          const array = data.data;
          var data_cesta = [];
          const data_ = array.filter(e => e.servicesId == 1);
          var sum_cesta = 0;
          for(let i = 0; i < cesta.length; i++){
            const data_new = array.filter(e => e.servicesId == cesta[i].cesta);
            data_cesta.push(data_new[0]);
            sum_cesta = sum_cesta + parseInt(data_new[0].price);
            this.sumCesta = sum_cesta;
          }
          this.listCesta = data_cesta;
        }
      );
    }else{
      this.listCesta = [];
    }
  }

  deleteCesta(index){
    var cesta_array = JSON.parse(localStorage.getItem('cesta'));
    var int_index = parseInt(index);
    const item = { 'cesta': int_index };
    var i = cesta_array.indexOf(item);
    console.log(i);
    if (i !== -1) {
      cesta_array.splice(i, 1);
    }
  }

  addServicesUser(){
    var cesta_array = JSON.parse(localStorage.getItem('cesta'));
    const data = {
      userId: this.users.userId,
      services: cesta_array,
      address: this.address,
      detail: this.detail,
      type_delivery: this.type_delivery
    };
    this.http.addUserServices(data).subscribe(
      data => {
        this.toastr.success('Orden de compra realizada');
        this.clean();
        this.getCesta();
      }
    )
  }

  clean(){
    this.address = "";
    this.detail = "";
    this.type_delivery = "0";
    localStorage.removeItem('cesta');
  }

}
