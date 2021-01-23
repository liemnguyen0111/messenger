
module.exports = require("mongoose").connect(
    process.env.MONGODB_URI || process.env.MONGODB_LOCAL,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,useCreateIndex : true }
  );