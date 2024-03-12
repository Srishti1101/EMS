import express  from "express";
import con from '../util/db.js'
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { join } from "path";
import multer from "multer";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";

// Use fileURLToPath and dirname to get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Public/Images')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({
  storage: storage
})

const router=express.Router();

router.post('/employeelogin',(req,res)=>{
    const sql="SELECT * from employees Where email = ? ";
    con.query(sql,[req.body.email],(err,result)=>{
        if(err) return res.json({loginStatus:false,Error:err})
        if(result.length>0){
            bcrypt.compare(req.body.password,result[0].password,(err,response)=>{
               if(err) return res.json({loginStatus:false,Error:"Wrong Password"})
               if(response){
                const email=result[0].email;
                const token=jwt.sign({role:"employee",email:email,id:result[0].id},"jwtsecretkeyitis",{expiresIn:'1d'});                     
                res.cookie('token',token);
                return res.json({loginStatus:true,id:result[0].id})
               }
            })
        }
        else{
            return res.json({loginStatus:false,Error:"Invalid Email/Password"})
        }
    });
});

router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employees where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false,Error:err});
        return res.json(result)
    })
  })

  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
  })

  router.post('/add_attendance',(req,res)=>{
    const sql=`INSERT INTO attendance (eid,name,attendancedate,intime,outtime) VALUES (?)`;
    const values=[
        req.body.eid,
        req.body.name,
        req.body.attendancedate,
        req.body.intime,
        req.body.outtime
     ]
     con.query(sql,[values],(err,result)=>{
         if(err) return res.json({Status:false,Error:err})
             return res.json({Status:true})
    })
    });

    router.put('/edit_attendance/',(req,res)=>{
        const sql=`UPDATE attendance set outtime=?`;
        const values=[
            req.body.outtime
         ]
         con.query(sql,[...values],(err,result)=>{
            if(err) return res.json({Status:false,Error:"Query Error"})
                return res.json({Status:true,Result:result})
        });
    })

    router.get('/attendance',(req,res)=>{
        const sql="SELECT * from attendance"
        con.query(sql,(err,result)=>{
            if(err) return res.json({Status:false,Error:"Query Error"})
                return res.json({Status:true,Result:result})
        });
    })

    router.post('/leaverequest', (req, res) => {
        const newRequest = req.body;
        newRequest.status = 'Pending';
        const sql=`INSERT INTO leaverequest (eid,leavereason) VALUES (?)`
        const values=[
            req.body.eid,
            req.body.leavereason
         ]
         con.query(sql,[values],(err,result)=>{
             if(err) return res.json({Status:false,Error:err})
                 return res.json({Status:true})
        })
      });

      router.get('/leavelist/:eid', (req, res) => {
        const { eid } = req.params;
        const sql = "SELECT * FROM leaverequest WHERE eid = ?";
        con.query(sql, [eid], (err, result) => {
          if (err) return res.json({ Status: false, Error: "Query Error" });
          return res.json({ Status: true, Result: result });
        });
      });
      router.get('/tasklist/:eid', (req, res) => {
        const { eid } = req.params;
        const sql = "SELECT * FROM task WHERE eid = ?";
        con.query(sql, [eid], (err, result) => {
          if (err) return res.json({ Status: false, Error: "Query Error" });
          return res.json({ Status: true, Result: result });
        });
      });
      
      router.put('/taskrespond/:id', (req, res) => {
        const { id } = req.params;
        const { response} = req.body;
      
        const sql = 'UPDATE task SET status = ? WHERE id = ?';
        con.query(sql, [response, id], (err, result) => {
          if (err) {
            console.log(err);
            console.error('Error responding to leave request:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Leave request not found.' });
          } else {
            res.status(200).json({ message: 'Leave request updated successfully.' });
          }
        });
      });

      router.post('/feedback', (req, res) => {
        const sql=`INSERT INTO feedback (eid,name,description) VALUES (?)`
        const values=[
            req.body.eid,
            req.body.name,
            req.body.description
         ]
         con.query(sql,[values],(err,result)=>{
             if(err) return res.json({Status:false,Error:err})
                 return res.json({Status:true})
        })
      });

      router.get('/download/:filePath', (req, res) => {
        const filePath = req.params.filePath;
        const fullPath = join(__dirname, '..', 'Public/Images', filePath);
    
        res.download(fullPath, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(404).send('File not found');
            }
        });
    });
    
    router.post('/upload/:id', upload.single('outfi'), (req, res) => {
      const { id } = req.params;
      
      // Get the filename from the uploaded file
      const filename = req.file.filename;
    
      const sql = 'UPDATE task SET outfi = ? WHERE id = ?';
      con.query(sql, [filename, id], (err, result) => {
        if (err) {
          console.log(err);
          console.error('Error updating task outfi:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Task not found.' });
        } else {
          res.status(200).json({ message: 'Task outfi updated successfully.' });
        }
      });
    });
    
   // Assuming 'con' is your MySQL connection object

router.post('/events', (req, res) => {
  const { title, start, end, eid } = req.body;
  const sql = 'INSERT INTO eventsemp (title, start_time, end_time, eid) VALUES (?, ?, ?, ?)';

  con.query(sql, [title, start, end, eid], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Event added successfully' });
    }
  });
});

router.get('/events/:id', (req, res) => {
  const eid = req.params.id; // Use req.params.id to get the employee id from the route parameter
  const sql = 'SELECT * FROM eventsemp WHERE eid = ?';

  con.query(sql, [eid], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ Status: false, Error: 'Query Error' });
    } else {
      res.json({ Status: true, Result: result });
    }
  });
});


export {router as EmployeeRouter} 