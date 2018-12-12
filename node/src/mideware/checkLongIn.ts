// 已经登录了
export function checkNotLogIn(ctx: any) {
    if (ctx.session && ctx.session.user) {
        ctx.redirect('/singup');
        return false;
    }
    return true;
}

// 尚未登录
export function checkLogIn(ctx: any) {
    if (!ctx.session && !ctx.session.user) {
        ctx.redirect('/signin');
        return false;
    }
    return true;
}
