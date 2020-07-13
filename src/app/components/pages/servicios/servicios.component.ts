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
        this.listService = data.data;
      }
    );
  }

}
