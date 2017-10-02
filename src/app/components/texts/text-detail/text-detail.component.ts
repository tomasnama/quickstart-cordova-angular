import { Component, OnInit } from '@angular/core';
import { TextModel } from 'app/model/text.model';

@Component({
  selector: 'app-text-detail',
  templateUrl: './text-detail.component.html',
  styleUrls: ['./text-detail.component.css']
})
export class TextDetailComponent implements OnInit {

  public text: TextModel;

  constructor() { }

  ngOnInit() {
  }

}
