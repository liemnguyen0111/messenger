const { model, Schema } = require('mongoose')

const Messages = new Schema({
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

Messages.virtual("totalMessages").get(function () {
    return this.messages.length
  })

module.exports = model("Messages", Messages)