let apikey = "677792fa";
let searchString = " ";

//string for getting the random movie to be sent to fetch the recent movies
let titleValues = ["get", "cat", "ten"];
let valueIndex = Math.floor(Math.random() * titleValues.length);

//Method call to get the movie and display the recent movies on home page
getRecentMovies(titleValues[valueIndex]);

//Method to display the search results in the list, autosuggestions upon typing (appears after 3 letters)
function searchResults(searchString) {

    fetch(`http://www.omdbapi.com/?apikey=${apikey}&type=movie&s=${searchString}`)
        .then((response) => response.json())
        .then((data) => {
            var searchList = document.getElementById('search-list');
            searchList.innerHTML = " ";

            //if the data found with the string typed
            if (data.Search) {
                data.Search.forEach(searchResult => {
                    var listVal = document.createElement('li');
                    listVal.classList.add('list-val');

                    var listTitlePlot = document.createElement('span');
                    listTitlePlot.classList.add('set-span');

                    var listTitle = document.createElement('span');
                    listTitle.classList.add("list-title");
                    listTitle.innerText = searchResult.Title;

                    var imgSpan = document.createElement('span');
                    var listPoster = new Image();
                    listPoster.classList.add("list-poster");
                    listPoster.src = searchResult.Poster;
                    listPoster.width = "100";
                    listPoster.height = "100";

                    var favSpan = document.createElement('span');
                    favSpan.classList.add("fav-span");

                    var yearSpan = document.createElement('span');
                    yearSpan.innerText = "Year:" + searchResult.Year;
                    yearSpan.classList.add("year");

                    var favIcon = document.createElement('i');
                    favIcon.classList.add("fa-solid");
                    favIcon.classList.add("fa-heart");
                    favIcon.classList.add("heart-icon");

                    //Validation to chcek if movie is alreday added to the list
                    if (movieExists(searchResult.imdbID)) {
                        favIcon.style.setProperty('color', "red");
                        favIcon.title = "Added to favorites";

                    }
                    else {
                        favIcon.title = "Add to favorites";
                    }

                    favIcon.setAttribute('id', `favButtonHome-${searchResult.imdbID}`);

                    imgSpan.appendChild(listPoster);
                    favSpan.appendChild(favIcon);
                    listTitle.appendChild(yearSpan);
                    listTitlePlot.appendChild(imgSpan);
                    listTitlePlot.appendChild(listTitle);
                    listVal.appendChild(listTitlePlot);
                    listVal.appendChild(favSpan);
                    searchList.appendChild(listVal);

                    // on click event listener to pass the url, fetch and display the movie details
                    listTitlePlot.addEventListener("click", function () {
                        searchString = searchResult.imdbID;
                        window.location.href = 'movie-page.html?title=' + searchString;
                    });

                    // on click event listener to to add the movie to the favorites
                    favIcon.addEventListener("click", function () {
                        //searchString=sear;
                        addToFavList(searchResult.imdbID, "home");
                        favIcon.style.setProperty('color', "red");
                    });
                });
            }

            //when no results found with the string
            else {
                var listVal = document.createElement('li');
                listVal.innerHTML = "No matching results found";
                searchList.appendChild(listVal);

                // results = `<span> No matching results found type to continue search </span>`
                console.log("No matching results found");
            }
        });
}

//Method to display recent movies on home screen by passing random string

function getRecentMovies(movieName) {
    fetch(`http://www.omdbapi.com/?apikey=${apikey}&type=movie&s=${movieName}&year=2022`)
        .then((response) => response.json())
        .then((data) => {
            let movies = "";
            if (data.Search) {
                data.Search.forEach(movie => {
                    movies += `<div class="card-container" style="width:15rem;height:18rem">
                                <div class="movie-card" style="width:15rem;height:90%">
                                    <a class="movie-link" href = 'movie-page.html?title= ${movie.imdbID}'>
                                        <img src="${movie.Poster}" alt=" " width="200px" height="200px" onclick="movieDetails()" class="home-movie-poster">
                                    </a>
                                    <div class="movie-card-body">
                                        <span class="card-content"><h5 class="card-title">${movie.Title}</h5></span>
                                        <span id="movie-fav-span">
                                        <button id="movie-list-heart">`
                    if (movieExists(movie.imdbID)) {
                        movies += `<i class="fa-solid fa-heart heart-icon " title="Added to favorites" id="favButtonHome-${movie.imdbID}" onclick="addToFavList('${movie.imdbID}', 'home')" style="color: red"> </i></button>`
                    }
                    else {
                        movies += `<i class="fa-solid fa-heart heart-icon" title="Add to favorites" id="favButtonHome-${movie.imdbID}" onclick="addToFavList('${movie.imdbID}', 'home')" > </i></button>`
                    }
                    movies += `</span>
                                    </div>
                                </div>
                            </div>`
                });
                document.getElementById('recent-movies-list').innerHTML = movies;
            }
        });
}


