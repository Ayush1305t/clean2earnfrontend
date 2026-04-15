const mongoose = require("mongoose");
const connectdb = async () => {
  await mongoose.connect(process.env.db_url)
    .then(() => console.log("mongodb is  Connected"))
    .catch(err => console.log("error aagaya h:", err));
}
module.exports=connectdb;