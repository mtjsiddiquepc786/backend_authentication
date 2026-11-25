const express = require("express")
const authController = require("../controllers/auth.control");


const router = express.Router();

router.post("/register",authController.registerUser)
router.get("/test",authController.getData)
router.delete("/waste/:id",authController.deleteData)

module.exports = router