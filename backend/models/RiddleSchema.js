const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RiddleSchema = new Schema({
    id:{
        type:String,
        required:true
    },
    qs:{
        type:String,
        required:true
    },

    ans:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('RiddleQuestion',RiddleSchema)
