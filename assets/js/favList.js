let isFavourite = false;

let favMovieList=[];


function addToFavList(movieInfo,page) {
    if (isFavourite == false) {
        
        setProperties(movieInfo,page ) ;

        setFavList(movieInfo);

    }
    else {

        alert("Already added to favourites, Check My favourites for further actions");
    }

}


function setFavList(movieInfo){

    favMovieList.push(movieInfo);

    // favMovieList.forEach(id=>{
       
    //     console.log(`id's added are`,id[0].Type);
    // });

    
    localStorage.setItem("favlist",JSON.stringify(favMovieList));



};

function setProperties(movieInfo,page) {
    isFavourite= true;
    if(page == "movie"){
    document.getElementById('favButton').classList.add('btn-danger');
    document.getElementById('fav').style.setProperty('background-color', "green");
    document.getElementById('favButton').innerText = "Added to favorites";
    
    console.log(isFavourite);
}

else{
    document.getElementById(`favButtonHome-${movieInfo.imdbID}`).style.setProperty('color', "red");
    document.getElementById(`favButtonHome-${movieInfo.imdbID}`).setAttribute('title', "Added to favorites");
    document.getElementById(`favButtonHome-${movieInfo.imdbID}`).disabled=true;
    


    

}
   

}