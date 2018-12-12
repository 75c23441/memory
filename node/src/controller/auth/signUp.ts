import * as userModel from '../../lib/mysql';
import * as md5 from 'md5';
import * as moment from 'moment';
import { CheckType } from '../../util/checkType';
// import * as fs from 'fs';
// import { Observable } from 'rxjs';

export async function signUp(ctx: any) {
    // return (observer: any) => {
    console.log(ctx);
    const {
        name,
        pass_word,
        repeat_pass,
        gender,
        age,
        birth_day,
        avator,
    } = ctx.request.body;

    let returnMessage: Object = {
        code: 200,
        message: '注册成功',
    };
    if (!CheckType.prototype.isString(name)) {
        returnMessage = {
            code: 500,
            message: '请按照要求输入用户名',
        };
    } else if (!CheckType.prototype.isString(pass_word) || !CheckType.prototype.isString(repeat_pass)) {
        returnMessage = {
            code: 500,
            message: '请输入密码',
        };
    } else if (pass_word !== repeat_pass) {
        returnMessage = {
            code: 500,
            message: '两次输入的密码不一致',
        };
    } else if (age && !CheckType.prototype.isNumber(age)) {
        returnMessage = {
            code: 500,
            message: '请按照要求输入年龄',
        };
    }

    await userModel.findDataCountByName(name)
        .then((result: any) => {
            console.log(result);
            if (result[0].count >= 1) {
                returnMessage = {
                    code: 500,
                    message: '用户存在'
                };
            }
            else {
                userModel.insertUserData([moment().format('YYYY-MM-DD HH:mm:ss'), name.trim(), md5(pass_word), !!gender, age, birth_day, avator])
                    .then((result: any) => {
                        console.log('注册成功');
                        // 注册成功
                        returnMessage = {
                            code: 200,
                            message: '注册成功',
                        };
                    });
            }
        });
    // };
    ctx.response.body = returnMessage;

}
