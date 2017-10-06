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
            this.isInit= false;
            this.init();
        }
    }

    private init(): void {
        console.log('CREATE');
        this.isInit = true;
        this.db.sqlBatch([
            'CREATE TABLE IF NOT EXISTS SEQ (SEQ_NAME TEXT PRIMARY KEY, SEQ_CURR_VAL REAL)',
            'CREATE TABLE IF NOT EXISTS TEXTS (ID REAL PRIMARY KEY, TEXT TEXT)',
        ], function () {
            this.isInit = true;
        }, function (error) {
            console.log('SQL batch ERROR: ' + error.message);
        });
    }

    public open(): any {
        this.db = window.sqlitePlugin.openDatabase({ name: DATABASE_FILE, location: DATABASE_LOCATION });
    }

    public close(): void {
        this.db.close(function () {
            console.log("DB closed!");
        }, function (error) {
            console.log("Error closing DB:" + error.message);
        });
    }

    private getTransaction(): any {
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

    private getSelect(table, tx): any {
        let query = "SELECT * FROM " + table;
        if (tx) {
            return new Promise((resolve, reject) => {
                tx.executeSql(query, [], (tx, resultSet) => {
                    resolve(resultSet);
                }, (tx, error) => {
                        reject(Error(error.message));
                    });
            });
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

    private executeSql(query, params, tx): any {
        if (tx) {
            return new Promise((resolve, reject) => {
                tx.executeSql(query, params, (tx, resultSet) => {
                    resolve(resultSet);
                }, (tx, error) => {
                        reject(Error(error.message));
                    });
            });

        } else {
            return new Promise(reject => {
                reject(Error("error transaction"));
            });
        }
    }

    public excuteQuery(query, params) :any {
        return new Promise((resolve, reject)=> {
            this.getTransaction()
            .then(tx => {
                return this.executeSql(query, params, tx);
            })
            .then(resultSet => {
                resolve(resultSet);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    public nexVal(seq): any {
        return new Promise((resolve, reject)=>{
            this.excuteQuery('SELECT SEQ_CURR_VAL from SEQ WHERE SEQ_NAME = ?', [seq])
            .then(resultSet=> {
                let nextVal = null;
                if(resultSet.rows.length>0) {
                    let currentVal = resultSet.rows.item(0).SEQ_CURR_VAL;
                    nextVal = parseInt(currentVal)+1;
                    this.excuteQuery('UPDATE SEQ SET SEQ_CURR_VAL = ? WHERE SEQ_NAME = ?', [nextVal, seq])
                    .then(resultSet=>{
                        resolve(nextVal);
                    });
                } else {
                    this.excuteQuery('INSERT INTO SEQ (SEQ_NAME, SEQ_CURR_VAL) VALUES (?, 1)', [seq])
                    .then(resultSet=> {
                        if (resultSet.rowsAffected===1) {
                            resolve(1);
                        } else {
                            reject(Error("error generate sequence."));
                        }
                        
                    });
                }
            })
        });
    } 


}