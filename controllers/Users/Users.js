// import userModel from "../../models/Users/Users.js";
const userModel = require("../../models/Users/Users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

//login user
exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message:"User Doesn't Exist!"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success:false, message:"Invalid Credentials"})
        }

        const token = createToken(user._id);
        res.json({success: true, token});
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"});
    }
};

//create token
const createToken= (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//register user
exports.registerUser = async (req, res) => {
    const {name, password, email , phone} = req.body;
    try {
        //checking if user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false, message: "User Already Exists!"})
        }

        //validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message: "Please enter a valid email!"})
        }

        if(password.length<8){
            return res.json({success:false, message: "Please enter a strong password!"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
                name: name,
                email: email,
                password: hashedPassword,
                phone: phone
            })
        const user = await newUser.save();    
        const token = createToken(user._id);
        res.json({success:true, token});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
};

exports.getUserProfile = async (req, res) => {
    const { id } = req.user; // Assuming the user ID is attached to req.user by middleware
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

exports.updateUserProfile = async (req, res) => {
    const { id } = req.user; // User ID from middleware
    const { name, phone, email } = req.body;
  
    try {
      // Find user
      const user = await userModel.findById(id);
      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }
  
      // Check if email is being updated and is unique
      if (email && email !== user.email) {
        const emailExists = await userModel.findOne({ email });
        if (emailExists) {
          return res.json({ success: false, message: "Email already in use" });
        }
      }
  
      // Prepare update object
      const updates = { name, phone, email };
  
      // Update password if provided
    //   if (password) {
    //     const salt = await bcrypt.genSalt(10);
    //     const hashedPassword = await bcrypt.hash(password, salt);
    //     updates.password = hashedPassword;
    //   }
  
      // Perform the update
      const updatedUser = await userModel.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedUser) {
        return res.json({ success: false, message: "Error updating user" });
      }
  
      res.json({ success: true, user: updatedUser });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };

  exports.updateUserAddress = async (req, res) => {
    const { id } = req.user; // User ID from middleware
    const { address, country, state, city, pincode, orderNotes } = req.body;
  
    try {
      // Find user
      const user = await userModel.findById(id);
      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }
  
      // Prepare address update object
      const updates = { address, country, state, city, pincode, orderNotes };
  
      // Perform the update
      const updatedUser = await userModel.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedUser) {
        return res.json({ success: false, message: "Error updating address" });
      }
  
      res.json({ success: true, user: updatedUser });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };

  exports.changeUserPassword = async (req, res) => {
    const { id } = req.user; // User ID from middleware
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
  
    try {
      // Find user
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Check if current password matches
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Current password is incorrect" });
      }
  
      // Check if new passwords match
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ success: false, message: "New passwords do not match" });
      }
  
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
  
      // Save updated user
      await user.save();
  
      res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
// export { loginUser, registerUser };

exports.listAllUsers = async (req, res) => {
  try {
      const users = await userModel.find();
      res.json({ success: true, users });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error fetching users" });
  }
};

exports.updateAllUserValues = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, country, state, city, pincode, orderNotes, password } = req.body;

  try {
      // Find user
      const user = await userModel.findById(id);
      if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      // Check if email is being updated and is unique
      if (email && email !== user.email) {
          const emailExists = await userModel.findOne({ email });
          if (emailExists) {
              return res.status(400).json({ success: false, message: "Email already in use" });
          }
      }

      // Hash new password if provided
      if (password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
      }

      // Update user fields
      user.name = name || user.name;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.address = address || user.address;
      user.country = country || user.country;
      user.state = state || user.state;
      user.city = city || user.city;
      user.pincode = pincode || user.pincode;
      user.orderNotes = orderNotes || user.orderNotes;

      // Save updated user
      const updatedUser = await user.save();

      res.json({ success: true, user: updatedUser });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error updating user" });
  }
};


// controllers/Users/Users.js


exports.listUsersByParams = async (req, res) => {
  try {
    let { skip, per_page, sorton, sortdir, match, IsActive } = req.body;

    let query = [
      // {
      //   $match: { IsActive: IsActive },
      // },
      {
        $facet: {
          stage1: [
            {
              $group: {
                _id: null,
                count: {
                  $sum: 1,
                },
              },
            },
          ],
          stage2: [
            {
              $skip: skip,
            },
            {
              $limit: per_page,
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$stage1",
        },
      },
      {
        $project: {
          count: "$stage1.count",
          data: "$stage2",
        },
      },
    ];

    if (match) {
      query = [
        {
          $match: {
            $or: [
              { name: { $regex: match, $options: "i" } },
              { email: { $regex: match, $options: "i" } },
              { phone: { $regex: match, $options: "i" } },
            ],
          },
        },
      ].concat(query);
    }

    let sort = {};
    sort[sorton] = sortdir === "desc" ? -1 : 1;

    query = [{ $sort: sort }].concat(query);

    const list = await userModel.aggregate(query);

    res.json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};


exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the user by ID
    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id }).exec();
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};