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
        localStorage.setItem("displayed-cities", JSON.stringify(displayedCities))
        
    }
    function displayDate(){
        dateH2 = document.createElement("h2")
        dateH2.textContent = currentDate
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
                //get weather info based on lat and lon
                fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apiKay)
                .then(function (response){
                    return response.json()
                })
                .then(function(data){
    
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
                    
                    //==================================2 DAYs OUT=====================================
                   //OBJECT for day 1
                   var day2 = {}
                   //icon for day 1
                   var day2IconID = data.list[15].weather[0].icon
                   var Day2iconURL = "http://openweathermap.org/img/wn/"+day2IconID+"@2x.png"
                   day2.icon = Day2iconURL
                   //temp for day 1
                   var day2Temp = Math.floor(1.8*(data.list[15].main.temp-273)+32)
                   day2.temp = day2Temp
                   //wind for day 1
                   var day2Wind = data.list[15].wind.speed
                   day2.wind = day2Wind
                   //humidity for day 1
                   var day2Humidity = data.list[15].main.humidity
                   day2.humidity = day2Humidity

                     //==================================3 DAYs OUT=====================================
                   //OBJECT for day 1
                   var day3 = {}
                   //icon for day 1
                   var day3IconID = data.list[23].weather[0].icon
                   var Day3iconURL = "http://openweathermap.org/img/wn/"+day3IconID+"@2x.png"
                   day3.icon = Day3iconURL
                   //temp for day 1
                   var day3Temp = Math.floor(1.8*(data.list[23].main.temp-273)+32)
                   day3.temp = day3Temp
                   //wind for day 1
                   var day3Wind = data.list[23].wind.speed
                   day3.wind = day3Wind
                   //humidity for day 1
                   var day3Humidity = data.list[23].main.humidity
                   day3.humidity = day3Humidity

                      //==================================4 DAYs OUT=====================================
                   //OBJECT for day 1
                   var day4 = {}
                   //icon for day 1
                   var day4IconID = data.list[31].weather[0].icon
                   var Day4iconURL = "http://openweathermap.org/img/wn/"+day4IconID+"@2x.png"
                   day4.icon = Day4iconURL
                   //temp for day 1
                   var day4Temp = Math.floor(1.8*(data.list[31].main.temp-273)+32)
                   day4.temp = day4Temp
                   //wind for day 1
                   var day4Wind = data.list[31].wind.speed
                   day4.wind = day4Wind
                   //humidity for day 1
                   var day4Humidity = data.list[31].main.humidity
                   day4.humidity = day4Humidity

                       //==================================5 DAYs OUT=====================================
                   //OBJECT for day 1
                   var day5 = {}
                   //icon for day 1
                   var day5IconID = data.list[39].weather[0].icon
                   var Day5iconURL = "http://openweathermap.org/img/wn/"+day5IconID+"@2x.png"
                   day5.icon = Day5iconURL
                   //temp for day 1
                   var day5Temp = Math.floor(1.8*(data.list[39].main.temp-273)+32)
                   day5.temp = day5Temp
                   //wind for day 1
                   var day5Wind = data.list[39].wind.speed
                   day5.wind = day5Wind
                   //humidity for day 1
                   var day5Humidity = data.list[39].main.humidity
                   day5.humidity = day5Humidity
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