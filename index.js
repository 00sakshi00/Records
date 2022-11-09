const express=require('express');
const port=8000;
const app= express();

const path = require('path');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));

const db = require('./config/mongoose');
const Record=require('./models/record');

/*
var records=[
    { 
        name: 'sa',
        dob: '2022-11-09', 
        country: 'India', 
    }
];*/

//from server to browser
app.get('/',function(req,res){
    return res.render('home',
    {
        title:"Adictive Media"
    });
});

app.get('/list',function(req,res){
    /*
    return res.render('list',{
        title:"Records",
        records:records
    });
    */

    Record.find({}, function(err,records){
        if(err){
            console.log('error in fetching contact');
            return;
        }
        return res.render('list',{ 
            title: "Records",
            records:records
        });
    });
});

app.get('/delete-contact',function(req,res){
    //get id from url
    let id = req.query.id;

    //find contact in database using id and delete
    Record.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting from database');
            return;
        }
        return res.redirect('back');
    })
});

//from browser to server
app.post('/input',function(req,res){
    /*
    console.log(req.body);
    res.redirect('back');*/

    /*
    records.push({
        name:req.body.name,
        dob:req.body.dob,
        country:req.body.country
    })
    res.redirect('back');*/

    Record.create({
        name:req.body.name,
        dob:req.body.dob,
        country:req.body.country
    },function(err,newInput){
        if(err){
            console.log('Error');
            return;
        }
        console.log('***********',newInput);
        return res.redirect('back');
    })

});


app.listen(port,function(err){
    if(err){
        console.log('OOPS!!!....');
        console.log('Error running Database');
    }
    console.log('Express running in port:',port);
});