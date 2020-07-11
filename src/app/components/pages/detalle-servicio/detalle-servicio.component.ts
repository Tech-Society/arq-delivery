import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.scss'],
  providers: [HttpService]
})
export class DetalleServicioComponent implements OnInit {

  public services = {
    service_jd: "",
    title: "",
    description: "",
    clothes_quantity: "",
    price: "",
    status: ""
  };

  constructor(private _route: ActivatedRoute, private _router: Router, private http: HttpService) { }

  ngOnInit(): void {
    const url = this._router.url;
    const split = url.split('/');
    const ID = split[2];
    this.getServiceById(ID);
  }

  getServiceById(ID){
    this.http.getServiceById(ID).subscribe(
      data => {
        // @ts-ignore
        const data_body = data._body;
        const json = JSON.parse(data_body);
        const services_data = json.data;
        this.services.service_jd = services_data.service_jd
        this.services.title = services_data.title
        this.services.description = services_data.description
        this.services.clothes_quantity = services_data.clothes_quantity
        this.services.price = services_data.price
        this.services.status = services_data.status
      }
    );
  }

}
