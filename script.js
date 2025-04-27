const KEY = "96b947a45d33d7dc1c49af3203966408";

const getData = async (city) => {
  const base = "https://api.openweathermap.org/data/2.5/weather";
  const query = `?q=${city}&units=metric&appid=${KEY}`;

  const req = await fetch(base + query);
  const data = await req.json();

  return data;
};

const form = document.querySelector(".form");
const container = document.querySelector(".container");
const weatherIcon = document.querySelector("#weather-icon");
const background = document.querySelector(".background-img");
const Info = document.querySelector(".info");

const result = (weather) => {
  container.innerHTML = `
            <h1 class="weather">${Math.round(weather.main.temp)}&deg;</h1>
            <h2  >${weather.name}.${weather.sys.country}</h2>
            <h4>${weather.weather[0].main}</h4>
    `;
  Info.innerHTML = `
          <div class="wind">
            <div class="speed">
              <span>Wind-speed:</span>
              <h3>${weather.wind.speed}m/s</h3>
            </div>
            <div class="deg">
              <span>Wind-direction:</span>
              <h3>${weather.wind.deg}&deg;</h3>
            </div>
            <div class="cloud">
              <span>Cloud-coverage</span>
              <h3>${weather.clouds.all}%</h3>
            </div>
          </div>

        
  `;

  weatherIcon.src = ` https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  background.style.backgroundImage = `url(img/${weather.weather[0].main}.jpg)`;
};

const getWeather = async (city) => {
  const data = await getData(city);

  return data;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const changeLocation = form.city.value.trim();
  form.city.value = "";

  getWeather(changeLocation).then((info) => result(info));
  weatherIcon.style.display = "block";
});
