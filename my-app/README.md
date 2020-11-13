## COMP 523 J - Venture Capital Online Judging

Our project is to create a website for judges from a Venture Capital competition to submit results and have the results be viewed online.

## Getting started

### Prerequisites

Outside of an IDE, there is no need to download additional software, as everything is included already, such as React.

### Getting a working development environment

In order to get a working development environment, once you have installed/opened up your IDE, unzip the unbuilt-app.zip file, and put it into your working directory.

### Running Locally

In order to run locally, use the command "npm start" in the console to start up a developmental version of the app in your browser at [http://localhost:3000](http://localhost:3000). It will update in response to changes in the code.

### Warranty

This code was last tested and verified to work on 11/13/2020, by Luke Wheeler on Windows 10.

## Testing

### Running the test suite

In order to test, use "npm run test".

## Deployment

The app will be deployed in the ~/public_html/voting/ directory on the client’s SiteGround server. When unzipping the built-app.zip, the client should place the “voting” directory into the “public_html” folder.

The production version of the code is in unbuilt-app.zip. For turning production code into a new built-app.zip, use "npm run build".

The website is hosted by SiteGround, and the app uses React to contact the Google Sheets API.

## Technologies Used

React and the Google Sheets API are the technologies used directly with the software.

For info about the ADRs, look at "ADRs.md".

## Contributing

In order to contribute, the developer needs the unbuilt-app.zip file.

### Conventions

For conventions regarding the technologies, there is the ReactREADME.md file for React. It also says how to use the testing suite. For the google sheets API:

https://dev.to/calvinpak/how-to-read-write-google-sheets-with-react-193l
https://github.com/theoephraim/node-google-spreadsheet

### Project Info

https://github.com/Deeakron/COMP-523-J/blob/gh-pages/index.md

## Authors

Luke Wheeler, Matthew Wheeler, Nathan Schwartz

## License

For license info, look at "LICENSE".

## Acknowledgements

We would like to thank our teacher Jeff Terrell for providing this learning experience and our mentor Nick Auger for guiding us along the way.