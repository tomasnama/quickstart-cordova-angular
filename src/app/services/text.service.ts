import { Injectable } from '@angular/core';
import { TextModel } from 'app/model/text.model';
import { DatabaseService } from 'app/services/database.service';

const TABLE_NAME = 'TEXTS';
const MODE_NEW = 'new';
const MODE_EDIT = 'edit';

@Injectable()
export class TextService {
    constructor(private databaseService: DatabaseService) {
    }

    public getTexts(): any {
        return new Promise((resolve, reject) => {
            this.databaseService.getAll(TABLE_NAME).then(resultSet => {
                let listText: TextModel[] = new Array();
                for (var x = 0; x < resultSet.rows.length; x++) {
                    //console.log("id: " + resultSet.rows.item(x).ID + ", text: " + resultSet.rows.item(x).TEXT);
                    let textModel = new TextModel(resultSet.rows.item(x).ID, resultSet.rows.item(x).TEXT);
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
            let query = 'DELETE FROM TEXTS WHERE ID = ?';
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

    public add(id, text): any {
        return new Promise((resolve, reject) => {
            let query = "INSERT INTO TEXTS (ID,TEXT) VALUES (?, ?)";
            let params = [id, text];
            this.databaseService.excuteQuery(query, params)
                .then(resultSet => {
                    resolve(resultSet.rowsAffected);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    public MODE_NEW(): string {
        return MODE_NEW;
    }

    public MODE_EDIT(): string {
        return MODE_EDIT;
    }


}