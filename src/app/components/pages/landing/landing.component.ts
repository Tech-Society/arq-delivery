import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';  
import { HttpService } from 'src/app/services/http.service';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public listService = [];
  public URLimage = "";

  constructor(private http: HttpService) {
    this.URLimage = GLOBAL.image;
  }

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
