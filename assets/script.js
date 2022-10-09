$(document).ready(function(){
    var CurrentWeatherMapURL = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"
    var GeoCodingURL = "http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}"
    var apiKay = "9cfe7036b90b3a13af1a88f6bf534b32"
    var cityListDiv = document.getElementById("city-list-div")
    var currentCityInput
    var displayedCities = JSON.parse(localStorage.getItem("displayed-cities"))
    var currentDate = moment().format("MM/D/YYYY")
    //ar currentDate = moment().add(4, "day").format("MM/D/YYYY")
    var weather = []

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


    function createWeatherArray(){
        weather = []
        fetch("http://api.openweathermap.org/geo/1.0/direct?q="+currentCityInput+"&limit=5&appid="+apiKay)
        .then(function (response) {
            
            return response.json()
        })
        .then(function(data){
            //get latitude and longitude from geo
            var lat = data[0].lat
                var lon = data[0].lon
                //get weather info based on lat and lon

                //insert current fetch call here
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKay}`)
                .then(function(response){
                    return response.json()
                })
                .then(function(data){
                    localStorage.setItem("current-weather", (JSON.stringify(data)))
                })
                var currentData
                var currentDataJSON = localStorage.getItem("current-weather")
                if(currentDataJSON){
                    currentData = JSON.parse(currentDataJSON)
                }
                console.log("currentData", currentData)
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKay}`)
                
                .then(function (response){
                    return response.json()
                })
                .then(function(data){
                    localStorage.setItem("weather", (JSON.stringify(data)))
                    console.log(data)

                })
                var forecastData
                var weatherJSON = localStorage.getItem("weather")
                if(weatherJSON){
                    forecastData = JSON.parse(weatherJSON)
                }
                console.log(forecastData)
                 //============================CURRENT WEATHER==========================================
                    //OBJECT for current day
                    var currentDay = {}
                    //current icon
                    var iconID = currentData.weather[0].icon
                    var iconURL = "http://openweathermap.org/img/wn/"+iconID+"@2x.png"
                    currentDay.icon = iconURL
                    //current temp
                    var temp = Math.floor(1.8*(currentData.main.temp-273)+32)
                    currentDay.temp = temp
                    //current wind
                    var wind = currentData.wind.speed
                    currentDay.wind = wind
                    //current humidity
                    var humidity = currentData.main.humidity
                    currentDay.humidity = humidity
                    weather.push(currentDay)

                
                    //==================================1 DAY OUT=====================================
                    //OBJECT for day 1
                    var day1 = {}
                    //icon for day 1
                    var day1IconID = forecastData.list[7].weather[0].icon
                    var Day1iconURL = "http://openweathermap.org/img/wn/"+day1IconID+"@2x.png"
                    day1.icon = Day1iconURL
                    //temp for day 1
                    var day1Temp = Math.floor(1.8*(forecastData.list[7].main.temp-273)+32)
                    day1.temp = day1Temp
                    //wind for day 1
                    var day1Wind = forecastData.list[7].wind.speed
                    day1.wind = day1Wind
                    //humidity for day 1
                    var day1Humidity = forecastData.list[7].main.humidity
                    day1.humidity = day1Humidity
                    weather.push(day1)
                    console.log("day 1", day1)

                    //==================================2 DAYs OUT=====================================
                    //OBJECT for day 2
                    var day2 = {}
                    //icon for day 2
                    var day2IconID = forecastData.list[15].weather[0].icon
                    var Day2iconURL = "http://openweathermap.org/img/wn/"+day2IconID+"@2x.png"
                    day2.icon = Day2iconURL
                    //temp for day 2
                    var day2Temp = Math.floor(1.8*(forecastData.list[15].main.temp-273)+32)
                    day2.temp = day2Temp
                    //wind for day 2
                    var day2Wind = forecastData.list[15].wind.speed
                    day2.wind = day2Wind
                    //humidity for day 2
                    var day2Humidity = forecastData.list[15].main.humidity
                    day2.humidity = day2Humidity
                    weather.push(day2)

                     //==================================3 DAYs OUT=====================================
                    //OBJECT for day 3
                    var day3 = {}
                    //icon for day 3
                    var day3IconID = forecastData.list[23].weather[0].icon
                    var Day3iconURL = "http://openweathermap.org/img/wn/"+day3IconID+"@2x.png"
                    day3.icon = Day3iconURL
                    //temp for day 3
                    var day3Temp = Math.floor(1.8*(forecastData.list[23].main.temp-273)+32)
                    day3.temp = day3Temp
                    //wind for day 3
                    var day3Wind = forecastData.list[23].wind.speed
                    day3.wind = day3Wind
                    //humidity for day 3
                    var day3Humidity = forecastData.list[23].main.humidity
                    day3.humidity = day3Humidity
                    weather.push(day3)

                      //==================================4 DAYs OUT=====================================
                   //OBJECT for day 4
                    var day4 = {}
                    //icon for day 4
                    var day4IconID = forecastData.list[31].weather[0].icon
                    var Day4iconURL = "http://openweathermap.org/img/wn/"+day4IconID+"@2x.png"
                    day4.icon = Day4iconURL
                    //temp for day 4
                    var day4Temp = Math.floor(1.8*(forecastData.list[31].main.temp-273)+32)
                    day4.temp = day4Temp
                    //wind for day 4
                    var day4Wind = forecastData.list[31].wind.speed
                    day4.wind = day4Wind
                    //humidity for day 4
                    var day4Humidity = forecastData.list[31].main.humidity
                    day4.humidity = day4Humidity
                    weather.push(day4)


                       //==================================5 DAYs OUT=====================================
                   //OBJECT for day 5
                    var day5 = {}
                    //icon for day 5
                    var day5IconID = forecastData.list[39].weather[0].icon
                    var Day5iconURL = "http://openweathermap.org/img/wn/"+day5IconID+"@2x.png"
                    day5.icon = Day5iconURL
                    //temp for day 5
                    var day5Temp = Math.floor(1.8*(forecastData.list[39].main.temp-273)+32)
                    day5.temp = day5Temp
                    //wind for day 5
                    var day5Wind = forecastData.list[39].wind.speed
                    day5.wind = day5Wind
                    //humidity for day 5
                    var day5Humidity = forecastData.list[39].main.humidity
                    day5.humidity = day5Humidity
                    weather.push(day5)

                    //display CURRENT weather
                    function displayCurrentWeather(){
                        var currentIconImage = document.createElement("img")
                        currentIconImage.setAttribute("src", weather[0].icon)
                        document.getElementById("current-weather-div").appendChild(currentIconImage)


                        var currentTempP = document.createElement("p")
                        currentTempP.textContent = "Temperature: "+weather[0].temp+"(f)"
                        //currentTempP.style.fontSize = "20px"
                        currentTempP.style.fontWeight = "bold"
                        document.getElementById("current-weather-div").appendChild(currentTempP)

                        var currentWindP = document.createElement("p")
                        currentWindP.textContent = "Wind: "+weather[0].wind+" mph"
                        //currentWindP.style.fontSize = "20px"
                        currentWindP.style.fontWeight = "bold"
                        document.getElementById("current-weather-div").appendChild(currentWindP)

                        var currentHumidityP = document.createElement("p")
                        currentHumidityP.textContent = "Humidity: "+weather[0].humidity+"%"
                        //currentHumidityP.style.fontSize = "20px"
                        currentHumidityP.style.fontWeight = "bold"
                        document.getElementById("current-weather-div").appendChild(currentHumidityP)

                    }
                    function displayForecast(){
                        for(var i = 1; i < 6; i++){
                            var forcastDayDiv = document.createElement("div")
                            forcastDayDiv.setAttribute("id", "forecast-day-div"+i)
                            forcastDayDiv.setAttribute("class", "forecast-day-div")
                            document.getElementById("forecast-div").appendChild(forcastDayDiv)
                            
                            var dateEL = document.createElement("h2")
                            dateEL.textContent = moment().add(i, "day").format("MM/D/YYYY")
                            document.getElementById("forecast-day-div"+i).appendChild(dateEL)
                        }
                    }
                    displayForecast()
                    displayCities()
                    displayCurrentWeather()
                    
                    console.log("forecastData", forecastData)
                
        })
       

    }






    //=========================Event listeners==================

    document.getElementById("sumbit-button").addEventListener("click", function(event){
        event.preventDefault()
        clearWeatherDisplays()
        addCityToList()

        displayDate()
        createWeatherArray()
        setTimeout(() => {
             console.log(weather)
        }, 1000);

    })

    document.getElementById("clear-all-button").addEventListener("click", function(event){
        event.preventDefault()
        clearCityList()
    } )

   // =============================Page Load===============
    












})