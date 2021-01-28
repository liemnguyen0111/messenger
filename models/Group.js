const { model, Schema } = require('mongoose')

const Group = new Schema({
    group : 
    [{
        uuID : { type : Schema.Types.ObjectId, ref : "User"},
        firstName : { type : String, required : true },
        lastName : { type : String, required : true },
        profileImage : { type : String }
    }],
    messages : [
        {
            uuID :  { type : Schema.Types.ObjectId, ref : "User"},
            message : { type : String },
            isRead : { type : Boolean},
            time : { type : Date , default : new Date(Date.now() - 60 * 60 * 7000) }
        }
    ]
},
{
    toJSON : {virtuals : true}
}
)

Group.virtual('last', {
    ref : 'User',
    localField : 'latestMessage',
    foreignField : 'latestMessage'
})
Group.virtual("totalMessages").get(function () {
    return this.messages.length
  })

Group.virtual("latestMessage").get(function () {
    return this.messages[this.messages.length - 1]
})

module.exports = model("Group", Group)