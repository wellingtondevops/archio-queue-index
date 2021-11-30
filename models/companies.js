const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 80,
        trim: true
    },
    adress: {
        type: String,
        required: false,
        maxlength: 80,
        trim: true

    },
    province: {
        type: String,
        required: false,
        maxlength: 15,
        trim: true
    },
    city: {
        type: String,
        required: false,
        maxlength: 50,
        trim: true
    },
    fone: {
        type: String,
        required: false,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        unique: false,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true,
        trim: true
    },
    answerable: {
        type: String,
        required: false,
        maxlength: 80,
        trim: true
    },
    typePerson: {
        type: String,
        required: true,
        enum: ['FISICA', 'JURIDICA'],
        trim: true

    },    

    cnpj: {
        type: String,        
        
        required: false,
    },
    cpf: {
        type: String,
        required: false,
        

    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    mailSignup: {
        type: String,
        required: true,
        trim: true
    },
    updateby: {
        
        mailUpdate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:false
        },
        dateUpdate:{
            type:Date,
            required:false
          
        }
    },


})


module.exports = Company = mongoose.model("Company", CompSchema);