import express from "express";
import mysql from "mysql";
import cors from "cors";
import http from "http";
import { error } from "console";

const app= express();
const server=http.createServer(app) 

app.use(express.json());
app.use(cors({
    Credential: true,
    origin: "*"
}
));
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Kesavan@5",
    database: "users",
    port: 3306
});
connection.connect((error) => {
    if (error) {
        throw error;
    }
    else {
        console.log("node js is connected to database")
    }

})
app.post("/signup",(request,response)=>{
     const form=request.body;
     console.log(form)
     const sqlQuery=`insert into signup_page (name,email,password,confirm_password)values("${form.name}","${form.email}","${form.password}","${form.confirm_password}")`;
     connection.query(sqlQuery,(error,result)=>{
        if(error){
            response.status(500).send({
                message:"someything went to wrong",
                error:error
            })
        }
        else{
            response.status(200).send({
                message:"Account registered succeefull"
            })
        }
     })

})
app.post("/login",(request,response)=>{

    const sqlQuery="SELECT * FROM signup_page WHERE `email`=? AND `password`=?";
    connection.query(sqlQuery,[request.body.email,request.body.password],(error,result)=>{
       if(error){
           response.status(500).send({
               message:"someything went to wrong",
               error:error
           })
       }
       else{
           response.status(200).send({
               message:"login successfull"

           })
       }
    })

})    

   const portNumber=process.env.port || 4000
   server.listen(portNumber,()=>{
    console.log("node js is working on portnumber",portNumber)
   })
