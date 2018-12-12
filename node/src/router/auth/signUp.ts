import * as Router from 'koa-router';
import * as SignUp from '../../controller/auth/signUp';

const router = new Router();

router.post('/auth/signUp', SignUp.signUp);

export default router;
