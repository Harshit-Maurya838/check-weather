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
let user_city = "";

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
    user_city = searchBox.value;
    document.querySelector('.card_2').style.display = "none";
    document.querySelector(".container").style.height = "100vh";
})

document.querySelector('.more_detail').addEventListener("click", ()=>{
    document.querySelector('.card_2').style.display = "block";
    getForecast();
    document.querySelector(".container").style.height = "150vh";
})

document.querySelector(".back").addEventListener("click",()=>{
    document.querySelector('.card_2').style.display = "none";
    document.querySelector(".container").style.height = "100vh";
})



let foreUrl = "https://api.openweathermap.org/data/2.5/forecast?appid=37c35928025efcc808df959540ac5993&units=metric&q="
const forecastCity = document.querySelector('.fore_city')

const getForecast = async () =>{
    let response = await fetch(foreUrl + user_city);
    let data = await response.json();

    document.querySelector('.fore_time_1').innerText = data.list[0].dt_txt ;
    document.querySelector('.fore_time_2').innerText = data.list[2].dt_txt ;
    document.querySelector('.fore_time_3').innerText = data.list[4].dt_txt ;
    document.querySelector('.fore_time_4').innerText = data.list[6].dt_txt ;

    document.querySelector('.fore_temp_1').innerText = data.list[0].main.temp + "°C" ;
    document.querySelector('.fore_temp_2').innerText = data.list[2].main.temp + "°C" ;
    document.querySelector('.fore_temp_3').innerText = data.list[4].main.temp + "°C" ;
    document.querySelector('.fore_temp_4').innerText = data.list[6].main.temp + "°C" ;

    for (let i = 0; i < 7; i += 2) {
        if(data.list[i].weather[0].main == "Clouds"){
            document.querySelector(`.fore_img_${i}`).src = "images/clouds.png" 
        }else if(data.list[i].weather[0].main == "Clear"){
            document.querySelector(`.fore_img_${i}`).src = "images/clear.png" 
        }else if(data.list[i].weather[0].main == "Rain"){
            document.querySelector(`.fore_img_${i}`).src = "images/rain.png" 
        }else if(data.list[i].weather[0].main == "Mist"){
            document.querySelector(`.fore_img_${i}`).src = "images/mist.png" 
        }else if(data.list[i].weather[0].main == "Drizzle"){
            document.querySelector(`.fore_img_${i}`).src = "images/drizzle.png" 
        }
        
    }
    console.log(data)

    forecastCity.innerText = user_city;
}