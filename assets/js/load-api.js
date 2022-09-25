let apikey = "677792fa";
let searchString = " ";

//string for getting the random movie to be sent
let titleValues = ["get", "hel", "cat", "ten"];
let valueIndex = Math.floor(Math.random() * titleValues.length);

//get the movie and display the recent movies on home page
getRecentMovies(titleValues[valueIndex]);



//function to display the search results in the list
function searchResults(searchString) {

    fetch(`http://www.omdbapi.com/?apikey=${apikey}&type=movie&s=${searchString}`)
        .then((response) => response.json())
        .then((data) => {

            var searchList = document.getElementById('search-list');
            searchList.innerHTML = " ";

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
                    var listPlot = new Image();
                    listPlot.classList.add("list-plot");
                    listPlot.src = searchResult.Poster;
                    listPlot.width = "100";
                    listPlot.height = "100";


                    var favSpan = document.createElement('span');
                    favSpan.classList.add("favSpan");

                    var yearSpan = document.createElement('span');
                    yearSpan.innerText = "Year:" + searchResult.Year;
                    yearSpan.classList.add("year");
                    
                    var favIcon = document.createElement('i');
                    favIcon.classList.add("fa-solid");
                    favIcon.classList.add("fa-heart");

                    if(movieExists(searchResult.imdbID)){
                        favIcon.style.setProperty('color', "red");
                        favIcon.title = "Added to favorites";

                    }
                    else {
                    favIcon.title = "Add to favorites";}

        
                    favIcon.setAttribute('id', `favButtonHome-${searchResult.imdbID}`);
                    
                    imgSpan.appendChild(listPlot);
                    favSpan.appendChild(favIcon);
                    listTitle.appendChild(yearSpan);
                    listTitlePlot.appendChild(imgSpan);
                    listTitlePlot.appendChild(listTitle);
                    listVal.appendChild(listTitlePlot);
                    listVal.appendChild(favSpan);
                    searchList.appendChild(listVal);

                    listTitlePlot.addEventListener("click", function () {
                        searchString = searchResult.imdbID;
                        window.location.href = 'movie-page.html?title=' + searchString;
                    });

                    favIcon.addEventListener("click", function () {
                        //searchString=sear;
                        addToFavList(searchResult.imdbID, "home");
                        favIcon.style.setProperty('color', "red");

                    });

                });

            }

            else {
                var listVal = document.createElement('li');
                listVal.innerHTML = "No matching results found";

                searchList.appendChild(listVal);

                // results = `<span> No matching results found type to continue search </span>`
                console.log("No matching results found");
            }

        });

}


//chcek the value
//let movies;
//Function to display recent movies on home screen by passing random string

function getRecentMovies(movieName) {
    fetch(`http://www.omdbapi.com/?apikey=${apikey}&type=movie&s=${movieName}&year=2022`)
        .then((response) => response.json())
        .then((data) => {


            let movies = "";
            if (data.Search) {
                data.Search.forEach(movie => {
                    movies += `<span style="width:15rem","height:10rem">
                                <div class="card" style="width:15rem">
                                    <img src="${movie.Poster}" alt=" width="200px" height="200px">
                                    <div class="card-body">
                                        <h5 class="card-title">${movie.Title}</h5>
                                        <p> ${movie.imdbRating}</p>
                                    </div>
                                </div>
                               </span>`
                });
                document.getElementById('recent-movie-list').innerHTML = movies;
            }
        });
}


