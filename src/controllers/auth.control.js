const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

async function registerUser( req,res){

const {username,email,password} =req.body;

const isUserAlreadyExist = await userModel.findOne({email})

if(isUserAlreadyExist){
    const {email:userEmail}=isUserAlreadyExist
    return res.status(409).json({
        massage:"User Already Exist",
        Email:userEmail
})}

const user = await userModel.create({
    username,email,password
}) 

const token = jwt.sign({
    id:user._id},           //yahi token create karegi
    process.env.JWT_SECRET)

res.cookie("token",token)

res.status(201).json({
    massage:"User Register successfully",
    user,
})
}

async function getData(req,res){
    /*const token = req.cookies*/
    //console.log(token)
    const data = await userModel.find()
    res.status(200).json({
        massage:"fatched....successfully",
        data:data,
        })}

async function deleteData(req,res){ 
    // const token = req.cookies
    const id = req.params.id
    const data =await userModel.findByIdAndDelete({_id:id})
    res.status(200).json({
        massage:"deletion --- successfull",
        username:data.username,
        email:data.email,
        
})}

module.exports = {registerUser,getData,deleteData}


