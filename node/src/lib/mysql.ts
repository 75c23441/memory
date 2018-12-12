import * as mysql from 'mysql';
import config from '../config/default';
import {
    Observable
} from 'rxjs';

const pool = mysql.createPool({
    host: config.dataBase.HOST,
    user: config.dataBase.USERNAME,
    password: config.dataBase.PASSWORD,
    database: config.dataBase.DATABASE,
    // port: config.dataBase.PORT,
});

const query = (sql: any, values?: any) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
};

const createTable = (sql: any) => {
    return query(sql, []);
};

const users =
    `create table if not exists users(
        id VARCHAR(36) NOT NULL DEFAULT "",
        name VARCHAR(100) NOT NULL COMMENT "用户名",
        pass_word VARCHAR(100) NOT NULL COMMENT "密码",
        gender VARCHAR(36) COMMENT "性别",
        age INT(3) COMMENT "年龄",
        birth_day VARCHAR(36) COMMENT "生日",
        avator VARCHAR(100) COMMENT "头像",
        moment VARCHAR(100) NOT NULL COMMENT "注册时间",
        PRIMARY KEY (id)
    );`;

// 建表
createTable(users);

// 注册用户
export function insertUserData(value: any) {
    const _sql = 'INSERT INTO users(id,moment,name,pass_word,gender,age,birth_day,avator) VALUES(UUID(),?,?,?,?,?,?,?)';
    return query(_sql, value);
}

// 查看用户是否已存在p
export function findDataCountByName(name: String) {
    const _sql = 'select count(*) as count from users where name="' + name + '"';
    return query(_sql);
}

/**
 * 通过用户名查找用户信息
 * @param name 用户名
 */
export function findUserDataByName(name: String) {
    const _sql = 'select * from users where name ="' + name + '"';
    return query(_sql);
}
