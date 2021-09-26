const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");

const temp_status = document.getElementById("temp_status");
const temp_val = document.getElementById("temp_val");
const tempDiv = document.getElementsByClassName("middle_layer")[0];

const getInfo = async (e) => {
  e.preventDefault();
  let cityVal = cityName.value;
  if (cityVal === "") {
    city_name.innerText = "Please enter the city name first";
    tempDiv.classList.add("data_hide");
  } else {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=a8f186d234620b37e1af9e5adb8990f3`;
      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];
      const tempMood = arrData[0].weather[0].main;
      tempDiv.classList.remove("data_hide");
      city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
      temp_val.innerText = arrData[0].main.temp;
      if (tempMood == "Clear") {
        temp_status.innerHTML =
          '<i class="fas fa-sun" style="color:#eccc68"></i>';
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          '<i class="fas fa-cloud " style="color:#dfe4ea"></i>';
      } else if (tempMood == "Rain") {
        temp_status.innerHTML =
          '<i class="fas fa-rain " style="color:#a4b0be"></i>';
      } else {
        temp_status.innerHTML =
          '<i class="fas fa-cloud" style="color:#dfe4ea"></i>';
      }
    } catch (err) {
      city_name.innerText = "Please enter the city name properly";
      tempDiv.classList.add("data_hide");
    }
  }
};
submitBtn.addEventListener("click", getInfo);
