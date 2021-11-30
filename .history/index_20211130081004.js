const mongoose = require("mongoose");
const amqp = require("amqplib/callback_api");
const reduceprodusers = require("./models/reduceprodusers");
const Pictures = require("./models/pictures");
const Users = require("./models/users");
const Docts = require("./models/docts");
const Companies = require("./models/companies");
const { json } = require("express");
const { newRegister } = require("./functions/newregister");
const { sumDay } = require("./functions/sumDay");
const { updateDay } = require("./functions/updateDay")
const { atualDate } = require("./functions/atualDate")
const { connectMongo } = require("./db/connectMongo")
const { sendRabbitmqIndex } = require('./queues/sendRabbitmq');




connectMongo()
amqp.connect(process.env.RABBITMQ_URL, (err, connection) => {


  if (err) {
    throw err;
  }
  console.log("fila")

  connection.createChannel((err, channel) => {
    let queueName = "archiveindex";
    channel.prefetch(1)
    channel.assertQueue(queueName, {



      durable: false,
    });
    channel.consume(
      queueName,
      async (msg) => {
        
        let data = JSON.parse(msg.content.toString());

        // channel.ack(msg)
        // channel.close()
        // console.log(msg.fields.deliveryTag) /// vai ser aqui
        
        const { iduser, sponsor, doct, company,archive ,picture } = data;
        console.log(data)
        let pic = await Pictures.find({ _id: picture });
        let page = pic.map((el) => {
          return el.page;
        });
        page = parseInt(page);
        let user = await Users.find({ _id: iduser });
        let username = user
          .map((el) => {
            return el.name;
          })
          .toString();
        let doc = await Docts.find({ _id: doct });
        let documentName = doc
          .map((el) => {
            return el.name;
          })
          .toString();
        let cp = await Companies.find({ _id: company });
        let companyname = cp
          .map((el) => {
            return el.name;
          })
          .toString();
        let datver = await reduceprodusers.find({
          user: iduser,
          company: company,
          doct: doct,
        });

        if (datver.length === 0) {

          try {
            await newRegister(
              iduser,
              username,
              company,
              companyname,
              sponsor,
              doct,
              documentName,
              archive,
              page
            );
              
          } catch (error) {
           

       
          
            // sendRabbitmqIndex(queueName,iduser,sponsor,doct,company,archive,pic.id)
    
            
            console.log(`Erro ao salvar um novo dado para o usuario ${username}`, error)
            

          }

        } else {

          let chek = await reduceprodusers.find({
            user: iduser,
            company: company,
            doct: doct,
            "totalPageArchiveDocument.dateref": {
              $in: [atualDate()],
            },
          });

          if (chek.length === 0) {

            try {
              await updateDa(iduser, company, doct, page)
            } catch (error) {
              // sendRabbitmqIndex(queueName,iduser,sponsor,doct,company,archive,picture)
              console.log(`Erro ao salvar em um novo dia o usuario ${username}`, error)
              

            }


          } else {
            try {
              await sumDay(chek, page)


            } catch (error) {
              

              // sendRabbitmqIndex(queueName,iduser,sponsor,doct,company,archive,picture)
    
              console.log(`Erro ao atualizar o dia para o usuario ${username}`, error)
            }

          }
        }
        channel.ack(msg)
        
      },


      // { noAck: true }
    );


  });
});
