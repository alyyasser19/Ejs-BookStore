//requirements
var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var session = require('express-session');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: "keyboardcat",
  name: "mycookie",
  resave: true,
  saveUninitialized: true,
  cookie: { 
      secure: false,
      maxAge: 6000000
  }
}));

//GET

// load Homescreen
app.get('/', function(req, res) {
res.render('login',{Err:""})
return;
});

//load registration
app.get('/registration', function(req, res){
res.render('registration',{Err:""});
return;
});

//Load Home
app.get('/home', function(req, res){
  res.render('home');
  return;
  });

//Load Novel
app.get('/novel', function(req, res){
  res.render('novel');
  return;
  });

//Load Poetry
app.get('/poetry', function(req, res){
  res.render('poetry');
  return;
  });
//Load Fiction
app.get('/fiction', function(req, res){
  res.render('fiction');
  return;
  });

//Load want to read
app.get('/readlist', function(req, res){
  console.log(req.session.user);
  myBooks = [];
  currentUser=JSON.parse(fs.readFileSync("Users.json"));
  for(var i in currentUser){
    if(currentUser[i].Username==req.session.user){
      myBooks=currentUser[i].Read;
    }
  }
  res.render('readlist',{Books:myBooks});
  return;
  });

//Load search results
app.get('/searchresults', function(req, res){
  
  res.render('searchresults');
  return;
  });

//Books
//Load LOF
app.get('/flies', function(req, res){
  res.render('flies',{Err:""});
  return;
});

//Load Dunes
app.get('/dune', function(req, res){
  res.render('dune',{Err:""});
  return;
  });

//Load grapes
app.get('/grapes', function(req, res){
  res.render('grapes',{Err:""});
  return;
  });

//Load leaves
app.get('/leaves', function(req, res){
  res.render('leaves',{Err:""});
  return;
  });

//Load mockingbird
app.get('/mockingbird', function(req, res){
  res.render('mockingbird',{Err:""});
  return;
  });

//Load sun
app.get('/sun', function(req, res){
  res.render('sun',{Err:""});
  return;
  });

//POST

//Registring new users
app.post('/register', function(req, res){
var user= req.body.username;
var pass= req.body.password;

//if there is no JSON for any reason create a new one
if(!fs.existsSync("Users.json")){
  fs.writeFileSync("Users.json",JSON.stringify([{Username: user, Password: pass}]));
  res.redirect('/');
  return;
}

//get currentUsers
currentUser=JSON.parse(fs.readFileSync("Users.json"));

//Check if Username or password are empty
if (user.length==0){
  res.render('registration',{Err: "Type in username"});
  return;
}
  if (pass.length==0){
  res.render('registration',{Err: "Type in password"});
  return;
}

//check if user already exists
for(var i in currentUser) {
  if(currentUser[i].Username == user){
    res.render('registration',{Err: "Username already taken!"});
    return;}
}

//modify the JSON then exporitng it again, finally, returning to the login screen
currentUser.push({Username: user, Password: pass, Read: []});
fs.writeFileSync("Users.json",JSON.stringify(currentUser));
res.redirect('/');
return;
});

//loging in
app.post('/',function(req,res){
  var user= req.body.username;
  var pass= req.body.password;
  currentUser=JSON.parse(fs.readFileSync("Users.json"));

  if (user.length==0){
  res.render('login',{Err: "Type in username"});
  return;
}
  if (pass.length==0){
  res.render('login',{Err: "Type in password"});
  return;
}

//check if user already exists
for(var i in currentUser) {
  if(currentUser[i].Username == user && currentUser[i].Password == pass ){
    req.session.user= currentUser[i].Username;
    res.redirect('/home');
    console.log(req.session.user);
    return;
  }
}
res.render('login',{Err: "Invalid Username/Passowrd"});
return;
});

