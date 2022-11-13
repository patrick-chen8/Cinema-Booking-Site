/**
 *  Defining the CRUD functions that will be called in routes/users.js 
 */
// importing model
 const User = require("../models/users");
 const Token = require("../models/token");
 const sendEmail = require("../utils/sendEmail");

// export createUser function
exports.createUser = async (req, res) => {
    let email = req.body.email;
    let user = await User.findOne({ email });
    if (user) {
        return res.json({ message: "Email already in use", status: 400 });
    }
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        number: req.body.number,
        status: req.body.status,
        rememberMe: req.body.rememberMe,
        promo: req.body.promo,
    })
    try {
        await newUser.save();

        let user = await User.findOne({ email });
        const token = await new Token({
            userId: user._id,
            userEmail: user.email,
            token: Math.floor(1000 + Math.random() * 8999)
        }).save()
        //creates a url using the user id and token string
        const url = "localhost:3000/createconfirmation";
            
        //sends an email with the verification url
        try {
            await sendEmail(user.email, "Verification Code", `Please enter the verifcation code\n${token.token}\nat the following link:\n${url}`);
            return res.json({message: "A verification email has been sent to your account"});
        } catch (e) {
            console.log(e)
            return res.json({message: "A verification email could not be sent", status: 404})
        }

        //return res.json(newUser);

    } catch (e) {
        console.log(e);
        return res.json(e)
    }
};

// export login function
exports.login = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.json({ message: "Incomplete Request", status: 400 });
    }
    console.log(password)
    let user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: "Email not found", status: 404 });
    }
    user.comparePassword(password, async function(matchError, isMatch) {
        if (matchError) {
            return res.json({ message: "Error", status: 404 });
        } else if (!isMatch) {
            return res.json({ message: "Incorrect Password", status: 404 });
        } else {
            return res.json(user);
        }
    });
}

// export updateInfo function
exports.updateInfo = async (req, res) => {
    let email = req.body.email;
    let updatedInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        number: req.body.number,
        promo: req.body.promo
    }
    try {
        let user = await User.findOneAndUpdate(email, updatedInfo);
        return res.json(user);
    } catch (e) {
        console.log(e);
        return res.json(e);
    }
    
}

// export updatePassword function
exports.updatePassword = async (req, res) => {
    let { email, password, updatedPassword } = req.body;
    let user = await User.findOne({ email });
    user.comparePassword(password, async function(matchError, isMatch) {
        if (matchError) {
            return res.json({ message: "Error", status: 404 });
        } else if (!isMatch) {
            return res.json({ message: "Incorrect Password", status: 404 });
        } else if (isMatch) {
            user.password = updatedPassword;
            await user.save();
            return res.json(user);
        }
    });
}

//exports promoEmail function
exports.promoEmail = async (req, res) => {
    //finds users who want promotional emails and puts them in an array
    const promoList = [];
    const cursor = User.find({promo: true});
    const results = await cursor.toArray();

    //pushes all the users emails into an array
    if (results.length > 0) {
        results.forEach((result, i) => { 
            promoList.push(result.email);
        });
    } else {
        console.log("No users found");
    }

    //sends each email in the array a promotional email
    if (promoList.length > 0) {
        promoList.forEach(async (result) => {
            try {
                await sendEmail(result.email, "Promotional Email", "Check out our new movie promotion!");
                console.log(`Promotional email successfully sent to ${result.email}`);
            } catch (e) {
                console.log(`Promotional email could not be sent to ${result.email}`);
            }
        })
    }
}

//exports promoEmail function
exports.promoEmail = async (req, res) => {
    //finds users who want promotional emails and puts them in an array
    const promoList = [];
    const cursor = User.find({promo: true});
    const results = await cursor.toArray();

    //pushes all the users emails into an array
    if (results.length > 0) {
        results.forEach((result, i) => { 
            promoList.push(result.email);
        });
    } else {
        console.log("No users found");
    }

    //sends each email in the array a promotional email
    if (promoList.length > 0) {
        promoList.forEach(async (result) => {
            try {
                await sendEmail(result.email, "Promotional Email", "Check out our new movie promotion!");
                console.log(`Promotional email successfully sent to ${result.email}`);
            } catch (e) {
                console.log(`Promotional email could not be sent to ${result.email}`);
            }
        })
    }
}