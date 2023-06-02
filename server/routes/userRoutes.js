
import express from "express";
import { deletMyProfile, getMyProfile, login, register, updateProfile } from "../controllers/userController.js";
import  {isAuthanticate}  from "../middleware/authenticate.js";

const router = express.Router()


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile").get(isAuthanticate,getMyProfile);
router.route('/updateprfile').put(isAuthanticate,updateProfile);
router.route('/profile').delete(isAuthanticate,deletMyProfile);
export default router;