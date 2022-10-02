const passportjwt = require('passport-jwt').Strategy;
const User = require('./model/user');

exports.intializedPassport =(passport)=> {


    passport.use(new passportjwt({
        jwtFromRequest: req => req.cookies.jwt,
        secretOrKey: process.env.JWT_SECRET
    }, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload
                .sub);
            if (!user) {
                return done(null, false);

            }
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    }));

    

    


passport.use(new passportjwt (async (email, password, done) => {
    
try {



    
    const user = await User.findOne({ email: email });

    if (!user) {
        return done(null, false, { message: "user not found" });
    }
    if(user.password !== password){ 
        return done(null,false,{message:"invalid password"});
    }

    return done(null, user);

} catch (error) {
    
    return done(error,false);
}

})
)

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async(id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

  

}; 

