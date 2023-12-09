import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from './../utils/generateToken.js';

// @desc    Auth user/set token
// route POST /api/users/authS
// @access public

const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))) {
      generateToken(res, user._id)
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
     } else {
      res.status(401)
      throw new Error('Invalid email or password')
     }

})

// @desc  Register new user
// route POST /api/users/
// @access public

const register = asyncHandler(async(req, res) => {
   const { username, email, password } = req.body;

   if(!username || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
   }

   const userExist = await User.findOne({ email })

   if(userExist) {
    res.status(400);
    throw new Error('User already exist') 
   }

   const user = await User.create({
        username,
        email,
        password
   })

   if(user) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
   } else {
    res.status(400)
    throw new Error('Invalid user data')
   }

})

// @desc   user profile
// route   GET /api/users/profile
// @access private

const userProfile = asyncHandler(async(req, res) => {
  const user = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  }

  res.status(200).json(user)
})

// @desc   update user profile
// route   PUT /api/users/profile
// @access private

const updateProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user.id)

  if(user) {
      user.username = req.body.username || user.username
      user.email = req.body.email || user.email
      user.password = req.body.password || user.password

      if(req.body.password) {
        user.password = req.body.password;
      }

     const updatedUser = await user.save()

     res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
     })

  } else {
    res.status(404)
    throw new Error('User not found')
  }

})

//@desc create tickets
//@route  DELETE/api/ticket:id
//@access  private

const deleteUser = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user._id)

  if (!user) {
      res.status(401)
      throw new Error('User not found')
  }

  await user.deleteOne()
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })

})

// @desc  Logout user
// route POST /api/users/logout
// @access public

const logOut = asyncHandler(async(req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })
 res.status(200).json({message: "User logged out"})
})


export {
    register,
    login,
    userProfile,
    updateProfile,
    logOut,
    deleteUser,
}
