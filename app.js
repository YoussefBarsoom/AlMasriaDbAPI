
// import sequelize from './database.js';


const express =require('express')
const fs=require('fs')
//const router=require('./routes')

const app=express()
const path=require('path')
const { check,validationResult } = require('express-validator')
const { sanitizeBody } = require('express-validator/')
var bodyParser=require('body-parser')
app.use(express.static('public'))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(bodyParser.urlencoded({extended:false}))
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  dateStrings: true

});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.listen(process.env.PORT || 3000,function(){
    console.log('Everything is fine :)')
})

app.get('/getSchedule', (req, res, next) => {
    con.query('Select id,userid, typeOfTask,startDate, startTime, endDate, endTime,details,typeOfTask,typeName from almasriadb.userschedule left join almasriadb.typesOfTasks ON userschedule.typeOfTask =typesOfTasks.typeId', function (err, result) {
        if (err) throw err;
       // const jTest="{'"+con+"'}"
      let resultJSON= {};
      var obj;
       for (const key in result) {
        if(!resultJSON.hasOwnProperty(result[key].startDate))
        {
          resultJSON[result[key].startDate] = [];
        }
          obj = {type:result[key].typeName,startTime:result[key].startTime,endTime:result[key].endTime,subTitle:result[key].details} 
         resultJSON[result[key].startDate].push(obj);

         console.log("Result: " + result[key].startDate);

       }
    
        //'2021-11-18':[{type:'',startTime:'11:00',endTime:'12:00',subTitle:'MCO to EGY'}]
        res.status(200).json(resultJSON);

    });
});



// sequelize.sync(); 

