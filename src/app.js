const express = require("express");
const path=require("path")
const hbs=require("hbs")
const geoCode=require("./utils/geocode")
const forecast=require("./utils/forecast")

const app = express();
//define path goe expressconfig
const publicPath=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,"../templates/views")
const partialPath=path.join(__dirname,"../templates/partials")

//setup handklebars engine
app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialPath)

//setup static directory
app.use(express.static(publicPath))


//passing hbs content
app.get("", (req, res) => {
  res.render("index",{
      title:"Weather report",
      name:"Akash"
  })
});

app.get("/help", (req, res) => {
  res.render("help",{
      helpText:"This is help text.",
      name:"akash"
  })
});

app.get("/about", (req, res) => {
  res.render("about",{
    title:"About Me",
    name:"Akash"
  })
});

app.get("/products",(req,res)=>{
  if(!req.query.search){
    return res.send("you must provide a serach term")
  }
  res.send({
    product:[]
  })

})

app.get("/weather", (req, res) => {

  if(!(req.query.lattitude)){
    return res.send({
      error:"you must provide an address"
    })
  }

  geoCode(37.8267,-122.4233,(error,response)=>{
    if(error){
      return res.send(error)
    }

    forecast(req.query.lattitude,117,(forecastError,forecastdata)=>{
      if(forecastError){
        return res.send(forecastError)
      }

      res.send({
        forecastdata:forecastdata,

      })
    })
  })

  /*res.send({
    forecast: "It is raining",
    location: "India",
    address:req.query.address
  })*/
});

app.get("/hello",(req,res)=>{
  res.send({
      errorMessage:"hello page",
      name:"akash"
  })
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        errorMessage:"Help article not found",
        name:"akash"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        errorMessage:"Page not found",
        name:"akash"
    })
})



//passing array of objects


app.listen(3000, () => {
  console.log("Server is set up on port 3000");
});
