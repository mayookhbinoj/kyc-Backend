import multer  from "multer";
import path from "path"

 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath=path.join(__dirname,'../../Uploads')
      cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null, uniqueSuffix+file.originalname)
    }
  })


 export  const upload = multer({ storage: storage }).single('aadhaar')