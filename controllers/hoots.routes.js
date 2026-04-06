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


router.get('/:id', async (req,res)=>{
    try{
        const foundHoot = await Hoot.findById(req.params.id).populate('author comments.author')
        res.json(foundHoot)

    }
    catch(err){
        console.log(err)
        res.status(500).json(err)

    }
})



router.put('/:id', verifyToken,async (req,res)=>{
    try{
        // Does this tweet belong to the logged in user
        const foundHoot = await Hoot.findById(req.params.id)

  
        if(!foundHoot.author.equals(req.user._id)){
            return res.status(403).json({err:'Unauthorized upate on this Hoot'})
        }

        const updatedHoot = await Hoot.findByIdAndUpdate(req.params.id,req.body, {new: true})
        res.json(updatedHoot)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)

    }
})



router.delete('/:id', verifyToken,async (req,res)=>{
    try{
        // Does this tweet belong to the logged in user
        const foundHoot = await Hoot.findById(req.params.id)

  
        if(!foundHoot.author.equals(req.user._id)){
            return res.status(403).json({err:'Unauthorized delete on this Hoot'})
        }

        const updatedHoot = await Hoot.findByIdAndDelete(req.params.id)
        res.json(updatedHoot)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)

    }
})


router.post('/:id/comments', verifyToken,async (req,res)=>{
    try{
        const foundHoot = await Hoot.findById(req.params.id)
        .populate('comments.author')
        req.body.author = req.user._id
        foundHoot.comments.push(req.body)
        await foundHoot.save()

        res.json(foundHoot)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)

    }
})


module.exports = router