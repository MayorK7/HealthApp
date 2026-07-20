const newsContainer =
document.getElementById("newsContainer");



async function loadHealthNews(){


try{


const res = await fetch(
"/api/news"
);


const articles = await res.json();



newsContainer.innerHTML="";



articles.forEach(article=>{


newsContainer.innerHTML += `


<div class="col-md-4 mb-4">


<div class="card shadow-sm h-100">


<img 

src="${
article.image ||
'../images/news-placeholder.jpg'
}"

class="card-img-top"

height="200">


<div class="card-body">


<h5>

${article.title}

</h5>


<p>

${article.description || ""}

</p>


<small class="text-muted">

${article.source}

</small>


<br><br>


<a 

href="${article.url}"

target="_blank"

class="btn btn-primary">

Read Full Article

</a>


</div>


</div>


</div>


`;


});


}


catch(err){

console.log(err);

}


}



loadHealthNews();