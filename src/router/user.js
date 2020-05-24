const express = require('express');
const router = new express.Router()
const User = require('../model/User')
const auth = require('../middleware/auth')
const userController = require('../controllers/UserController.js')

//save user
router.post('/users', userController.saveUser);


//get all users
router.get('/users',auth, userController.getAllUsers );





router.get('/users/logout', auth, async (req, res)=>{

    try{

        req.user.tokens = req.user.tokens.filter((tokenObj)=>{
            return tokenObj.token !== req.token
        })

       
         req.user.save();

        res.status(200).send({message: 'User logged out'})

    }catch(e){
        res.status(500).send({error: 'Oops an error occured'})
    }

})


//logout user from all sesssions

router.get('/users/logoutAll', auth, async (req,res)=>{

    try{
        req.user.tokens = []

         req.user.save()
         res.status(200).send({message: 'logged out from all sessions'})

    }catch(e){

        res.status(417).send({error: 'Expectation failed'})
    }
})


router.get('/users/:id',async (req,res)=>{
    const _id = req.params.id;
    try {
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send("User does not exist")
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/users/me',auth, async (req, res)=>{

    const updates = Object.keys(req.body)
    const allowedParams = ['name','email','role','password']
    const isValid = updates.every((update)=> allowedParams.includes(update))

    if(!isValid){
        return res.status(403).send({"error": "Invalid parameters"})
    }
    try {
      
        const user = req.user
        updates.forEach(update => user[update] = req.body[update] );

        user.save()

        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
   
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



router.post('/users/login', async (req, res)=> {
    const email = req.body.email
    const password = req.body.password

    try {
        const user = await User.findByCredentials(email, password)
        const token = await user.generateUserToken();
        res.status(302).send({user, token});

    }catch(e) {
     
        res.status(400).send({error: 'User not found'})
    }
})

module.exports = router
