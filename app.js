const movieInput = document.querySelector(".input-movie");
const searchMovie = document.querySelector(".searchmovie");
const backbtn = document.querySelector(".homeback");
let slides = document.querySelectorAll(".showSlide");
let slide = document.querySelector(".slides");
const next = document.querySelector(".next-btn");
const prev = document.querySelector(".prev-btn");
let indexmovie = document.querySelector(".index_movie");
let info = document.querySelector(".movieinfo");
let minfo = document.querySelector(".movie_info");
let moviehead = document.querySelector(".movie_name");
//movie-information details
let movieyear = document.querySelector(".movieyear");
let movieruntime = document.querySelector(".movieruntime");
let movierating = document.querySelector(".movierate");

//preloader
let loader=document.querySelector(".loader");

//events
searchMovie.addEventListener("click", movieinfo);
backbtn.addEventListener("click",callhome);

//back button
function callhome(){
  indexmovie.style.display = "block";
      minfo.style.display = "none";
      if(movieInput.value){
        movieInput.value="";
      }
}

//Carousal silder
let index = 0;
let interval = 3000;

let getsilde = slides[index].clientWidth;

let firstclone = slides[0].cloneNode(true);
let lastclone = slides[slides.length - 1].cloneNode(true);

slide.append(firstclone);
slide.prepend(lastclone);

//slide.style.transform=`translateX(${-getsilde * index}px)`;

function startsilde() {
  slide = document.querySelector(".slides");
  setInterval(() => {
    index++;
    if (index > slides.length - 1) {
      index = 0;
      slide.style.transition = "none";
    }
    slide.style.transform = `translateX(${-getsilde * index}px)`;
    slide.style.transition = ".7s";
    //   console.log(getsilde);
  }, interval);
}
next.addEventListener("click", () => {
  index++;
  slide.style.transform = `translateX(${-getsilde * index}px)`;
});
startsilde();

//Search Movies
function searchmovie(value) {
  // indexmovie.classList.add("fullscreen");
  loader.style.display="block"
  console.log("ponmani.....",value);
  fetch(
    `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${value}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "imdb-internet-movie-database-unofficial.p.rapidapi.com",
        "x-rapidapi-key": "9ba83e408bmsh7fc0782c2f13292p177bb4jsn3c9f3d1cb0b4",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      loader.style.display="none"
      console.log(data);
      // console.log("type..",data.title,".....",data.title!=value)
      // let namemovie=data.title;
      // let namem=Array.from(namemovie.split(" "));
      // let lowermovie=namem.map(m=>m.toLowerCase());
      // console.log(lowermovie);
      if(!data.title || !data.poster  || !data.year){
        loader.style.display="none"
        alert("Movie Not Found")
        if(movieInput.value){
          movieInput.value="";
        }
      }
      else{
        console.log("else...part....")
      indexmovie.style.display = "none";
      info.style.display = "block";
      minfo.style.display = "block";
      moviedisplay(data);
      if(movieInput.value){
        movieInput.value="";
      }
    }
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieinfo() {
  if(movieInput.value){
  searchmovie(movieInput.value);
  }
  else{
    alert("Please Enter the Movie Name")
  }
}

function moviedisplay(data) {
  
  // Get all the fields to insert data
  const movieName = document.querySelector(".movie_name .name");
  const movieImage = document.querySelector(".movieinfo .image");
  const movieYear = document.querySelector(".movieyear .year");
  const movieRuntime = document.querySelector(".movieruntime .runtime");
  const movieRating = document.querySelector(".movierate .rating");
  const moviePlot = document.querySelector(".movieplot .plot");

  // Remove old movie name if any
  if (movieName.firstChild) {
    movieName.firstChild.remove();
  }
  // add new name
  let mname = document.createElement("h1");
  mname.innerHTML = data.title;
  movieName.appendChild(mname);

  // Remove old image if any
  if (movieImage.firstChild) {
    movieImage.firstChild.remove();
  }
  // add new image
  img = document.createElement("img");
  img.src = data.poster;
  movieImage.append(img);

  // let informationdiv = document.createElement("div");
  // informationdiv.classList.add("movie_information");

  // Remove old year if any
  if (movieYear.firstChild) {
    movieYear.firstChild.remove();
  }
  // add new year
  let divmovie = document.createElement("h2");
  divmovie.innerHTML = data.year;
  movieYear.append(divmovie);

  // Remove old runtime if any
  if (movieRuntime.firstChild) {
    movieRuntime.firstChild.remove();
  }
  // add new runtime
  let divmovie1 = document.createElement("h2");
  divmovie1.innerHTML = data.length;
  movieRuntime.append(divmovie1);

  // Remove old rating if any
  if (movieRating.firstChild) {
    movieRating.firstChild.remove();
  }
  // add new rating
  let divmovie2 = document.createElement("h2");
  divmovie2.innerHTML = data.rating;
  movieRating.append(divmovie2);

  // Remove old plot if any
  if (moviePlot.firstChild) {
    moviePlot.firstChild.remove();
  }
  // add new plot
  let divmovie3 = document.createElement("h2");
  if(data.plot!=""){
  divmovie3.innerHTML = data.plot;
  }
  else{
    divmovie3.innerHTML = "Not Found";
  }
  moviePlot.append(divmovie3);
  // let divmovie4 = document.createElement("video");
  // let divmovie41=document.createElement("source");
  // divmovie41.src = data.trailer.link;
  // divmovie41.append(divmovie4);
  // informationdiv.append(divmovie4);

  // minfo.append(informationdiv);
}
