
const mongoose = require("mongoose");
const reduceprodusers = require("../models/reduceprodusers");
const Pictures = require("../models/pictures");
const Users = require("../models/users")
const Docts = require("../models/docts")
const Companies = require("../models/companies")
const {atualDate}= require("./atualDate")



async function  updateDay(iduser,company,doct,page){

    let d =await atualDate()
   
await reduceprodusers.updateOne({
    user: iduser,
    company: company,
    doct: doct,
}, {
    $addToSet: {
        totalPageArchiveDocument: [
            {
                dateref: d.toString(),
                dateOcorr: Date.now(),
                total: page
            }
        ],
        aggregateDateArchives: [
          {
              dateref: d.toString(),
              dateOcorr: Date.now(),
              total: 1
          }
      ]
    }

})


    
   
}

module.exports = {
    updateDay
   
 }