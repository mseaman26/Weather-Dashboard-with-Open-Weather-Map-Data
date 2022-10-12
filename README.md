# Weather-Dashboard
This application displays current weather and a 5-day forecast for any major city that the user enters. It keeps a displayed list of cities that the user has visited in the past, which is stored in local storage, allowing the user to see their personal list each time they visit the page.  The user can quickly toggle between cities from that list, add a new city, or clear the list.  The weather data comes from the openweathermap API.

## Overview of the Application

<img src="./assets/Images/Weather Dashboard.gif">

## Link to the Deployed Application:
https://mseaman26.github.io/Weather-Dashboard-with-Open-Weather-Map-Data/

## Technology used
This project combines HTML, JavaScript, and CSS.  Most of the work was done in JavaScript.  The CSS utilizes styling from Bootstrap

## Notable Features
- This project utilizes data acquired with the "fetch" function in JavaScript.  It interprets a valid city name, and through a series of three fetch calls, retrieves current weather data and forecast data from any major city in the world.  
- There are dynamically created elements, some of which (the user's list of cities) have clickable functionality. 
- The data is up-to-date and the current time is displayed.  
- The display adapts to different screen sizes, including mobile phones

## Notable Methods
- The main method of focus in this project is dealing with fetch calls and responses.  This involved an understanding of how JavaScript operates asynchronously.  
- Making these calls required looking at the doccumentation of the APIs in order to know how to set up the query parameters.
- Dealing with these calls and responses involved using the .then method and the .json() method, among others.  It also involved examining the response to know how to get the the specific data that I wanted
- It was necessary to keep track of variable values as they are passed through a complex, asynchronous program.  Getting the desired result often required problem-solving

## Code Snippets
- Here we have a fetch call.  This code demonstrates what was required to get the latitude and longitude from a city name.  This data was then later used to get weather data:
```Javascript
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
```
- Here is a "for" loop that gathers acquired forecast data and displays it:
```javascript
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
```
## Key Learning Points From This Project
- How to deal with asynchronous functions.  This was the biggest challenge of the project.  Much was learned about how variables change before, after, and during a fetch call
- How to read through the doccumentation of an API and create a query parameter
- How to sort through a response object to get desired data
- Continuing improvement in code organization.  Much of the learning on this point will have to be applied to the next project

## -By Michael Seaman
