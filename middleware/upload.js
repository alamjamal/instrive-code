const multer = require('multer');
const path = require('path');
const fs = require('fs')
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const crypto = require('crypto');
const contentFile={
    storage:function(){
        var storage = multer.diskStorage({
          destination: function(req, file, cb) {
            const filesDir = '/media/meityp/single/file/'
            if (!fs.existsSync(filesDir)) {
              fs.mkdirSync(filesDir, { recursive: true })
            }
            cb(null, filesDir);
          },
        filename: function (req, file, cb) {
          let buf = crypto.randomBytes(16);
          buf = buf.toString('hex'); 
          // cb(null,buf+path.extname(file.originalname));
          cb(null,file.originalname);
        }
      })
      
      return storage;
},
allowedFiles:function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(xlsx|XLSX)$/)) {
        req.fileValidationError = 'Only XLS|XLX file type are allowed!';
        return cb(new Error('Only XLSX|XLS file type  are allowed!'), false);
    }
    return cb(null, true);
}
}

const uploadSingleFile= multer({
  storage:contentFile.storage(),
  fileFilter:contentFile.allowedFiles,
  limits: {
      fileSize: 1024*1024*5*20
    },
}).single("singleFile");


module.exports={uploadSingleFile}