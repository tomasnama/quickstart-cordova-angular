import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Marker } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public zoom: number;
  public markers: Array<Marker> = new Array<Marker>();

  constructor(private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    this.zoom = 7
    navigator.geolocation.getCurrentPosition((position) => {
      this.getPosition(position);
    }, (error) => {
      this.errorPosition(error);
    });
  }

  private getPosition(position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
 
    var marker: any = {
      lat: this.latitude,
      lng: this.longitude,
      info: 'You are here'
    };

    this.markers.push(marker);

  }

  private errorPosition(error) {
    alert(error.message);
  }


}
