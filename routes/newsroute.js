import express from "express";
import axios from "axios";


const router = express.Router();



router.get("/", async(req,res)=>{


try{


const response = await axios.get(

"https://newsapi.org/v2/top-headlines",

{

params:{


category:"health",


language:"en",


apiKey:process.env.NEWS_API_KEY


}

}

);



const articles = response.data.articles.map(article=>({


title:article.title,


description:article.description,


image:article.urlToImage,


url:article.url,


source:article.source.name,


publishedAt:article.publishedAt


}));



res.json(articles);



}

catch(err){


console.log(
"News API Error:",
err.message
);



res.status(500).json({

message:"Unable to fetch health news"

});


}


});



export default router;