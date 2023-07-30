const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone'); 
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] ;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY='963e971535920e6a9e950bdfb4964701';

setInterval(() => {
var time = new Date();

const month = time.getMonth();
const date = time.getDate()
const day = time.getDay()
const hour = time.getHours()
const hoursIn12HrFormat = hour >= 13 ? hour %12: hour;
const minutes = time.getMinutes()
const ampm = hour >=12 ? 'PM': 'AM';
timeEl.innerHTML = (hoursIn12HrFormat <10? '0' +hoursIn12HrFormat:hoursIn12HrFormat)+ ':' + (minutes< 10? '0'+minutes:minutes)+' '+ `<span id="am-pm">${ampm}</span>`;
dateEl.innerHTML = days[day] + ',  '+date+ '  '+ months[month]
}, 1000);

getWeatherData()
function getweatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        let {latitude, longitude} = success.coords;
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=${latitude}lon=${longitude}&appid=${API_KEY}").then(res => res.json()).then(data =>{
        console.log(data)
        showweatherData(data);
        })

    })

}

function showweatherData (data){
let{humidity,pressure, sunrise, sunset, wind_speed}=data.current;
timezone.innerHTML=data.timezone;
countryEl .innerHTML=data.lat+ 'N' +data.lon+'E';

currentWeatherItemsEl.innerHTM=`<div class="weather-items">
   <div>Humidity</div>
   <div>${humidity}</div>
</div>
<div class="weather-items">
   <div>pressure</div>
   <div>${pressure}</div>
</div>
<div class="weather-items">
   <div>wind speed</div>
   <div>${wind_speed}</div>
</div>
<div class="weather-items">
   <div>sunrise</div>
   <div>${window.Comment(sunrise*1000).format('HH:mm a')}</div>
</div>

<div class="weather-items">
   <div>sunset</div>
   <div>${window.Comment(sunset*1000).format('HH:mm a')}</div>
</div>` ;

let otherDayForcast=''
data.daily.forEach((day,idx)=>{
   if(idx==0){
      currentWeatherItemsEl.innerHTML=`
      <div class="day">${window.Comment(day.dt*1000).format('ddd')}</div>
      <img src=" https://openweathermap.org/img/wn/${day.weather[0].icon}@6x.png" alt="weather-icon" class="w-icon">
      <div class="other">
          <div class="temp">Night-${day.temp.night}&#176; c</div>
          <div class="temp">Day-${day.temp.day}&#176; c</div>
      </div>`

   }else{
      otherDayForcast+=`
      <div class="weather-forecast-item">
      <div class="day">${window.Comment(day.dt*1000).format('ddd')}</div>
         <img src=" https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
         <div class="temp">Night-${day.temp.night}&#176; c</div>
         <div class="temp">Day-${day.temp.day}&#176; c</div>
         </div>'`
      
   }
})

}
