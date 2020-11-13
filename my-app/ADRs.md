### Application Architecture

#### Decision 1
Summary: In order to provide an interface for our application, we decided to only use a Front-End to make all API calls and display information.

Problem: In order for our app to provide functionality, it needs routing capabilities.

Constraints: Our page needs to be embedded onto the client's website, which runs on a Wordpress PHP backend.

Options: Create a dedicated backend server or Create only the front-end application.

Client-Server Architecture

Pros: 
- More modular
- Easy to add functionality
- Easy to implement routes
- More resources readily available
- Less complex

Cons:
- Needs to host backend separately
- More moving parts
- Has more dependencies
- Would probably cost money to host

Front-End only Archictecture

Pros:
- Does not need a server
- Less dependencies
- Less moving parts
- Would not cost extra to host

Cons:
- Less modular
- Harder to add functionality
- Harder to implement routes 
- Less resources readily available
- More complex

Rationale: In order to make it easier for the client, we decided to use the Front-End only Architecture.

#### Decision 2
Summary: In order to store and fetch information for each event, we decided to utilize the Google Sheets API and use Google Sheets as our database.

Problem: How do we store and fetch information for each event?

Constraints: The application must be able to dynamically access a database based on the parameters given to it.

Options: Google Sheets or Database as a Service

Google Sheets

Pros:
- Utilizing existing infrastructure
- Client has more experience using it
- Free
- Simple

Cons:
- Need to figure out how to use it
- Could be less efficient

Database as a Service

Pros:
- Could be more efficient
- Plenty of online documentation exists

Cons:
- Not Free
- Not Simple
- Client has less experience using it

Rationale: Because the client knows how to use Google Sheets, the application will access needed information from the Sheets he provides.

#### Decision 3
Summary: In order to create an interactive webpage, we decided to use Javascript.

Problem: In order to write code, we need to write it in a coding language.

Constraints: This language needs to work with wordpress.

Options: Javascript or PHP

Javascript

Pros:
- Build for writing interactive webpages
- Less complex for Front-End use

Cons:
- More complex for logic

PHP

Pros:
- Less complex for logic

Cons:
- Built for front-end and back-end logic
- More complex for Front-End use

Rationale: Because it was designed for interactive websites, we will be using Javascript.

#### Decision 4
Problem: We do not have the time or ability to create most of the javascript functions ourselves.

Constraints: It must provide functionality to javascript.

Options: React or Vue or our-own-thing

React:

Pros:
- Taught in the UNC curriculum
- A main javascript front-end
- Plenty or tutorials and resources for it
- Comes with plenty of UI functionality
	
Cons:
- Complicated
- Very large
- Learning curve

Vue:

Pros:
- Lightweight
- Easy to use
- Faster
	
Cons:
- Comes with less UI functionality
- Indepently developed
- Not taught in the UNC curriculum
	
Our-own-thing:

Pros:
- We would know how it works
	
Cons:
- Would be clunky, inefficient, poorly designed
- Cannot be finished within one semester
- Would need to provide continual support
- Would come with no UI funcionality
	
Decision: Because it fulfills all of our needs and was recommended by the mentor, we will be using the React framework.