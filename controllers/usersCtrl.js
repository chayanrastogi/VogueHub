import User from '../models/User.js'
import bcrypt from 'bcrypt'

//@desc   Register user
//@route  POST /api/v1/users/register
//@access Private/Admin

export const registerUserCtrl = async (req, res) => {
    const { fullname, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ msg: 'User already exists' });
    }
    
    //hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create user
    const user = await User.create({
         fullname, 
         email, 
         password: hashedPassword,
        });
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: user,
        });

};


//@desc   Login user
//@route  POST /api/v1/users/login
//@access Public

export const loginUserCtrl = async (req, res) => {
    const { email, password } = req.body;
    //Find the user in db
    const userFound = await User.findOne({ email });

    if(userFound && (await bcrypt.compare(password, userFound.password))) {
        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            data: userFound,
        });
    }else{
        res.status(400).json({
            status: 'error',
            message: 'Invalid credentials',
        });
    }
};