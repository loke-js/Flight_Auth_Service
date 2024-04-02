const validateUserAuth = (req,res,next)=> {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success:false,
            data:{},
            message:'Please provide email and password',
            err: 'Email or password is missing in the signup request'
        });
    }
    next();
}

module.exports ={
    validateUserAuth
}