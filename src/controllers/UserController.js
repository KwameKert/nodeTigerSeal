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
//        res.status(201).send({user, token})
        responseApi(res, 201, {user, token}, "User created ");

    }catch(e) {
      //  res.status(400).send({error: e.message} )
    
        responseApi(res, 400, null, e.message)
    }

}


exports.getAllUsers = async (req, res)=>{

    try{

        let users = await user.find({});
        
        if( users.length < 1 ){

            res.status(204).send({})
        }

    }catch(e){
        res.status(400).send({error: e.message})
    }


}
