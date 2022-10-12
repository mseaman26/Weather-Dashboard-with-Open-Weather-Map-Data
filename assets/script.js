$(document).ready(function(){

    //these two links are just here for copying and pasting purposes if needed
    var CurrentWeatherMapURL = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"
    var GeoCodingURL = "http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}"
    //this is the key to access openweathermaps api and the associated geo mapping api
    var apiKay = "9cfe7036b90b3a13af1a88f6bf534b32"
    //where the list of previously added cities will be displayed
    var cityListDiv = document.getElementById("city-list-div")
    //imprtant variable.  It is always used as the current city that we are displaying
    var currentCityInput
    var displayedCities =[] //JSON.parse(localStorage.getItem("displayed-cities"))
    var currentDate = moment().format("MM/D/YYYY")
    //ar currentDate = moment().add(4, "day").format("MM/D/YYYY")

    //this array will eventually be filled with objects representing data current weather and each day of the forecast
    var weather = []
    var currentData
    var forecastData

    //initializing the list of previous cities
    
  
    //Function declarations begin here.  

    function clearWeatherDisplays(){
        document.getElementById("current-weather-div").innerHTML = ""
        document.getElementById("forecast-div").innerHTML = ""

    }
    //adds cities to an array, allowing them to be dynamically displayed
    async function addCityToList(){
        currentCityInput = document.getElementById("input-city").value
        var goodJSON = await fetch("https://api.openweathermap.org/geo/1.0/direct?q="+currentCityInput+"&limit=5&appid="+apiKay)
        var goodResponse = await goodJSON.json()
        //we only want to display the city on the dashboard if it is a valid city
        if(goodResponse.length <1){
            return
        }
        
        if(currentCityInput == ""){

            cityListDiv.innerHTML = ""
            return
        }
        //we dont want repeat cities to be displayed
        if(displayedCities.includes(currentCityInput)){
  
            return
        }
        var pastSearch = JSON.parse(localStorage.getItem("displayed-cities"))
        if(pastSearch){
            for(var i = 0; i <pastSearch.length; i++){
                displayedCities.push(pastSearch[i])
            }
            
        }
        displayedCities.push(currentCityInput)
    
        //localStorage.setItem("displayed-cities", JSON.stringify(displayedCities))
        cityListDiv.innerHTML = ""
        
    }
    //dynamdynamically creating and appending cities on the left side of the screen.  They will become clickable buttons that refresh the weather display
    function displayCities(){
        cityListDiv.innerHTML = ""
            for(var i = 0; i < displayedCities.length; i++){
                var city = displayedCities[i]
                var cityEL = document.createElement("button")
                cityEL.setAttribute("class", "city")
                cityEL.innerHTML = city
                cityListDiv.appendChild(cityEL)
            }    
    }
    //set the city list array back to empty
    function clearCityList(){
        document.getElementById("city-list-div").innerHTML = ""
        displayedCities = []
        localStorage.setItem("displayed-cities", JSON.stringify(displayedCities))

    }
    //clear the city list display on the page
    function clearCityDisplay(){
        document.getElementById("city-list-div").innerHTML = ""
    }
    function displayDate(){
        dateH2 = document.createElement("h2")
        dateH2.textContent =(currentCityInput)+" "+currentDate
        document.getElementById("current-weather-div").appendChild(dateH2)
    }

    //HERE, IN THE FOLLOWING FUNCTION, IS WHERE A BIG CHUNK OF THE WORK IS DONE.  BECAUSE I GOT STUCK ON ISSUES INVOLVING ASYNCHRONY, I HAD TO NEST A LOT OF CODE WITHIN THE .THEN METHODS THAT CAME AFTER THE FETCH FUNCTIONS.  



    function createWeatherArray(){
        //setting the weather array to empty
        weather = []
        //gathering longitude and latitude data to use later to get weather data
        fetch("https://api.openweathermap.org/geo/1.0/direct?q="+currentCityInput+"&limit=5&appid="+apiKay)
        .then(function (response) {
            //letting the user know if their entry is invalid
            if(!response.ok){
                var notACityEl = document.createElement("h2")
                notACityEl.textContent = "No Weather Data Found for This Entry"
                //document.getElementById("current-weather-div").appendChild(notACityEl)
            }
            return response.json()
        })
        .then(function(data){
            //get latitude and longitude from geo
            if(data[0]==undefined){
                var notACityEl = document.createElement("h2")
                notACityEl.textContent = "No Weather Data Found for This Entry"
                document.getElementById("current-weather-div").appendChild(notACityEl)
                currentCityInput = ""
                return
            }
            var lat = data[0].lat
            var lon = data[0].lon
            //get weather info based on lat and lon
             fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKay}`)
            .then(function(response){
                //double checking to make sure the entry is valid
                if(!response.ok){
                }
                return response.json()
            })
            .then(function(data){
                //storing data for current day weather
                localStorage.setItem("current-weather", (JSON.stringify(data)))
            

                var currentDataJSON = localStorage.getItem("current-weather")
                if(currentDataJSON){
                    currentData = JSON.parse(currentDataJSON)
                }

                //fetching 5-day forecast
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKay}`)
                    
                .then(function (response){
                    return response.json()
                })
                .then(function(data){
                    localStorage.setItem("weather", (JSON.stringify(data)))
                //storing forecast data
                var weatherJSON = localStorage.getItem("weather")
                if(weatherJSON){
                    forecastData = JSON.parse(weatherJSON)
                }

                //  below is where we begin extracting the data we want for each day and storing it into objects, which eventually go into the "weather" array

                 //============================CURRENT WEATHER==========================================
                //OBJECT for current day 0
                var currentDay = {}
                //current icon              
                var iconID = currentData.weather[0].icon
                var iconURL = "http://openweathermap.org/img/wn/"+iconID+"@2x.png"
                currentDay.icon = iconURL
                //current temp (converting to Fahrenheit)
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
                //Display 5-day forecast
                function displayForecast(){
                    //using a for loop to display the 5-day forcast
                    for(var i = 1; i < 6; i++){
                        var forcastDayDiv = document.createElement("div")
                        forcastDayDiv.setAttribute("id", "forecast-day-div"+i)
                        forcastDayDiv.setAttribute("class", "forecast-day-div")
                        document.getElementById("forecast-div").appendChild(forcastDayDiv)
                        
                        var dateEL = document.createElement("h2")
                        dateEL.textContent = moment().add(i, "day").format("MM/D/YYYY")
                        document.getElementById("forecast-day-div"+i).appendChild(dateEL)

                        var iconEL = document.createElement("img")
                        iconEL.setAttribute("src", weather[i].icon)
                        document.getElementById("forecast-day-div"+i).appendChild(iconEL)

                        var tempEL = document.createElement("p")
                        tempEL.textContent = "Temperature: "+(weather[i].temp)+"(f)"
                        document.getElementById("forecast-day-div"+i).appendChild(tempEL)

                        var windEl = document.createElement("p")
                        windEl.textContent = "Wind: "+weather[i].wind+"mph"
                        document.getElementById("forecast-day-div"+i).appendChild(windEl)

                        var humidityEL = document.createElement("p")
                        humidityEL.textContent = "Humidity: "+weather[i].humidity+"%"
                        document.getElementById("forecast-day-div"+i).appendChild(humidityEL)
                        }
                    }
                    //these functions needed to be called inside the large function containing the .then statements.  This was because they would otherwise get called before
                    //the fetch promises has fulfilled.  Since writing this code, I have gone over the "async" and "await" functions.  They are a tool to more-easily manage this
                    displayForecast()
                    displayCities()
                    displayCurrentWeather()
                })
                    
            })
                
        })
       

    }






    //=========================Event listeners==================
    //Submit button
    document.getElementById("sumbit-button").addEventListener("click", function(event){
        event.preventDefault()
        clearWeatherDisplays()
        addCityToList()
        document.getElementById("input-city").value = ""

        createWeatherArray()
        displayDate()
    })
    //clear all cites from the list button
    document.getElementById("clear-all-button").addEventListener("click", function(event){
        event.preventDefault()
        clearCityList()
    })
    //city list items (are made clickable with event listeners)
    document.getElementById("city-list-div").addEventListener("click", function(event){
        event.stopPropagation()
        if(event.target.tagName != "BUTTON"){
            return
        }
        currentCityInput = event.target.textContent
        clearWeatherDisplays()
        displayDate()
        clearCityDisplay()
        createWeatherArray()
        
    })












})