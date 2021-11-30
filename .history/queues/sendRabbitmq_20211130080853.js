require('dotenv/config')
const amqp = require("amqplib/callback_api");
// import { environment } from '../common/environment'
const connectionAmqp = 'amqp://archio:archio@localhost:5672'

async function  sendRabbitmqIndex(iduser,sponsor,doct,company,archive,picture){


    amqp.connect(connectionAmqp, (err, connection) => {
        if (err) {
          throw err;
        }
        console.log("conectado")
        connection.createChannel((err, channel) => {
          if (err) {
            throw err;
          } 
          
          let data = {
            iduser: iduser,
            sponsor: sponsor,
            doct:doct,
            company:company,
            archive:archive,
            picture:picture
            

          }

          console.log(data)
          
          let message = data
          let queueName = queue
  
          channel.assertQueue(queueName, {
            durable: false
          })
          channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)))
          
     
          setTimeout(() => {
            connection.createChannel(() => { })
          }, 1000)
  
  
        })
      })    
  };

  module.exports = {
    sendRabbitmqIndex
   
 }