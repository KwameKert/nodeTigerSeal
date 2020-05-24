const express = require('express');
const router = new express.Router()
const User = require('../model/User')
const auth = require('../middleware/auth')
const userController = require('../controllers/UserController.js')

//save user
router.post('/users', userController.saveUser);


//get all users
router.get('/users',auth, userController.getAllUsers );




//log out user
router.get('/users/logout', auth, userController.logoutUser);


//logout user from all sesssions

router.get('/users/logoutAll', auth, userController.logoutUserAll );

//fetch user by id
router.get('/users/:id',auth, userController.getUser );

router.patch('/users/me',auth, async (req, res)=>{

   
})


//deleting user

router.delete('/users/me',auth, async(req,res)=>{
 

    try {

        await req.user.remove()
       
        res.status(202).send({user: req.user,message:'User deleted successfully'})
    }catch(e){
        res.status(500).send(e)
    }
})


//login user and return token and details
router.post('/users/login', userController.loginUser);

module.exports = router
