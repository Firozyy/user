import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { USER } from "../model/usermodel.js";
import ErrorHandler from "../utils/errorHanler.js";
import { sentToken } from "../utils/sentToken.js";

export const register = catchAsyncError(

    async (req, res, next) => {

        const { name, password, email } = req.body;


        //check email in database
        let user = await USER.findOne({ email });

        if (user) {
            return next(new ErrorHandler("Email already registered ", 400))
        };

        //check all fild typed
        if (!name || !password || !email) {
            return next(new ErrorHandler("Please type all filds", 400));
        };

        // to database
        user = await USER.create({
            name, password, email
        });

        sentToken(res, "Account has been successfully created", user, 201);

    }
);

export const login = catchAsyncError(
    async (req, res, next) => {

        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler("Please type all filds", 400));
        };

        let user = await USER.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Incorrect Email or Password", 400))
        };

        const isMatch = await user.comaparePassword(password);

        if (!isMatch) {
            return next(new ErrorHandler("Incorrect Email or password", 409))
        };
        sentToken(res, `welcome  ${user.name}`, user, 201);
    }
);

//authentication
export const getMyProfile = catchAsyncError(async (req, res, next) => {

    const user = await USER.findById(req.user._id);



    res.status(200).json({
        success: true,
        user,
    });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {

    const { email } = req.body;

    const user = await USER.findById(req.user._id).select("+password");

    if (email) {
        user.email = email;
    };


    await user.save();

    res.status(200).json({
        success: true,
        message: 'Successsfully updated',
        user
    });


});

export const deletMyProfile = catchAsyncError(async (req, res, next) => {

    const id = req.user._id;
    const user = await USER.findById(id);

    if (!user) return next(new ErrorHandler("User not found", 404));

    await user.deleteOne();

    res.status(200)
        .cookie("token", null, {
            expires: new Date(Date.now())
        })
        .json({
            success: true,
            message: 'Profile succesfully deleted '

        });



});