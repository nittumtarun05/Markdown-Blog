const express=require('express')
const mongoose=require('mongoose')
const articleRouter=require('./routes/articles')
const Article=require('./models/article')
const methodOverride=require('method-override')
const app=express()

const db = "mongodb://localhost/blog";

mongoose.connect(db, {
        useCreateIndex:true,
        useUnifiedTopology:true,
        useNewUrlParser:true
    }).then( () => {
          console.log("Connected To Mongo Db DataBase");
      }).catch((err) => {
        console.log("DataBase Connection Error " + err);
    })

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))//to extract data from form
app.use(methodOverride('_method'))

app.get('/',async (req,res)=>
{
    const articles=await Article.find().sort({
        createdAt:'desc'
    })

    res.render('articles/index',{articles:articles})
})

app.use('/articles',articleRouter)

app.listen(5000)