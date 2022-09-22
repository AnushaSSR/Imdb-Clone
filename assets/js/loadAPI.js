function searchResults(searchString) {


    console.log(`-------------------searchString:`, searchString);
    fetch(`http://www.omdbapi.com/?apikey=677792fa&s=${searchString}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let results = "";
            // let searchName = "";
            var stringfiedData= JSON.stringify(data);
            // console.log(`stringified data is`,Search.Title);

            var val=0;

            if (data.Search) {
                var searchList =document.getElementById('search-list');
                
                data.Search.forEach(searchResult => {
                    //     console.log(`${searchResult.Title}`);
                    const wrap = searchResult.Title;
        val+=1;

        var listVal = document.createElement('li');
                var listTitlePlot= document.createElement('span');
                var listTitle= document.createElement('span');
                var listPlot= new Image();
                var favIcon = document.createElement('i');
                favIcon.classList.add("fa-regular");
                favIcon.classList.add("fa-heart");
                favIcon.title="Add to favorites";
                
                listTitle.classList.add("list-title");
                listPlot.classList.add("list-plot");

                listTitle.innerText = searchResult.Title;

                      
                listPlot.src=searchResult.Poster;
                listPlot.width="50";
                listPlot.height="50";
          
                listTitlePlot.appendChild(listPlot);
                listTitlePlot.appendChild(listTitle);


                

                
                
                // listPlot.setAttribute("src",'searchResult.Plot') ;
                    listVal.appendChild(listTitlePlot);
                    listVal.appendChild(favIcon);
                    // listVal.appendChild(listPlot);
                    searchList.appendChild(listVal);
                    // searchList.appendChild(favIcon);
                    

                    listTitlePlot.addEventListener("click", function() {
                        console.log(`value is`,wrap);
                    });

                    favIcon.addEventListener("click", function() {
                        console.log(`added to favourite`,wrap);
                        favIcon.style.setProperty('color',"red");
                       
                    });
                   
                    // results += `<div onclick="check('${wrap}')">.................${val}
                    // </div>`
                    // console.log(results);

            // <div onclick="fetchDetails(${JSON.stringify(wrap)})">
            //     <img src="${searchResult.Poster}" alt="" width="75" height="75" style="margin:5px">
            //     <p>${searchResult.Title}</p>
            // </div>
            // <br>`

                });

            }

            else {
                results = `<span> No matching results found type to continue search </span>`
                console.log("No matching results found");
            }

        }
        );

}

function check(val) {
    console.log("chcek",val);
}
function fetchDetails(title) {
    console.log(`movei title passed is`,title);

}
