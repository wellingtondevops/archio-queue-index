const mongoose = require("mongoose");
 function connectMongo(){
    mongoose.set("useCreateIndex", true);
    mongoose.connect(
      "mongodb://earchiveTester:cdh0tAYUFJXDMB3t@cluster0-shard-00-00-rr6sx.mongodb.net:27017/earchive?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",
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