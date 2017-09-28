import { Injectable } from '@angular/core';
import { TextModel } from 'app/model/text.model';
import { DatabaseService } from 'app/services/database.service';

@Injectable()
export class TextService {
    constructor(private databaseService: DatabaseService) {
    }

    public getTexts(): any {
        return new Promise(resolve => {
            let table = "TEXTS";
            this.databaseService.getAll(table).then(resultSet=>{
                let listText: TextModel[] = new Array();    
                for (var x = 0; x < resultSet.rows.length; x++) {
                    console.log("id: " + resultSet.rows.item(x).id + ", text: " + resultSet.rows.item(x).text);
                    let textModel = new TextModel(resultSet.rows.item(x).id, resultSet.rows.item(x).text);
                    listText.push(textModel);
                }
                resolve(listText);
            });
        }); 
       
    }
}