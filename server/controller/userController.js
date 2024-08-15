import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import EcommerceUserOrder from "../models/cartModel.js";

export const createAccount = async (req, res) => {
  const { name, email, password } = req.body;
  let account;

  try {
    let repeatEmail = await User.findOne({ email });
    if (repeatEmail) {
      res
        .status(409)
        .json({ message: "This email has already been registered" });
      return;
    }
    let hashedPassword = await bcrypt.hash(password, 6);
    account = new User({
      name,
      email,
      password: hashedPassword,
    });

    await account.save();
    res.status(200).json({ message: "Successfully created the account" });
  } catch (error) {
    res.status(500).json({ message: "Error creating the account" });
    console.log(error);
  }
};
export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let repeatEmail = await User.findOne({ email });
    if (repeatEmail) {
      let confirmation = await bcrypt.compare(password, repeatEmail.password);
      if (confirmation) {
        const { password, ...userWithoutPassword } = repeatEmail.toObject();
        const token = jwt.sign(userWithoutPassword, process.env.SECRET_KEY, {
          expiresIn: "24hr",
        });
        res.status(200).json(token);
      } else if (!confirmation) {
        res.status(404).json({ message: "Incorrect Information" });
      }
    } else {
      res.status(404).json({ message: "Incorrect Information" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

export const verifyUser = async (req, res, next) => {
  const authHeaders = req.headers["authorization"];

  const token = authHeaders && authHeaders.split(" ")[1];

  if (!token) {
    res.status(404).json({ message: "You need to login .." });
  }
  jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (error) {
      res.status(404).json({ message: error });
    } else {
      req.body.user = user;
      next();
    }
  });
};
export const postCartOrder = async (req, res) => {
  const {
    firstName,
    lastName,

    address,
    city,
    cartItemss,
    totalPrice,
  } = req.body;

  try {
    let cartItems = new EcommerceUserOrder({
      firstName,
      lastName,

      address,
      city,
      customerId: req.body.user._id,
      items: cartItemss,
      totalPrice,
    });
    await cartItems.save();
    res.status(200).json({ message: "Successfully placed your order" });
  } catch (error) {
    res.status(500).json({ message: "Error placing  your order" });
    console.log(error);
  }
};

export const getUserOrder = async (req, res) => {
  const { _id } = req.body;
  try {
    // Fetch orders for the specified customerId
    let userOrders = await EcommerceUserOrder.find({ customerId: _id });

    if (userOrders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    // Map through the orders to extract items and totalPrice
    const orders = userOrders.map((order) => ({
      items: order.items || [],
      totalPrice: order.totalPrice,
    }));
    console.log(orders);
    // Reslopond with the orders
    res.status(200).json({ orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error retrieving the orders." });
  }
};
export const updateProfile = async (req, res) => {
  const { id, name, email } = req.body;

  // Check if the ID is provided
  if (!id) {
    return res.status(400).send("User ID is required");
  }

  try {
    const updatedProfile = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
      },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).send("User not found");
    }
    if (updatedProfile) {
      const { password, ...userWithoutPassword } = updatedProfile.toObject();
      const token = jwt.sign(userWithoutPassword, process.env.SECRET_KEY, {
        expiresIn: "24hr",
      });

      res.status(200).json(token);
    }
  } catch (error) {
    console.error("Error updating the profile:", error);
    res.status(500).send("Error updating the profile");
  }
};