//add books
//add LOF
app.post('/flies', function(req, res){
  currentUser=JSON.parse(fs.readFileSync("Users.json"));
  for(var i in currentUser){
    if(currentUser[i].Read.includes('flies') && currentUser[i].Username==req.session.user){
      res.render('flies',{Err: "Book Already in Want to Read"});
      return;
    }
    if(currentUser[i].Username==req.session.user){
      currentUser[i].Read.push("flies");
      fs.writeFileSync("Users.json",JSON.stringify(currentUser));
    }
  }
  res.redirect('readlist');
  return;
});

  //add dune
app.post('/dune', function(req, res){
  currentUser=JSON.parse(fs.readFileSync("Users.json"));
  for(var i in currentUser){
    if(currentUser[i].Read.includes('dune') && currentUser[i].Username==req.session.user){
      res.render('dune',{Err: "Book Already in Want to Read"});
      return;
    }
    if(currentUser[i].Username==req.session.user && !(currentUser[i].Read.includes('dune'))){
      currentUser[i].Read.push("dune");
      fs.writeFileSync("Users.json",JSON.stringify(currentUser));
    }
  }
  res.redirect('readlist');
  return;
  });

  //add grapes
app.post('/grapes', function(req, res){
  currentUser=JSON.parse(fs.readFileSync("Users.json"));
  for(var i in currentUser){
    if(currentUser[i].Read.includes('grapes') && currentUser[i].Username==req.session.user){
      res.render('grapes',{Err: "Book Already in Want to Read"});
      return;
    }
    if(currentUser[i].Username==req.session.user && !(currentUser[i].Read.includes('grapes'))){
      currentUser[i].Read.push("grapes");
      fs.writeFileSync("Users.json",JSON.stringify(currentUser));
    }
  }
  res.redirect('readlist');
  });

  //add leaves
app.post('/leaves', function(req, res){
  currentUser=JSON.parse(fs.readFileSync("Users.json"));
  for(var i in currentUser){
    if(currentUser[i].Read.includes('leaves') && currentUser[i].Username==req.session.user){
      res.render('leaves',{Err: "Book Already in Want to Read"});
      return;
    }
    if(currentUser[i].Username==req.session.user && !(currentUser[i].Read.includes('leaves'))){
      currentUser[i].Read.push("leaves");
      fs.writeFileSync("Users.json",JSON.stringify(currentUser));
    }
  }
  res.redirect('readlist');
  return;
  });
  //add mockingbird
app.post('/mockingbird', function(req, res){
  currentUser=JSON.parse(fs.readFileSync("Users.json"));
  for(var i in currentUser){
    if(currentUser[i].Read.includes('mockingbird') && currentUser[i].Username==req.session.user){
      res.render('mockingbird',{Err: "Book Already in Want to Read"});
      return;
    }
    if(currentUser[i].Username==req.session.user && !(currentUser[i].Read.includes('mockingbird'))){
      currentUser[i].Read.push("mockingbird");
      fs.writeFileSync("Users.json",JSON.stringify(currentUser));
    }
  }
  res.redirect('readlist');
  return;
  });

  //add sun
app.post('/sun', function(req, res){
  currentUser=JSON.parse(fs.readFileSync("Users.json"));
  for(var i in currentUser){
    if(currentUser[i].Read.includes('sun') && currentUser[i].Username==req.session.user){
      res.render('sun',{Err: "Book Already in Want to Read"});
      return;
    }
    if(currentUser[i].Username==req.session.user && !(currentUser[i].Read.includes('sun'))){
      currentUser[i].Read.push("sun");
      fs.writeFileSync("Users.json",JSON.stringify(currentUser));
    }
  }
  res.redirect('readlist');
  return;
  });


//add to search results
app.post('/search', function(req, res){
var keyword= req.body.Search;
var finalKey= keyword.toLowerCase();
var filteredbooks=[];
allBooks=JSON.parse(fs.readFileSync("books.json"));
for(var i in allBooks){
  if(allBooks[i].name.includes(finalKey)){
    filteredbooks.push(allBooks[i].short)
  }
}
res.render('searchresults',{allBooks: filteredbooks});
return;
});


app.listen(process.env.PORT || 5000)

