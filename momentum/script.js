const time = document.querySelector(".time"),
  today = document.querySelector(".day"),
  greeting = document.querySelector(".greeting"),
  name = document.querySelector(".name"),
  focus = document.querySelector(".focus"),
  btnImg = document.querySelector(".btn-image"),
  btnQuote = document.querySelector(".btn-quote"),
  blockquote = document.querySelector("blockquote"),
  figcaption = document.querySelector("figcaption"),
  weatherIcon = document.querySelector(".weather-icon"),
  temperature = document.querySelector(".temperature"),
  weatherDescription = document.querySelector(".weather-description"),
  humidity = document.querySelector(".humidity"),
  windSpeed = document.querySelector(".wind-speed"),
  city = document.querySelector(".city");

let oldName,
  oldFocus,
  oldCity,
  now = new Date(),
  hour = now.getHours(),
  numberImage = Math.ceil(Math.random() * 20),
  currentImage = ((numberImage + hour) % 20 || 20).toString(),
  hourImage = hour,
  index = currentImage;

if (parseInt(currentImage, 10) < 10) {
  currentImage = "0" + currentImage;
}

function showTime() {
  (now = new Date()),
    (dayNames = new Array(
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    )),
    (month = new Array(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    )),
    (day = now.getDate()),
    (hour = now.getHours()),
    (min = now.getMinutes()),
    (sec = now.getSeconds());

  today.innerHTML = `${dayNames[now.getDay()]}  ${
    month[now.getMonth()]
  } ${day}`;
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;

  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

function setBgGreet() {
  hour = now.getHours();

  if (hour < 6) {
    document.body.style.backgroundImage = `url('assets/images/night/${currentImage}.jpg')`;
    greeting.textContent = "Good Night";
  } else if (hour < 12) {
    document.body.style.backgroundImage = `url('assets/images/morning/${currentImage}.jpg')`;
    greeting.textContent = "Good Morning";
  } else if (hour < 18) {
    document.body.style.backgroundImage = `url('assets/images/day/${currentImage}.jpg')`;
    greeting.textContent = "Good Afternoon";
  } else {
    document.body.style.backgroundImage = `url('assets/images/evening/${currentImage}.jpg')`;
    greeting.textContent = "Good Evening";
  }
}

function getName() {
  if (
    localStorage.getItem("name") === null ||
    localStorage.getItem("name") === ""
  ) {
    name.textContent = "[Enter Name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

function setName(e) {
  if (e.type === "click") {
    oldName = localStorage.getItem("name");
    name.textContent = "";
  }

  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("name", e.target.innerText);
      if (localStorage.getItem("name") === "") {
        if (oldName !== "" && typeof oldName === "string") {
          name.textContent = oldName;
          localStorage.setItem("name", oldName);
        }
      }
      name.blur();
      getName();
    }
  } else {
    localStorage.setItem("name", e.target.innerText);
  }
}

function getFocus() {
  if (
    localStorage.getItem("focus") === null ||
    localStorage.getItem("focus") === ""
  ) {
    focus.textContent = "[Enter Focus]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

function setFocus(e) {
  if (e.type === "click") {
    oldFocus = localStorage.getItem("focus");
    focus.textContent = "";
  }

  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("focus", e.target.innerText);
      if (localStorage.getItem("focus") === "") {
        if (oldFocus !== "" && typeof oldFocus === "string") {
          focus.textContent = oldFocus;
          localStorage.setItem("focus", oldFocus);
        }
      }
      focus.blur();
      getFocus();
    }
  } else {
    localStorage.setItem("focus", e.target.innerText);
  }
}

function viewBgImage(data) {
  const body = document.querySelector("body");
  const src = data;
  const img = document.createElement("img");
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
}

function getImage() {
  hourImage = hourImage % 24 || 24;
  index = index % 20 || 20;
  if (index < 10) {
    index = "0" + index;
  }
  let imageSrc = "";
  if (hourImage < 6) {
    imageSrc = `assets/images/night/${index}.jpg`;
  } else if (hourImage < 12) {
    imageSrc = `assets/images/morning/${index}.jpg`;
  } else if (hourImage < 18) {
    imageSrc = `assets/images/day/${index}.jpg`;
  } else {
    imageSrc = `assets/images/evening/${index}.jpg`;
  }

  viewBgImage(imageSrc);
  hourImage++;
  index = +index + 1;
  btnImg.disabled = true;
  setTimeout(function () {
    btnImg.disabled = false;
  }, 1000);
}

async function getQuote() {
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  if (res.ok) {
    const data = await res.json();
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
  } else {
    const db = [
      {
        text:
          "Genius is one percent inspiration and ninety-nine percent perspiration.",
        author: "Thomas Edison",
      },
      {
        text: "You can observe a lot just by watching.",
        author: "Yogi Berra",
      },
      {
        text: "A house divided against itself cannot stand.",
        author: "Abraham Lincoln",
      },
      {
        text: "Difficulties increase the nearer we get to the goal.",
        author: "Johann Wolfgang von Goethe",
      },
      {
        text: "Fate is in your hands and no one elses",
        author: "Byron Pulsifer",
      },
      {
        text: "Be the chief but never the lord.",
        author: "Lao Tzu",
      },
      {
        text: "Nothing happens unless first we dream.",
        author: "Carl Sandburg",
      },
      {
        text: "Well begun is half done.",
        author: "Aristotle",
      },
      {
        text: "Life is a learning experience, only if you learn.",
        author: "Yogi Berra",
      },
      {
        text: "Self-complacency is fatal to progress.",
        author: "Margaret Sangster",
      },
    ];
    const data = db[Math.ceil(Math.random() * 9)];
    blockquote.textContent = data.text;
    figcaption.textContent = data.author;
  }
}

function getCity() {
  if (localStorage.getItem("city") === null) {
    city.textContent = "Grodno";
    localStorage.setItem("city", "Grodno");
  } else {
    city.textContent = localStorage.getItem("city");
  }
}

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=72ef9db096cdc086074c56e14147fc3a&units=metric`;
  const res = await fetch(url);
  if (res.ok) {
    const data = await res.json();

    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `wind speed: ${data.wind.speed}`;
  } else {
    city.textContent = "Enter the correct city name in English";
  }
}

function setCity(event) {
  if (event.type === "click") {
    oldCity = localStorage.getItem("city");
  }

  if (event.code === "Enter") {
    localStorage.setItem("city", event.target.innerText);
    if (localStorage.getItem("city") === "") {
      if (oldCity) {
        city.textContent = oldCity;
        localStorage.setItem("city", oldCity);
      }
    }
    getWeather();
    city.blur();
  }
}

name.addEventListener("click", setName);
name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
focus.addEventListener("click", setFocus);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);
btnImg.addEventListener("click", getImage);
document.addEventListener("DOMContentLoaded", getQuote);
btnQuote.addEventListener("click", getQuote);
document.addEventListener("DOMContentLoaded", getWeather);
city.addEventListener("keypress", setCity);
city.addEventListener("click", setCity);

showTime();
setBgGreet();
getName();
getFocus();
getCity();
getWeather();
