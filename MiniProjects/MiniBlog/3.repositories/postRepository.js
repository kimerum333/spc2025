import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('blog.db');
import { promisify } from 'util';

export function insertPost(){
    let query = "INSERT "

    return new Promise(resolve,reject)=>{
        db.run
    }
}