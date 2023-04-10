//Add a description to each dependency imported
//Go their websites & find what they do

import { express} from "express"; //Manages RESTful APIs
import bodyParser, { BodyParser } from "body-parser"; //
import { Mongoose } from "mongoose";
import {cors} from "cors";
import { dotenv } from "dotenv";
import multer, { Multer } from "multer";
import {helmet} from "helmet";
import { Morgan } from "morgan";
import { path } from "path";
import { fileURLToPath } from "url"; //Allows to properly configure paths when creating directories

/*****MIDDLE-WARE CONFIGURATIONS******/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.__dirname(__filename);
dotenv.config(); //To use dotenv files
const app  = express() //To use express middleware files
    app.use(express.json())
    app.use(helmet());
    app.use(helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    }));
    app.use(bodyParser.json({
        limit:"30mb", 
        extended: true 
    }))
    app.use(bodyParser.urlencoded({
        limit:"30mb",
        extended:true
    }))
    app.use(cors())
    app.use("/assets", express.static(path.join(__dirname,"public/assets"))) //Sets directory of 
    //Stores assets locally, after building app, refrator to store all assets on firebase

/***FILE STORAGE****/
const storage  = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets")
    },
    filename: function(req, file, cb){
        cb(null,file.originalname) ;  
    }
});
const upload = multer({storage})