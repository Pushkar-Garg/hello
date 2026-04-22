// Simple backend for CRUD operations.
// TOP OF FILE: Fix for Node 22 DNS issues
const dns = require("node:dns/promises");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
// const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:"true"}))
app.use(cookieParser())

mongoose.connect("mongodb+srv://Pushkar_garg:d92Zg9209p4CdZKC@cluster0.tkjx7rk.mongodb.net/testing").then(()=>console.log("connected to database")).catch((err)=>console.log("Database not connected", err))

//CRUD OPERATION

// 1. create Schema and model

const employeeSchema= new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    age:String
}, {
  timestamps: true 
})

const Employees= mongoose.model("Employees",employeeSchema) // so note- collection name will be "employees" not "Employees"
// 2. write routes


app.get("/user",async(req,res)=>{
    try{const users = await Employees.find({}); // users will be array of objects
    console.log(users);
    res.status(200).json({Message:"here is all users",users})}
    catch(err){
        return res.status(400).json({Message:"failure", Success:false})   
    }
    
})

app.post("/user/info",async (req,res)=>{
    try{
    const user = new Employees(req.body);
    const userInfo = await user.save()
    console.log("Done successfully",userInfo);
    res.json({Message:"successfull",userInfo})
    }catch(error){
        return res.status(400).json({Message:"failure", Success:false})   
    }
})
app.put("/user/info",async (req,res)=>{
    try{
    const user = await Employees.findByIdAndUpdate({_id:req.body.Id},{$set:req.body})
    console.log(user);
    res.json({Message:"successfull",user})
    }catch(error){
        return res.status(400).json({Message:"failure", Success:false})   
    }
})
app.delete("/user/info",async (req,res)=>{
    try{
    const user = await Employees.findByIdAndDelete({_id:req.body.Id})
    res.json({Message:"successfull",user})
    }catch(error){
        return res.status(400).json({Message:"failure", Success:false})   
    }
})




// LOGIN-REGISTER(ONlY BASIC) + a middleware which varify JWT and if all things are right, then redirect to a home page
const loginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const LoginModel = mongoose.model("login", loginSchema);

// --- Auth Middleware ---
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.json({ Error: "Authentication token missing" });
    
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.json({ Error: "Invalid or expired token" });
        req.user = decoded; // Pass the logged-in User's ID to the next function
        next();
    });
};



app.post("/register", async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password.toString(), salt);
        const newUser = new LoginModel({
            name: req.body.name,
            email: req.body.email,
            password: hash
        });
        await newUser.save();
        return res.json({ Status: "Success" });
    } catch (err) {
        return res.json({ Error: "Registration Failed (Email might already exist)" });
    }
});

// Login & Issue Token
app.post("/login", async (req, res) => {
    try {
        const user = await LoginModel.findOne({ email: req.body.email });
        if (!user) return res.json({ Error: "No account found with this email" });

        const isMatch = await bcrypt.compare(req.body.password.toString(), user.password);
        if (isMatch) {
            // Include user._id in the JWT so we know who they are later
            const token = jwt.sign({ id: user._id, name: user.name }, SECRET_KEY, { expiresIn: "1d" });
            res.cookie('token', token, { httpOnly: true, secure: false }); // secure: true in production (HTTPS)
            return res.json({ Status: "Success" });
        } else {
            return res.json({ Error: "Incorrect Password" });
        }
    } catch (err) {
        return res.json({ Error: "Login Server Error" });
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie("token");
    return res.json({ Status: "Success" });
});


app.listen(1000,(req,res)=>{
    console.log(`server is listening on port 1000`)
})
