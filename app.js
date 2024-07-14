const apiKey = "37c35928025efcc808df959540ac5993";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=`;


const cityName = document.querySelector('.city')
const temp = document.querySelector('.temp')
const hum = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const WeatherIcon = document.querySelector('.weather_icon')
const moreDetainBtn = document.querySelector(".more_detail_btn")

const checkweather = async (city)=>{
    const response = await fetch(apiUrl + city);
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        moreDetainBtn.style.display = "none";
    }else{
        let data = await response.json();
        cityName.innerText = data.name;
        temp.innerText = Math.round(data.main.temp) + "°C";
        hum.innerText = data.main.humidity + "%";
        wind.innerText = data.wind.speed + "Km/h";
    
        if(data.weather[0].main == "Clouds"){
            WeatherIcon.src = "images/clouds.png";
        }else if (data.weather[0].main == "Clear"){
            WeatherIcon.src = "images/clear.png";
        }else if (data.weather[0].main == "Rain"){
            WeatherIcon.src = "images/rain.png";
        }else if (data.weather[0].main == "Mist"){
            WeatherIcon.src = "images/mist.png";
        }else if (data.weather[0].main == "Drizzle"){
            WeatherIcon.src = "images/drizzle.png";
        }
        document.querySelector('.weather').style.display = 'block';
        moreDetainBtn.style.display = 'inline-block';
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", ()=>{
    checkweather(searchBox.value);
})