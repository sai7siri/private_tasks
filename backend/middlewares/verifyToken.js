const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticated = async (req, res, next) => {
  try {
    
    const token = req.header("authorization");

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "you are not authenticated" });
    }

   jwt.verify(token , process.env.JWT_KEY, (err , validUser)=>{
      if(err){
       return res
       .status(400)
       .json({ success: false, message: "token is not valid" });
      }
        
         req.validUser = validUser;
         next();
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};


module.exports= {authenticated}