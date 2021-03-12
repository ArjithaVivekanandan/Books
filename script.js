
document.getElementById("search_submit").innerHTML="Search";
document.getElementById("search_text").addEventListener("keypress", function(event) {
  
  if (event.key === "Enter") {
    
    apiCall();
  }
});

var Title_head=document.createElement("h3");
Title_head.setAttribute("class","text-primary");
Title_head.innerHTML="Title";

var break_line=document.createElement("br");



var Author_head=document.createElement("h4");
Author_head.setAttribute("class","text-success");
Author_head.innerHTML="Authors";

var Description_head=document.createElement("h4");
Description_head.setAttribute("class","text-success");
Description_head.innerHTML="Description ";

var Missing =document.createElement("div")
Missing.setAttribute("class","text-danger");
Missing.innerHTML="Not Available";

 async function apiCall()
 {
   content.innerHTML="";
  var search_str=document.getElementById("search_text").value;
  var data= await (await fetch("https://www.googleapis.com/books/v1/volumes?q="+search_str)).json();
  return handleResponse(data);  
}

 function handleResponse(response) {
  
  try{
    for (var i = 0; i < response.items.length; i++) {
      var item = response.items[i];
      
     if(!item.volumeInfo.title)
     {
      item.volumeInfo.title=Missing.outerHTML;
     }
     if(!item.volumeInfo.authors)
     {
      item.volumeInfo.authors=Missing.outerHTML;
     }
     if(!item.volumeInfo.description)
     {
      item.volumeInfo.description=Missing.outerHTML;
     }
     var card=document.createElement("div");
     card.setAttribute("class","card mb-3 p-2 text-justify");
     card.setAttribute("style","border:2px solid grey");
     
     var title_div = document.createElement("div");
    title_div.setAttribute("class","text-primary h4");
    title_div.setAttribute("style","height:2rem;overflow:auto;");
     title_div.innerHTML=item.volumeInfo.title;

     var author_div = document.createElement("div");
     author_div.setAttribute("style","height:2rem;overflow:auto");
     author_div.innerHTML=item.volumeInfo.authors;

     var desc_div = document.createElement("div");
     desc_div.setAttribute("style","height:4rem;overflow:auto");
     desc_div.innerHTML=item.volumeInfo.description;
     card.innerHTML = "<br>"+ title_div.outerHTML+ "<hr>"+Author_head.outerHTML+author_div.outerHTML+ "<br>"+Description_head.outerHTML+desc_div.outerHTML+"<br>";
    
     document.getElementById("content").append(card);

    }
  }
  catch{
    var error_me=document.createElement("div");
    error_me.setAttribute("class","text-danger h2");
    error_me.innerHTML="Oooops..No Records Found!!!";
    document.getElementById("content").innerHTML = error_me.outerHTML;
  }
  
}
