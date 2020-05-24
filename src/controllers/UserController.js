'use strict'

const User = require('../model/User')
const auth = require('../middleware/auth')



const responseApi = (res, status, data, message)=>{

    return res.status(status).send({data, message});

}


//save user and return details
exports.saveUser = async (req, res)=>{
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
exports.getAllUsers = async (req, res)=>{
    try{
        let users = await user.find({});
         users.length < 1 ?  responseApi(res, 204, null, "No user founud") : 
                             responseApi(res, 200, users, "Users found");
    }catch(e){
        responseApi(res, 400, null, e.message)
    }


}



//get user credentials 
exports.loginUser = async (req, res)=>{

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
exports.logoutUser = async (req, res) => {

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
exports.logoutUserAll = async (req, res ) => {

    try{
        req.user.tokens = []
         req.user.save()
        responseApi(res, 200, null , "Logged out from all sessions ")
    }catch(e){
        responseApi(res, 400, null, e.message)
    }

}
