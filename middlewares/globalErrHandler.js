//Error
export const globalErrHandler = async(err, req, res, next) => {
    //stack - line of code where err occured
    const stack = err?.stack;
    //message
    const message = err?.message;
    //status
    const statusCode = err?.status ? err?.status : 500;

    res.status(statusCode).json({
        stack,
        message,
    });
};

//404 not found
export const notFound = async(req, res, next) => {
    const err = new Error(`Not Found - ${req?.originalUrl}`);
    next(err);
};