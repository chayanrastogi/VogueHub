import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggendIn = (req, res, next) => {
    //get token from header
    const token = getTokenFromHeader(req);
    //verify token
    const decoded = verifyToken(token);
    if (decoded) {
        req.userAuthId = decoded?.id;
        next();
    } else {
        throw new Error("Token expired/invalid, please Login again");
    }
};