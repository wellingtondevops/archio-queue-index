
const mongoose = require("mongoose");
const reduceprodusers = require("../models/reduceprodusers");
const Pictures = require("../models/pictures");
const Users = require("../models/users")
const Docts = require("../models/docts")
const Companies = require("../models/companies")
const { atualDate } = require("./atualDate")




async function sumDay(chek, page) {

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

  let idchek = chek
    .map((el) => {
      return el._id;
    })
    .toString();



  await reduceprodusers.updateOne(
    {
      _id: idchek,
      "totalPageArchiveDocument.dateref": d,
    },
    {
      $set: {
        "totalPageArchiveDocument.$.total": page + targetPage.total,
      },
    }
  )
    await reduceprodusers.updateOne(
      {
        _id: idchek,
        "aggregateDateArchives.dateref": d,
      },
      {
        $set: {
          "aggregateDateArchives.$.total": 1+ targetArchive.total,
        },
      }
    )
    console.log("atualizado dia")
  
}

module.exports = {
  sumDay
}