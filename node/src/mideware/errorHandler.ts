export default function errorHandler(ctx: any, next: any) {
    return next().catch((err: any) => {
        if (err.status === 401) {
            ctx.status === 401;
            ctx.response.body = {
                code: 401,
                message: err.originalError ? err.originalError.message : err.message,
            };
        } else {
            throw err;
        }
    });
}
