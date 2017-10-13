import { Component, OnInit } from '@angular/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public zoom: number;

  constructor() { }

  ngOnInit() {
    navigator.geolocation.watchPosition((position) => {
      this.getPosition(position);
    }, (error)=> {
      this.errorPosition(error);
    });
  }

  private getPosition(position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;

  }

  private errorPosition(error) {
    alert(error.message);
  }

  private buscarDireccio(me) {
    var geocoder : google.maps.Geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      address: me.resultService.resultModel.direccio +", " + me.resultService.resultModel.poblacio
     }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        me.latitude = results[0].geometry.location.lat();
        me.longitude = results[0].geometry.location.lng();
        me.zoom = 17;
        var marker = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
          info: me.resultService.resultModel.nom
        };
        me.markers.push(marker);
        var infowindow = new google.maps.InfoWindow({
          content: me.resultService.resultModel.nom
        });
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

}
