const express = require('express');
var app = express();
const mongoose = require('mongoose');
const path = require('path');
const alert = require('alert');


// nhan du lieu body-parser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
mongoose.connect('mongodb+srv://gttm_nhom4:van170801@cluster0.m2spfol.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// craet router   database
var user = require('./config/connectDB')
var admin = require('./config/adminDB')
// css
app.use('/public', express.static(path.join(__dirname, 'public')))
// cau hinh  views ejs
app.set('view engine', 'ejs');
app.set('views', './views');

// Router home
// app.get('/home', (req, res)=>{
//     res.render('home');
// });


app.get('/registeradmin', (req, res)=>{
    res.render('registeradmin');
});

app.get('/loginadminfail', (req, res)=>{
    res.render('loginadminfail');
});

app.get('/admin', (req, res)=>{
    res.render('admin');
});
app.get('/adminfail', (req, res)=>{
    res.render('adminfail');
});
// creat admin
app.post('/registeradmin', urlencodedParser, async (req, res)=>{
    try{
        var useradmin = req.body.useradmin
        const ad =  await admin.findOne({
            useradmin: useradmin 
        })
        if(ad){
            alert('Tài khoản admin này đã tồn tại')
            res.redirect('adminfail')
            return console.log('Tài khoản admin này đã tồn tại')
            
        }
        const moiadmin = new admin({
            useradmin: req.body.useradmin,
            password: req.body.password
        })

        const newAdmin = await admin.create(moiadmin)
        alert('Tạo tài khoản admin thành công')
        res.redirect('/register')
        console.log('tạo tài khoản admin thành công')
    }
    catch(error) {
        console.log('lỗi server admin')
    }
    
});

// Login admin
app.post('/admin', urlencodedParser, async (req, res) => {
    
    var useradmin = req.body.useradmin
    var password = req.body.password

    await admin.findOne({
        useradmin: useradmin,
        password: password
    })
    .then(result=>{
        if(result.password == req.body.password && result.useradmin == req.body.useradmin){
            alert('Đăng nhập ADMIN thành công')
            console.log('Đăng nhập admin thành công')
            res.redirect('/register')
        }
    })
    .catch(err=> {
        alert('Tài khoản không đúng')
        console.log('Đăng nhập admin thất bại')
        res.redirect('/loginadminfail')
    })
});

// Router register
app.get('/register', (req, res)=>{
    res.render('register');
});
app.get('/register/registerfail', (req, res)=>{
    res.render('registerfail');
});
// creat user
app.post('/register', urlencodedParser, async (req, res)=>{
    try{
        var username = req.body.username
        const use =  await user.findOne({
            username: username 
        })
        if(use){
            alert('Tài khoản này đã tồn tại')
            res.redirect('register/registerfail')
            return console.log('tài khoản người dùng đã tồn tại')
            
        }
        const moi = new user({
            username: req.body.username,
            password: req.body.password
        })

        const newDoc = await user.create(moi)
        alert('Tạo tài khoản thành công')
        res.redirect('/')
        console.log('tao tai khoan thanh cong')
    }
    catch(error) {
        console.log('loi server')
    }
    
});


// Router Login
app.get('/loginfail', (req, res)=>{
    res.render('loginfail');
});

app.get('/', (req, res)=>{
    res.render('login');
});
// Compare pasword
app.post('/', urlencodedParser, async (req, res) => {
    
    var username = req.body.username
    var password = req.body.password

    await user.findOne({
        username: username,
        password: password
    })
    .then(result=>{
        if(result.password == req.body.password && result.username == req.body.username){
            alert('Đăng nhập thành công')
            console.log('Đăng nhập thành công')
            res.redirect('http://192.168.255.135')
        }
    })
    .catch(err=> {
        alert('Tài khoản không đúng')
        console.log('Tài khoản không đúng')
        res.redirect('/loginfail')
    })
});

// địa chỉ HEROKU || IP localhost
app.listen( process.env.PORT ||3000, () => {
    console.log('Server Bắt đầu tại http://localhost:3000');
});