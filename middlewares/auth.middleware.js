require("dotenv").config();

const jwt = require("jsonwebtoken")

const auth = (req,res,next) => {

    const token = req.headers.auth?.split(" ")[1];

    if(token){
        const decoded = jwt.verify(token, process.env.secret_key,(err,decoded) => {
            if(decoded){
                console.log(decoded)
                next()
            }
            else{
                res.send("Login fisrt please")
            }
        })
    }

    else{
        res.send("Login fisrt please")
    }
};


module.exports = { auth }