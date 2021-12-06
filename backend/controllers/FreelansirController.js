const Freelancer = require ('../models/F_Schema')
const ProposalSchema = require('../models/ProposalSchema');
const {OAuth2Client} = require('google-auth-library')
const jwt = require('jsonwebtoken');
const { eventNames } = require('../models/F_Schema');
const client = new OAuth2Client(process.env.GOOGLELINK)
require('dotenv').config()

const FrelansirProfile = async(req,res,next)=> {
    const fid = req.params.fid;
    let freelancer;
    
    try{
        freelancer = await Freelancer.findById(fid);
        
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            "message":"could not complete your request"
        })
        return next(err)
    }
    if(!freelancer){
        const error = res.status(400).json({
            "message":"could not complete your request"
        })
        return next(err)
    }
    res.json({freelancer:freelancer})
}



const FrelansirSignup = async(req,res,next) => {

    const { fullname,email,password,skillbasket,passion,description } = req.body;
    

    const newfreelancer = new Freelancer({
        fullname,
        email,
        password,
        skillbasket,
        passion,
        description
    })
    try{
        await newfreelancer.save()
        res.status(201).json({
            details:newfreelancer
        })
    }
    catch(e){
        res.status(400).json({
           "message":"could not complete your request"
       })
       return next(e)
    }
    
}


const FrelansirSignin = (req,res,next)=> {



    
    return res.send("Signin is a good idea for ya!");
}



const FrelansirDashboard = (req,res,next)=> { 
    return res.send("Keep Looking");
}

const loginorsignup = (req,res,next) => {
    const {tokenId }= req.body;
    client.verifyIdToken({idToken : tokenId, audience : process.env.GOOGLELINK}).then(response => {
        const {email,email_verified,name,} = response.payload
        if(email_verified){
            Freelancer.findOne({email:email}).exec((err, user) => {

               if(err){
                   console.log(err)
                   res.status(400).json({
                       "msg" : "Something went wrong"
                   })
               }
               else{
                    if(user){

                        const token = jwt.sign({
                        id:user._id
                        },
                        process.env.JWT_TOKEN,
                        {expiresIn:'10d'})

                        const { _id, name, email} = user

                        res.json({
                        token,
                        "msg":"Loogen In"
                        })
                    }

                   else{
                        let newUser = new Freelancer({name,email});
                        newUser.save((err,data) => {

                        if(err){
                            console.log(err)

                            res.status(400).json({
                                "msg" : "Something went wrong"
                            })
                        }  
                        else{
                            const token = jwt.sign({
                                id:user._id
                            },
                            'Abba Nahi Maanenge',
                             {expiresIn:'10d'})
                            const { _id, name, email} = data
                            res.json({
                                token,
                                "msg":"Loogen In"
                            })
                        } 
                    })
                   }
               } 
            })
        }
    })
}


exports.FrelansirProfile = FrelansirProfile;
exports.FrelansirSignup= FrelansirSignup
exports.FrelansirSignin = FrelansirSignin
exports.FrelansirDashboard = FrelansirDashboard;
exports.loginorsignup = loginorsignup;