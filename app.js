


const movieInput = document.querySelector('.input-movie');
const searchMovie = document.querySelector('.searchmovie');
let slides=document.querySelectorAll('.showSlide');
let slide=document.querySelector('.slides');
const next=document.querySelector('.next-btn');
const prev=document.querySelector('.prev-btn');


//events
searchMovie.addEventListener('click', movieinfo);

//Carousal silder
let index=0;
let interval=3000;

let getsilde=slides[index].clientWidth;

let firstclone=slides[0].cloneNode(true);
let lastclone=slides[slides.length-1].cloneNode(true);

slide.append(firstclone);
slide.prepend(lastclone);

//slide.style.transform=`translateX(${-getsilde * index}px)`;

function startsilde(){
    slide=document.querySelector('.slides');
    setInterval(()=>{
          index++;
          if(index>slides.length-1){
              index=0;
              slide.style.transition='none';
          }
          slide.style.transform=`translateX(${-getsilde * index}px)`;
          slide.style.transition='.7s'
        //   console.log(getsilde);
    },interval)
}
next.addEventListener('click',()=>{
    index++;
    slide.style.transform=`translateX(${-getsilde * index}px)`;
})
startsilde();


//Search Movies
function searchmovie(value) {
    console.log("ponmani.....");
    fetch(`https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${value}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
            "x-rapidapi-key": "9ba83e408bmsh7fc0782c2f13292p177bb4jsn3c9f3d1cb0b4"
        }
    })
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data.title);
             moviedisplay(data.title); 
             document.location.href="movieinfo.html"; 
        })
        .catch(err => {
            console.log(err);
        });

}

 function movieinfo(){
    searchmovie(movieInput.value);
}