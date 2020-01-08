## Project Marketplace

This is the front end repo for the contractor-project marketplace app. The corresponding backend repo is [here](https://github.com/bwhiting2356/contractor-marketplace-backend)

### Instructions

To install the project, run `npm install` then `npm start`

### Tests
To run the unit tests, run `npm test`. There are currently two tests in this suite:
    * the utility function `formatCurrency` until `/util`: verifying that it formats currency values with a dollar with and two decimals places
    * the async action `postNewProject`, verifying that it flows through the middleware, grabs the user id from state, fills in the default projectStatus (0) for new projects, and submits it to the backend api which is mocked. Upon success, it will trigger a refresh of the project list.

There is one end to end test that you can run with `npm run e2e`. 
* a user logs in as a client
* the 'new project' button now becomes visibile to them, and if they click it it opens a modal
* they create a new project
* they log out and the 'new project' button is no longer visible

This e2e currently runs against the real production frontend and backend, but in real life there would an app spun up in a testing pipeline for it