import mysql from 'mysql'

const con=mysql.createConnection({
    host:'127.0.0.1',
    user:"root",
    password:"",
    port:'4000',
    database:"employeems",
})

con.connect(function(err){
    if(err){
        console.log("Connection error")
    }
    else{
        console.log("Connected successfully")
    }
})

export default con;