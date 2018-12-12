import * as Router from 'koa-router';
import * as SingIn from '../../controller/auth/signIn';

const router = new Router();

router.post('/auth/signIn', SingIn.signIn);

export default router;
