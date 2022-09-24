var genresList=[];

let apikey = "677792fa";
let urlString = window.location.href;
let url = new URL(urlString);
let isFavorite = false;
let searchString = url.searchParams.get("title");
movieDetails();
function movieDetails() {

    fetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${searchString}`)
        .then((response) => response.json())
        .then((data) => {


            details = ` 
                   
            <div class="title" > 
                <span class="movie-title col-12 display-4">${data.Title}</span>
            </div> 
                       
            <hr class="hr">

            <div class="movie-plot font-family">
                ${data.Plot}
            </div>

            <div class="movie-details font-family">
                
                <div class="movie-poster">
                    <img src="${data.Poster}" width="200" height="300">
                </div>
                
                <span class="movie-data">
                    <p>
                    Imbdb Ratings
                    <p>
                        <span class="key"><button class="btn-style rating"><i class="fa-solid fa-star"></i> ${data.imdbRating}</button></span>
                        <span class="key"><button class="btn-style country">Votes: ${data.imdbVotes} </button> </span>
                     </p>   
                    </p>
                    
                    
                    <p><span class="key">Actors :</span> ${data.Actors}</p>
                    <p><span class="key">Genres : </span> ${data.Genre}</p>
                    <p><span class="key"> Director: </span> ${data.Director} </p>
                    <p><span class="key"> Release date: </span>${data.Released} </p>
                    
                                
                <span id="favSpan">
                    <button id="favButton" class="btn" onclick=addToFavList(searchString,"movie") >
                        <i id="favIcon" class="fa-solid fa-heart "></i> Add to favorites
                    </button>
                </span>



            </div>
            
            

            `

            document.getElementById('movie-details-container').innerHTML = details;

        });

}






                        // document.getElementById('fav').addEventListener('click',function(){

            // })





            //    data.Ratings.forEach(rating=>{
            //         console.log(rating.Source);
            //         ratings += `<div> 
            //         <span>1</span>
            //         </div>`

            //     })

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

            // let ratings = " ";

            // genresList = data.Genre;
            // console.log(`genre lsi is`,genresList[10]);

            // console.log(data);
            // searchString = data.imdbID;






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
