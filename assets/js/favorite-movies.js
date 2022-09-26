let isFavourite = false;
let favMovieList = [];
//get the values from local storage and add to the list
if (JSON.parse(localStorage.getItem("favlist"))) {
    favMovieList = JSON.parse(localStorage.getItem("favlist"))
}
//method call to display the favourites movies list
displayFavList(favMovieList);

//method called on click event in the pages to add to favourite
function addToFavList(movieID, page) {
    //filter method used to check if the id added already present in the list of favorites
    let index = favMovieList.filter(movielist => {
        return movielist.imdbID === movieID;
    });
    //if not present in the list
    if (index.length == 0) {
        //methods call to set the properties of the buttons
        setProperties(movieID, page);
        fetch(`http://www.omdbapi.com/?apikey=677792fa&i=${movieID}`)
            .then((response) => response.json())
            .then((data) => {
                //method call to set the movie id into the list 
                setFavList(data);
            });
    }
    else {
        //alert the user if the movie added is already present in the list
        alert("Already added to favourites, Check My favourites for further actions");
    }
}

//method to set the movie id into the list 
function setFavList(movieInfo) {
    favMovieList.push(movieInfo);
    localStorage.setItem("favlist", JSON.stringify(favMovieList));
};

//method to check if the movie id alreday presnt in the list
function movieExists(movieID) {
    let index = favMovieList.filter(movielist => {
        return movielist.imdbID == movieID;
    });
    //if exists return true else false
    if (index.length != 0) {
        return true;
    }
    else {
        return false;
    }
}

//method to set the properties of the add to favorite icons and buttons
function setProperties(movieInfo, page) {
    if (page == "movie") {
        document.getElementById('favButton').innerText = "Added to favorites";
        document.getElementById('favButton').style.setProperty('background-color', "black");
        document.getElementById('favButton').style.setProperty('color', "gold");
    }
    else {
        document.getElementById(`favButtonHome-${movieInfo}`).style.setProperty('color', "red");
        document.getElementById(`favButtonHome-${movieInfo}`).setAttribute('title', "Added to favorites");
        document.getElementById(`favButtonHome-${movieInfo}`).disabled = true;
    }
}

//method to remove the movie from the list
function removeFromList(movieID) {
    // var favFetch=JSON.parse(favMovieList.getItem("favlist"));
    var changedList = favMovieList.filter(movieList => {
        return movieList.imdbID != movieID;
    });
    localStorage.setItem("favlist", JSON.stringify(changedList));
    location.reload();
}

//Method to display the favourite list
function displayFavList(favlist) {
    let favList = "";
    //if the fav list is not empty, display the movies. Else display the message 
    if (favlist.length != 0) {
        favlist.forEach(get);

        function get(movieDetails) {
            favList +=
                `<li class="fav-list-item">
            <span class="fav-list-item-span">
                <span class="ratings">
            
                    <span class="movie-ratings font-style">
                        <span class="awards key">Awards<span>
                        <span class="key"><button class="btn-style awards" disabled> ${movieDetails.Awards}</button></span>
                    </span>  
                    <span class="rating-details font-style">
                        <span class="ratings-value key">Imdb Ratings<span>
                        <span class="key"><button class="btn-style rating" disabled><i class="fa-solid fa-star"></i> ${movieDetails.imdbRating}</button></span>
                    </span>                  
                </span>
                <hr>
                <div class="movie-details">
                    <span>
                        <img src="${movieDetails.Poster}" alt=" width="200px" height="200px" margin="10px">
                    </span>
                    <span class="details-span ">
                        <h2 class="movie-title font-style">${movieDetails.Title}</h2>
                        <span class="plot-span plot"> ${movieDetails.Plot}</span>                       
                        <span class="crew">
                            <span class="actors-span key">Actors: ${movieDetails.Actors}</span>
                            <span class="director-span key"> Director: ${movieDetails.Director}</span> 
                            <span class="release-span key">Runtime: ${movieDetails.Runtime}</span>
                        <span>
                    </span>
                </div>
                <hr>
                <div style="text-align: center">
                    <button class="remove-item-button" onclick="removeFromList('${movieDetails.imdbID}')"> Remove from favourites </button>
                </div>
            </span>
        </li>`
        }
    } else {
        favList = `<hr class="empty-list-hr"> <h4 class="empty-list">No favorites added.<a href="home.html" class="home-link"> Click here</a> to continue to home </h4><hr class="empty-list-hr>`
    }
    //add to element if it exists
    if (document.getElementById('fav-list') != null) {
        document.getElementById('fav-list').innerHTML = favList;
    }
}
