
document.getElementById("search_submit").innerHTML="Search";
document.getElementById("search_text").addEventListener("keypress", function(event) {
  
  if (event.key === "Enter") {
    
    apiCall();
  }
});

var Title_head=document.createElement("h5");
Title_head.setAttribute("class","text-primary");
Title_head.innerHTML="Title";


var Author_head=document.createElement("h6");
Author_head.setAttribute("class","text-success");
Author_head.innerHTML="Authors";

var Description_head=document.createElement("h6");
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
     
      document.getElementById("content").innerHTML += "<br>"+Title_head.outerHTML + item.volumeInfo.title+ "<br>"+Author_head.outerHTML+item.volumeInfo.authors+ "<br>"+Description_head.outerHTML+item.volumeInfo.description+"<br>";
    }
  }
  catch{
    document.getElementById("content").innerHTML = "No records found";
  }
  
}
