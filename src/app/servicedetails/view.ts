import { Component, OnInit } from '@angular/core';
import { ServiceDetails } from '../services/servicedetails.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-servicedetails',
  templateUrl: 'servicedetails.html',
  styleUrls: ['servicedetails.css'],
  providers: [ServiceDetails]
})
export class ServicedetailsComponent implements OnInit {
  service_id: number;
  fabio_service_details: any;
  radius_service_details: ServiceInfo[];
  radius_service_id: number;

  constructor(private serviceDetails: ServiceDetails, private router: Router, private route: ActivatedRoute) {
    this.route
        .params
        .subscribe(params => {
          this.service_id = params.service_id;
        });

    this.getFabioServiceDetails();
  }

  ngOnInit() {

  }

  getFabioServiceDetails(){
    this.serviceDetails.getFabioServiceDetails(this.service_id).subscribe(serviceDetails => {
      console.log(serviceDetails);

      if (serviceDetails.message) {

      } else {
        this.fabio_service_details = serviceDetails;
        this.radius_service_id = serviceDetails.radius_service_id;

        console.log("radius id: "+this.radius_service_id);

        this.getRadiusServiceDetails();
      }

    });
  }

  getRadiusServiceDetails(){
    this.serviceDetails.getRadiusServiceDetails(this.radius_service_id).subscribe(serviceDetails => {
      console.log(serviceDetails);

      if (serviceDetails.message) {

      } else {
        this.radius_service_details = serviceDetails.body;
        console.log("radius details: ");
        console.log(serviceDetails);
      }

    });
  }

}

interface ServiceInfo{
  static_ip: string
}
