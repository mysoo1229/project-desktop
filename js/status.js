const clock = document.querySelector('.sectionClock .clock');
const userLocation = document.querySelector('.sectionGeo .location span');
const userWeather = document.querySelector('.sectionGeo .weather span');

const setStatus = {
  clock: function() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    clock.innerHTML = `${hours}:${minutes}`;
  },
  geo: function(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        userLocation.innerText = `${data.name}`;
        userWeather.innerText = `${data.weather[0].main}, ${parseInt(data.main.temp)}'C`;
      });
  },
  geoError: function() {
    alert("Oops, can't find you. No weather for you.");
  }
}

setStatus.clock();
setInterval(setStatus.clock, 1000);
navigator.geolocation.getCurrentPosition(setStatus.geo, setStatus.geoError);
