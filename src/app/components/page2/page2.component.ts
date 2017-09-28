import { Component, OnInit } from '@angular/core';
import { TextService } from 'app/services/text.service';
import { DatabaseService } from 'app/services/database.service';
import { TextModel } from 'app/model/text.model';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css'],
  providers: [TextService, DatabaseService]
})
export class Page2Component implements OnInit {

  public listText: TextModel[] = new Array();

  constructor(private textService: TextService) {

  }

  ngOnInit() {
    this.textService.getTexts().then(listText=>{
     this.listText = listText;
    });
    
  }

}
