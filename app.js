//requirements
var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Who's Logged in
var myUser= "slim";

//GET

// load Homescreen
app.get('/', function(req, res) {
res.render('login',{Err:""})
});

//load registration
app.get('/registration', function(req, res){
res.render('registration',{Err:""});
});

//Load Home
app.get('/home', function(req, res){
  res.render('home');
  console.log(myUser)
  });

//Load Novel
app.get('/novel', function(req, res){
  res.render('novel');
  });

//Load Poetry
app.get('/poetry', function(req, res){
  res.render('poetry');
  });
//Load Fiction
app.get('/fiction', function(req, res){
  res.render('fiction');
  });

//Load want to read
app.get('/readlist', function(req, res){
  myBooks = [];
  currentUser=JSON.parse(fs.readFileSync("Users.json"));
  for(var i in currentUser){
    if(currentUser[i].Username==myUser){
      myBooks=currentUser[i].Read;
    }
  }
  res.render('readlist',{Books:myBooks});
  });

//Load search results
app.get('/searchresults', function(req, res){
  
  res.render('searchresults');
  });

//Books
//Load LOF
app.get('/flies', function(req, res){
  res.render('flies',{Err:""});
});

//Load Dunes
app.get('/dune', function(req, res){
  res.render('dune',{Err:""});
  });

//Load grapes
app.get('/grapes', function(req, res){
  res.render('grapes',{Err:""});
  });

//Load leaves
app.get('/leaves', function(req, res){
  res.render('leaves',{Err:""});
  });

//Load mockingbird
app.get('/mockingbird', function(req, res){
  res.render('mockingbird',{Err:""});
  });

//Load sun
app.get('/sun', function(req, res){
  res.render('sun',{Err:""});
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
    res.redirect('/home');
    myUser= currentUser[i].Username;}
}
res.render('login',{Err: "Invalid Username/Passowrd"});
});

//add books
//add LOF
app.post('/flies', function(req, res){
  currentUser=JSON.parse(fs.readFileSync("Users.json"));
  for(var i in currentUser){
    if(currentUser[i].Read.includes('flies') && currentUser[i].Username==myUser){
      res.render('flies',{Err: "Book Already in Want to Read"});
      return;
    }
    if(currentUser[i].Username==myUser){
      currentUser[i].Read.push("flies");
      fs.writeFileSync("Users.json",JSON.stringify(currentUser));
    }
  }
  res.redirect('readlist');
});

  //add dune
app.post('/dune', function(req, res){
  currentUser=JSON.parse(fs.readFileSync("Users.json"));
  for(var i in currentUser){
    if(currentUser[i].Read.includes('dune') && currentUser[i].Username==myUser){
      res.render('dune',{Err: "Book Already in Want to Read"});
      return;
    }
    if(currentUser[i].Username==myUser && !(currentUser[i].Read.includes('dune'))){
      currentUser[i].Read.push("dune");
      fs.writeFileSync("Users.json",JSON.stringify(currentUser));
    }
  }
  res.redirect('readlist');
  });

  //add grapes
app.post('/grapes', function(req, res){
  currentUser=JSON.parse(fs.readFileSync("Users.json"));
  for(var i in currentUser){
    if(currentUser[i].Read.includes('grapes') && currentUser[i].Username==myUser){
      res.render('grapes',{Err: "Book Already in Want to Read"});
      return;
    }
    if(currentUser[i].Username==myUser && !(currentUser[i].Read.includes('grapes'))){
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
    if(currentUser[i].Read.includes('leaves') && currentUser[i].Username==myUser){
      res.render('leaves',{Err: "Book Already in Want to Read"});
      return;
    }
    if(currentUser[i].Username==myUser && !(currentUser[i].Read.includes('leaves'))){
      currentUser[i].Read.push("leaves");
      fs.writeFileSync("Users.json",JSON.stringify(currentUser));
    }
  }
  res.redirect('readlist');
  });
  //add mockingbird
app.post('/mockingbird', function(req, res){
  currentUser=JSON.parse(fs.readFileSync("Users.json"));
  for(var i in currentUser){
    if(currentUser[i].Read.includes('mockingbird') && currentUser[i].Username==myUser){
      res.render('mockingbird',{Err: "Book Already in Want to Read"});
      return;
    }
    if(currentUser[i].Username==myUser && !(currentUser[i].Read.includes('mockingbird'))){
      currentUser[i].Read.push("mockingbird");
      fs.writeFileSync("Users.json",JSON.stringify(currentUser));
    }
  }
  res.redirect('readlist');
  });

  //add sun
app.post('/sun', function(req, res){
  currentUser=JSON.parse(fs.readFileSync("Users.json"));
  for(var i in currentUser){
    if(currentUser[i].Read.includes('sun') && currentUser[i].Username==myUser){
      res.render('sun',{Err: "Book Already in Want to Read"});
      return;
    }
    if(currentUser[i].Username==myUser && !(currentUser[i].Read.includes('sun'))){
      currentUser[i].Read.push("sun");
      fs.writeFileSync("Users.json",JSON.stringify(currentUser));
    }
  }
  res.redirect('readlist');
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
});


app.listen(process.env.PORT || 5000)

