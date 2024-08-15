import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  address: { type: String, required: true },
  city: { type: String, required: true },
  customerId: { type: String, required: true },
  items: { type: [ItemSchema], required: true },
  totalPrice: { type: String, required: true },
});

const EcommerceUserOrder = mongoose.model("EcommerceUserOrder", UserSchema);

export default EcommerceUserOrder;
