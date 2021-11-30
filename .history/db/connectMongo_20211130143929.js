require('dotenv/config')
const mongoose = require("mongoose");
function connectMongo() {
  mongoose.set("useCreateIndex", true);
  mongoose.connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log(`Conected Archio DB e escutando as indexacoes!!...`);
    }
  );
}

module.exports = {
  connectMongo

}