import mysql from "mysql";
import config from "../conf/index.js";

const pool = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME
});

const Query = (sql, vals) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, vals, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
};

export default Query;
