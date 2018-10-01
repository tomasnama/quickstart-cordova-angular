import { Component, OnInit } from '@angular/core';

declare let cordova: any;

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})


export class QrComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    this.scan();

  }

  public scan() : void {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );

  }

}
