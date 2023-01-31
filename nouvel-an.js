function newYearCountdown() {
    const newYear = new Date('January 1, 2024 00:00');
    const now = new Date();
    const diff = newYear - now;
    
    const msInSecond = 1000;
    const msInMinute = 60 * 1000;
    const msInHour = 60 * 60 *1000;
    const msInDay = 24 * 60 * 60 * 1000;


    const days = Math.floor(diff / msInDay);
    const dayInRussia = function declOfNum(number, titles) {
        cases = [2,0,1,1,1,2];
        return titles[(number%100>4 && number%100<20) ? 2 : cases[(number%10<5) ? number%10 : 5]];
    }
    const dayInRussiaDisplay = dayInRussia(days, ['день', 'дня', 'дней']);
    document.querySelector('.days').innerHTML = `${days} <br> ${dayInRussiaDisplay}`;


    const hours = Math.floor((diff % msInDay) / msInHour);
    const hourInRussia = function declOfNum(number, titles) {
        cases = [2,0,1,1,1,2];
        return titles[(number%100>4 && number%100<20) ? 2 : cases[(number%10<5) ? number%10 : 5]];
    }
    const hourInRussiaDisplay = hourInRussia(hours, ['час', 'часа', 'часов']);
    document.querySelector('.hours').innerHTML = `${hours} <br> ${hourInRussiaDisplay}`;


    const minutes = Math.floor((diff % msInHour) / msInMinute);
    const minuteInRussia = function declOfNum(number, titles) {
        cases = [2,0,1,1,1,2];
        return titles[(number%100>4 && number%100<20) ? 2 : cases[(number%10<5) ? number%10 : 5]];
    }
    const minuteInRussiaDisplay = minuteInRussia(minutes, ['минута', 'минуты', 'минут']);
    document.querySelector('.minutes').innerHTML = `${minutes} <br> ${minuteInRussiaDisplay}`;


    const seconds = Math.floor((diff % msInMinute) / msInSecond);
    const secondInRussia = function declOfNum(number, titles) {
        cases = [2,0,1,1,1,2];
        return titles[(number%100>4 && number%100<20) ? 2 : cases[(number%10<5) ? number%10 : 5]];
    }
    const secondInRussiaDisplay = secondInRussia(seconds, ['секунда', 'секунды', 'секунд']);
    document.querySelector('.seconds').innerHTML = `${seconds} <br> ${secondInRussiaDisplay}`;


    if (diff <= 0) {
        document.querySelector('.days').style.display = 'none';
        document.querySelector('.hours').style.display = 'none';
        document.querySelector('.minutes').style.display = 'none';
        document.querySelector('.seconds').style.display = 'none';
        clearInterval(timerID);
        happyNewYear();
    }
}

let timerID = setInterval(newYearCountdown, 1000);

function happyNewYear() {
    const heading = document.querySelector('h1');
    heading.textContent = 'С Новым годом!';
    heading.classList.add('newYear');
}


//audio player

const prev = document.querySelector('.prev');
const play = document.querySelector('.play');
const next = document.querySelector('.next');

const audio = document.querySelector('.audio');
const songName = document.querySelector('.songName');

const songs = [
    {name: `Let it snow! Let it snow! Let it snow! - Dean Martin`,
    path: 'https://cdn.glitch.me/7fca1f65-8bd5-45bf-8f08-b051a107ef7c%2Fsong.mp3?v=1638182668828'},
    {name: `Jingle Bells Rock - Bobby Helms`,
    path: 'https://cdn.glitch.me/7fca1f65-8bd5-45bf-8f08-b051a107ef7c%2Fsong1.mp3?v=1638182669514'},
    {name: `Run Rudolph Run - Chuck Berry`,
    path: 'https://cdn.glitch.me/7fca1f65-8bd5-45bf-8f08-b051a107ef7c%2Fsong2.mp3?v=1638182676711'},
    {name: `It's the Most Wonderful Time of the Year - Andy Williams`,
    path: 'https://cdn.glitch.me/7fca1f65-8bd5-45bf-8f08-b051a107ef7c%2Fsong3.mp3?v=1638182670416'},
    {name: `Winter Wonderland - Ella Fitzgerald`,
    path: 'https://cdn.glitch.me/7fca1f65-8bd5-45bf-8f08-b051a107ef7c%2Fsong4.mp3?v=1638182670734'},
    {name: `Happy New Year - ABBA`,
    path: 'https://cdn.glitch.me/7fca1f65-8bd5-45bf-8f08-b051a107ef7c%2Fsong5.mp3?v=1638271747378'}
];

let i = 0;

play.addEventListener('click', () => {
    if(audio.paused) {
        audio.play();
        play.classList.toggle('pause');
    }

    else{
        audio.pause();
        play.classList.toggle('pause');
    }
})

next.addEventListener('click', () => {
    i++;
    if(i > songs.length - 1) {
        i = 0;
    }

    audio.src = songs[i].path;
    songName.textContent = songs[i].name;
    play.classList.add('pause');
    playSong();
})

prev.addEventListener('click', () => {
    i--;
    if(i < 0) {
        i = songs.length - 1;
    }

    audio.src = songs[i].path;
    songName.textContent = songs[i].name;
    play.classList.add('pause');
    playSong();
})

function playSong() {
    if(audio.paused){
        audio.play();
    }
}

audio.addEventListener('ended', () => {
    i++;

    audio.src = songs[i].path;
    songName.textContent = songs[i].name;

    if(i > songs.length) {
        i = 0;
    }
    else if(audio.paused) {
        audio.play();
        play.classList.toggle('pause');
    }
    
    play.classList.toggle('pause');
})

//progress bar

const progressBar = document.querySelector('.progressBar');
const progress = document.querySelector('.progress');

audio.addEventListener('timeupdate', updateProgress);

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
}

progressBar.addEventListener('click', setProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}


//snow
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 400,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "image",
            "stroke": {
                "width": 3,
                "color": "#fff"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "http://www.dynamicdigital.us/wp-content/uploads/2013/02/starburst_white_300_drop_2.png",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.7,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 5,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 20,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 50,
            "color": "#ffffff",
            "opacity": 0.6,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 3,
            "direction": "bottom",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": true,
                "rotateX": 300,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode":  "bubble"
            },
            "onclick": {
                "enable": true,
                "mode": "repulse"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 150,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 200,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.2
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
})
