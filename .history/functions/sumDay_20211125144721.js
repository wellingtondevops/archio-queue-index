
const mongoose = require("mongoose");
const reduceprodusers = require("../models/reduceprodusers");
const Pictures = require("../models/pictures");
const Users = require("../models/users")
const Docts = require("../models/docts")
const Companies = require("../models/companies")
const {atualDate}= require("./atualDate")




 function  sumDay(chek,page) {

let d = atualDate()




 let totalPageArchiveDocuments = chek
.map((el) => {
  return el.totalPageArchiveDocument;
})
.pop();


var targetPage = totalPageArchiveDocuments
.filter(function (totalPageArchiveDocument) {
  return totalPageArchiveDocument.dateref == d;
})
.pop();

let aggregateDateArchives = chek
.map((el) => {
  return el.aggregateDateArchives;
})
.pop();
var targetArchive = aggregateDateArchives
.filter(function (aggregateDateArchive) {
  return aggregateDateArchive.dateref == d;
})
.pop();

let idchek =  chek
.map((el) => {
  return el._id;
})
.toString();



 reduceprodusers.updateOne(
    {
      _id: idchek,
      "totalPageArchiveDocument.dateref": d,
    },
    {
      $set: {
        "totalPageArchiveDocument.$.total": page + targetPage.total,
      },
    }
  );
    reduceprodusers.updateOne(
    {
      _id: idchek,
      "aggregateDateArchives.dateref": d,
    },
    {
      $set: {
        "aggregateDateArchives.$.total": page + targetArchive.total,
      },
    }
  );
 
    
   
}

module.exports = {
    sumDay
   
 }