const { model, Schema } = require('mongoose')

const Group = new Schema({
    group : 
    [{
        uuID : { type : Schema.Types.ObjectId, ref : "User"},
        nickName : { type : String, required : true },
        profileImage : { type : String }
    }],
    messages : [
        {
            message : { type : String },
            time : { type : Date , default : new Date(Date.now() - 60 * 60 * 7000) }
        }
    ]
},
{
    toJSON : {virtuals : true}
}
)

Group.virtual("totalMessages").get(function () {
    return this.messages.length
  })

Group.virtual("lastestMessage").get(function () {
    return this.messages[this.messages.length - 1]
})

module.exports = model("Group", Group)