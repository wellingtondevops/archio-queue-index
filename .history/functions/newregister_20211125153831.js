
const mongoose = require("mongoose");
const reduceprodusers = require("../models/reduceprodusers");
const retry = require('../queues/sendRabbitmq');

const {atualDate}= require("./atualDate")



async function  newRegister(iduser,username,company,companyname,sponsor,doct,documentName,archive,page){

let d = atualDate()


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
   
    let ver = await reduceprodusers.find({
        user: iduser,
        company: company,
        doct: doct,
    
      });

      if (datver.length === 0) {
        await document.save()
      }else{
        let queueName = "archiveindex";

        //queue,iduser,sponsor,doct,company,archive,picture

        retry.sendRabbitmqIndex(queueName,iduser,sponsor,doct,company,archive,page)



      }
    
   
   

   console.log("so posso ser chamado uma vez")

   
    
   
}

module.exports = {
    newRegister
   
 }