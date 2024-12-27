const User = require("../models/userModel");

module.exports.registerUsers = async (req, res) => {
  try {
    const { name, email, password, address, city, country, phone } = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !city ||
      !country ||
      !phone
    ) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const emailExits = await User.findOne({ email });
    if (emailExits) {
      res.status(500).send({
        success: false,
        message: "Email Id alrady taken",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
      address,
      city,
      country,
      phone,
    });
    res.status(201).send({
      success: true,
      message: "Registration done, Please try to login",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In regisater API",
      error,
    });
  }
};

module.exports.loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(500).send({
        success: false,
        message: "Enter Email Id or Password",
      });
    }

    // Check User
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found !",
      });
    }

    const isMatch = await user.comparePasswords(password);

    if (!isMatch) {
      res.status(404).send({
        success: false,
        message: " Wrong Credentials !",
      });
    }
    const token = user.createToken();
    res.status(200).cookie("token",token,{
      expires:new Date(Date.now()), 
    }).send({
      success: true,
      message: "Successfully Login",
      token,
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in login !",
      error,
    });
  }
};
