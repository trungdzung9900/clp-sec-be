# clp-sec-be
# Assignment: <br />

Create a simple application that can lively update a dashboard when a client application clicks on either the orange or blue button. The dashboard must show live updates of the number of clicks without polling the database and display a chart after 5 seconds is elapsed. The game can be reset when the page is refreshed. <br />

# Requirements: <br />
•	Front End: ReactJS, Typescript
•	Back End: Node.JS with Typescript preferred but you may use any language you are comfortable with
•	It is recommended to use AWS services, but you can also use any other cloud technologies that you are more comfortable with, however use of modern technologies is encouraged (i.e. GraphQL, Docker, etc)
•	Tips: You can create a free tier AWS account for this assignment; your code will be reviewed during the first round interview, so please include comments, documentation, unit tests etc. as you would normally do in a business project. 

# What we implement: 
BE use: NestJs with TypeScript <br />
Used socket.io to do the connection <br />

FE use: React with socket.io



# Result
Website: http://ec2-13-112-157-12.ap-northeast-1.compute.amazonaws.com/client (Api client to play the game) <br />
http://ec2-13-112-157-12.ap-northeast-1.compute.amazonaws.com/dashboard (Api dashboard to see the result, and reset the result)
                   
