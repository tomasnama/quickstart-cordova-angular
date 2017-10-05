import { Component, OnInit } from '@angular/core';
import { TextService } from 'app/services/text.service';
import { TextModel } from 'app/model/text.model';
import { DatabaseService } from 'app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-texts',
  templateUrl: './texts.component.html',
  styleUrls: ['./texts.component.css'],
  providers: [TextService, DatabaseService]
})
export class TextsComponent implements OnInit {

  public listText: TextModel[] = new Array();
  
  constructor(private textService: TextService,
              private router: Router) { }

  ngOnInit() {
    this.textService.getTexts().then(listText=>{
      this.listText = listText;
     });
  }

  goDetail(id, text): void {
    this.router.navigate(['/detail/'+id+'/'+text]);
  }

  add():void {
    let id = 1;
    this.router.navigate(['/detail/'+id+'/'+'']);
  }

}
