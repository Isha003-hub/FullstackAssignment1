const express = require("express");
const router = express.Router();
const {login, logout, register, adminpage, loginform, registerform} = require("./controller")

router.get("/login", loginform);
router.post("/login", login);
router.get("/logout", logout);
router.get("/register", registerform);
router.post("/register", register);
router.get("/", adminpage);

module.exports = router;