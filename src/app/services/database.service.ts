import { Injectable } from '@angular/core';

declare let window: any;
const DATABASE_FILE = "demo.db";
const DATABASE_LOCATION = "default"

@Injectable()
export class DatabaseService {
    private db: any;
    private isInit: boolean;

    public constructor() {
        if (!this.isInit) {
            this.db = window.sqlitePlugin.openDatabase({ name: DATABASE_FILE, location: DATABASE_LOCATION });
            //this.isInit= false;
            //document.addEventListener('deviceready', this.init, false);
        }
    }

    private init(): void {
        console.log('CREATE');
        this.isInit = true;
        this.db.sqlBatch([
            'CREATE TABLE IF NOT EXISTS TEXTS (id, text)',
            ['INSERT INTO TEXTS VALUES (?,?)', [1, 'Text 1']],
            ['INSERT INTO TEXTS VALUES (?,?)', [2, 'Text 2']],
        ], function () {
            this.isInit = true;
        }, function (error) {
            console.log('SQL batch ERROR: ' + error.message);
        });
    }

    public open(): any {
        this.db = window.sqlitePlugin.openDatabase({ name: DATABASE_FILE, location: DATABASE_LOCATION });
    }

    public getTransaction(): any {
        if (this.db) {
            return new Promise((resolve, reject) => {
                this.db.transaction((tx) => {
                    resolve(tx);
                }), (error) => {
                    reject('transaction error: ' + error.message);
                };
            });
        } else {
            return new Promise(reject => {
                reject(Error("error open db."));
            });
        }
    }

    public getSelect(table, tx): any {
        let query = "SELECT * FROM " + table;
        if (tx) {
            return new Promise((resolve, reject) => {
                tx.executeSql(query, [], (tx, resultSet) => {
                    resolve(resultSet);
                },
                    (tx, error) => {
                        reject(Error(error.message));
                    });
            }
            );

        } else {
            return new Promise(reject => {
                reject(Error("error transaction"));
            });
        }
    }

    public getAll(table): any {
        return new Promise((resolve, reject) => {
            this.getTransaction()
            .then(tx => {
                return this.getSelect(table, tx);
            })
            .then(resultSet => {
                resolve(resultSet);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    public close(): void {
        this.db.close(function () {
            console.log("DB closed!");
        }, function (error) {
            console.log("Error closing DB:" + error.message);
        });
    }

}