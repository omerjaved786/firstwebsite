const express = require('express');
const path = require('path')

const app = express();
const mongoose = require('mongoose')
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactus');
}
const port = 8000;
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    address: String,
    phone: String
  });
  const form = mongoose.model('contact', contactSchema)
app.use('/static',express.static('static'))
app.use(express.urlencoded());

app.set('view engine','pug')
app.set('views', path.join(__dirname,'views'))

app.get('/', (req, res)=>{
const newpug = {}
    res.render('index.pug',  newpug)
    });
app.get('/contact', (req, res)=>{
const newpug = {}
    res.render('contact.pug',  newpug)
    });
app.post('/contact', (req, res)=>{
const mycontact = new form(req.body);
mycontact.save().then(() => {
    res.send('your form has been saved successfully')
}).catch(()=> {
    res.status(400).send('form has not been submitted')
})
    // res.render('contact.pug',  newpug)
    });
app.get('/about', (req, res)=>{
const newpug = {}
    res.render('about.pug',  newpug)
    });
app.get('/services', (req, res)=>{
const newpug = {}
    res.render('services.pug',  newpug)
    });

    app.listen(port, ()=>{
        console.log(`plese click on port ${port}`)
    })