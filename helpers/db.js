import { SQLite } from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

// eslint-disable-next-line import/prefer-default-export
export const init = () => {
    /* Custom promise to excute db transaction and resolve if
    query succeeds, reject if it fails */
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL,
                imageUri TEXT NOT NULL, 
                description TEXT
            );`,
            [],
            () => {
                resolve();
            },
            (_, err) => {
                reject(err);
            }
            );
        });
    });
    return promise;
};
