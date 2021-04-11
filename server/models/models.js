let pool = require('../../config/connections')
let fs = require('fs')
let spawn = require('child_process').spawn
// const { delete } = require('../routes/routes')

let routeFunctions = {
    albumGetter: (callback) => {
        pool.query(`SELECT * FROM albums`, (err, res) => {
                // console.log(res); 
                i = 0 
                var photoOp = []
                function grabAlbum(o) {
                    return new Promise((res, rej) => {
                      pool.query(`SELECT * FROM photos WHERE associatedAlbumId = '${o['id']}'`, (e ,r) => {
                        o['photos'] = r
                        // console.log(o);
                        photoOp.push(o)
                        res(o)
                        rej(e)
                        })
                            // console.log(result);
                        }).then((result) => { 
                            
                            if(i == res.length) {
                                
                                // console.log("hi");
                                callback(photoOp)
                            }
                            counter()
                    })
                }
                function counter() {
                    if(i != res.length) {
                      console.log(res[i], i);
                      grabAlbum(res[i])
                      i++
                    } 
                    if(res.length == undefined) {
                        console.log("MySQL not started. Open MAMP!");
                    }
                }
            counter()
        })
    },
    upload: (itms, callback) =>{
        console.log("Item list here: ", itms);
        
        if(itms['extension'] == "video/quicktime") {
            // fs.mkdirSync(`H:/iphotoStorage/${itms['filename']}`)
            // ffmpeg -ss 600 -i input.mp4 -vframes 1 -s 420x270 -filter:v 'yadif' output.png
            var newProc = spawn('D:/ffmpeg', [
                '-ss', `0`,
                '-i', `${itms['destination'] +"/"+ itms['originalname']}`,
                '-vframes', 
                '1', 
                '-s',
                '420x270',
                `I:/iphotostorage/${itms['filename']}.png`,
              ])
              newProc.on('error', function (err) {
                // console.log('ls error', err);
              });
              
              newProc.stdout.on('data', function (data) {
                //   console.log('stdout: ' + data);
              });
              
              newProc.stderr.on('data', function (data) {
                //   console.log('stderr: ' + data);
              });
              
              newProc.on('close', function (code) {
                //   console.log('child process exited with code ' + code);
              });
        }
        
        pool.query(`INSERT INTO latestimports SET ?`, itms, (err, res)=>{
            // pool.query(`SELECT * FROM latestimports`, (e, r) => {
                console.log(err, res);
                // callback(err, res)
            // })
        })
        itms['albumName'] = ''
        pool.query(`INSERT INTO photos SET ?`, itms, (err, res)=>{
            // pool.query(`SELECT * FROM latestimports`, (e, r) => {
                console.log(err, res);
                callback(err, res)
            // })
        })
    },
    modify: (itm, callback) => {
        // console.log("Itm here: ", itm);
        var i = 0
        
        function called() {
            console.log("UPLOAD: ", itm);
            var restructure = {
                photoOrVideo: itm[i]['photoOrVideo'],
                extension: itm[i]['extension'],
                originalname: itm[i]['originalname'],
                destination: itm[i]['destination'],
                videoThumbnail: itm[i]['videoThumbnail'],
                filename: itm[i]['filename'],
                video: itm[i]['video'],
                albumName: itm[i]['albumName']
            }
            var rowPackets = {}
            pool.query(`SELECT * FROM photos WHERE photoOrVideo = '${restructure['photoOrVideo']}' AND albumName = '${restructure['albumName']}'`, (err, res) => {
                // console.log(err, res);
                
                if(res.length == 0) {
                    pool.query(`INSERT INTO photos SET ?`, restructure, (err, res) => {
                        console.log(err, res);
                        rowPackets = {
                            error: err,
                            response: res
                        }
                    })
                }
            })  
            console.log(i + 1, itm.length);
            if(i + 1 != itm.length) {
                i++
                
                called()
            }else {
                callback(rowPackets)
            }
        }
        called()
    },
    importGetter: (callback) => {
        pool.query(`SELECT * FROM latestimports`, (err, res) => {
            callback(err, res)
        })
    },
    getallphotos: (callback) => {
        pool.query(`SELECT * FROM photos WHERE albumName = ''`, (err, res) => {
            callback(err, res)
        })
    },
    getAlbum: (itm, callback) => {
        console.log(itm);
        pool.query(`SELECT * FROM photos WHERE albumName = '${itm['album']}'`,(err, res) =>{
            console.log(err, res);
            callback(err, res)
        })
    },
    trashGetter: (callback) => {
        pool.query(`SELECT * FROM trash`, (err, res) => {
            console.log(err, res);
            callback(err, res)
        })
    },
    emptyTrash: (itm, callback) => {
        console.log(itm.length);
        pool.query(`DELETE FROM photos WHERE albumName = 'Trash'`, (err, res) => {
            console.log(err, res);
            // callback(err, res)
        })
        for(var i = 0; i < itm.length; i++) {
            pool.query(`DELETE FROM latestimports WHERE originalname = '${itm[i]['originalname']}'`, (err, res) => {
                console.log(err, res);
                if(i + 1 == itm.length) {
                    callback(err, res)
                }
            })
        }
    },
    truncateImportable: (callback) => {
        pool.query(`TRUNCATE latestImports`, (err, res) => {
            callback(err, res);
        })
    },
    addalbum: (itm, callback)=>{
        console.log(itm);
        pool.query("INSERT INTO albums SET ?", itm, (err, res)=>{
            pool.query(`SELECT * FROM albums`, (error, response) => {
                console.log(error, response);
                callback(error, response)
            })
        })
    },
    trashdump: (itm, callback) => {
        console.log("ITM: ", itm);
        for(var i = 0; i < itm.length; i++) {
            console.log(itm[0]['originalname'], itm.length);
            pool.query(`INSERT INTO trash SET ?`, itm[i], (err, res) => {
                console.log("dump");
                console.log(err, res);
            })
            pool.query(`DELETE FROM photos WHERE originalname = '${itm[i]['originalname']}'`, (error, response) => {
                console.log("Response Delete", error, response);
                // callback(error, "deleted")
            })
            if(i + 1 == itm.length) {
                callback("err", "deleted")
            }
        }
    },
    undo: (selection, callback) => {
        for(var i = 0; i < selection.length; i++) {
            pool.query(`INSERT INTO photos SET ?`, selection[i], (err, res) => {
                console.log(err, res);
            })
            pool.query(`DELETE FROM trash WHERE originalname = '${selection[i]['originalname']}'`, (error, response) => {
                console.log("Response Delete", error, response);
                // callback(error, "deleted")
            })
        }
    }
}

module.exports = routeFunctions