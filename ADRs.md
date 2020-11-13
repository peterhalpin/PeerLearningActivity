## ADR:
* Library: ReactJS
* Library: TogetherJS
* Language: JavaScript
* CSS framework: Semantic UI
* Hosting: netlify + faunaDB
* PDR: 1st git style to collaborate 

## Decision: Languages – HTML, CSS, JavaScript

* 0 summary

In order to build a website focusing on frontend and use React JS in a hassle-free way, we choose HTML, CSS, and JavaScript as the languages.

* 1 problem

We need to develop a web application, mainly focusing on frontend development. 

* 2 constraints

Since we are doing frontend development, our choices for languages are limited to HTML, CSS, JavaScript, or TypeScript.

* 3 options

Apart from HTML and CSS, the available option that we can choose is either JavaScript or TypeScript. 

* 4 rationale

Given that we are using React JS and we are not 100% sure about the compatibility between TypeScript and React JS, JavaScript is the secure and hassle-free option here.

## Decision: Library – React JS

* 0 summary

Based on our need to find a way to build rich web UI more easily and our familiarity with React products, we’ve chosen React JS as our frontend library.

* 1 problem

We want to build complex web user interfaces, but writing vanilla HTML/CSS/JavaScript can be painful, thus we need to use a powerful library to make the task easier.

* 2 constraints

The library needs to be one that serves frontend UI building, and the languages are limited to JavaScript/TypeScript.

* 3 options

There are a lot of options, including Angular JS, Vue JS, Inferno JS, etc.

* 4 rationale

Most of the team members have used either React JS or React Native, so based on our familiarity with React, we’ve chosen React JS as our frontend library.

## Decision: Library – TogetherJS

* 0 summary

In order to make a web app where students can work together in a way comparable to real time collaboration, the students should be able to see others’ cursors and be able to chat. Thus, we will use TogetherJS to enable these features without doing a lot of unnecessary coding, since it already exists freely. 

* 1 problem

We need to allow our users to view each others’ cursors and chat with each other. This is not the main focus of our project, so we don’t want to spend too much time coding this.

* 2 constraints

Our client had part of the project, which is called Coefficient, made during Summer of Code, and this project uses TogetherJS, so our decision was made for us, and we are constrained to this library. 

* 3 options

Our client wants us to use this library, so this is our sole option.  

* 4 rationale

Given that we need a tool to easily allow our users to collaborate, our client wants us to use this library, and it sufficiently fulfills our needs, we are using TogetherJS.

## Decision: CSS framework – Semantic UI

* 0 summary

In order to make our website look modern and professional in an efficient way, we decided to use a CSS framework designed for React, Semantic UI specifically.

* 1 problem

It is always painful to write CSS and make the web application look professional and modern. To solve this, a way is to use CSS frameworks, which can drastically reduce the workload when developers deal with CSS, so you don’t need to write CSS properties for each component individually. I would say it’s more like a decision choice than an actual problem. Thus, we make the decision here to use a CSS framework.

* 2 constraints

There are no constraints for the CSS framework decision. Every CSS framework works for us.

* 3 options

There are several options. Option 1 is not using a CSS framework. Pros: Can customize freely. Cons: High workload, which deviates us from the focus of the project. Option 2 is to use a CSS framework designed for React. Pros: CSS integrated into React components, more easy to use. Cons: might be hard to customize if we are not happy with some details. Option 3 is to use a CSS framework not designed for React. Pros: might be more flexible than option 2. Cons: hard to work with components. 

* 4 rationale

We pick option 2, which is using a CSS framework designed for React, and here we pick Semantic UI specifically. Since we are doing a project with React, it would be great to use an associated CSS framework at the component level instead of the HTML tag level. It’s a very popular solution and we are trying to embed it in our project.

 

## Decision: Netlify + FaunaDB

* 0 Summary

In order to host a front end dynamic web application, with the ability to connect to a database effectively, we decided to use Netlify with FaunaDB. 

* 1 Problem

The problem that we need to solve is hosting the front end web application. Since the client needs to access the web app via the internet, it needs to be hosted, and it is important to solve for the same reason. Otherwise, the web app can only be accessed from the developer’s machine.

* 2 Constraints

There are a few constraints for making this decision. Our web application is a dynamic web application, so we would like to host it using a service that can support the dynamic interaction with the database, while also being simple. Basically every web hosting service can achieve this.

* 3 Options

There are options such as Amazon AWS, Heroku, Azure, Firebase, Netlify. Pros for AWS, Azure: very flexible to use. Cons: learning curve for the team. Pros for Heroku, Firebase: also flexible and can automatic deploy. Cons: learning curve for the team. Pros for Netlify: easy to use and deploy. Cons: some features might be missing.

* 4 Rationale

We choose Netlify to host our web application. The reason is that we need to solve the problem, which is hosting a dynamic web app while not being complicated, since we don’t need to have any backend (except a lightweight database). Thus, Netlify is easy to use and can achieve every feature that we planned, which is the reason we choose it.

 

## Decision: Git branching style – Git Flow

* 0 summary

In order to collaborate successfully on git, we need to establish a consistent convention for branching, so that we can not alter others’ code and can keep a copy of the site that has only features that are deployed. Because we like the idea of keeping a separate master branch and develop branch, we opted for the Git Flow style. 

* 1 problem

If we did not establish some convention for branching, our repository would be very messy and it would be difficult to look back in history. It would also be harder to view others’ code if we don’t know how they’re branching. Thus, we want to set some style that we will all use to make the repository more uniform.

* 2 constraints

There aren’t any real constraints for this. We all have some experience in git and have no problem with any of the options. 

* 3 options

There are three main options we were provided with by Professor Terell. Git Flow, OneFlow, and Release Based branching. Git Flow pros: Separate master and develop branches will keep the deployment clean and will allow us to ensure that the develop branch is stable before we merge it into master and deploy it. Cons: Less practical to keep two separate main branches if we constantly are merging features into master. One Flow pros: Maintains one running branch of what is deployed for the site, which keeps everything clean. One Flow cons: Can’t have multiple features merged into a main branch with other pending features. Release Based pros: Keeping releases separate allows one to easily look back at history, and allows for easy rollback. Release based cons: Less necessary or efficient if we are constantly merging and deploying features, as the release branch will just become an unnecessary extra step. 

* 4 rationale

After discussing, we liked the appeal of having separate master and develop branches. It is easy to track and test features that are waiting to be deployed, and if two features rely on each other they can be tested together and await being