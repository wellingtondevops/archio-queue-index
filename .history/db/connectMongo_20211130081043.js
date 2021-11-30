const mongoose = require("mongoose");
 function connectMongo(){
    mongoose.set("useCreateIndex", true);
    mongoose.connect(
     process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log(`Conected Archio DB e aguardando tarefas quero...`);
      }
    );
}

module.exports = {
    connectMongo
   
 }