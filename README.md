# Newtry
weather 
In css file there is <img src"address of open weathermap api">tag ,which contain icons from openweathermap api and they change according to weather   
@media only screen which make moveble lower screen and adjust accordingly display 

set time and date using javascript and it will chnage agter 1 sec time interval
fetch("https://api.openweathermap.org/data/2.5/weather?lat=${latitude}lon=${longitude}&appid=${API_KEY}").then(res => res.json()).then(data =>{
        console.log(data)
        showweatherData(data);
        this is use to retrive data
