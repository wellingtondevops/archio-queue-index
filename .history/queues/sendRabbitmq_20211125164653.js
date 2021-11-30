const amqp = require("amqplib/callback_api");
// import { environment } from '../common/environment'
// const connectionAmqp = environment.urlamqp.amqpurl


const sendRabbitmqIndex = async(queue,iduser,sponsor,doct,company,archive,picture) => {

    amqp.connect(`amqp://archio:archio@localhost:5672`, (err, connection) => {
        if (err) {
          throw err;
        }
   
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
          
          let message = data
          let queueName = queue
  
          channel.assertQueue(queueName, {
            durable: false
          })
          channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)))
         
        })
      })    
  };


  export {sendRabbitmqIndex}