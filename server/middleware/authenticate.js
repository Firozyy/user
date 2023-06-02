import { USER } from "../model/usermodel.js";
import ErrorHandler from "../utils/errorHanler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import jwt from 'jsonwebtoken'
export const isAuthanticate = catchAsyncError(
    async (req, res, next) => {
        //token from cookie
        const { token } = req.cookies;

        if (!token) {
            return next(new ErrorHandler("No cookie available"))
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        
        req.user = await USER.findById(decoded._id);
   
        next();

    }
)