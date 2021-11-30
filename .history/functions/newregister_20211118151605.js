
const mongoose = require("mongoose");
const reduceprodusers = require("../models/reduceprodusers");

const {atualDate}= require("./atualDate")



function  newRegister(iduser,username,company,companyname,sponsor,doct,documentName,page){

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
    
   
    document.save()

   
    
   
}

module.exports = {
    newRegister
   
 }