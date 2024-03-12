import express  from "express";
import con from '../util/db.js'
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import multer from "multer";
import path from "path";
import { join } from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router=express.Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.post('/adminlogin',(req,res)=>{
    const sql="SELECT * from admins Where email = ? and password = ?";
    con.query(sql,[req.body.email,req.body.password],(err,result)=>{
        if(err) return res.json({loginStatus:false,Error:err})
        if(result.length>0){
            const email=result[0].email;
            const token=jwt.sign({role:"admin",email:email,id:result[0].id},"jwtsecretkeyitis",{expiresIn:'1d'});
            res.cookie('token',token);
            return res.json({loginStatus:true})
        }
        else{
            return res.json({loginStatus:false,Error:"Invalid Email/Password"})
        }
    });
});


router.post('/add_department',(req,res)=>{
    const sql="INSERT INTO departments (`name`) VALUES (?)"
    con.query(sql,[req.body.department],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true})
    });
});
router.post('/postform', (req, res) => {
    const sql=`INSERT INTO post (title,content) VALUES (?)`;
        const values=[
           req.body.title,
           req.body.content
        ]
        con.query(sql,[values],(err,result)=>{
            if(err) return res.json({Status:false,Error:err})
                return res.json({Status:true})
    });
  });

  //image upload
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

  router.post('/assigntask', upload.single('inpfile'), (req, res) => {
    const sql = `INSERT INTO task (eid, name, taskdes, deadline,inpfile) VALUES (?)`;
    const values=[
        req.body.eid,
        req.body.name,
        req.body.taskdes,
        req.body.deadline,
        req.file.filename
     ]
     con.query(sql,[values],(err,result)=>{
         if(err) return res.json({Status:false,Error:err})
             return res.json({Status:true})
    });
});


router.post('/add_employee',upload.single('image'),(req,res)=>{
    const sql=`INSERT INTO employees (eid,name,email,address,contact,emergencycontact,salary,jobrole,department_id,image,training,password) VALUES (?)`;
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        const values=[
           req.body.eid,
           req.body.name,
           req.body.email,
           req.body.address,
           req.body.contact,
           req.body.emergencycontact,
           req.body.salary,
           req.body.jobrole,
           req.body.department_id,
           req.file.filename,
           req.body.training,
           hash
        ]
        con.query(sql,[values],(err,result)=>{
            if(err) return res.json({Status:false,Error:err})
                return res.json({Status:true})
    })
    });
})


router.put('/edit_employee/:id',(req,res)=>{
    const id=req.params.id;
    const sql=`UPDATE employees set name=?,email=?,address=?,contact=?,emergencycontact=?,salary=?,jobrole=?,department_id=?,training=? WHERE id=?`;
    const values=[
        req.body.name,
        req.body.email,
        req.body.address,
        req.body.contact,
        req.body.emergencycontact,
        req.body.salary,
        req.body.jobrole,
        req.body.department_id,
        req.body.training,
     ]
     con.query(sql,[...values,id],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true,Result:result})
    });
})

router.delete('/delete_employee/:id',(req,res)=>{
    const id=req.params.id;
    const sql="DELETE from employees Where id=?";
     con.query(sql,[id],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true,Result:result})
    });
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

router.get('/department',(req,res)=>{
    const sql="SELECT * from departments"
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true,Result:result})
    });
})
router.get('/showtask',(req,res)=>{
    const sql="SELECT * from task"
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true,Result:result})
    });
})
router.get('/admin_records',(req,res)=>{
    const sql="SELECT * from admins"
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true,Result:result})
    });
})
router.get('/admin_count',(req,res)=>{
    const sql="select count(id) as admins from admins";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true,Result:result})
    });
})
router.get('/employee_count',(req,res)=>{
    const sql="select count(id) as employees from employees";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true,Result:result})
    });
})
router.get('/salary_count',(req,res)=>{
    const sql="SELECT SUM(salary) as empsalary FROM employees";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true,Result:result})
    });
})

router.get('/employee',(req,res)=>{
    const sql="SELECT * from employees"
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true,Result:result})
    });
})
router.get('/showposts',(req,res)=>{
    const sql="SELECT * from post"
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true,Result:result})
    });
})

router.get('/employee/:id',(req,res)=>{
    const id=req.params.id;
    const sql="SELECT * from employees WHERE id=?"
    con.query(sql,[id],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true,Result:result})
    });
})

router.get('/leavelist',(req,res)=>{
    const sql="SELECT * from leaverequest"
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true,Result:result})
    });
})
router.get('/feedback',(req,res)=>{
    const sql="SELECT * from feedback"
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true,Result:result})
    });
})
router.put('/leaverespond/:id', (req, res) => {
    const { id } = req.params;
    const { response } = req.body;
  
    const sql = 'UPDATE leaverequest SET status = ? WHERE id = ?';
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

router.post('/events', (req, res) => {
    const { title, start, end } = req.body;
    const sql = 'INSERT INTO events (title, start_time, end_time) VALUES (?, ?, ?)';
  
    con.query(sql, [title, start, end], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Event added successfully' });
      }
    });
  });

  router.get('/events',(req,res)=>{
    const sql="SELECT * from events"
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true,Result:result})
    });
})

router.get('/eventsemp/:id', (req, res) => {
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

  router.get('/messages/:eid', (req, res) => {
    const eid = req.params.eid;
    // Replace the following query with your actual query to fetch messages
    const sql = 'SELECT * FROM messages WHERE senderId = ? OR receiverId = ?';
  
    con.query(sql, [eid, eid], (err, results) => {
      if (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ Result: results });
      }
    });
  });
  
  
  // Send a new message
  // Send a new message
  router.post('/messages', (req, res) => {
    const { senderId, receiverId, content } = req.body;

    con.query(
      'INSERT INTO messages (senderId, receiverId, content, timestamp) VALUES (?, ?, ?, NOW())',
      [senderId, receiverId, content],
      (err, results) => {
        if (err) {
          console.error('Error inserting message:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.sendStatus(200);
        }
      }
    );
});

export {router as adminRouter}