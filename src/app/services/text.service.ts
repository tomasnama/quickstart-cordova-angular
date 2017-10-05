import { Injectable } from '@angular/core';
import { TextModel } from 'app/model/text.model';
import { DatabaseService } from 'app/services/database.service';

const TABLE_NAME = 'TEXTS';

@Injectable()
export class TextService {
    constructor(private databaseService: DatabaseService) {
    }

    public getTexts(): any {
        return new Promise((resolve, reject) => {
            this.databaseService.getAll(TABLE_NAME).then(resultSet=>{
                let listText: TextModel[] = new Array();    
                for (var x = 0; x < resultSet.rows.length; x++) {
                    //console.log("id: " + resultSet.rows.item(x).id + ", text: " + resultSet.rows.item(x).text);
                    let textModel = new TextModel(resultSet.rows.item(x).id, resultSet.rows.item(x).text);
                    listText.push(textModel);
                }
                resolve(listText);
            })
            .catch(error => {
                reject(error);
            });
        }); 
       
    }

    public update(text, id): any {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE TEXTS SET TEXT = ? WHERE ID = ?';
            let params = [text, parseInt(id)];
            this.databaseService.excuteQuery(query, params)
            .then(resultSet => {
                resolve(resultSet.rowsAffected);
            })
            .catch(error => {
                reject(error.message);
            });
        });
       
    }

    public remove(id): any {
        return new Promise((resolve, reject) => {
            let query =  'DELETE FROM TEXTS WHERE ID = ?';
            let params = [parseInt(id)];
            this.databaseService.excuteQuery(query, params)
            .then(resultSet => {
                resolve(resultSet.rowsAffected);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    public add(text): any {
        return new Promise ((resolve, reject) => {
            let query = "INSERT INTO TEXTS (TEXT) VALUES (?)";
            let params = [text];
            this.databaseService.excuteQuery(query, params)
            .then(resultSet => {
                resolve(resultSet.rowsAffected);
            })
            .catch(error => {
                reject(error);
            });
        })
    }


}