import express from "express";
import axios from 'axios';
import pg from "pg";
import bodyParser from "body-parser";
import cytoscape from 'cytoscape';
import cise from "cytoscape-cise";
import d3Force from 'cytoscape-d3-force';
import dagre from 'cytoscape-dagre';
import session from "express-session"
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import { validateRegister } from "./utils/validator.js";

// axios.get("https://iot-admin.meseeagro.com/plant_big_data/api/v1/search?plant_name=辣椒")
//  .then(res=> res.data)
// .then(data=> console.log(data))
// .catch(err=> console.log("error by catch", err))

const app = express();
const port = 3000;
const saltRounds = 10

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use(session({
  secret:"TOP",
  resave:false,
  saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client(
  {
    user:"postgres",
    host:"localhost",
    database:"world",
    password:"rorana123",
    port:5432
  }
  )
db.connect()
const db2 = new pg.Client(
  {
    user:"postgres",
    host:"localhost",
    database:"secrets",
    password:"rorana123",
    port:5432
  }
  )
db2.connect()


app.get("/mindmap", (req, res) => {
      const mindmapData = {
            id: 1,
            content: 'Root Node',
            children: [
              {
                id: 2,
                content: 'Child Node 1',
                children: [
                  {
                    id: 3,
                    content: 'Grandchild Node 1',
                    children: []
                  },
                  {
                    id: 4,
                    content: 'Grandchild Node 2',
                    children: []
                  }
                ]
              },
              {
                id: 5,
                content: 'Child Node 2',
                children: []
              }
            ]
          };
          res.render('mindmap.ejs', {data:"fronm ejs"});
});

// app.get("/",(req, res)=>{
//   db.query("SELECT * FROM nodes", (err, result)=>{
//     if(err){
//       console.log(err)
//     }else{
//       let countries = [];
//       for(let i=0; i<result.rows.length; i++){
//         countries.push(result.rows[i].country_code)
//       }
//       console.log(countries)
//       res.render("index.ejs", {countries, total:countries.length})
//     };
//   //  db.end()
//   });
//   });

app.post("/add", (req, res) => {
  const country = req.body.country;
  console.log(country);
})

app.get("/cytoscape", (req, res) => {
  res.render("cytoscape.ejs")
});
app.get("/mermaid", (req, res) => {
  res.render("mindmap.ejs")
});
app.get("/main-map", (req, res) => {
  res.render("main-map.ejs")
});
app.get("/cola-map", (req, res) => {
  res.render("cola-map.ejs")
});
app.get("/cola-map1", (req, res) => {
  db.query("SELECT * FROM fruits", (err, result)=>{
    if(err){
      console.log("err")
    }else{
      console.log(result.rows)
      let nodes1 = [  {data:{id:"center1", }, classes: 'category'}]
      const fruits = result.rows;
      for(let i = 0; i <  fruits.length; i++){
        nodes1.push(  
          {data:{id:`a${i}`, 
          info:{
            id:fruits[i].id,
            category:fruits[i].category,
            sub_category:fruits[i].sub_category,
            name:fruits[i].name,
            variety:fruits[i].variety
          }, 
          edgeId:`ae${i}`,}, 
          classes: 'sub1' });
        nodes1.push(  {data:{id:`ae${i}`, source:"center1", target:`a${i}`}})
      }
      res.render("cola-map1.ejs", {nodes1} );
    }
  }
  )})
  app.get("/login", (req,res)=>{
    res.render("login.ejs", {emailError:false, passwordError: false})
  });
  app.get("/register", (req,res)=>{
    res.render(
      "register.ejs",
      {
        nameError:false,
        name:"",
        usernameError :false,
        username :"",
        passwordError:false,
        password:"",
        confirmError:false,
        confirm:"",
      }
    );
  })
app.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login2",
}));
app.post("/register",async (req,res)=>{
 const {errCount, errors } =  validateRegister(req.body);
 console.log(typeof errCount, errors)
 if(errCount === 0){
    try{
      //check if email exists
      const checkResult  =await  db.query(
        "SELECT * FROM users WHERE email = $1 ",
        [req.body.username]
        )
        if(checkResult.rowCount===0){
          bcrypt.hash(req.body.password, saltRounds, async(err, hash)=>{
            if (err) {
              console.error("Error hashing password:", err);
            } else {
              const result = await db.query(
                `INSERT INTO users (email, password) VALUES ($1,$2) RETURNING *`,
                [req.body.username, hash]
                )
              const user = result.rows[0];
              req.login(user, ()=>{
                res.redirect("/")
              })
            }
          } )
        }
    }catch(err){ res.render(
      "register.ejs",
      {
        nameError:false,
        name:"",
        usernameError :false,
        username :"",
        passwordError:false,
        password:"",
        confirmError:false,
        confirm:"",
      }
    );}
 }else{
  
  res.render("register.ejs",{...errors, ...req.body })
 }
 

} )


  // app.post("/login", async (req,res)=>{
  //   const email = req.body.username;
  //   const password = req.body.password;
  //   try{
  //     const user = await db2.query(
  //       "SELECT * FROM users WHERE email=$1",
  //       [email]
  //       );
  //     if(user.rowCount===0){res.render("login.ejs", {emailError :true, passwordError:false}); }
  //     else{
  //       if(user.rows[0].password === password){ res.redirect("/cola-map2")}
  //       else{res.render("login.ejs", {emailError:false, passwordError :true})}
       
  //     }
  //   }catch(err){console.log(err)}
    
  // })
  app.get("/cola-map2", (req, res) => {
    db.query("SELECT * FROM fruits", (err, result)=>{
      if(err){
        console.log("err fetching fruits")
      }else{
        console.log(result.rows)
        let nodes1 = [  {data:{id:"center1", }, classes: 'category'}]
        const fruits = result.rows;
        for(let i = 0; i <  fruits.length; i++){
          nodes1.push(  
            {data:{id:`a${i}`, 
            info:{
              id:fruits[i].id,
              category:fruits[i].category,
              sub_category:fruits[i].sub_category,
              name:fruits[i].name,
              variety:fruits[i].variety
            },
         
            edgeId:`ae${i}`,}, 
            classes: 'sub1' });
          nodes1.push(  {data:{id:`ae${i}`, source:"center1", target:`a${i}`}, classes: 'sube1'}, )
        }
        res.render("cola-map2.ejs", {nodes1} );
      }
    }
    )})
  app.get("/logout", (req,res)=>{
    req.logout((err)=>{
      if(err){
        console.log(err)
      }else{
        res.redirect("/login")
      }
    })
  })
