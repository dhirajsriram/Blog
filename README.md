
# Blog

**[https://blog-react.netlify.com](https://blog-react.netlify.com)**

## Abstract

A react application that presents a list of blogs to the user in the form of a list. The application can Search, Add or delete and Sort blogs by Categories.

## Installation

Kindly do an npm install at the root directory of both the applications to install the required packages. The following are the libraries that are used in front-end.
- React v16.9.0
- Material-UI v0.20.2

```
npm install 
```

## Serving Locally

Once the packages have been installed you may serve both the applications locally using `npm start` on the root directory of the application. Following is the port the application runs on
- Blog-react :  [http://localhost:3000](http://localhost:3000)

### Scripts

`npm run start` - Serves the app locally on [http://localhost:3000](http://localhost:3000)

`npm run test` - Runs the test scrips on the specific application

`npm run build` - Builds a minified version of the frontend application. It correctly bundles React in production mode and optimizes the build for the best performance.

## Architecture

A high level architecture of the application can be found below
<p align="center"><img src="/blog.png"></p>

### Code Splitting

Code is a must-have for any front-end application due to the performance benefits it offers. Sending the application in chunks improves the load times of the application by a great margin. Code splitting has been thoroughly followed in the entire application

### Support for Older Browsers

The application is supported in browsers from IE 11 and greater. Polyfills have been installed to aid with the compatibility.

### React Router

Routing is enabled through react-router v4. There are two pages in our Single -page app the Listing and description pages respectively.

### React Suspense

React suspense has been used to help us manage the loading state of our code-split application. Suspense suspends rendering and automatically display the fallback which is the Loader component in our case until the chunks of the components are available in the dom.

### Functional Components
Most of the components in the application are stateless functional components. Hooks have been used to manage the state if the component demands it.

## Deployment

- The application has been deployed on Netlify.
- Continuous Integration has been enabled and is currently synced with the repo [https://github.com/dhirajsriram/Blog](https://github.com/dhirajsriram/Blog)

## Description

The application works on a single page, Following are the views that the application works on
- Listing
- Description
- Add Blog

### Listing

The listing page gives a list view of all the blogs on the current blog list. The user can do the following from the listing page
- Add mew blog (The floating button at the bottom of the page)
- Remove a blog from the list
- Group the blog by the author. (Selection from the dropdown or the side list)
- Read the entire blog from the description page
- Search the blog by title. I have searched look for the title since it gives a more focused search result.

**Code that filters the results (Search | Author)**

```js
  const setData = (value: string, property: string, newItem: any) => {
    let categorySorted = newItem.filter((blog: any) => {
      return blog[property].includes(decodeURIComponent(value))
    })
    setState({ data: categorySorted })
  }
```

### Description

The description provides an expanded view of the contents of the current blog.

### Add Blog

The added blog provides a form to add a blog to the current listing. Following are the fields that are required to add a blog
- Title (Required)
- Author (Required)
- Date published (Required)
- Content (Required)

## Design

### Folder structure

The application was designed to be as granular as possible in terms of functionality. Separation of concerns was the goal while designing the project. The folder structure of the application is as follows

`src/common` - Contains all the shared components such as error, Search, menu, map, etc

`src/pages` - The different pages of the application are placed here. At present, the app runs on a single page **Home**

`src/assets` - Images necessary for the application are present here.

### UX Design

The application strongly follows a Material design approach. Elements shown to users represent life-like materials like paper which is something that a user can connect with very easily.

The application was designed with a map in mind. The Map on the left represents a canvas of a map and the markers on the right represent the marking made on the canvas.

## Error Handling

The application handles errors gracefully. The application checks for the response status. If the status is not 200 an Error component is shown to the user with the corresponding error message.

## Future Implementation

Following are the improvements that I consider could be made to the application

- Ability to sustain the data. The application demands a way to sustain the data-state and I would suggest a backend application with microservices to handle the states gracefully. Although Redux is a good solution for the front-end a backend API would a common place for both the worlds (Front-end and back-end)
- WYSIWYG editor can be used to edit the content while adding the blog to help the user with the HTML syntax.
- A GRAPHQL server that sits between the front-end and the blogger API would help drastically by reducing the number of API calls that need to happen to sustain the data.


