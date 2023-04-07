const express = require('express');
const router = express.Router();
const User = require('../models/userModel')

/* GET users listing. */
router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200).send({
      success: true,
      data: users
    });
    
  } catch (error) {
    console.log(error);
  }

});

router.post('/user', async (req, res, next) => {
  const {name, email} =req.body
  try {
    const newUser = await User.create({
      name, email
    })
  
    res.status(200).send({
      success: true,
      data: newUser
    });

  } catch (error) {
    console.log(error)
  }
});

router.post('/')
module.exports = router;
