import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
  providers: [HttpService]
})
export class ServiciosComponent implements OnInit {

  public listService = [];
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(){
    this.http.getService().subscribe(
      data => {
        // @ts-ignore
        const data_body = data._body;
        const json = JSON.parse(data_body);
        this.listService = json.data;
        console.log(this.listService);
      }
    );
  }

}
