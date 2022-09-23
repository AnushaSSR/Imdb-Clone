

let apikey = "677792fa";
let urlString= window.location.href;
let url= new URL(urlString);
let isFavorite = false;
let searchString = url.searchParams.get("title");
movieDetails();
function movieDetails() {

    fetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${searchString}`)
        .then((response) => response.json())
        .then((data) => {
            let ratings=" ";


            console.log(data);
            searchString=data.imdbID;
            
            details=`

            <div class="text-center" id="fav" onClick="addToFavList(searchString)"><span id="favText">Add to Favorites <i id="favButton" class="fa-regular fa-heart"></i></div>
            </div>
    
            <div>
            <div class="title"> <span class="movie-title col-12 display-4">${data.Title}</span></div> 
            
                        
            <div class="movie-plot">
            <p>${data.Plot}</p>
            </div>

            <div class="movie-details">
                
                <div class="movie-poster"><img src="${data.Poster}" width="200" height="300"></div>
                
                <span class="movie-data">
                    <p>Actors : ${data.Actors}</p>
                    <p>IMDB Rating: ${data.imdbRating}</p>

                </span>  
                    
            </div>
            
            
            `

            // document.getElementById('fav').addEventListener('click',function(){

            // })

            



        //    data.Ratings.forEach(rating=>{
        //         console.log(rating.Source);
        //         ratings += `<div> 
        //         <span>1</span>
        //         </div>`

        //     })
          document.getElementById('movie-details-container').innerHTML =details;
            // document.getElementById('movie-ratings').innerHTML=ratings;

        //     var details=" ";

        //     var searchList = document.getElementById('search-list');

        //     searchList.innerHTML = " ";

        //     if (data.Search) {
        //         details += <div> ${Search.Title}</div>


        //     }

        //     else {
        //         var listVal = document.createElement('li');
        //         listVal.innerHTML = "No matching results found";

        //         searchList.appendChild(listVal);

        //         // results = `<span> No matching results found type to continue search </span>`
        //         console.log("No matching results found");
        //     }

        });

}






// function check(val) {
//     console.log("chcek", val);
// }


// function movieDetails(title) {


//     fetch(`http://www.omdbapi.com/?apikey=${apikey}&t=${title}`)
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data);
//         var display = `<spam> ${title} </span>`

//         document.getElementById('movie-details').innerHTML=display;

//     });

// }
