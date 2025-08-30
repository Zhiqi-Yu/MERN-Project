
//Assessment #3 - NodeJS and ReactJs - 29th August 2025




// This file can be regarded as a readme file, and I will make some explanations in this file.
// This file can be regarded as a readme file, and I will make some explanations in this file.
// This file can be regarded as a readme file, and I will make some explanations in this file.
// This file can be regarded as a readme file, and I will make some explanations in this file.
// This file can be regarded as a readme file, and I will make some explanations in this file.





//NodeAPI
//1. Explain your knowledge of - statelessness, http, REST, spa and classical applications

// Generally speaking, these 5 concepts are the universal foundational ideas of web development. 
// In other words, they are a set of mature rules summarized by developers through decades of project experience.
// Therefore, after learning these ideas, we can avoid some pitfalls and directly implement generally recognized "best practices."

// (1). Statelessness: The server does not store session state; each request carries the necessary information 
//            --> easy horizontal scalability and good fault tolerance.
// (2). HTTP: It is a protocal, It's like a rule that dictates how the browser and server talk to each other. 
//      For example, you use GET to request data, POST to submit data, and status codes (200, 404, 500) to tell you the result.
// (3). REST: REST is an HTTP-based API design style. It treats the data being manipulated as "resources," 
//      identifies resources with URLs, and expresses resource operations using HTTP methods (GET, POST, PUT, DELETE, etc.). 
//      This simplifies and standardizes the interface rules, making it easier for developers to understand and use.
// (4). SPA: Known as Single Page Application. 
//      When the front-end page is interactive, only the corresponding part of the page is modified and re-rendered to achieve the new effect. 
//      The benefits are faster page responsiveness and a better user experience.
// (5). Classical applications: Traditional multi-page applications. When you click a link, the browser refreshes completely, 
//      and the server generates a new HTML document. The advantages are a fast first screen and search engine friendliness, 
//      but the disadvantage is that the user experience isn't as smooth as a SPA.


//2. Create an express setup, with a capability to expose end points for restful api

// use the following command to install Express
// cd api
// npm init -y
// npm i express
// And then, use the relative api to create RESTful api

//3. Create an API with name CreateUser as get verb and pass user info such as name, session, address and age as query param
//4. Save the information passed in #3 to a json file name userInfo in local

// Question 3 and 4 --> see the code part in service.js file




//React
//5. create a webpack setup, index html and one css file to show css in next questions (can use app.css from our project)

// use the following command to install react
// npm init -y 
// npm i react react-dom 
// npm i -D webpack webpack-cli webpack-dev-server \ @babel/core @babel/preset-env @babel/preset-react babel-loader \ style-loader css-loader html-webpack-plugin
// copy the old 'webpack.config.js' file to our new folder
// copy the '.babelrc' file to /client folder
// create the 'index.html' file , 'index.js' file , and 'app.css' file
// render the App component in React !


//6. how react renders dom in conservative manner - explain, also explain 

// Simply put, React implements it by maintaining a virtual DOM and using the diff algorithm.

// React maintains a virtual DOM in memory, a lightweight copy of the real DOM.
// When component state or properties change, React regenerates a new virtual DOM.
// React uses the diff algorithm to compare the old and new virtual DOM trees to identify the actual changes.
// React only updates the necessary real DOM nodes, rather than re-rendering the entire page.
// In this way, the approach, called "conservative rendering," reduces DOM operations and improves performance.

//7. create a class component named - Success and show some quotes (messages) in it with h1,h2,h3 components
//8. create a functional component SuccessChild, make it child of Success and pass Name and Address to it from Success
//9. create SuccessStory as another component, pass this as props in SuccessChild from Success component

// Question 7-9 --> see the code part in the /client folder

//10. explain how virtual dom works and how it is coupled with state updates and state update API's

// React uses Virtual DOM to reduce the number of direct DOM operations.
// Every time a component's state changes (via setState or useState), React regenerates a new Virtual DOM tree and diffs it with the old one.
// Only the differences are synchronized to the real DOM; this is the Virtual DOM's "minimal update" mechanism.
// This approach couples state updates with DOM rendering, ensuring data-driven views while improving performance.