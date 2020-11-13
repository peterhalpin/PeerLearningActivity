


# Peer Learning Activity 

![](https://img.shields.io/badge/coverage-48%-brightgreen)    
Develop by Caroline Parslow, Xinzhao Li, Larry Li for Dr. Peter Halpin at UNC-Chapel Hill.


## 0. Peer Learning in the Time of COVID-19
Since the COVID-19 pandemic, students have been mostly participating in remote courses and losing a lot of opportunities to enjoy face-to-face classroom activities, the variety of which ranging from group discussions to worksheet collaborations. 
The project, born out of such observation, aims to be the pilot of online synchronous activities built for college students, allowing them to cooperate remotely and re-enjoy the precious face-to-face experience lacking in "video classrooms."
Throughout the process of the activity, students are given an interactive map based on COVID-19 statictics and they are asked to take turns to collect information and cooperate through chats to answer a set of questions.
Besides providing face-to-face experience, it also allows instructors to observe how well the students collaborate.

## 1.
cp



## 2. Testing
For the testing of thir project, we choose to use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [Jest](https://jestjs.io/) as our tool. The tests are under the folder of each components, following the naming convention `ComponentName.test.js`.   

### Run Test Suites
Run `npm run test` at root dir.  

### Produce Test Coverage Report 
Run `npm run test:coverage` at root dir. The detailed report will be in `coverage` folder at root dir.  



## 3. Deployment
### Frontend
All the frontend code (this repo) is deployed on [Netlify](https://www.netlify.com/) thus enabling __Continuous Integration__ and __Continuous Deployment__. It also provides _build check_ for each commit to this repo. For full access of the Netlify deployment, please contact Dr. [Peter Halpin](peter.halpin@unc.edu).     

Our team, when developing, choosed to deploy the `develop` branch to Netlify as a seperate deployment for any pre-prodcution testing that happened. It's not the elegant way, but it worked well.    

### Backend
There is no typical backend server for this project. But we do rely on 3rd party library [TogetherJS](https://togetherjs.com/), which has a server-side hub that handles all the inter-user communications. Optimistically and optimally, the hub hosted on `https://hub.togetherjs.com` by TogetherJS should work. However, it didn't work when we worked on this project and solution is to host our own. `https://useful-plant-eoraptor.glitch.me/` is the version hosted by [Larry](ruochen@live.unc.edu) on [Glitch](https://glitch.com/). Logs are also shown and kept there. Since it's a very simple hub, which only echos whatever messages that it receives, we deployed it on Glitch, which is a lightweight server. However, for future performence and other potential issues, Heroku might also be a good choice.   

About how to host your own hub, please refer to [Instructions provided by TogetherJS](https://togetherjs.com/docs/#hosting-the-hub-server) also feel free to contact [Larry](ruochen@live.unc.edu).    



## 4.
cp



## 5. Contributing
1. New developers need access to these:
    1. The Github repository: https://github.com/liruochen1998/PeerLearningActivity (this repository)
    1. The Trello board: https://trello.com/b/rlw5FLCZ/team-o
    1. Netlify account

1. Conventions

    1. To create a new React component, instead of manually doing it, run this command to automatically generate one:
    
    ```
    npx generate-react-cli component MyComponent
    ```

    , in which "MyComponent" is the name of your choice. This will generate the .js file, .css file, and testing file together for the component.
Related configurations can be found in the file generate-react-cli.json.
    1. To generate test coverage report, run
    ```
    CI=true npm test -- --env=jsdom --coverage
    ```

    , as specified in package.json.

1. Link to project website: https://tarheels.live/comp523peerlearning/



## 6. Authors
Larry Li <ruochen@live.unc.edu> [Github](https://github.com/liruochen1998)    
Xinzhao Li <xinzhaox@live.unc.edu> [Github](https://github.com/Jaega)   
Caroline Parslow <cparslow@unc.edu> [Github](https://github.com/carolinepar)    



## 7.
xl



## 8.
cp




## others




