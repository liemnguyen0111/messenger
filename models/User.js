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
    default: "N/A",
  },
  username: {
    type: String,
    unique: true,
  },
  friends : [
    {
      type : Schema.Types.ObjectId,
      ref : "User"
    }
  ],
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
  ],
  group : [{
    type : Schema.Types.ObjectId,
    ref : "Group"
  }],
  image : {
    type : String,
    default : '../images/defaultUser.jpg'
  },
  createdOn: { type : String , default : new Date(Date.now())},
  updatedOn : { type : String , default : new Date(Date.now())},
  loggedInRecord : [
    {
      from : { type : Object },
      date : { type : String , default : new Date(Date.now())}
    }
  ]
},
{
    toJSON : {virtuals : true}
}
);

User.virtual("pendingCount").get(function () {
  if(this.pending)
  return this.pending.reduce((acc, item) => {
    return acc += 1
  },0)
})

User.virtual("requestCount").get(function () {
  if(this.request) 
  return this.request.reduce((acc, item) => {
    return acc += 1
  },0)
})


User.plugin(require("passport-local-mongoose"));

module.exports = model("User", User);
