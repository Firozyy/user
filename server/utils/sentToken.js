export const sentToken = function (res, message, user, statuscode = 200) {
    const token = user.getJWTtoken();



    res.status(200).cookie("token", token).json({
        success: true,
        message,
        user
    })
 

}