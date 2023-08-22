import 'express';

declare namespace Express {
    interface Request {
    user?: any

}
}