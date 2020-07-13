import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { GLOBAL } from '../../../services/global';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss'],
  providers: [HttpService]
})
export class ListServicesComponent implements OnInit {

  public filesToUplad: Array<File>;
  public services = {
    title: '',
    description: '',
    price: '',
    clothingId: ''
  };
  public listServices = [];
  public URL = "";
  p: number = 1;
  public URLimage = "";

  constructor(private http: HttpService, private toastr: ToastrService) { this.URL = GLOBAL.url; this.URLimage = GLOBAL.image; }

  ngOnInit(): void {
    this.getServices();
  }

  ChangeImage(fileInput: any) {
    this.filesToUplad = <Array<File>>fileInput.target.files;
  }

  saveService(){
    this.http.newServices(this.URL, this.filesToUplad, 'image',this.services.title, this.services.description, this.services.price, this.services.clothingId).then(
      data => {
        this.toastr.success('Servicio creado satisfactoriamente');
        this.clean();
        this.getServices();
      }
    ).catch(
      error => {
        this.toastr.error('Hubo un error al momento de registrar');
      }
    );
  }

  getServices(){
    this.http.getService().subscribe(
      data => {
        this.listServices = data.data;
      }
    );
  }

  clean(){
    this.services.title = "";
    this.services.description = "";
    this.services.price = "";
    this.services.clothingId = "";
  }

}
