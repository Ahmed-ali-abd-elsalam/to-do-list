const express = require('express');
const router = express.Router();
const Authentication = require('../Controllers/AuthenticationController');
const { validate } = require('../utils/tokenUtils');
const { signUp, Login, Logout, getProfile, editProfile } = Authentication;


router.post('/signup', signUp);
router.post('/login', Login);
router.post("/logout", Logout);
router.get("/getuser", validate, getProfile);
router.put("/edit", validate, editProfile);


module.exports = router;