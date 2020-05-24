const express = require('express');
const router = new express.Router()
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

//update user
router.patch('/users/me',auth, userController.updateUser);

//deleting user
router.delete('/users/:id',auth, userController.deleteUser );


//login user and return token and details
router.post('/users/login', userController.loginUser);

module.exports = router
