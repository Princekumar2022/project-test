const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel");
const mongoose = require("mongoose")



const authenticate = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"]
    if (!token) return res.status(401).send({ status: false, msg: "token must be present in the request header" })


    let decodedToken = jwt.verify(token, "prince-project-test")
    req.decodedToken = decodedToken.userId
    next()
  }
  catch (err) {
    return res.status(500).send({ msg: err.message })
  }
}


const authorization = async function (req, res, next) {
  try {
    let decodedToken = req.decodedToken
    console.log(decodedToken);
    let userId = req.params.userId

    if (!userId) {
      return res.status(400).send({ status: false, message: " userId is required" })
    }
    if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ status: false, message: "please enter a correct userId" })
    const userData = await userModel.findOne({ _id: userId })
    if (!userData) { return res.status(404).send({ status: false, message: " userId is not found" }) }

    if (decodedToken != userId) {
      return res.status(403).send({ status: false, message: "Your are not Authorization" })
    }
    else {
      next()
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}




module.exports = { authenticate, authorization };