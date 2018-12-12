import * as userModel from '../../lib/mysql';
import * as md5 from 'md5';
import * as jwt from 'jsonwebtoken';
import constant from '../../config/constant';
import { CheckType } from '../../util/checkType';

export async function signIn(ctx: any) {
    console.log(JSON.stringify(ctx));
    const {
        name,
        pass_word,
    } = ctx.request.body;

    let returnMessage: Object = {
        code: 200,
        message: '注册成功',
    };

    if (!CheckType.prototype.isString(name) || !CheckType.prototype.isString(pass_word)) {
        returnMessage = {
            code: 500,
            message: '用户名或密码不符合规范'
        };
    }

    await userModel.findUserDataByName(name)
        .then((result: any) => {
            if (result.length && result[0].name === name && result[0].pass_word === md5(pass_word)) {
                const token = jwt.sign({
                    name: result[0].name,

                }, constant.jwt.jwtCookie, {
                    expiresIn: '2h'
                });
                returnMessage = {
                    code: 200,
                    data: {
                        token: token
                    },
                    message: '登录成功',
                };
            } else {
                returnMessage = {
                    code: 500,
                    message: '用户名或密码输入错误'
                };
            }
        });

        ctx.response.body = returnMessage;
}
