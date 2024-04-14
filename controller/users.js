const User=require("../models/user");

module.exports.renderSignUpForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signUp=async(req,res)=>{
    try {
        let {username,email,password}=req.body;
        let newUser=new User({username,email});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.logIn(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wandarlust!");
            res.redirect("/listings");

           })
    } catch (e) {
        req.flash("error",e.message)
        res.redirect("/signup");
    }
}

module.exports.renderLogInForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.logIn=async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl= res.locals.redirectUrl || "/listings" ;
     res.redirect(redirectUrl);
}

module.exports.logOut=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
       req.flash("success","Logged you out!");
       res.redirect("/listings");
    });
}