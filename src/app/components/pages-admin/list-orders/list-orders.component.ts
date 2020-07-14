import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { GLOBAL } from '../../../services/global';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {

  public listUserServices = [];
  constructor(private toastr: ToastrService, private _route: ActivatedRoute, private _router: Router, private http: HttpService) { }

  ngOnInit(): void {
    this.getUserServices();
  }

  getUserServices(){
    this.http.getUserServices().subscribe(
      data => {
        this.listUserServices = data.data;
      }
    );
  }

}
