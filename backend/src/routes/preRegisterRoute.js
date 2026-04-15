const express=require("express");
const router=express.Router();
const createPreRegister=require("../controllers/preRegistrationController");
router.post("/waitlist",createPreRegister);




module.exports=router;