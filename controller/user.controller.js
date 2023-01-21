const multer = require("multer");
const {uploadSingleFile} = require('../middleware/upload')
const User = require('../model/user.model')
const fs = require('fs')
const util = require('util')
const readFile= util.promisify(fs.readFile)
const readXlsxFile = require('read-excel-file')

const uploadSingleFilee = async (req, res) => {

    uploadSingleFile(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({ message: "Too many files to upload." });
          }
          return res.status(400).json({ message: err.message });
        } else if (err) {
          return res.status(400).json({ message: err.message });
        } else if (!req.file) {
          return res.status(400).json({ message: "File is required!" });
        } else {
          
          res.status(200).json({message:"File Uploaded Successfully", ...req.file});
        }
      })
  };

const uploadDB = async(req, res, next)=>{
    try {
        const {fileName} = req.body
    // console.log(fileName);
    // // const file = await readFile('/media/meityp/single/file/'+fileName)
    // const file = fs.readFileSync('/media/meityp/single/file/'+fileName)
    // console.log(file);
    // // res.send("working")

    var XLSX = require('xlsx')
    var workbook = XLSX.readFile('/media/meityp/single/file/'+fileName);
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    let user;
    const mapped = xlData.map(async(item)=>{
            const {Name, Email, Mobile } = item
            let myitem = item;
            let errorMsg=""
            let status =""
            if (!Name ){
                errorMsg= " No Name"
                status="Not Active User"
            }
            if (!Email){
                errorMsg= errorMsg + " No Email"
                status="Not Active User"
            }

            if (!Mobile){
                errorMsg= errorMsg + " No Mobile"
                status="Not Active User"
            }

            if(errorMsg.length ===0 && status.length===0){
                errorMsg="No Error"
                status="Active User"
            }
            user = await new User({...myitem, status: status, err_log:errorMsg}).save()
            
            })
            
            res.send("Success Operation")
    } catch (error) {
        console.log(error);
    }
    
     

}
  module.exports={uploadSingleFilee, uploadDB}