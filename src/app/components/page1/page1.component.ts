import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public goTexts(): void {
    this.router.navigate(['/texts'], {skipLocationChange:true});
  }

  public goLocation(): void {
    this.router.navigate(['/location']), {skipLocationChange:true};
  }

  public goQr(): void {
    this.router.navigate(['/qr'], {skipLocationChange:true});
  }

  public goSwipe(): void {
    this.router.navigate(['/swipe'], {skipLocationChange:true});
  }
}
