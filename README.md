![](https://repository-images.githubusercontent.com/243993285/de860f00-5b8f-11ea-8f74-7fdf33a9decc)
# React Movie Database
A React application for discovering movies from [TMBD](https://www.themoviedb.org/) database.
See the working example at https://iftee.github.io/react-movie-database/

## Features
- Discover the currently popular movies.
- Search movies using movie name in homepage.
- View movie storyline, trailer, cast, information etc. from movie pages.
- Browse movies based on cast, director and writer.
- Discover movies based on genre and release year.

## Developer Instruction
- Get an API key from TMBD.
- Update the `API_Key` value in `src/config.js` file.
- Install all Node dependencies.
- Start the development server.

## Current Limitations
Due to uploading in GitHub Pages, some routing issues showed up with React Router. Although the major 404 issue has been taken care of as per the [instrusctions](https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing) from Create React App. However these issues are still there to work on:
- Trying to go from one link to another using same component for routing doesn't work. Example: for example trying to go from `https://iftee.github.io/react-movie-database/genre/16` to `https://iftee.github.io/react-movie-database/genre/878`.
- Opening a link in new tab will take the new tab to Home page. This is a GitHub Pages limitation and therefor, I'm not sure if I'll spend time on this.

Note: These issues will not occur when you work on local server or deploy to the root of a custom domain.

## Future Plans
When I have free time:
- [ ] Adding feature to pull review data
- [ ] Adding feature to pull similar movies data

## Tools Used
- [Create React App](https://create-react-app.dev/) to bootstrap the application
- [The Movie Database API v3](https://developers.themoviedb.org/3/getting-started/introduction) to fetch data from
- [Bulma](https://bulma.io/) through [React Bulma Components](https://www.npmjs.com/package/react-bulma-components) to make resonsive layout
- [React Routers](https://github.com/ReactTraining/react-router) to make the application routes
- [React Icons](https://react-icons.netlify.com/#/) for rendering icons