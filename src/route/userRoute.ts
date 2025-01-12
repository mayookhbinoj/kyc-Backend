import express from "express";
import { kycSubmit, userLogin, userRegister,logout } from "../controller/userController";
import { upload } from "../middleware/multer";
import { authorize } from "../middleware/authMiddleware";

const userRoute = () => {
  const router = express.Router();
  router.get("/",(req,res)=>{
    res.json({helo:"message"})
  })
  router.post("/register", userRegister);
  router.post("/userLogin", userLogin);
  router.post("/kycSubmit", authorize(['User']), upload, kycSubmit);
  router.get("/logout", authorize(['User']), logout);


  return router;
};

export default userRoute;