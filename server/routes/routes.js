let express = require('express')
let router = express.Router()
let pool = require('../../config/connections')
let models = require('../models/models')
let multer = require('multer')

let photoPath = "I:/iphotoStorage"

var storage = multer.diskStorage({
    destination: function(req, file, next) {
        console.log("photopath: ", photoPath)
        next(null, photoPath);
    },
    filename: function(req, file, next) {
        console.log("photopath: ", photoPath)
        next(null, file.originalname)
    }
})

var upload = multer({storage: storage})

router.post('/uploadmedia', upload.any(), (req, res) => {
    console.log(req.files[0]);
    var video = false
    if(req.files[0]['mimetype'] == "video/quicktime") {
        models.upload({
        originalname: req.files[0]['originalname'],
        filename: `${req.files[0]['filename'].replace(new RegExp(' ', 'g'), '%20').split('.').slice(0, -1).join('.')}`,
        photoOrVideo: `http://192.168.1.86:4012/${req.files[0]['filename'].replace(new RegExp(' ', 'g'), '%20')}`,
        extension: req.files[0]['mimetype'],
        destination: req.files[0]['destination'],
        videoThumbnail: `http://192.168.1.86:4012/${req.files[0]['filename'].replace(new RegExp(' ', 'g'), '%20').split('.').slice(0, -1).join('.')}.png`,
        video: true
    }, (err, results)=>{
        if(err){
            res.send(err)
        } else {
            res.send(results)
        }
    })
    } else {
        models.upload({
        originalname: req.files[0]['originalname'],
        filename: `${req.files[0]['filename'].replace(new RegExp(' ', 'g'), '%20').split('.').slice(0, -1).join('.')}`,
        photoOrVideo: `http://192.168.1.86:4012/${req.files[0]['filename'].replace(new RegExp(' ', 'g'), '%20')}`,
        extension: req.files[0]['mimetype'],
        destination: req.files[0]['destination'],
        videoThumbnail: '',
        video: false
    }, (err, results)=>{
        if(err){
            res.send(err)
        } else {
            res.send(results)
        }
    })
    }
})

router.post('/albummodifier', upload.any(), (req, res) => {
    var video = false
    console.log("BODY: HERE: ", req.body);
        models.modify( req.body, (err, results)=>{
        if(err){
            res.send(err)
        } else {
            res.send(results)
        }
    })
})

router.post('/albumcreate', upload.any(), (req, res) => {
    var video = false
        models.addalbum(req.body, (err, results)=>{
        if(err){
            res.send(err)
        } else {
            res.send(results)
        }
    })
    
})

router.post('/getAlbum', upload.any(), (req, res) => {
    console.log("BODY: ", req.body);
        models.getAlbum(req.body, (err, results)=>{
        if(err){
            res.send(err)
        } else {
            res.send(results)
        }
    })
})

router.get('/getalbums', (req, res) => {
    models.albumGetter((err, results)=>{
        if(err){
            res.send(err)
        } else {
            res.send(results)
        }
    })
})
router.get('/getlatestimports', (req, res) => {
    models.importGetter((err, results)=>{
        if(err){
            res.send(err)
        } else {
            res.send(results)
        }
    })
})
module.exports = router