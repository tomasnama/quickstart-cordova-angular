import { Component, OnInit, Output } from '@angular/core';
import { TextService } from 'app/services/text.service';
import { TextModel } from 'app/model/text.model';
import { DatabaseService } from 'app/services/database.service';
import { Router } from '@angular/router';
import { MenuService } from 'app/components/menu/menu.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-texts',
  templateUrl: './texts.component.html',
  styleUrls: ['./texts.component.css'],
  providers: [TextService, DatabaseService, MenuService]
})
export class TextsComponent implements OnInit {

  public listText: TextModel[] = new Array();

  constructor(private textService: TextService,
              private router: Router,
              private databaseService: DatabaseService,
              private menuService: MenuService) {
  }

  ngOnInit() {
    this.textService.getTexts().then(listText => {
      this.listText = listText;
    });
  }

  public goDetail(id, text): void {
    this.router.navigate(['/detail/' + id + '/' + text + '/' + this.textService.MODE_EDIT()]);
  }

  @Output() childEvent = new EventEmitter();
  public add(): void {
    this.databaseService.nexVal('SEQ_TEXTS').then(nextVal => {
      let id = nextVal;
      let text = null;
      this.router.navigate(['/detail/' + id + '/' + text + '/' + this.textService.MODE_NEW()]);
    });
  }


}
