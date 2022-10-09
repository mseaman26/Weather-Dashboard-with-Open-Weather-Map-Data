$(document).ready(function(){
    var CurrentWeatherMapURL = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"
    var GeoCodingURL = "http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}"
    var apiKay = "76e3a7084f08e874515947d6a36a78d5"
    var cityListDiv = document.getElementById("city-list-div")
    var currentCityInput
    var displayedCities = JSON.parse(localStorage.getItem("displayed-cities"))
    var currentDate = moment().format("MM/D/YYYY")
    var Weather = []

    if(displayedCities ==null){
        displayedCities = []
    }
    function clearWeatherDisplays(){
        document.getElementById("current-weather-div").innerHTML = ""
        document.getElementById("forecast-div").innerHTML = ""

    }
    function addCityToList(){
        
        currentCityInput = document.getElementById("input-city").value
        if(currentCityInput == ""){
            cityListDiv.innerHTML = ""
            return
        }
        console.log("current city "+currentCityInput)
        displayedCities.push(currentCityInput)
        localStorage.setItem("displayed-cities", JSON.stringify(displayedCities))
        cityListDiv.innerHTML = ""
    }
    function displayCities(){
        for(var i = 0;i<displayedCities.length;i++){
            var city = document.createElement ("div")
            city.setAttribute("class", "city")
            city.innerHTML = displayedCities[i]
            cityListDiv.appendChild(city)
        }
    }
    function clearCityList(){
        document.getElementById("city-list-div").innerHTML = ""
        //Document.getElementById("city-list-div").innerHTML = ""
        displayedCities = []
        console.log(displayedCities)
        localStorage.setItem("displayed-cities", JSON.stringify(displayedCities))
        
    }
    function displayDate(){
        dateH2 = document.createElement("h2")
        dateH2.textContent = currentDate
        console.log(dateH2)
        document.getElementById("current-weather-div").appendChild(dateH2)
    }
    function getIcon(){

        var iconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
    }
    function createWeatherArray(){
        fetch("http://api.openweathermap.org/geo/1.0/direct?q="+currentCityInput+"&limit=5&appid="+apiKay)
        .then(function (response) {
                
            return response.json()
        })
        .then(function(data){
            //get latitude and longitude from geo
            var lat = data[0].lat  
                var lon = data[0].lon
                console.log([lat, lon])
                //get weather info based on lat and lon
                fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apiKay)
                .then(function (response){
                    return response.json()
                })
                .then(function(data){
                    console.log(data)
                    //============================CURRENT WEATHER==========================================
                    //OBJECT for current day
                    var currentDay = {}
                    //current icon
                    var iconID = data.weather[0].icon
                    var iconURL = "http://openweathermap.org/img/wn/"+iconID+"@2x.png"
                    currentDay.icon = iconURL
                    //current temp
                    var temp = Math.floor(1.8*(data.main.temp-273)+32)
                    currentDay.temp = temp
                    //current wind
                    var wind = data.wind.speed
                    currentDay.wind = wind
                    //current humidity
                    var humidity = data.main.humidity   
                    currentDay.humidity = humidity
                    console.log(currentDay)
                    //==================================1 DAY OUT=====================================
                    
                })
                fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+apiKay)
                .then(function (response){
                    return response.json()
                })
                .then (function(data){
                    //OBJECT for day 1
                    var day1 = {}
                    //icon for day 1
                    var day1IconID = data.list[7].weather[0].icon
                    console.log(day1IconID)
                    var Day1iconURL = "http://openweathermap.org/img/wn/"+day1IconID+"@2x.png"
                    day1.icon = Day1iconURL
                    //temp for day 1
                    var day1Temp = Math.floor(1.8*(data.list[7].main.temp-273)+32)
                    day1.temp = day1Temp
                    //wind for day 1
                    var day1Wind = data.list[7].wind.speed
                    day1.wind = day1Wind
                    //humidity for day 1
                    var day1Humidity = data.list[7].main.humidity
                    day1.humidity = day1Humidity
                    console.log(day1)
                   
                })
        })      

    }














    //=========================Event listener==================
    
    document.getElementById("sumbit-button").addEventListener("click", function(event){
        event.preventDefault()
        clearWeatherDisplays()
        addCityToList()
        displayCities()
        createWeatherArray()
    })
    
    document.getElementById("clear-all-button").addEventListener("click", function(event){
        event.preventDefault()
        clearCityList()
    } )

   // =============================Page Load===============

   displayDate()












})