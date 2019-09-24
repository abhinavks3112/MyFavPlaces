import { SQLite } from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
    /* Custom promise to excute db transaction and resolve if
    query succeeds, reject with error if it fails */
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

export const insertPlace = (name, address, latitude, longitude, imageUri, description) => {
     /* Custom promise to excute db transaction and resolve with result if
    query succeeds, reject with error if it fails */
    const promise = new Promise((resolve, reject) => {
        /* Entering the values in this fashion is insecure and could lead to sql injection attacks.
        */
        /* VALUES (${name}, ${address}, ${latitude}, ${longitude}, ${imageUri}, ${description});`
        */
        /* To prevent it we add ? in place of values and pass the values in second argument for
        automatic validation and thereby preventing sql injection attack */
        db.transaction((tx) => {
            tx.executeSql(
            `INSERT INTO places (name, address, lat, lng, imageUri, description)
            VALUES (?, ?, ?, ?, ?, ?);`,
            [name, address, latitude, longitude, imageUri, description],
            (_, result) => {
                resolve(result);
            },
            (_, err) => {
                reject(err);
            }
            );
        });
    });
    return promise;
};
