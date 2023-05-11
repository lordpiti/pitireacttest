# FootballWeb Reloaded React

This is a React app used as a sandbox to consume a REST api and test many of the features in the framework.

Architecture is pretty basic and it's all organised in modules representing each of the areas in the app.

## Contents
- Homepage: displays a set of tweets from the Spanish football league, LaLiga
- Teams section: Displays a list with all the teams in the system. If you select one of them, you can see and modify its data: basic information, squad, stadium and so on. By default it also displays the latest tweets from the official account of the team.
- Competitions section: Displays a list with all the competitions in the system. If you select one of them, you can see what is going on in the competition. There are two types of competitions: Playoff and League, and different type of information is displayed for each.(The playoff competitions show the draw, the league shows table, scorers, etc). When selecting a game , it displays all of the events in the game, and statistics.
**Also, there is a competition simulation feature which streams 10 games from the backend. Basically the user can see live how events are happening in 10 different games at the same time, in multiple devices since it’s streaming the simulations from the server.**
- Players section: Displays a list with all the players in the system. If you select one you can see and edit all information about the players, including all the games they have played, grouped by competition and season.


## Some of the functionality the app provides include:
* UI and layout
  * Material UI components
  * Display of graphics using components based on Chart.js
* Store
  * Redux approach using react-redux
  * Middleware using react-thunk
* Practical use of forms and validation
* Use of google maps services
* Authentication
  * Facebook API
  * Google API
* Use of interceptors for HTTP requests to access the API and guards to protect routes in the app
* Real-time web functionality via sockets using the signalR npm package provided by Microsoft
* Use of GraphQL in some areas of the app for client-side database querying using Apollo client
* Available for android and iOS as PWA
