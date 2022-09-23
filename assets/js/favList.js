let isFavourite = false;

let favMovieList=[];

function addToFavList(imdbID) {
    if (isFavourite == false) {
        setProperties() ;
        








        // document.getElementById('favButton').style.setProperty('background-color',"white");
        // document.getElementById('favButton').title = "Added to favorites";
    }




    else {

        alert("Already added to favourites, Check My favourites for further actions")
    }

}


function setProperties() {
    
    document.getElementById('favButton').style.setProperty('color',"red");       
    document.getElementById('fav').style.setProperty('background-color', "green");
    document.getElementById('favText').innerText = "Added to favorites";
    isFavourite = true;
    console.log(isFavourite);
   

}