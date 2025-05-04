import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")//store  the uploaded files in public/uploads folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); //use original name you want to save the file as
    }
})

const upload = multer({
    storage: storage
})

export { upload }