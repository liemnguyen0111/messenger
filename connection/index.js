
module.exports = require("mongoose").connect(
    "mongodb+srv://Summer0912:Summer0912@cluster0.2t6cg.mongodb.net/<dbname>?retryWrites=true&w=majority" ,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,useCreateIndex : true }
  );