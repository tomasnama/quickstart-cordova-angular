import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public zoom: number;

  constructor() {

  }

  ngOnInit() {
    this.zoom = 13
    navigator.geolocation.getCurrentPosition((position) => {
      this.setPosition(position);
      let mymap = L.map('mapid').setView([this.latitude, this.longitude], this.zoom);
      let osm = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      });
      osm.addTo(mymap);

    }, (error) => {
      this.errorPosition(error);
    });
  }

  ngAfterViewInit() {

  }

  private setPosition(position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
  }

  private errorPosition(error) {
    alert(error.message);
  }


}
