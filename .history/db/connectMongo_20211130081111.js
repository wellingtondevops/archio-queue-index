import 'dotenv/config';
import { set, connect } from "mongoose";
 function connectMongo(){
    set("useCreateIndex", true);
    connect(
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

export default {
    connectMongo
   
 }