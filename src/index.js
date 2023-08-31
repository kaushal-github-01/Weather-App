const searchButton = document.querySelector("button");
let image = document.getElementById("image");
let info = document.getElementById("info");
let errorMessage = document.querySelector("#error h1");

searchButton.addEventListener("click", () => {
  const searchInput = document.querySelector("input").value;
  if (searchInput == "") {
    alert("Please enter a location");
  } else {
    weatherData(searchInput);
  }
});

weatherData = async (searchInput) => {
  try {
    const URL = `https://api.weatherapi.com/v1/current.json?key=3dfb4ae196e94cab8b4153933231408&q=${searchInput}`;
    const response = await fetch(URL);
    const data = await response.json();

    let name = data.location.name;
    let region = data.location.region;
    let country = data.location.country;
    let localTime = data.location.localtime;

    let imageText = data.current.condition.text;
    let imageIcon = data.current.condition.icon;

    let temperature = data.current.temp_c;
    let feelsLike = data.current.feelslike_c;
    let wind = data.current.wind_kph;
    let humidity = data.current.humidity;
    let cloud = data.current.cloud;

    showData(
      name,
      region,
      country,
      localTime,
      imageText,
      imageIcon,
      temperature,
      feelsLike,
      wind,
      humidity,
      cloud
    );
  } catch (error) {
    image.style.display = "none";
    info.style.display = "none";

    errorMessage.style.display = "block";
    errorMessage.textContent = "!! Not Found !!";
  }
};

showData = (
  name,
  region,
  country,
  localTime,
  imageText,
  imageIcon,
  temperature,
  feelsLike,
  wind,
  humidity,
  cloud
) => {
  let pageName = document.getElementById("name");
  let pageregion = document.getElementById("region");
  let pagecountry = document.getElementById("country");
  let pagelocalTime = document.getElementById("localTime");

  pageName.textContent = "Name: " + name;
  pageregion.textContent = "Region: " + region;
  pagecountry.textContent = "Country: " + country;
  pagelocalTime.textContent = "Local Time: " + localTime;

  let pageImageText = document.querySelector("#image h1");
  let pageImageIcon = document.querySelector("#image img");

  pageImageText.textContent = imageText;
  pageImageIcon.src = imageIcon;

  let pagetemperature = document.getElementById("temperature");
  let pagefeelslike = document.getElementById("feelsLike");
  let pagewind = document.getElementById("wind");
  let pagehumidity = document.getElementById("humidity");
  let pagecloud = document.getElementById("cloud");

  pagetemperature.textContent = "Temperature (C): " + temperature;
  pagefeelslike.textContent = "Feels Like (C): " + feelsLike;
  pagewind.textContent = "Wind (Kph): " + wind;
  pagehumidity.textContent = "Humidity: " + humidity;
  pagecloud.textContent = "Cloud: " + cloud;

  image.style.display = "flex";
  info.style.display = "flex";
  errorMessage.style.display = "none";
};
