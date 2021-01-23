const { model, Schema } = require("mongoose");

const User = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email : {
    type: String,
    unique : true
  },
  address: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    unique: true,
  },
  pending: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  request: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ]
});

User.plugin(require("passport-local-mongoose"));

module.exports = model("User", User);