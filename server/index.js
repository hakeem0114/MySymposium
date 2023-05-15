/*
NB: "type": "module" in package.json so you can use 
    import { } from "" statement instead of  (LIKE IN REACT.js)
    const {}= require('')
*/

import express from "express"; //Manages routes
import bodyParser from "body-parser"; //Process req body
import  mongoose  from "mongoose"; //Document object model library for MongoDB
import cors from "cors"; //Cross Origin Resource Sharing & requests
import  dotenv  from "dotenv"; //Hide secret keys
import multer from "multer"; //Local file upload
import helmet from "helmet"; //Request safety
import morgan from "morgan"; //http request logger


//Paths for "type": "module"
//Allows to properly configure paths when creating directories
import  path  from "path"; //in-built node.js path
import { fileURLToPath } from 'url';


/*****EXPRESS MIDDLEWARE CONFIGURATIONS******/

//Paths for "type": "module"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); //To use dotenv files

//Create express app to start using express middleware
const app  = express()
    app.use(express.json())

    app.use(helmet());
    app.use(helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    }));

    app.use(bodyParser.json({
        limit:"30mb", 
        extended: true 
    }))

    //Fix req.body error body parser error
    app.use(bodyParser.urlencoded({
        limit:"30mb",
        extended:true
    }))

    app.use(cors())


    //Sets directory of stored assets locally
    //**after building app, refrator to store all assets on firebase**//
    app.use("/assets", express.static(path.join(__dirname,"public/assets"))) 



/*******FILE STORAGE********/
const storage  = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets")
    },
    filename: function(req, file, cb){
        cb(null,file.originalname) ;  
    }
});
const upload = multer({storage})


/***ROUTES WITH FILES****/
app.post("/auth/register", upload.single("picture"), register)


/***MONGOOSE SETUP****/
const PORT = process.env.PORT || 6001; //6001 as a back-up for backend 3001 port

//Connect to mongoDB using mongoDb URL in .env file
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((result)=>{
        app.listen(PORT)
        console.log('Connected to MongoDB')
        console.log(`Listening on PORT ${PORT}`)
    })
    .catch((err)=> console.log(`${err} did not connect to MongoDB`));