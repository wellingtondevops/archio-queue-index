const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReduceProdUserSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    companyname: {
        type: String
    },
    mailSignup: {
        type: String
    },
    doct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doct'
    },
    documentName: {
        type: String
    },

    totalPageArchiveDocument: [
        {
            dateref: {
                type: String
            },
            dateOcorr: {
                type: Date
            },
            total: {
                type: Number
            }
        }
    ],
    aggregateDateArchives: [
        {
            dateref: {
                type: String
            },
            dateOcorr: {
                type: Date
            },
            total: {
                type: Number,
                defaul: 0
            }
        }
    ],


});

module.exports = ReduceProdUsers = mongoose.model("reduceprodusers", ReduceProdUserSchema);