const movieInput = document.querySelector(".input-movie");
const searchMovie = document.querySelector(".searchmovie");
let slides = document.querySelectorAll(".showSlide");
let slide = document.querySelector(".slides");
const next = document.querySelector(".next-btn");
const prev = document.querySelector(".prev-btn");
const indexmovie = document.querySelector(".index_movie");
let info = document.querySelector(".movieinfo");
let minfo = document.querySelector(".movie_info");
let moviehead = document.querySelector(".movie_name");
//movie-information details
let movieyear = document.querySelector(".movieyear");
let movieruntime = document.querySelector(".movieruntime");
let movierating = document.querySelector(".movierate");

//events
searchMovie.addEventListener("click", movieinfo);

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
  console.log("ponmani.....");
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
      console.log(data);
      indexmovie.style.display = "none";
      info.style.display = "block";
      minfo.style.display = "block";
      moviedisplay(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieinfo() {
  searchmovie(movieInput.value);
}

function moviedisplay(data) {
  let mname = document.createElement("h1");
  mname.innerHTML = data.title;
  moviehead.append(mname);

  img = document.createElement("img");
  img.src = data.poster;
  info.append(img);

  // let informationdiv = document.createElement("div");
  // informationdiv.classList.add("movie_information");
  let divmovie = document.createElement("h2");
  divmovie.innerHTML = data.year;
  movieyear.append(divmovie);

  let divmovie1 = document.createElement("h2");
  divmovie1.innerHTML = data.length;
  movieruntime.append(divmovie1);

  let divmovie2 = document.createElement("h2");
  divmovie2.innerHTML = data.rating;
  movierating.append(divmovie2);
   
  let movieplot = document.querySelector(".movieplot");
  let divmovie3 = document.createElement("h2");
  divmovie3.innerHTML = data.plot;
  movieplot.append(divmovie3);
  
  // let divmovie4 = document.createElement("video");
  // let divmovie41=document.createElement("source");
  // divmovie41.src = data.trailer.link;
  // divmovie41.append(divmovie4);
  // informationdiv.append(divmovie4);

  // minfo.append(informationdiv);
}
