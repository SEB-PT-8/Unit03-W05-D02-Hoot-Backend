const router = require('express').Router()
const Hoot = require('../models/Hoot')
const verifyToken = require('../middleware/verify-token')

// To create a new hoot we HAVE to be signed in
router.post('/', verifyToken ,async (req,res)=>{
    try{
        console.log(req.user)
        req.body.author = req.user._id
        const createdHoot = await Hoot.create(req.body)
        res.status(201).json(createdHoot)

    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/', async (req,res)=>{
    try{
        const allHoots = await Hoot.find().populate('author')
        res.json(allHoots)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)

    }
})


module.exports = router