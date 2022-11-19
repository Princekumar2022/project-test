const express = require('express');
const router = express.Router();
const { authenticate } = require("../middleware/auth")
const { createUser, loginUser, updateUser, deleteUser } = require('../controllers/userController')





//..............................Test API.........................//

router.get("/test-me" , function(req,res){
    res.status(200).send({status:true,message:"Testing API"})
})


//........................................User API............................................//

// create
router.post('/register', createUser)

// user login
router.post('/login', loginUser)

// update user
router.put('/user/:userId', authenticate,updateUser)

// delete user
router.delete('/user/:userId', authenticate, deleteUser)














router.all("/*", (req, res) => { res.status(400).send({ status: false, message: "Endpoint is not correct plese provide a proper end-point" }) })




module.exports = router