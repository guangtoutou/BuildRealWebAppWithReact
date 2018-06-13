import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors());

app.post("/login", (req, res)=>{
      res.status(400).json("error")
})

app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'));
})

app.listen(8080,()=> console.log("running on localhost:8080"));