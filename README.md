PROJECT WORK FOR COURSE: “CT30A3204 Advanced Web Applications - Verkko-opetus 1.6.2023-31.7.2023”

_GENERAL INFORMATION_

_TASK:_

Task was to create a system that lets users register, login and post new code snippets. Also commenting on other people’s posts should be possible for registered users. System should include authentication and users that are not logged should be able to view posts and comments but not make new posts or comments. Data should be saved to a database. 

General information about the project:

Project has been built using MERN-stack (Mongodb, Express, React, Node).

_BACKEND AND DATABASE:_

Backend has been created with Node.js and Express. Backend code is in the server-folder.

Web application utilizes Mongodb Atlas -cloud database as a database. Mongoose object modeling library is also utilized. Two different custom Mongoose Schema-models are used in this application: conversationModel.js to store conversation data and userModel.js to store user data.

Backend offers conversation and user data for frontend via APIs. Conversation data can be read, modified, deleted* and created through the conversation related APIs. User API offers means to login existing users and register new users. Also jsonwebtokens are created and provided via this API. 

Backend has a middleware function for user authentication and it is used whenever there is need for authentication on the backend side. For example when trying to create new post via conversation API.

*delete functionality has been disabled and needs more defined authorization for productionworthy frontend applications.

_FRONTEND:_ 

Frontend is React based and it has been built with “npx create-react-app” command output as a starting point. 

React-router-dom is utilized to create routing inside the application. 

Conversations are fetched from the backend and stored to conversationContext so that they are available for frontend usage without need for repetitive fetching. Same goes for users own user data which is fetched when logging in. Conversation context is kept up to date with the same information that is posted to the database when actions on the application are made; context and database are synced. 

Styling and responsive design is done in vanilla CSS. Font from Google library is utilized.

_INSTALLATION_

1. Download repository files and place them on a desired location on your computer.
2. Run npm install command on both server as well as frontend directory to install local node-modules.
3. Create .env -file to server-directory. File should contain following text (modify parts marked <...>): 

PORT= <Desired port to run server, please note that port 3000 is used by frontend by default and on the frontend, the port 4000 is referred as default for server port. Therefore using port highly 4000 is recommended. If you use different port than 4000, you must change fetch addresses in the frontend code accordingly>

MONGO_URI= <Your Mongodb database address goes here, please refer to Mongodb Atlas for your address. Form of the address should be as follows: mongodb+srv://<Mongodb_username:database_key@cluster0.6zre3if.mongodb.net/?retryWrites=true&w=majority>

SECRET= <*>

*Insert a secret string that is goin to be used for jsonwebtoken creation.

Server can be run using command “node server.js” or “npm run dev” (latter utilizes nodemon). Servers logs console when it has connected to Mongodb database and is running.

Frontend can be launched using command npm start.

_INSTRUCTIONS FOR USE_

1. Application works like standard conversation forums would work.
2. Registration and logging in are required to make or comment posts.
3. When creating posts, users may input the code snippet on the code field and it is presented with a different background-color than the text body of the post.
4. To view comments or comment posts users must open post from the homepage.

_IMPLEMENTED FEATURES AND SELF-ASSESSMENT_

Implemented features and self assessed points are presented in the following list:

1. Basic features (as stated in the previous chapter) with well written documentation - 25 points
2. Utilization of a frontside framework, such as React, but you can also useAngular, Vue or some other - 5 points
3. Last edited timestamp is stored and shown with posts/comments (comment: creation timestamp is stored and shown with posts and comments but editing functionality is lacking and therefore editing timestamps are not shown.) - 1 (max points=2)

In total:
31 / 50 points



