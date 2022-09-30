//api key for fetching the data from the api
let apikey = "677792fa";

//method to get the URL and get the params from it
let urlString = window.location.href;
let url = new URL(urlString);
let isFavorite = false;
let searchString = url.searchParams.get("title").trim();//trimmed to delet the spaces added

//method call to fetch the details when user clicked on a movie
movieDetails();


//method to fetch the details when user clicked on a movie by ID
function movieDetails() {
    fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${searchString}`)
        .then((response) => response.json())
        .then((data) => {
            //add details to the search list
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
                        <span class="key"><button class="btn-style rating" disabled><i class="fa-solid fa-star"></i> ${data.imdbRating}</button></span>
                        <span class="key"><button class="btn-style country" disabled>Votes: ${data.imdbVotes} </button> </span>
                     </p>   
                    </p>     
                    <p><span class="key">Actors: </span> ${data.Actors}</p>
                    <p><span class="key">Genres: </span> ${data.Genre}</p>
                    <p><span class="key">Director: </span> ${data.Director} </p>
                    <p><span class="key">Released: </span>${data.Released} </p>     
                    <span id="favSpan">                
                        <button id="favButton" class="btn" onclick=addToFavList(searchString,"movie") >
                            <i id="favIcon" class="fa-solid fa-heart "></i> Add to favorites
                        </button>
                    </span>
                </span>
            </div>`
            document.getElementById('movie-details-container').innerHTML = details;
            //validation to check if the movie is alreday added to list and modify the button appearance
            if(movieExists(data.imdbID)){
                const favButton= document.getElementById('favSpan');
                const favSpan =`<span id="favSpan">                
                <button id="favButton" class="btn" style="color:yellow ; background-color:black" onclick=addToFavList(searchString,"movie")>
                    Added to favorites
                </button>
            </span>`
            favButton.innerHTML=favSpan;
            }
        });
}
