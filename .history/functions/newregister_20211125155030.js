
const mongoose = require("mongoose");
const reduceprodusers = require("../models/reduceprodusers");
const { sendRabbitmqIndex } = require('../queues/sendRabbitmq');

const {atualDate}= require("./atualDate")



async function  newRegister(iduser,username,company,companyname,sponsor,doct,documentName,archive,page){

let d = atualDate()


    
   
    let ver = await reduceprodusers.find({
        user: iduser,
        company: company,
        doct: doct,
    
      });
      console.log(ver.length)

      if (ver.length === 0) {
        let document = new reduceprodusers({
            user: iduser,
            username:username,
            company: company,
            companyname:companyname,
            mailSignup: sponsor,
            doct: doct,
            documentName:documentName,
            totalPageArchiveDocument: [
                {
                    dateref:d.toString(),
                    dateOcorr: Date.now(),
                    total: page
                }
            ],
            aggregateDateArchives: [
                {
                    dateref:d.toString(),
                    dateOcorr: Date.now(),
                    total: 1
                }
            ]
    
        })
        await document.save()
        console.log("so posso ser chamado uma vez")
      }else{
        let queueName = "archiveindex";

       
        sendRabbitmqIndex(queueName,iduser,sponsor,doct,company,archive,page)



      }
    
   
   



   
    
   
}

module.exports = {
    newRegister
   
 }