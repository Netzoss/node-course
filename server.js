const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', ()=>
{
  return new Date().getFullYear();
})

hbs.registerHelper('screemIt', (text)=>
{
  return text.toUpperCase();
})

app.set('view engine','hbs');

app.use((req, res, next)=>
{
  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) =>
  {
    if(err)
    {
        console.log('Error logging to file');
    }
  });

  console.log(log);

  next();
});

//app.use((req, res, next)=>
//{
//    res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) =>
{
  res.render('welcome.hbs', {pageTitle: 'Welcome',
                            welcomeMessage: 'Welcome to the website'});
});

app.get('/about', (req, res) =>
{
  res.render('about.hbs', {pageTitle: 'About'});
})

app.get('/projects', (req, res) =>
{
  res.render('projects.hbs', {pageTitle: 'Projects'});
})

app.get('/bad', (req, res) =>
{
  res.send({ErrorMessage: 'Bad Request'});
})

app.listen(port, ()=>
{
  console.log(`Server is up at ${port}`);

});
