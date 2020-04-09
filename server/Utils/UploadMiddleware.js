const multer = require('multer')
const storage = multer.diskStorage(
    {
        destination: function(req,file,cb){

            cb(null,process.env.PhotosFolder)
        },
        filename: function (req,file,cb){
            cb(null, Date.now()+file.originalname)
        } 
    }
);

module.exports.users =  multer({storage:storage}).fields([{name:'profile',maxCount : 1},{name: 'references', maxCount: process.env.PHOTO_UPLOAD_LIMIT}])