app.get("/",async (req, res)=>{
  console.log(req.body)
  console.log("is authenticates", req.isAuthenticated(), req.user)
  if(req.isAuthenticated()){
  try{
    const fruits = await db.query("SELECT * FROM food WHERE category='水果' ");
    const vegetables = await db.query("SELECT * FROM food WHERE category='蔬菜' ");
    const others = await db.query(" SELECT * FROM food WHERE category='粮油米面' ");
    // 热带水果/柑橘类/浆果类/瓜果类/核果仁果类
   let nodesFruits = {
    category:{data:{id:"fruits", parent:"parentBread", label:"水果"}, classes: 'category'},
    subsData:[],
    namesData:{},
    varietiesData:{}
  };
  let nodesVegetables = {
    category:{data:{id:"vegetables", parent:"parentBread", label:"蔬菜"}, classes: 'category'},
    subsData:[],
    namesData:{},
    varietiesData:{}
  };
  let nodesOthers = {
    category:{data:{id:"others",parent:"parentBread", label:"粮油米面"}, classes: 'category'},
    subsData:[],
    namesData:{},
    varietiesData:{}
  };
  function generateCyData (fetchData,nodesData, source){
 //create the subsList
 const Subs = [];
 fetchData.rows.forEach((fruit)=>{
   if(!Subs.includes(fruit.sub_category)){
     Subs.push(fruit.sub_category);
   }
 })
//create subs nodes (source static: fruits)
Subs.forEach((sub,subIndex)=>{
   nodesData.subsData.push(
     {data:{id:`${source}a${subIndex}`, isAddon:"false",label:sub, type:"subs", category:source, edgeId:`${source}ae${subIndex}`}, classes: 'sub1'},
     {data:{id:`${source}ae${subIndex}`, isAddon:"false", source:source, target:`${source}a${subIndex}`}, classes: 'sube1'},
     )

   //create the namesList of each Sub
   let names = [];
   let subObjects = fetchData.rows.filter(item=> item.sub_category === sub)
   subObjects.forEach(item =>{
   if(!names.includes(item.name))
   names.push(item.name)
   })
   //create names nodes (source dynamic: subIndex)
   names.forEach((name, nameIndex)=>{
         if(!nodesData.namesData[sub]){
           nodesData.namesData[sub] = [];
         }
           nodesData.namesData[sub].push(
             {data:{id:`${source}a${subIndex}${nameIndex}`, isAddon:"true", label:name, type:"names", category:source, edgeId:`${source}ae${subIndex}${nameIndex}`}, classes: 'sub1'},
           {data:{id:`${source}ae${subIndex}${nameIndex}`,isAddon:"true", source:`${source}a${subIndex}`, target:`${source}a${subIndex}${nameIndex}`}, classes: 'sube1 hide'},
           )

           //create the namesList of each Sub of each name
           let varieties = [];
           let nameObj = fetchData.rows.filter(item=>item.name === name);
           nameObj.forEach(item=>{
             if(!varieties.includes(item.variety)){
               varieties.push(item.variety);
             }
           })
           varieties.forEach((variety, varietyIndex)=>{
             if(!nodesData.varietiesData[name]){
                nodesData.varietiesData[name] = []
             }
             nodesData.varietiesData[name].push(
               {data:{id:`${source}a${subIndex}${nameIndex}${varietyIndex}`, isAddon:"true", parentSub:sub, type:"varieties",label:variety,category:source, edgeId:`${source}ae${subIndex}${nameIndex}${varietyIndex}`}, classes: ''},
               {data:{id:`${source}ae${subIndex}${nameIndex}${varietyIndex}`, isAddon:"true", source:`${source}a${subIndex}${nameIndex}`, target:`${source}a${subIndex}${nameIndex}${varietyIndex}`}, classes: ''},
             )
           })
    })
    })}
    generateCyData(fruits, nodesFruits, "fruits");
    generateCyData(vegetables, nodesVegetables, "vegetables");
    generateCyData(others, nodesOthers, "others");

    
    res.render("cola-map3.ejs",{nodesFruits, nodesVegetables, nodesOthers,username:req.user.email ,
      cise,d3Force, dagre })
  }catch(err){
    console.log("error of fetching catched", err)
  }
}else{
  res.redirect("/login")
}
})


