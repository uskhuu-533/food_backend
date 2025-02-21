import multer from "multer";
import path from "path";


const storage = multer.diskStorage({});
// File Filter: Accept only image files
 const fileFilter = (req, file, cb) => {
console.log("File original name:", file.originalname);

    
    const ext = path.extname(file.originalname).toLowerCase();
    if ([".jpg", ".png", ".pdf"].includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Only png, jpg, pdf files are allowed!"), false);
    }
};


const upload = multer({ storage, fileFilter });

export default upload;