var express = require('express')
var app = express()

var Datastore = require('nedb')
var db_users = new Datastore({ filename: 'users.db'})
var db_participants = new Datastore({ filename: 'participants.db'})

db_users.loadDatabase(function(err) {
    if (err) {
        throw err
    }
})

db_participants.loadDatabase(function(err) {
    if (err) {
        throw err
    }
})

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded(
    {extended: true}
))

var RandomOrg = require('random-org'); 
var random = new RandomOrg({ apiKey: '8658e057-e4f8-4bad-9ab2-681ab83a4516' });

var session = require('express-session')
app.use(session({ secret: 'secret'}))

//global response for login
var loginResponse = '<h1> Log in </h1>' +
                '<form action="/homework" method="POST">' +
                'Username: <input type="text" name="username"><br/>' +
                'Password: <input type="text" name="password"><br/>' +
                '<input type="submit" value="Log In">' +
                '</form> <br/>' + 
                'Dont have an account ? ' +
                '<a href="/homework/signup/"> Sign Up </a> <br>'


//global response for sign up
var signupResponse = '<h1> Sign Up </h1>' +
                '<form action="/homework/signup" method="POST">' +
                'Username: <input type="text" name="username"><br/>' +
                'Password: <input type="text" name="password"><br/>' +
                '<input type="submit" value="Sign Up">' +
                '</form> <br>'


app.get('/homework', function(req, res) {
     if (typeof req.session.username !== 'undefined') {
        res.redirect('/homework/lottery')
    } else {
        res.send(loginResponse)
    }
})

app.post('/homework', function(req, res){
    db_users.find({username: req.body.username, password: req.body.password}, function(err, rows){
        if (rows.length != 0) {
            req.session.username = rows[0].username
            req.session._id = rows[0]._id
            console.log(rows[0]._id, req.session._id)
            res.redirect('/homework/lottery')
        } else {
            var response = loginResponse + '<p style="color:red"> Incorrect username or password </p>'
            res.send(response)
        }
    })
})


app.get('/homework/signup', function(req, res) {
     if (typeof req.session.username !== 'undefined') {
        res.redirect('/homework/lottery')
    } else {
        res.send(signupResponse)
    }
})

app.post('/homework/signup', function(req, res) {
    db_users.find({username: req.body.username}, function(err, rows){
        if (rows.length != 0) {
            var response = signupResponse + '<p style="color:red"> There is already an user with this username </p>'
            res.send(response)
        } else {
            db_users.insert({username: req.body.username, password: req.body.password}, function(err){
                res.redirect('/homework')
            })
        }
    })
})

app.get('/homework/lottery', function(req, res) {
    db_participants.find({}, function(err, rows) {
        var response = '<h1> Participants </h1> <ul>'
        for (var i = 0; i < rows.length; i++) {
            response += '<li>' + rows[i].username + '</li>'
        }
        response += '</ul><br>'
        response += '<a href="/homework/enterLot">Enter</a><br/>'
        response += '<a href="/homework/logout">Log Out</a><br/>'
        response += '<a href="/homework/chooseWinner">Choose Winner</a><br/>'
        res.send(response)
    })
})

app.get('/homework/logout', function(req, res) {
    req.session.destroy(function(err){

    })
    res.redirect('/homework')
})

app.get('/homework/enterLot', function(req, res) {
    db_participants.find({userId: req.session._id}, function(err, rows) {
        if (rows.length == 0) {
            db_participants.insert({username: req.session.username, userId: req.session._id}, function() {
            })
        }
        res.redirect('/homework/lottery')
    })
})

app.get('/homework/chooseWinner', function(req, res) {
      var response = ''
      var template = '<br/><a href = "/homework/lottery"> Back</a>'
      db_participants.find({}, function(err, rows) {
        if (rows.length <= 1) {
            response = 'No winner'
            response += template;
            res.send(response)
        } else {
            random.generateIntegers({ min: 0, max: rows.length - 1, n: 1 })
                .then(function(result) {
                    console.log(result.random.data, rows)
                    response += 'Congratulations ' + rows[result.random.data[0]].username
                    db_participants.remove({}, {multi: true})
                    response += template
                    res.send(response)
            })
        }
    })
})

app.listen(3000, function() {
    console.log('Listening to app')
})