passport.use(new Strategy(async function verify(username, password, cb){
  console.log("hello strategy")
  try{
    const result = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [username]
      );
      console.log("result", result)
    if(result.rowCount===0){
      req.emailFail = true
      cb(true);
      // res.render("login.ejs", {emailError :true, passwordError:false});
     }
    else{
     const user = result.rows[0];
     const storedHashedPassword = user.password;
     bcrypt.compare(password, storedHashedPassword, (err, valid)=>{
      if(err){
        cb(err)
      }else{
        if(valid){
          cb(null, user)
        }else{
          cb(null, false)
        }
      }
     })
     
    }
  }catch(err){
    console.log("error of catch ",err)
  }
})
)

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// let namesData = {};
// let label = "mango"
// let sub="a"
// namesData[label] = [1,2,3,4]
// console.log(namesData[sub])

// function reverse(str){
//   let reverseStr = ""
//   for(let i=0; i<str.length; i++){
//     var indexAdd = str.length - i -1
//     console.log(indexAdd)
//     reverseStr += str[indexAdd]
//   }
//   return console.log(reverseStr)
// };
// reverse("abcd")  //adba
// function addUpTo (n){
//   let result = 0;
//   for(let i = 0; i <= n; i++){
//     result += n-i
//   }
//   return console.log(result);
// }

// addUpTo(5)


