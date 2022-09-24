var favoritemovie = "Shrek";
sessionStorage.setItem("favoriteMovie", favoritemovie);
let apikey = "677792fa";
let searchString = " ";

let titleValues = ["get", "hel", "cat", "ten"];
let valueIndex = Math.floor(Math.random() * titleValues.length);

getRecentMovies(titleValues[valueIndex]);

function searchResults(searchString) {

    fetch(`http://www.omdbapi.com/?apikey=${apikey}&type=movie&s=${searchString}`)
        .then((response) => response.json())
        .then((data) => {

            console.log(data);

            var searchList = document.getElementById('search-list');

            searchList.innerHTML = " ";


            if (data.Search) {

                data.Search.forEach(searchResult => {
                    var listVal = document.createElement('li');
                    listVal.classList.add('list-val');

                    var listTitlePlot = document.createElement('span');
                    var listTitle = document.createElement('span');
                    var imgSpan = document.createElement('span');
                    var listPlot = new Image();
                    listPlot.classList.add('plot');

                    imgSpan.appendChild(listPlot);

                    var favSpan = document.createElement('span');
                    favSpan.classList.add("favSpan");

                    listTitlePlot.classList.add('set-span');
                    var yearSpan = document.createElement('span');

                    var favIcon = document.createElement('i');
                    favIcon.classList.add("fa-solid");
                    favIcon.classList.add("fa-heart");
                    favIcon.setAttribute('id', `favButtonHome-${searchResult.imdbID}`);
                    favIcon.title = "Add to favorites";

                    listTitle.classList.add("list-title");
                    listPlot.classList.add("list-plot");

                    listTitle.innerText = searchResult.Title;


                    listPlot.src = searchResult.Poster;
                    listPlot.width = "100";
                    listPlot.height = "100";

                    favSpan.appendChild(favIcon);


                    yearSpan.innerText = "Year:" + searchResult.Year;


                    listTitle.appendChild(yearSpan);
                    yearSpan.classList.add("year");


                    listTitlePlot.appendChild(imgSpan);
                    listTitlePlot.appendChild(listTitle);


                    listVal.appendChild(listTitlePlot);
                    listVal.appendChild(favSpan);

                    searchList.appendChild(listVal);



                    listTitlePlot.addEventListener("click", function () {
                        searchString = searchResult.imdbID;
                        window.location.href = 'movie-page.html?title=' + searchString;
                        console.log(`search value is`, searchString);
                    });

                    favIcon.addEventListener("click", function () {
                        //searchString=sear;
                        addToFavList(searchResult, "home");
                        console.log(searchResult);
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



//         console.log(data);

//         if (data.Search) {

//             data.Search.forEach(movie => {

//                 movies += `
//     <div class="card">
//         <img src="${movie.Poster}" alt="">
//         <div class="card-body">
//             <h5 class="card-title">${movie.Title}</h5>
//         </div>
//     </div>
//     `

//             });
//             document.getElementById('recent-movie-list').innerHTML = movies;
//         }

//     }
// }

//let movies;
//To display the recent movies
let movies;
function getRecentMovies(movieName) {
    // alert("called the file to get recent movies");
    // console.log(movieName);

    fetch(`http://www.omdbapi.com/?apikey=${apikey}&type=movie&s=${movieName}&year=2022`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

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

                    document.getElementById('recent-movie-list').innerHTML = movies;


                });


            }



        });
}