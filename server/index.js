/*
NB: "type": "module" in package.json so I can use 
    import { } from "" statement (LIKE IN REACT.js), instead of  
    const {}= require('')
*/

//Setup imports
import express from "express"; //Manages routes
import bodyParser from "body-parser"; //Process req body
import  mongoose  from "mongoose"; //Document object model library for MongoDB
import cors from "cors"; //Cross Origin Resource Sharing & requests
import  dotenv  from "dotenv"; //Hide secret keys (environment variables)
import multer from "multer"; //Local file upload
import helmet from "helmet"; //Request safety
import morgan from "morgan"; //http request logger

//Controller imports
import {register} from './controllers/authController.js'
import {createPost} from './controllers/postController.js'

//Route Imports
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/authUsers.js'
import postRoutes from './routes/postRoutes.js'

//Middleware Imports
import { verifyToken } from "./middleware/authMiddleware.js";


//Path Imports
    /*Paths for "type": "module"
    Allows to properly configure paths when creating directories */
import  path  from "path"; //in-built node.js path
import { fileURLToPath } from 'url';

//Import Models
import User from "./models/User.js";
import Post from "./models/Post.js";

//User Data Imports
import { users, posts } from "./data/fakeData.js";


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

    //Fix req.body error body parser error like in Smoothie Bar practice project
    app.use(bodyParser.urlencoded({
        limit:"30mb",
        extended:true
    }))

    //CORS
    //Remove any friction when accessing resourcing from client to back-end
    app.use(cors({
        origin: '*',
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
    }))

    //Sets directory of stored assets locally
    //**after building app, refrator to store all assets on firebase**//
    app.use("/assets", express.static(path.join(__dirname,"public/assets"))) 



/*******LOCAL FILE STORAGE********/
const storage  = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets")
    },
    filename: function(req, file, cb){
        cb(null,file.originalname) ;  
    }
});
const upload = multer({storage})


/***ROUTES FOR LOCAL FILE UPLOAD****/
//When user wants to register, open view: auth/register (.ejs or REACT)
//run middleware: upload.single("picture") before it runs register controller
app.post("/auth/register", upload.single("picture"), register)
app.post("/posts", verifyToken, upload.single('picture'), createPost )


/****MAIN ROUTES****/
app.use('/auth', authRoutes)  //domain name for authRoutes will have a /auth prefix
app.use('/users', userRoutes)
app.use('/posts', postRoutes) //Works with route w/ file since user need to upload image on post


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

        //Push to database once & comments it out. 
        /**Connect to firebase later**/
        // User.insertMany(users)
        // Post.insertMany(posts)
    })
    .catch((err)=> console.log(`${err} did not connect to MongoDB`));