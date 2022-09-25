let isFavourite = false;
let favMovieList = [];

if (JSON.parse(localStorage.getItem("favlist"))) {
    favMovieList = JSON.parse(localStorage.getItem("favlist"))
}

window.onload = displayFavListMain(favMovieList);

function addToFavList(movieID, page) {
    // console.log("data from the list is",favMovieList);
    let index = favMovieList.filter(movielist => {
        return movielist.imdbID === movieID;
    });

    if (index.length == 0) {

        setProperties(movieID, page);

        fetch(`http://www.omdbapi.com/?apikey=677792fa&i=${movieID}`)
            .then((response) => response.json())
            .then((data) => {
                setFavList(data);
            });


    }
    else {
        alert("Already added to favourites, Check My favourites for further actions");
    }

}


function setFavList(movieInfo) {

    favMovieList.push(movieInfo);
    console.log(`movie added is `, movieInfo);

    // favMovieList.forEach(id=>{

    //     console.log(`id's added are`,id[0].Type);
    // });


    localStorage.setItem("favlist", JSON.stringify(favMovieList));

};

function movieExists(movieID) {
    let index = favMovieList.filter(movielist => {
        return movielist.imdbID === movieID;
    });

    if (index.length != 0) {
        return true;
    }

    else {
        return false;
    }


}
function setProperties(movieInfo, page) {
    console.log(`*****************************`, movieInfo);
    if (page == "movie") {
        document.getElementById('favButton').innerText = "Added to favorites";
        document.getElementById('favButton').style.setProperty('background-color', "black");
        document.getElementById('favButton').style.setProperty('color', "gold");

        console.log(isFavourite);
    }

    else {
        document.getElementById(`favButtonHome-${movieInfo}`).style.setProperty('color', "red");
        document.getElementById(`favButtonHome-${movieInfo}`).setAttribute('title', "Added to favorites");
        document.getElementById(`favButtonHome-${movieInfo}`).disabled = true;





    }


}

function displayFavListMain(favlist) {

    let favList = "";

    favlist.forEach(get);
    function get(movieDetails) {
        console.log(movieDetails);
        favList +=
            `<li class="fav-list-item">
            <span class="fav-list-item-span">
                <span class="ratings">
                    <span class="movie-ratings font-style">
                        <span class="rating-details key">Awards<span>
                        <span class="key"><button class="btn-style awards"> ${movieDetails.Awards}</button></span>
                    </span>  
                    <span class="awards font-style">
                        <span class="rating-details key">Imbdb Ratings<span>
                        <span class="key"><button class="btn-style rating"><i class="fa-solid fa-star"></i> ${movieDetails.imdbRating}</button></span>
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
                        <hr>
                        <span class="crew">
                        <span class="actors-span key">Actors: ${movieDetails.Actors}</span>
                        <span class="director-span key"> Director: ${movieDetails.Director}</span> 
                        <span class="release-span key">Runtime: ${movieDetails.Runtime}</span>
                        <span>
                    </span>
                </div>

                <div>
                    <button class="remove-item-button"> Remove from favourites </button>
                </div>
            </span>
            
            </li>`
        console.log(document.getElementById('check'));
        document.getElementById('fav-list').innerHTML = favList;
    }

}
