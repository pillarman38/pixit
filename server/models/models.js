let pool = require('../../config/connections')
let fs = require('fs')
let spawn = require('child_process').spawn

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
        console.log(itms);
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
                console.log('ls error', err);
              });
              
              newProc.stdout.on('data', function (data) {
                  console.log('stdout: ' + data);
              });
              
              newProc.stderr.on('data', function (data) {
                  console.log('stderr: ' + data);
              });
              
              newProc.on('close', function (code) {
                  console.log('child process exited with code ' + code);
              });
        }
        pool.query(`INSERT INTO latestimports SET ?`, itms, (err, res)=>{
            pool.query(`SELECT * FROM latestimports`, (e, r) => {
                console.log(e, r, err, res);
                callback(e, r)
            })
        })
    },
    modify: (itm, callback) => {
        console.log("Itm here: ", itm);
        var i = 0

        function called() {
            console.log("ALL THE PHOTOS: ", itm['photos'][i]);
            var uploadObj = {
                photo: `http://192.168.1.86:4012/${itm['photos'][i]['originalname']}`,
                albumName: itm['album'],
                originalname: itm['photos'][i]['originalname'],
                extension: itm['photos'][i]['extension']
            }
            
            console.log("UPLOAD: ", uploadObj);
            var rowPackets = {}
            pool.query(`SELECT * FROM photos WHERE photo = '${uploadObj['photo']}' AND albumName = '${uploadObj['albumName']}'`, (err, res) => {
                console.log(err, res);
                if(res.length == 0) {
                    pool.query(`INSERT INTO photos SET ?`, uploadObj, (err, res) => {
                        console.log(err, res);
                        rowPackets = {
                            error: err,
                            response: res
                        }
                    })
                }
            })  
            console.log(i + 1, itm['photos'].length);
            if(i + 1 != itm['photos'].length) {
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
    getAlbum: (itm, callback) => {
        console.log(itm);
        pool.query(`SELECT * FROM photos WHERE albumName = '${itm['album']}'`,(err, res) =>{
            console.log(err, res);
            callback(err, res)
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
    }
}
module.exports = routeFunctions