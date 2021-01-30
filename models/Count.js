const { model, Schema } = require("mongoose");

const userCount = new Schema({
    count: {type: Schema.Types.ObjectId, ref: 'User'}
})

userCount.virtual("userCount").get(function () {
    return this.request.reduce((acc, item) => {
      return acc += 1
    },0)
  })
  

module.exports = model("userCount", userCount);
