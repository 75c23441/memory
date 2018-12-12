import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as koajwt from 'koa-jwt';
import * as cors from 'koa2-cors';
import router from './router/routeBase';
import constant from './config/constant';
import corsOption from './config/cors';
import errorHandler from './mideware/errorHandler';

// 新建后台服务, koa实例
const app = new Koa();

// 请求参数解析
app.use(bodyParser({
    formLimit: '1mb'
}));

// cors跨域
app.use(cors(corsOption));

// 错误提示中间件
app.use(errorHandler);

// json web token 存储用户登录信息
app.use(koajwt({
    secret: constant.jwt.jwtCookie
}).unless({
    path: [/\/auth\/signIn/, /\/auth\/signUp/],
}));

// 路由
router.map(item => {
    app.use(item.routes()).use(item.allowedMethods());
});

const server = app.listen(23646, () => {
    console.log('Server is running at http://localhost:23646');
    console.log('Press CTRL-C to stop \n');
});

export default server;
