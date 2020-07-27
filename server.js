//intially check  which environment we are running
if(process.env.NODE_ENV!=='production')
{
    require('dotenv').config()
} 
const express=require ("express")
const app=express()
const indexrouter=require('./routes/index')
const expresslayouts=require("express-ejs-layouts")
const mongoose=require("mongoose")

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expresslayouts)
app.use(express.static('public'))
//setting up our data base
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db=mongoose.connection
db.once('error',error=>console.error(error))

db.once('open',()=>console.log("connected"))

app.use('/',indexrouter)

app.listen(process.env.PORT||3000)