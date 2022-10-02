const express = require('express');

const router = express.Router();

const  User = require('../model/user');


const passport = require('passport');

const bcrypt = require('bcryptjs');  // bcryptjs is used to hash the password
const { application } = require('express');





router.post('/register', async (req, res) => {





    try {

        // const users = await user.findOne({ email: req.body.email });

        // if (users) {
        //     return res.status(400).send("user already exist");
        // }


      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
     
      //create new user
      const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password:hash,
  
      });
   
      //save user and respond
      console.log("user created");
     const user =  await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.log(err);
    }



    
  });




  router.post('/login', passport.authenticate("jwt") ,async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).send("user not found");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(400).send("invalid password");
        }

        res.status(200).send("login successfull");

    }catch(err){
        res.status(500).json({message:err.message});
        console.log(err);
    }
  })
    

module.exports = router;





