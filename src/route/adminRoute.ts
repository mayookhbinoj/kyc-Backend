import express from "express";
import { authorize } from "../middleware/authMiddleware";
import {  getUsersController, kycApproveController,kycRejectController,logoutController } from "../controller/adminController";

const adminRoute = () => {
  const router = express.Router();

  router.get("/getUser",authorize(["admin"]),getUsersController)
  router.patch("/kycApprove",authorize(["admin"]),kycApproveController)
  router.patch("/kycReject",authorize(["admin"]),kycRejectController)
  router.get("/logout",authorize(["admin"]),logoutController)



  return router;
};

export default adminRoute;