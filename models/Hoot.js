const mongoose = require('mongoose')


// comment Schema
const commentSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }


})

// Schema
const hootSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum: ['News', 'Sports', 'Games', 'Movies', 'Music', 'Television'],
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments:[commentSchema]
},
{timestamps:true})


// model
const Hoot = mongoose.model('Hoot',hootSchema)


// export the model
module.exports = Hoot