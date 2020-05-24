'use strict'
const User = require('../model/User')
const auth = require('../middleware/auth')

const responseApi = (res, status, data, message)=>{
    return res.status(status).send({data, message});
}

//save user and return details
const saveUser = async (req, res)=>{
    const user = new User(req.body);
    try {
        await user.save()
        const token = await user.generateUserToken();
        responseApi(res, 201, {user, token}, "User created ");
    }catch(e) {
        responseApi(res, 400, null, e.message)
    }
}

//get all users
const getAllUsers = async (req, res)=>{
    try{
        let users = await user.find({});
         users.length < 1 ?  responseApi(res, 204, null, "No user founud") : 
                             responseApi(res, 200, users, "Users found");
    }catch(e){
        responseApi(res, 400, null, e.message)
    }
}



//get user credentials 
const loginUser = async (req, res)=>{

    const email = req.body.email
    const password = req.body.password
    try {
        const user = await User.findByCredentials(email, password)
        const token = await user.generateUserToken();
        responseApi(res, 200, {user, token}, "User logged in ");
    }catch(e) {
        responseApi(res, 400, null, e.message)
    }

}



//logout user from current session 
const logoutUser = async (req, res) => {

    try{
        req.user.tokens = req.user.tokens.filter((tokenObj)=>{
            return tokenObj.token !== req.token
        })
         await req.user.save();
        responseApi(res, 200, null , "User logged out")
    }catch(e){
        responseApi(res, 400, null, e.message)
    }
}



//logout user from all session 
const logoutUserAll = async (req, res ) => {

    try{
        req.user.tokens = []
         req.user.save()
        responseApi(res, 200, null , "Logged out from all sessions ")
    }catch(e){
        responseApi(res, 400, null, e.message)
    }

}



//get user by id 
const getUser = async (req, res) => {

    const _id = req.params.id;
    try {
        const user = await User.findById(_id)
        if(!user){
            responseApi(res, 400, null, "User does not exist")
        }
        responseApi(res, 200, null, "User found ")
    }catch(e){
        responseApi(res, 400, null, e.message)
    }

}


//update user 
const updateUser = async (req, res) =>{
    //get request body keys
    const updates = Object.keys(req.body)
    const allowedParams = ['name','email','role','password']
    //check body keys are valid
    const isValid = updates.every((update)=> allowedParams.includes(update))

    if(!isValid){
        responseApi(res, 403, null, "Invalid parameters ");
    }
    try {
        const user = req.user
        //updating allowed parameters
        updates.forEach(update => user[update] = req.body[update] );
        await user.save()
        responseApi(res, 200, user, "User updated successfully")
    }catch(e){
        responseApi(res, 400, null, e.message)
    }

}

//delete user
const deleteUser = async (req, res) => {
    const _id = req.params.id
    try {
        //delete user
        await User.findOneAndDelete({_id});
        responseApi(res, 200, null, "User deleted successfully")
    }catch(e){
        responseApi(res, 400, null, e.message)
    }
}


//exporting all methods 
module.exports = {
    deleteUser,
    saveUser,
    getAllUsers,
    logoutUser,
    logoutUserAll,
    getUser,
    updateUser,
    deleteUser,
    loginUser
}
