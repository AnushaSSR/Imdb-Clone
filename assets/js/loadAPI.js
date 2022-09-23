
var favoritemovie = "Shrek";
sessionStorage.setItem("favoriteMovie", favoritemovie);



let apikey = "677792fa";
let searchString = " ";

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
                    var listPlot = new Image();

                    var favSpan = document.createElement('span');
                    favSpan.classList.add("favSpan");

                    var yearSpan = document.createElement('span');
                    var genreSpan = document.createElement('span');
                    var infoSpan= document.createElement('span');

                    var favIcon = document.createElement('i');
                    favIcon.classList.add("fa-solid");
                    favIcon.classList.add("fa-heart");
                    favIcon.setAttribute('id','favButtonHome');
                    favIcon.title = "Add to favorites";

                    listTitle.classList.add("list-title");
                    listPlot.classList.add("list-plot");

                    listTitle.innerText = searchResult.Title;


                    listPlot.src = searchResult.Poster;
                    listPlot.width = "100";
                    listPlot.height = "100";

                    favSpan.appendChild(favIcon);

                    
                   yearSpan.innerText = "Year:"+searchResult.Year;
                   

                   listTitle.appendChild(yearSpan);
                   yearSpan.classList.add("year");
                   

                    listTitlePlot.appendChild(listPlot);
                    listTitlePlot.appendChild(listTitle);


                    listVal.appendChild(listTitlePlot);
                    listVal.appendChild(favSpan);
                    
                    searchList.appendChild(listVal);



                    listTitlePlot.addEventListener("click", function () {                       
                        searchString = searchResult.imdbID;
                        window.location.href='movie-page.html?title='+searchString;                     
                        console.log(`search value is`, searchString);
                    });

                    favIcon.addEventListener("click", function () {
                        searchString=searchResult.Title;
                        addToFavList(this.searchString);
                        console.log(`added to favourite`, searchResult.Title);
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






function check(val) {
    console.log("chcek", val);
}


function movieDetails(title) {


    fetch(`http://www.omdbapi.com/?apikey=${apikey}&t=${title}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        var display = `<spam> ${title} </span>`

        document.getElementById('movie-details').innerHTML=display;

    });

}
