import express from "express";
import axios from "axios";
import pg from "pg";
import bodyParser from "body-parser";
import cytoscape from "cytoscape";
import cise from "cytoscape-cise";
import d3Force from "cytoscape-d3-force";
import dagre from "cytoscape-dagre";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import { validateRegister, validateLogin } from "./utils/validator.js";
import env from "dotenv";
import WeixinStrategy from "passport-wechat";

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

app.get("/cola-map1", (req, res) => {
  db.query("SELECT * FROM fruits", (err, result) => {
    if (err) {
      console.log("err");
    } else {
      console.log(result.rows);
      let nodes1 = [{ data: { id: "center1" }, classes: "category" }];
      const fruits = result.rows;
      for (let i = 0; i < fruits.length; i++) {
        nodes1.push({
          data: {
            id: `a${i}`,
            info: {
              id: fruits[i].id,
              category: fruits[i].category,
              sub_category: fruits[i].sub_category,
              name: fruits[i].name,
              variety: fruits[i].variety,
            },
            edgeId: `ae${i}`,
          },
          classes: "sub1",
        });
        nodes1.push({
          data: { id: `ae${i}`, source: "center1", target: `a${i}` },
        });
      }
      res.render("cola-map1.ejs", { nodes1 });
    }
  });
});
app.get("/login", (req, res) => {
  res.render("login.ejs", {
    usernameError: false,
    username: "",
    passwordError: false,
    password: "",
  });
});
app.get("/register", (req, res) => {
  res.render("register.ejs", {
    nameError: false,
    name: "",
    usernameError: false,
    username: "",
    passwordError: false,
    password: "",
    confirmError: false,
    confirm: "",
  });
});
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/login");
    }
  });
});
app.post("/login", async (req, res) => {
  const { errCount, errors } = validateLogin(req.body);
  if (errCount === 0) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email=$1", [
        req.body.username,
      ]);
      console.log("result", result);
      if (result.rowCount === 0) {
        res.render("login.ejs", {
          usernameError: "用户名找不到",
          username: req.body.username,
          passwordError: null,
          password: "",
        });
      } else {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(
          req.body.password,
          storedHashedPassword,
          (err, valid) => {
            if (err) {
              cb(err);
            } else {
              if (valid) {
                req.login(user, () => {
                  res.redirect("/");
                });
              } else {
                res.render("login.ejs", {
                  usernameError: null,
                  username: req.body.username,
                  passwordError: "密码错误",
                  password: "",
                });
              }
            }
          }
        );
      }
    } catch (err) {
      console.log("error of catch ", err);
    }
  } else {
    res.render("login.ejs", {
      ...errors,
      username: req.body.username,
      password: "",
    });
  }
});
app.post("/register", async (req, res) => {
  const { errCount, errors } = validateRegister(req.body);
  console.log(typeof errCount, errors);
  if (errCount === 0) {
    try {
      //check if email exists
      const checkResult = await db.query(
        "SELECT * FROM users WHERE email = $1 ",
        [req.body.username]
      );
      if (checkResult.rowCount === 0) {
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
          if (err) {
            console.error("Error hashing password:", err);
          } else {
            const result = await db.query(
              `INSERT INTO users (email, password) VALUES ($1,$2) RETURNING *`,
              [req.body.username, hash]
            );
            const user = result.rows[0];
            req.login(user, () => {
              res.redirect("/");
            });
          }
        });
      }
    } catch (err) {
      res.render("register.ejs", {
        nameError: false,
        name: "",
        usernameError: false,
        username: "",
        passwordError: false,
        password: "",
        confirmError: false,
        confirm: "",
      });
    }
  } else {
    res.render("register.ejs", { ...errors, ...req.body });
  }
});
app.get("/auth/wechat", passport.authenticate("wechat"));
app.get(
  "/auth/wechat/secrets",
  passport.authenticate("wechat", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
app.get("/cola-map2", (req, res) => {
  db.query("SELECT * FROM fruits", (err, result) => {
    if (err) {
      console.log("err fetching fruits");
    } else {
      console.log(result.rows);
      let nodes1 = [{ data: { id: "center1" }, classes: "category" }];
      const fruits = result.rows;
      for (let i = 0; i < fruits.length; i++) {
        nodes1.push({
          data: {
            id: `a${i}`,
            info: {
              id: fruits[i].id,
              category: fruits[i].category,
              sub_category: fruits[i].sub_category,
              name: fruits[i].name,
              variety: fruits[i].variety,
            },

            edgeId: `ae${i}`,
          },
          classes: "sub1",
        });
        nodes1.push({
          data: { id: `ae${i}`, source: "center1", target: `a${i}` },
          classes: "sube1",
        });
      }
      res.render("cola-map2.ejs", { nodes1 });
    }
  });
});
app.get("/", async (req, res) => {
  console.log(req.body);

  if (true) {
    try {
      const fruits = await db.query(
        "SELECT * FROM food WHERE category='水果' "
      );
      const vegetables = await db.query(
        "SELECT * FROM food WHERE category='蔬菜' "
      );
      const others = await db.query(
        " SELECT * FROM food WHERE category='粮油米面' "
      );
      let nodesFruits = {
        category: {
          data: { id: "fruits", parent: "parentBread", label: "水果" },
          classes: "category",
        },
        subsData: [],
        namesData: {},
        varietiesData: {},
      };
      let nodesVegetables = {
        category: {
          data: { id: "vegetables", parent: "parentBread", label: "蔬菜" },
          classes: "category",
        },
        subsData: [],
        namesData: {},
        varietiesData: {},
      };
      let nodesOthers = {
        category: {
          data: { id: "others", parent: "parentBread", label: "粮油米面" },
          classes: "category",
        },
        subsData: [],
        namesData: {},
        varietiesData: {},
      };
      function generateCyData(fetchData, nodesData, source) {
        //create the subsList
        const Subs = [];
        fetchData.rows.forEach((fruit) => {
          if (!Subs.includes(fruit.sub_category)) {
            Subs.push(fruit.sub_category);
          }
        });
        //create subs nodes (source static: fruits)
        Subs.forEach((sub, subIndex) => {
          nodesData.subsData.push(
            {
              data: {
                id: `${source}a${subIndex}`,
                isAddon: "false",
                label: sub,
                type: "subs",
                category: source,
                edgeId: `${source}ae${subIndex}`,
              },
              classes: "sub1",
            },
            {
              data: {
                id: `${source}ae${subIndex}`,
                isAddon: "false",
                source: source,
                target: `${source}a${subIndex}`,
              },
              classes: "sube1",
            }
          );

          //create the namesList of each Sub
          let names = [];
          let subObjects = fetchData.rows.filter(
            (item) => item.sub_category === sub
          );
          subObjects.forEach((item) => {
            if (!names.includes(item.name)) names.push(item.name);
          });
          //create names nodes (source dynamic: subIndex)
          names.forEach((name, nameIndex) => {
            if (!nodesData.namesData[sub]) {
              nodesData.namesData[sub] = [];
            }
            nodesData.namesData[sub].push(
              {
                data: {
                  id: `${source}a${subIndex}${nameIndex}`,
                  isAddon: "true",
                  label: name,
                  type: "names",
                  category: source,
                  edgeId: `${source}ae${subIndex}${nameIndex}`,
                },
                classes: "sub1",
              },
              {
                data: {
                  id: `${source}ae${subIndex}${nameIndex}`,
                  isAddon: "true",
                  source: `${source}a${subIndex}`,
                  target: `${source}a${subIndex}${nameIndex}`,
                },
                classes: "sube1 hide",
              }
            );

            //create the namesList of each Sub of each name
            let varieties = [];
            let nameObj = fetchData.rows.filter((item) => item.name === name);
            nameObj.forEach((item) => {
              if (!varieties.includes(item.variety)) {
                varieties.push(item.variety);
              }
            });
            varieties.forEach((variety, varietyIndex) => {
              if (!nodesData.varietiesData[name]) {
                nodesData.varietiesData[name] = [];
              }
              nodesData.varietiesData[name].push(
                {
                  data: {
                    id: `${source}a${subIndex}${nameIndex}${varietyIndex}`,
                    isAddon: "true",
                    parentSub: sub,
                    type: "varieties",
                    label: variety,
                    category: source,
                    edgeId: `${source}ae${subIndex}${nameIndex}${varietyIndex}`,
                  },
                  classes: "",
                },
                {
                  data: {
                    id: `${source}ae${subIndex}${nameIndex}${varietyIndex}`,
                    isAddon: "true",
                    source: `${source}a${subIndex}${nameIndex}`,
                    target: `${source}a${subIndex}${nameIndex}${varietyIndex}`,
                  },
                  classes: "",
                }
              );
            });
          });
        });
      }
      generateCyData(fruits, nodesFruits, "fruits");
      generateCyData(vegetables, nodesVegetables, "vegetables");
      generateCyData(others, nodesOthers, "others");

      res.render("cola-map3.ejs", {
        nodesFruits,
        nodesVegetables,
        nodesOthers,
        // username: req.user.email,
        cise,
        d3Force,
        dagre,
      });
    } catch (err) {
      console.log("error of fetching catched", err);
    }
  } else {
    res.redirect("/login");
  }
});
passport.use(
  "wechat",
  new WeixinStrategy(
    {
      appID: "wx721a77739f7884f7",
      appSecret: "461c03a0c217cd1ee9c6af1ff0c5ecf4",
      //  callbackURL:"http://localhost:3000/auth/wechat/secrets",
      callbackURL: "https://cyto.meseeagro.com/auth/wechat/secrets",
      // requireState: false,
      // authorizationURL: 'https://open.weixin.qq.com/connect/oauth2/authorize',
      scope: "snsapi_userinfo",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      done(null, profile);
    }
  )
);
passport.use(
  new Strategy(async function verify(username, password, cb) {
    console.log("hello strategy");
    try {
      const result = await db.query("SELECT * FROM users WHERE email=$1", [
        username,
      ]);
      console.log("result", result);
      if (result.rowCount === 0) {
        cb(true);
        // res.render("login.ejs", {emailError :true, passwordError:false});
      } else {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            cb(err);
          } else {
            if (valid) {
              cb(null, user);
            } else {
              console.log("Passworderror");
              cb(null, false);
            }
          }
        });
      }
    } catch (err) {
      console.log("error of catch ", err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
