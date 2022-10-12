# Weather-Dashboard
This application displays current weather and a 5-day forecase for any city that the user enters. It keeps a displayed list of cities that the user has visited in the past, which is stored in local storage, allowing the user to see their personal list each time they visit the page.  The user can quickly toggle between cities from that list, add a new city, or clear the list.  The weather data comes from the openweathermap API.

## Overview of the Application

<img src="./assets/Images/Weather Dashboard.gif">

## Link to the Deployed Application:
https://mseaman26.github.io/Weather-Dashboard-with-Open-Weather-Map-Data/

## Technology used
This project combines HTMP, JavaScript, and CSS.  Most of the work was done in JavaScript.  The CSS utilizes styling from Bootstrap

## Notable Features
- This project utilizes data acquired with the "fetch" fucntion in JavaScript.  It interprets a valid city name, and through a series of three fetch calls, retrieves current weather data and forecast data from any major city in the world.  
- There are dynamically created elements, some of which (the user's list of cities) have clickable functionality. 
- The data is up-to-date and displays the current date.  
- The display adapts to different screen sizes, including mobile phones

## Notable Methods
- The main method of focus in this project is dealing with fetch calls and responses.  This involved an understanding of how JavaScript operates asynchronously.  
- Making these calls required looking at the doccumentation of the APIs in order to know how to set up the query parameters.
- Dealing with these calls and responses involved using the .then method and the json() method, among others.  It also involved examining the response to know how to get the the specific data that I wanted
- It was necessary to keep track of variable values as they are passed through a complex, asychronous program.  Getting the desired result often required problem-solving

## Code Snippets
- 