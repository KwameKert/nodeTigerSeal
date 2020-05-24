'use strict'

const User = require('../model/User')
const auth = require('../middleware/auth')


exports.saveUser = async (req, res)=>{


    const user = new User(req.body);

    try {

        await user.save()
        const token = await user.generateUserToken();
        res.status(201).send({user, token})
    }catch(e) {
        res.status(402).send({error: e.message} )
    }

}
