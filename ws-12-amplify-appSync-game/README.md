# Build a real-time multiplayer gaming app with AWS Amplify & AWS AppSync

Increase application engagement by providing differentiated user experiences that use real-time data. In this workshop, build an online, real-time multiplayer trivia application, and learn how to create a serverless web application quickly. In addition to game management, learn how to build real-time capabilities such as player scoring and leaderboards and game state updates. Find out how to use AWS Amplify to connect a frontend to a sophisticated backend with a GraphQL API powered by AWS AppSync, using subscriptions to deliver real-time data to users.

## Introducing to re:Inventing Tic Tac Toe

In this workshop we'll build a fully functioning online multiplayer TicTacToe game, with real-time 1vs1 gameplay, game state management and leaderboard. Online game will feature player authentication via email and password, and real-time and offline synchronization of global leaderboard and scoring. Players will be able to either start a new game as a game host or join an already started game as an opponent.

## Architecture

This is the high-level architecture we'll build during this workshop.

![Alt text](image.png)

## Setup Cloud9 Development Environment

AWS Cloud9 is a cloud-based integrated development environment (IDE) that lets you write, run, and debug your code with just a browser. It includes a code editor, debugger, and terminal. Cloud9 comes prepackaged with essential tools for popular programming languages, including JavaScript, Python, PHP, and more, so you don't need to install files or configure your development machine to start new projects.

Ad blockers, JavaScript disablers, and tracking blockers should be disabled for the cloud9 domain, otherwise connecting to the workspace might be impacted.

## Launch Cloud9 environment in us-west-2

If you are running this workshop as part of an AWS event (like at re:Invent or at an AWS Summit), this workshop already provides you a Cloud9 instance in the us-west-2 region.

#### 1. Go to the [Cloud9 web console](https://us-west-2.console.aws.amazon.com/cloud9control/home) .

#### 2. At the top right corner of the console, make sure you're using this region: Oregon (us-west-2)

#### 3. In Your environments section, select the fwm305-workshop instance and click Open IDE. You may need to refresh the page in order to see the fwm305-workshop instance available. If you are unable to locate the Your environments section, please expand the left menu bar by using the button on the top left corner.

![Alt text](image-1.png)

## (Optional) Create a new environment

The Cloud9 workspace should be built by an IAM user with Administrator privileges, not the root account user. Please ensure you are logged in as an IAM user, not the root account user

#### 1. Go to the [Cloud9 web console](https://us-west-2.console.aws.amazon.com/cloud9control/home) .

#### 2. At the top right corner of the console, make sure you're using this region: Oregon (us-west-2)

#### 3. Select Create environment

#### 4. Name it fwm305-workshop, and go to the Next step

#### 5. Select Create a new instance for environment (EC2) and pick m5.large

#### 6. Leave all of the environment settings as they are, and go to the Next step

#### 7. Click Create environment

If you receive an error around selecting a different AZ, please select any subnet but us-east-1e in the Subnet dropdown list.

## Clean up the layout

This setup uses the TextMate theme for the editor, and Flat Light for the UI. You can select your preferred theme by selecting them in View / Themes in the Cloud9 workspace menu.

When the environment comes up, customize the layout by closing the welcome tab and lower work area, and opening a new terminal tab in the main work area:

![Alt text](image-2.png)

Your workspace should now look like this:

![Alt text](image-3.png)

Increase root volume size (optional)

In the Cloud9 workspace menu, select File / New File. Copy/paste the code below. Name the file resize.sh.

```
#!/bin/bash

# Specify the desired volume size in GiB as a command-line argument. If not specified, default to 20 GiB.
SIZE=${1:-20}

# Get the ID of the environment host Amazon EC2 instance.
INSTANCEID=$(curl http://169.254.169.254/latest/meta-data//instance-id)

# Get the ID of the Amazon EBS volume associated with the instance.
VOLUMEID=$(aws ec2 describe-instances \
  --instance-id $INSTANCEID \
  --query "Reservations[0].Instances[0].BlockDeviceMappings[0].Ebs.VolumeId" \
  --output text)

# Resize the EBS volume.
aws ec2 modify-volume --volume-id $VOLUMEID --size $SIZE

# Wait for the resize to finish.
while [ \
  "$(aws ec2 describe-volumes-modifications \
    --volume-id $VOLUMEID \
    --filters Name=modification-state,Values="optimizing","completed" \
    --query "length(VolumesModifications)"\
    --output text)" != "1" ]; do
sleep 1
done

if [ $(readlink -f /dev/xvda) = "/dev/xvda" ]
then
  # Rewrite the partition table so that the partition takes up all the space that it can.
  sudo growpart /dev/xvda 1

  # Expand the size of the file system.
  sudo resize2fs /dev/xvda1

else
  # Rewrite the partition table so that the partition takes up all the space that it can.
  sudo growpart /dev/nvme0n1 1

  # Expand the size of the file system.
  sudo xfs_growfs -d /
fi
```

In your terminal, execute the command:

```
sh ./resize.sh
```

## Set up the AWS CLI

The AWS CLI allows you to interact with AWS services from a terminal session. Make sure you have the latest version of the AWS CLI installed on your system.

- Windows: [MSI installer](https://docs.aws.amazon.com/cli/latest/userguide/install-windows.html#install-msi-on-windows)
- Linux, macOS or Unix: [Bundled installer ](https://docs.aws.amazon.com/cli/latest/userguide/awscli-install-bundle.html#install-bundle-other)

## Configure your credentials

Open a terminal window and use aws configure to set up your environment. Type the access key ID and secret key from the CSV that you downloaded when you created your user account. Choose a default region (you can use us-east-2, eu-west-1, us-west-2 for example). Preferably use a region that doesn’t have any resources already deployed into it.

```
aws configure
```

And fill in the information from the console:

```
AWS Access Key ID [None]: <type key ID here>
AWS Secret Access Key [None]: <type access key>
Default region name [None]: <choose region (e.g. "us-east-2", "eu-west-1")>
Default output format [None]: <leave blank>
```

## Installs & Configs

Before we get started, there are a few things we need to install, update, and configure in your environment in order to be able to run this workshop.

## Installing and updating

In the Cloud9 workspace menu, select File / New File. Copy/paste the code below. Name the file installs.sh.

```
#!/bin/bash

source ~/.nvm/nvm.sh

# install node v16
nvm install v16
# configure node v16 as the default
nvm alias default 16
# version should be v16.*
node --version

# install yarn
npm install --global yarn
yarn --version

# install  xdg-utils
sudo yum -y install xdg-utils
```

In the Cloud9 terminal, execute the command:

```
sh ./installs.sh
```

## Set up the Amplify CLI

The Amplify Command Line Interface (CLI) is a unified toolchain to create AWS cloud services for your app. Make sure you have the latest version of the AWS CLI installed on your system.

## Install the CLI

Because we’re installing the Amplify CLI globally, you might need to run the command above with sudo depending on your system policies.

In the Cloud9 terminal, execute the command:

```
npm install -g @aws-amplify/cli
```

## Configure the CLI

In the Cloud9 terminal, execute the command:

```
amplify configure
```

amplify configure will ask you to sign into the AWS Console, and once signed in press enter in the Cloud9 terminal.

Once you're signed in, Amplify CLI will ask you to create an IAM user. Use the same region you are using for this event (e.g.: us-west-2).

```
Specify the AWS Region
? region:  # Your preferred region

Follow the instructions at
https://docs.amplify.aws/cli/start/install/#configure-the-amplify-cli

to complete the user creation in the AWS console
https://console.aws.amazon.com/iamv2/home#/users/create
Press Enter to continue
```

Complete the user creation using the AWS console by clicking on the console url and selecting open. This will allow you to create a user with AdministratorAccess-Amplify to your account to provision AWS resources for you.

Follow the instruction URL as a guide for the steps to complete the creation of the user.

Make sure to note down the credentials of your new user as you might need them again once we set up your individual project.

In Cloud9 terminal, hit Enter then provide Access Key and Secret Key you just received in the IAM page, and use defaul as profile

```
Enter the access key of the newly created user:
? accessKeyId:  ********************
? secretAccessKey:  ****************************************
This would update/create the AWS Profile in your local machine
? Profile Name:  default
```

## Lab 1: Setup App Backend and staging environment on Amplify Studio

When we begin a new project in Amplify, we need to create a new app and configure it into Amplify Studio to enable us to build. This section will guide you through the steps to create a new Amplify project and launch the Amplify Studio.

AWS Amplify Studio is a visual development environment for building full-stack web and mobile apps. Studio builds on existing backend building capabilities in AWS Amplify, allowing you to accelerate your UI development as well.

With Amplify Studio you can build backend capabilities without having deep knowledge of what is the right AWS Service for your use case. Amplify will select the right service and the right configuration based on the needs you specify in the visual environment provided by Amplify Studio.
With Studio, you can quickly build an entire web app, front-to-back, with minimal coding, while still maintaining full control over your app design and behavior through code. Ship faster, scale effortlessly, and delight every user.

![Alt text](datamodel.gif)

## Create a New Amplify App

In this section, we will create and setup a new Amplify project. Amplify projects can be created by using the Amplify CLI or the AWS Console. In this workshop, we will be using the AWS Console to get started. If you would like more information on starting with the CLI, you can find the details here .

## Console Setup

#### 1. Open the AWS Console and go to the AWS Amplify service page:

![Alt text](image-4.png)

#### 2. Select the correct Region from the region dropdown, based on the region you are using for running this workshop (e.g. us-west-2). If you are part of AWS Led Event, please clarify the region being used with AWS Staff.

#### 3. Choose the GET STARTED button to begin

If you have already created an Amplify project, your screen may look a bit different at this point. In that case, you can choose the New app button in the upper right hand corner and select the Build an app option to begin.

#### 4. Choose the Get started button underneath of Amplify Studio to create a new Amplify project

![Alt text](image-5.png)

#### 5. Provide a name for the application as TicTacToe and hit Confirm Deployment button. The application infrastructure will now be deployed.

Your screen may look a bit different, and you may hit the Continue button.

![Alt text](image-6.png)

#### 6. The backend scaffolding for our application is now deployed in Amplify. You can see a new staging environment is available in Amplify for our app TicTacToe. Now we'll move on to provision the Amplify Studio console by hitting the Launch Studio button.

Please beware you may need to enable popup in order to have Launch Studio working

![Alt text](image-7.png)

## Using Amplify Studio

Amplify Studio is now enabled for you to build all of the elements of our game application. You should see the Amplify Studio Dashboard, like the one in the following image:

![Alt text](image-8.png)

## Wrap Up

With Amplify Studio, you can now begin builiding the various components of your application necessary for the backend and the frontend. Now we will continue on to setup the authentication mechanism for your game app.

## Lab 2: Setup Authentication

The Amplify Framework uses Amazon Cognito as its default authentication provider. Amazon Cognito is a robust user directory service that handles registration, authentication, account recovery & other user related operations.

Amplify Studio provides a simple integration with Cognito for creating and managing user authentication. You can use these authentication components to quickly add common use cases such as sign in, sign up, confirmation, forgot password, greetings, and one-time passwords (OTP) to your application. Again, you may also have no knowledge of how Amazon Cognito works because Amplify will provide Amazon Cognito for you with the right configuration for your use case.

This section will guide you through the steps to add a sign up and sign in experience for our gaming application.

## Enable Authentication via Amplify Studio

Most web sites and applications require a mechanism to allow users to create accounts and authenticate. In our gaming application, we will allow users to create an account and login. Amplify Studio has a built-in authentication component that we can leverage with minimal effort.

## Adding Authentication

#### 1. Choose the Authentication menu option from under the Set up section in the left navigation menu

#### 2. Choose the Start from scratch option from the top of the page

#### 3. Configure the login mechanism that is used to authenticate the user. Note that the Email login is pre-selected as the default by Amplify Studio. We'll use this method hence no other changes are needed.

![Alt text](image-9.png)

#### 4. Expand the Password Protection settings under Configure sign up section, leaving the defaults value selected. Expand the Verification message settings inside the configure sign up section, verify Email is selected, and change the text of the verification email as provided in the image (this is optional, though).

![Alt text](image-10.png)

## Deploying your Changes

Choose the Deploy button in the lower right corner of the workspace to begin the deployment of your changes. After confirming that you would like to continue, the authentication componenent will be deployed to your application

![Alt text](image-11.png)

The deployment process can take approximately 5-10 minutes to complete.

![Alt text](image-12.png)

When the deployment is completed, you will see a green checkbox at the top of the page noting a successful deployment. Also, please note the Get the latest client configuration files section provided by Amplify. You'll use this command in the next lab to setup your frontend client, a web application that will host our game.

![Alt text](image-13.png)

## Wrap Up

We have now added user authentication as part of your AWS infrastructure. Behind the scenes, Amplify has created all of the necessary infrastructure and plumbing needed to support it. In the next section, we will work on adding Amplify's client authentication components to our application so that the user can create an account, login with their credentials, and logout.

## Lab 3: Setup and launch your frontend React web project

So far in our workshop, we've focused on building out the infrastructure to power the backend of our application: a staging backend environment and an authentication mechanism. Resources that will store our data, provide access to our data, and so on, will be built later on but every application needs a way to interface with its users in one way or another, therefore now we'll build a web application as a frontend client that will host our gaming experience.

We'll use the popular React javascript framework, but Amplify supports a myriad of different frameworks (Next.js, Flutter, React Native, Angular, and more) to support whatever you want to build. Now that we have created our backend resource for the authentication feature, we will walk through creating a client application and integrating it with our backend so that we can setup user access.

Let's jump in!

## Create a new React App

In this section we'll walk through how to create a skeleton framework for our React application. To set up the project, we'll first create a new React app with create-react-app , a CLI tool used to bootstrap a React app using current best practices. We'll then add Amplify and initialize a new project.

Using the Cloud9 terminal, from your projects directory run the following commands:

```
npx create-react-app tictactoe-amplify
```

```
cd tictactoe-amplify
```

This creates a new React app in a directory called tictactoe-amplify and then switches us into that new directory.

Now that we're in the root of the project, we can run the app by using the following command:

```
npm start
```

This runs a development server and allows us to see the output generated by the build. To view the application, click on Preview, and select Preview Running Application.

![Alt text](image-14.png)

Once you are done previewing the plain react application, you can stop the development server with the ctrl-c command in the Cloud9 Terminal.

## Connect your frontend web app with app backend

In this section we'll walk through how to connect our React application to the backend we created with Amplify Studio. To do that, we'll leverage the amplify pull command.

The amplify pull command operates similar to a git pull, fetching upstream backend environment definition changes from the cloud and update the local environment to match that definition. The command is particularly helpful in team scenarios when multiple team members are editing the same backend, pulling a backend into a new project, or when connecting to multiple frontend projects that share the same Amplify backend environment.

## Get the latest client configuration files

Let's copy the amplify pull command from the Get the lates client configuration files section in the Amplify Studio page that shows the succesfull deployment of our Auth feature that we deployed in lab 2. As an alternative, you can retrieve the same command by using the Local Setup Instruction link at the top right corner of Amplify Studio.

You can copy the text by selecting it or by clicking on the copy icon on the right.

![Alt text](image-15.png)

Using the Cloud9 terminal, from your projects directory run the commands you copied. It looks like

```
amplify pull --appId YOUR_APP_ID --envName YOUR_ENV_NAME
```

This will pull all the configuration files needed by your frontend web app to connect with backend resources currently deployed in the staging environment.

The first time you use the amplify pull command, you must authorize the Amplify CLI to connect with your Amplify Studio backend. In order to do that, Amplify will open a new tab in your browser and will request your confirmation as seen in the follwing image. Click YES to authorize. In case of a problem, Amplify studio will prompt you with a Copy CLI Auth Key, click on the orange button and paste it into the Cloud9 terminal and then hit return. You will not be able to see your pasted key

![Alt text](image-16.png)

If prompted about 'Do you plan modifying your backend ? ' answer YES

Once authorized, Amplify CLI will initialize Amplify inside your project. Leave all the default options selected by simply hit enter when prompted.

```
Choose your default editor:
`❯ Visual Studio Code`
? Choose the type of app that youre building
`❯ javascript`
? What javascript framework are you using
`❯ react`
? Source Directory Path:  (src)
  `src`
? Distribution Directory Path: (build)
  `build`
? Build Command:  (npm run-script build)
  `npm run-script build`
? Start Command: (npm run-script start)
  `npm run-script start`
? Do you plan on modifying this backend? (Y/n)
  `Y`
```

Once completed the wizard, Amplify has now all config files ready to be used automatically by the framework. We can now proceed to add authentication feature to our frontend project.

## Create Basic Game Components

In this section will create basic game components as a starting point for our gaming web application. We'll not dig depp into details of the business logic for the moment, while we'll provide explanation in Lab 4. For the moment, we just need some dummy components to implement a basic TicTacToe game that you can play on your own.

## Create Components folder

First step is to create a components folder inside the React Project.

In Cloud9, let's create a new folder named components inside the src folder.

![Alt text](image-17.png)

## Create React Components

Now, let's create components that compose our web application.

The first component to create is the Board for our TicTacToe reInvented version. In Cloud9 let's create a new file named board.jsx inside the components folder, with the following content:

board.jsx

```
import React from 'react'
import Box from './box'

const style = {
	width: "250px",
	height: "250px",
	margin: "0 auto",
	display: "grid",
	gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
};


const Board = (props) => (
    <div style={style}>
    {[ ...Array(9)].map((_, pos) => <Box key={pos} name={pos} onClick={()=>props.onClick(pos)} value={props.value[pos]}/>)}
    </div>
)


export default Board
```

Then we create a Box component, that holds either X or O in our board. Inside the components folder, create a file named box.jsx with the following content:

box.jsx

```
import React from 'react'

const style = {
	border: "1px solid #414d5c",
	fontSize: "2em",
	color: "#414d5c"
}

const Box = (props) => <button name={props.name} style={style} onClick={props.onClick}> {props.value} </button>

export default Box
```

Next is the Header, that holds the header part of our web app. Create a file name header.jsx inside the components folder. Use the following content:

header.jsx

```
import React from 'react'

const style = {
	margin: "0px auto 40px",
    padding: "20px",
	display: "grid",
    fontSize: "1.1em",
	fontWeight: "normal",
	textAlign:'center',
    color:'#fff',
    backgroundColor: '#0073bb'
};

const Header = (props) => <h1 style={style}>re:inventing Tic Tac Toe 2023</h1>

export default Header
```

Then, we can create a Message component, in order to display messages to our players. Again, inside the components folder, create a file named message.jsx with the following content:

message.jsx

```
import React from 'react'

const style = {
	width: "300px",
	margin: "20px auto 20px",
	display: "grid",
    fontSize: "32px",
	fontWeight: "800",
	textAlign:'center',
	color: '#ec7211'
};

const Message = (props) => <h2 name={"msg"} style={style}>{props.value}</h2>

export default Message
```

We also need an action item to Refresh the game state, in order to restart from scratch if any issue rise. In the components folder, create a file named refresh.jsx using the following content:

refresh.jsx

```
import React from 'react'

const style = {
	width: "250px",
	margin: "0 auto",
	padding: '10px',
	display: "grid",
    fontSize: "26px",
	fontWeight: "400",
	backgroundColor: '#ec7211',
	color: '#fff'
};

const Refresh = (props) => <button name={"btn"} style={style} onClick={props.onClick}>{props.value}</button>

export default Refresh
```

The last component to create is Game. It holds the game management and orchestration of all other components. In Cloud9 let's create a new file named game.js inside the components folder, with the following content:

game.js

```
import React, { useState } from 'react'
import Board from './board'

import Message from './message'
import Refresh from './refresh'
import Header from './header'

import { Amplify, Auth } from 'aws-amplify';



const isWon = (board) => {
    // list of postion that is winning
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    // checking each of the postition seeing if the combination is there
    // if it does return the True
    // else return false
    for (let i=0; i< lines.length; i++) {
        let [a, b, c] = lines[i];
        //console.log(board[a] === board[b] && board[a] === board[c])
        if (board[a]!=="" &&board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}


const Game = ({ signOut, user }) => {
    console.log(user);
    // this is for board
    // default value for all the elemnt is ""
    const [board, setBoard] = useState(Array(9).fill(""));
    // first player is "X"
    // if the game is over put "" as player
    const [isPlayer, setIsPlayer] = useState("X");
    const [message, setMessage] = useState("Click to Start");



    const refresh  = () => {
        setBoard(Array(9).fill(""));
        setMessage("Click to start");
        setIsPlayer("X");
    }


    const handleInput = (pos) => {
        if (isPlayer === "" || board[pos] !== "") {
            //is the game is over don't play
            // if the box has been clocked already then return
            return;
        }

        const boardCopy = [...board];
        boardCopy[pos] = isPlayer;
        setBoard(boardCopy); // updating board for current player


        if (isWon(boardCopy)){
            // once game is over
            setMessage(`WON: ${isPlayer}`)
            // since the game is over putting ""
            setIsPlayer("");
            return;
        }

        if (boardCopy.indexOf("")=== -1){
            // if no more moves game is draw
            setMessage("DRAW")
            setIsPlayer("");
        } else {
            let nextPlayer = (isPlayer === "X") ? "O" : "X"
            setIsPlayer(nextPlayer); // updating player
            setMessage(`TURN: ${nextPlayer}`)
        }
    }

    return (<div>
            <Header user={user} signOut={signOut}/>
            <Message value={message} />
            <Board onClick={handleInput} value={board} />
            <Refresh onClick={refresh} value={'Refresh'} />
        </div>)
}

export default Game
```

## Embed the game in our App

Now that we created basic components for our game, let's embed the Game component in the React web app we created. Open the src/App.js file and change the content with the following:

App.js

```
import React, { useEffect }  from 'react'
import Game from './components/game'

const App = () => {
    useEffect(() => {
        document.title = "tic-tac-toe"
    }, [])

    return <Game/>
}
export default App;

```

## Install Amplify libraries

The next step to using Amplify in the client is to install the necessary dependencies, from the React project root folder in the Cloud9 terminal:

```
npm install aws-amplify @aws-amplify/ui-react
```

The aws-amplify package is the main library for working with Amplify in your apps. The @aws-amplify/ui-react package includes React specific UI components we'll use as we build the app.

## Test the game

We can test the basic game logic, embedded in the React web app, by starting the development server. In the Cloud9 terminal, use the commmand:

```
npm start
```

Once the development server is starded, you can preview the application. The application will looks like:

![Alt text](image-18.png)

You can play some game against yourself if you want to test this plain version of our game. No realtime updates, no multiplayer, just fun !

## Add Sign up and login to your frontend

In this section we'll add sign up and login feature to our frontend web application. Creating the login flow can be quite difficult and time consuming to get right. Luckily Amplify Framework has an [authentication UI component](https://ui.docs.amplify.aws/react/components/authenticator) we can use that will provide the entire authentication flow for us, based on the config we just pull from Amplify Studio.

## Set up frontend

First, we need to configure Amplify on the client so that we can use it to interact with our backend services.

Open src/App.js and change the content of the file with following code :

```
import React, { useEffect }  from 'react'
import Game from './components/game'
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const App = ({ signOut, user }) => {
    useEffect(() => {
        document.title = "tic-tac-toe"
    }, [])

    return <Game signOut={signOut} user={user}/>
}
export default withAuthenticator(App);
```

Let's review the changes we applied to App.js. Main changes are realated to import Amplify Libraries. We also imported the aws-exports file, that allows Amplify libraries to read configurations for our backend features we deployed using Amplify Studio and interact with those reasources accordingly. This is done via the Àmplify.configure(awsconfig) instruction.

Also, we imported the withAuthenticator component and wrapped the Application inside the withAuthenticator . The withAthenticator component allows you to quickly get up and running with a real-world authentication flow. All components wrapped inside withAuthenticator are automatically protected under login, therefore can be accessed only after login.

Also, we provide the Game component with two additional properties: signOut and user. The latter contains the user object managed by the Auth module provided by Amplify, while signOut provides the sing out functionality to be used in the gane.

## Create new Signout component

We can now create a Signout component that will render the signout button and will activate the signout functionality provided by the Amplify Auth module.

Under the folder components create a new file named signout.jsx with the following content:

signout.jsx

```
import React from 'react'

const style = {
	width: "150px",
	margin: "0 auto auto 10px",
	padding: '10px',
	display: 'inliine',
    fontSize: "20px",
	fontWeight: "400",
	backgroundColor: '#ec7211',
	color: '#fff'
};

const Signout = (props) => <button name={"btn"} style={style} onClick={props.onClick}>Logout</button>

export default Signout
```

## Update components to manage Sign in and Sign out

Let's modify our game components to manage user authentication functionalities inside the game.

First, open src/components/game.js file and replace the content with the following:

game.js

```
import React, { useState } from 'react'
import Board from './board'

import Message from './message'
import Refresh from './refresh'
import Header from './header'
import Signout from './signout'

import { Amplify, Auth } from 'aws-amplify';



const isWon = (board) => {
    // list of postion that is winning
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    // checking each of the postition seeing if the combination is there
    // if it does return the True
    // else return false
    for (let i=0; i< lines.length; i++) {
        let [a, b, c] = lines[i];
        //console.log(board[a] === board[b] && board[a] === board[c])
        if (board[a]!=="" &&board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}


const Game = ({ signOut, user }) => {
    console.log(user);
    // this is for board
    // default value for all the elemnt is ""
    const [board, setBoard] = useState(Array(9).fill(""));
    // first player is "X"
    // if the game is over put "" as player
    const [isPlayer, setIsPlayer] = useState("X");
    const [message, setMessage] = useState("Click to Start");



    const refresh  = () => {
        setBoard(Array(9).fill(""));
        setMessage("Click to start");
        setIsPlayer("X");
    }


    const handleInput = (pos) => {
        if (isPlayer === "" || board[pos] !== "") {
            //is the game is over don't play
            // if the box has been clocked already then return
            return;
        }

        const boardCopy = [...board];
        boardCopy[pos] = isPlayer;
        setBoard(boardCopy); // updating board for current player


        if (isWon(boardCopy)){
            // once game is over
            setMessage(`WON: ${isPlayer}`)
            // since the game is over putting ""
            setIsPlayer("");
            return;
        }

        if (boardCopy.indexOf("")=== -1){
            // if no more moves game is draw
            setMessage("DRAW")
            setIsPlayer("");
        } else {
            let nextPlayer = (isPlayer === "X") ? "O" : "X"
            setIsPlayer(nextPlayer); // updating player
            setMessage(`TURN: ${nextPlayer}`)
        }
    }

    return (<div>
            <Header user={user} signOut={signOut}/>
            <Message value={message} />
            <Board onClick={handleInput} value={board} />
            <Refresh onClick={refresh} value={'Refresh'} />
        </div>)
}

export default Game
```

The main change applied to the Game component is using the user and signOut props provided by App.js and provide them as properties of the Header component. The purpose is to provide the Header with info about the current user and the functionality to perform signout.

Next, let's modify src/components/header.jsx with the following content:

header.jsx

```
import React from 'react'
import Signout from './signout';

const style = {
	margin: "0px auto 40px",
	display: "block",
    backgroundColor: '#232f3e',
    width: '100%'
};

const h1Style = {
    display: 'inline',
    fontSize: "1.1em",
	fontWeight: "normal",
	textAlign:'center',
    color:'#fff',
    padding: "20px"
}

const divStyle = {
    display: "inline"
}

const Header = (props) => <div style={style}>
    <h1 style={h1Style}>re:inventing Tic Tac Toe 2023, hello {props.user.signInDetails.loginId}</h1>
    <Signout onClick={props.signOut}></Signout>
    </div>

export default Header
```

In the Header component, inside an H1 HTML tag, we display the current user (using the email used for registration). Also, we import the Signout component we created before, in order to render the singout button.

## Test app with the new authentication flow

We can now test our frontend application and the new authentication flow implementation we just created. Again, inside the Cloud9 Terminal window we can use this command (from the React project root folder):

```
npm start
```

Once the development server is started, you can preview the app. When the app reloads, you'll be prompted with a login page since the whole App component is wrapped inside a withAuthenticator component. The page will look like the following image:

![Alt text](image-19.png)

## Wrap up

In this section we implemented the user authentication flow for our gaming web application. In the next section we'll walktrough the creation of a player account.

## Create a player account

In this section we'll setup two player accounts you can use to simulate two player playing in our gaming platform. Of course, you can create multiple players to extend your test.

## Create an account

From the login page we left in the previous section, select Create an account

![Alt text](image-20.png)

Fill the form fields with required data.

Use a valid email when creating an account.

Once the account creation form is submitted, the Auth flow implemented by Amplify will prompt you the following message that states a confirmation email has been sent to the address you provided.

![Alt text](image-21.png)

Check your email's inbox and copy the confirmation code you received in the enter your code form field. Once confirmed your account, you'll enter the webapp.

![Alt text](image-22.png)

As you see, the Header component now shows the current user's email and the Logout button to perform sign out operation. Hit Logout to test the signout functionality.

Then, create a new account with a different email (you can use alias as well).

Creating more than one account is fundamental if you want to test our next lab with multiplayer online gaming.

## Add Hosting to your web application

So far, you've successfully built the first version of your web app with Amplify. Now that you've built something, it's time to deploy it to the web using Amplify Hosting.

## Add hosting to your app

With Amplify, you can manually deploy your web app or setup automatic continuous deployment. In this workshop we'll cover how to manually deploy and host your static web app to quickly share with others and start playing games with your friends.

From the root of your project, inside the Cloud9 terminal run the following command:

```
amplify add hosting
```

Then, select Hosting with Amplify Console in the provided options.

![Alt text](image-23.png)

Then, select Manual deployment as type of deployment. Your terminal command line will look like the following:

```
✔ Select the plugin module to execute · Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)
? Choose a type Manual deployment
```

After you complete the setup, Amplify CLI will provide you the instruction to publish your website

```
You can now publish your app using the following command:
Command: amplify publish
```

Now, let's publish our gaming web app application by launching the command from the Cloud9 terminal (from the root of your project):

```
amplify publish -y
```

Once completed the publishing operation, the Amplify CLI will provide the hosting URL of our web app. The url will follow a pattern such as:

```
https://staging.<AMPLIFY_HOSTING_ID>.amplifyapp.com
```

You can visit the provided URL to access your deployed live web app.

## Lab 4: Implement game data model and game logic

In this lab we'll setup the data model we must leverage to manage data realted to multiplayer games, scoring and leaderboards as well as the game logic implementation such as game status in real-time, turn management, win/loose/draw . Also we'll implement new game creation and joining a game functionality.

The following sections will guide you through the steps to create the data model in the cloud for our TicTacToe application as well as all steps required to integrate the web application logic with the created backend resources. Game business logic will interact with cloud data in real-time in order to make the online multiplayer game interactive and also to update leaderboard scoring in realtime. Same approach will be used for new game creation in order to provide in real-time a new joinable game to players.

## Deep Dive on how it works behind the scene

Most modern web applications require a data store to retain state and content for their users. Amplify Studio provides an easy-to-use visual solution for building and maintaining our data model. Our TicTacToe gaming application requires mutliple models to represent our data such as Game and Leaderboard.

If you like to better understand how the data model works, when data is saved, how it is exposed and how the frontend client interacts in real-time (and offline) with data in the cloud, this section is for you. Otherwise, you can skip this section and move forward to workshop implementation and then come back later on for diving deep on the topic. To skip this section, please hit the Next button at the end of this page.

# Amplify Studio Data Model

With Amplify Studio, you can use the data model designer to easily provision a GraphQL API with database tables. Database tables are based on [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) , while the GraphQL API is based on [AWS AppSync](https://aws.amazon.com/appsync/) . Once again, Amplify will deploy these resources on your behalf, so you don't need to know how to create, configure and manage them.

Amazon DynamoDB is a fast, flexible NoSQL database service for single-digit millisecond performance at any scale.

AWS AppSync creates serverless GraphQL and Pub/Sub APIs that simplify application development through a single endpoint to securely query, update, or publish data.

## Amplify Data Store

When using Amplify Studio Data Model designer, you can leverage all the feature provided by Amplify Data Store. Amplify DataStore provides a programming model for leveraging shared and distributed data without writing additional code for offline and online scenarios, which makes working with distributed, cross-user data just as simple as working with local-only data.

Amplify DataStore provides a persistent on-device storage repository for you to write, read, and observe changes to data if you are online or offline, and seamlessly sync to the cloud as well as across devices. Data modeling for your application is using GraphQL and converted to Models that are used in JavaScript, iOS, or Android applications. You can use DataStore for your offline use cases in a “local only” mode without an AWS account or provision an entire backend using AWS AppSync and Amazon DynamoDB. DataStore includes Delta Sync using your GraphQL backend and several conflict resolution strategies.

![Alt text](image-24.png)

Essentially, user's action such as placing X or O in the TicTacToe board will be first stored locally (in the browser's local storage) and then immediately and automatically synchronized with the cloud storage. The opponent will receive automatically the updated status on its own browser's local storage in real-time.

Also, Data Store real-time and offline synchronization leverages the same auth mechanism of the GraphQL API provided by AWS AppSync, providing all security mechanism needed for our application.

![Alt text](image-25.png)

## How to design Game Data Model

In this section we'll setup the data model that supports our online multiplayer game. We'll use the Amplify Studio Data Model visual designer to define data model and permissions.

## Design Data Model in Amplify Studio

In Amplify Studio, select Data in the Set up section on the left menu sidebar.

![Alt text](image-26.png)

You'll see that now Amplify Studio supports Data Modeling with and without DataStore. Today we'll use it with DataStore, so we must follow the instruction provided by Amplify studio to enable it. Let's take a look at the following picture and follow the instruction

![Alt text](image-27.png)

![Alt text](image-28.png)

The enable button is in the Conflict resolution section, at the bottom of the page. We can enable the feature as described in the following image.

![Alt text](image-29.png)

Also, please make sure the Conflict resolution strategy is set to Auto Merge as described in the next picture.

![Alt text](image-30.png)

Then, we can go back using the Back to Data Modeling button in the top left corner.

You can now use the + Add Model button to start modeling your application's data.

![Alt text](image-31.png)

## Game

The first model to create is the Game model. It must be designed to hold the game status:

- what player created the game
- who is the opponent
- what is the status of the board
- what player is the current turn
- what is the game result
  In order to create this model, hit the + Add Model button, select Add Model and name it Game . As you see, a first field has already been created for you: id of type ID . The id field maps the unique identifier for the specific Game.

You can use the + Add a Field button to add new fields to the Game model. You can select the field type from the dropdown list at the right of the field, as described in the following image. You can select String, Int, Flot, and so on.

![Alt text](image-32.png)

Configure the model as described in the following image, being careful to use lowercase and uppercase letters exactly as indicated in the image:

![Alt text](image-33.png)

Please make sure to set the field hostId as required. You can do it by placing your cursor on the hostId and selecting is required from the right bar option menu. As double check, when a field is required its type is marked with an escalamation mark on the right. Take a look at the previous image and check the hostId field is actually marked as String! .

![Alt text](image-34.png)

Also, when creating the result field, in the type dropdown selection list please select enum and then Create new....

![Alt text](image-35.png)

Use GameResult as enum name and then configure the enum as described in the following paragraph.

## Game Result

The GameResult enum provides all possible results for a Game, therefore let's model Game Result with 3 different values (you can use the + Add a value button at the bottom to add values):

DRAW
WON_X
WON_Y

![Alt text](image-36.png)

We can now reference GameResult in the model we use to define the Game status.

## Define permission for Game Data Model

### Configure data access permissions

We can now configure permissions for accessing data for classic CRUD operation. First, let's use the GraphQL API settings link under the Data modeling section title to configure default method for our API to access data.

![Alt text](image-37.png)

Then, select Cognito User Pool in the drop down list of the Default authorization mode area, as described in the following image. This will configure the user token (provided by the Auth feature we configured in Lab 2) as the default authentication and authorization mechanism to be used for checking permission for accessing data in the data model.

![Alt text](image-38.png)

Then, click Back to Data Modeling .

Now, select the Game model and provide the permission configuration in the right side menu named Authorization Rules .

Use the Add authorization rule button and configure permissions as described in the following image.

Please note in the image below we are using Any singed-in users authenticated with Cognito. You also need to remove the auth rule related to API Key using the Remove Rule button.

![Alt text](image-39.png)

This specific configuration allows any logged in users to Create, Read and Update games. The purpose of this configuration is to enable users to:

- create a game (in order to start a new game),
- update a game (in order to join a game or to update the game board),
- read a game (in order to retrieve game status and to list all available games that are available for playing as opponent).

## Deploy the Game Data Model

Now that we defined the data model of our game application and all its permissions configuration, we can deploy all backend resources needed to implement, operate, and manage this data model definition in the cloud.

## Deploy the Data Modeling definition

In order to deploy the data model, simply hit the Save and Deploy button on the right upper corner of the Data modeling page.

![Alt text](image-40.png)

Next, confirm you want to proceed the deployment and then wait for the deployment to be completed. Deployment can take 5-10 minutes, please be patient. While deployng the backend resources needed, Amplify Studio will show an animation that describes what type of resources are being deployed: Amazon DynamoDB tables to store data and AWS AppSync as a serverless GraphQL API to access and synchronize data.

![Alt text](image-41.png)

When the deployment is completed, Amplify Studio will provide a green checkbox that confirms that Succesfully deployed data model as well as setup instructions and snippets on how to integrate your frontend projects with the data model we just created. Also, Amplify Studio provides once again the amplify pull command you must use to sync your frontend project with the latest backend configurations.

Use the copy icon on the right side of the amplify pull commad snippet to copy the command. You'll use that command in the next chapter.

![Alt text](image-42.png)

## Implement online Game business logic

Now that we designed and deployed our data model and all backend resources needed to manage the data model in the cloud, we can implement the business logic of our game in order to make it an online multiplayer TicTacToe game.

In this section we'll go through:

- Pull the latest config in the client project
- Creating several React web app components:
  - Create the Game List component
  - Create the Game Manager component
  - Create the game footer component
  - Modify the Game Component
  - Modify the App Component

## Pull the latest config in the client project

In Cloud9 terminal, from the React project root folder, run the command provided by Amplify Studio that you copied at the end of the previous chapter. It will looks like the following:

```
amplify pull --appId YOUR_APP_ID --envName staging
```

Launch the command, and when the synchronization is completed you are ready to start implementing the business logic for the game that will leverage the data model and synchronization features provided by Amplify in the cloud.

[DEEP DIVE BONUS] If you want to dig deep into the framework, we suggest you to check the src/models folder. This folder has been created for you by Amplify during the pull operation and it contains all model definition for performing operation on data directly in the local storage, as provided by the [Data Store](https://docs.amplify.aws/lib/datastore/how-it-works/q/platform/js/) feature.

## Create Game List component

The GameList component allows us to display all games that are available to join. A player will be able to create a game (see next paragraphs) and other players can join one the created game. This compoment display the list of available games and a JOIN button.

In Cloud9, create a new file src/components/gameList.jsx with the following contents:

gameList.jsx

```
import React from 'react'
import Header from './header';

const style = {
	width: "100px",
	margin: "20px auto",
	padding: '10px',
    fontSize: "16px",
	fontWeight: "200",
	color: '#232f3e' ,
    textAlign: 'center'
};
const styleH2= {
	width: "80vw",
	margin: "40px auto",
	padding: '10px',
	display: "grid",
    fontSize: "18px",
	fontWeight: "800",
	color: '#232f3e' ,
    textAlign: 'center',
    borderTop: '1px solid #232f3e',
    borderBottom: '1px solid #232f3e'
};

const containerStyle = {
    margin: "0px auto 40px",
	display: "grid",
    width: '100vw'
}

const styleUL= {
	width: "80vw",
	margin: "0px auto",
	padding: '10px',
	display: "grid",
    fontSize: "18px",
	fontWeight: "200",
	color: '#232f3e' ,
};

const gameStyle = {
    borderBottom: "1px solid #232f3e",
    padding: '20px'
}

const GameList = (props) => (
    <div style={containerStyle}>
        <h2 style={styleH2}>
            JOIN a Game (Availabel Games: {props.games.length})
        </h2>
        <ul style={styleUL}>
            {props.games.map((game) => <li style={gameStyle} key={game.id}> <b>Hosted by:</b> {game.hostName} <button name={"btn"} style={style} onClick={() => props.onClick(game)}> JOIN</button></li>)}
        </ul>

    </div>
)

export default GameList
```

The list of games is provided to the component as a property, then the compenent cycles over the list and display the game id, the name of the host player and the join call to action. The onClick callback function is provided as a property as well.

## Create Game Manager component

The GameManager component orchestrate the player experience flow. It either displays the game list if a player haven't joined or created a game, or it displays the game board if the player creates a new game.

In Cloud9, create a new file src/components/gameManager.js with the following contents:

gameManager.js

```
import React, { useState, useEffect } from 'react'
import GameList from './gameList';
import Header from './header'

import { DataStore } from '@aws-amplify/datastore';
import { Game, GameResult } from '../models';

import { Amplify, Auth } from 'aws-amplify';

const GameManager = ({ signOut, user, changeActiveGame }) => {
    // this is for board
    // default value for all the elemnt is ""
    const [games, setGames] = useState([]);
    const emptyBoard = {board:Array(9).fill("")}
    const createGameStyle = {
        width: "250px",
        margin: "0 auto",
        padding: '10px',
        display: "grid",
        fontSize: "26px",
        fontWeight: "400",
        backgroundColor: '#ec7211',
        color: '#fff'
    };

    useEffect(() => {
        console.log('entering GameManager');
        console.log(user);
        const subscription = DataStore.observe(Game).subscribe((msg) => {
            console.log('observe received message');
            console.log(msg.model, msg.opType, msg.element);
            console.log('load fetch games');
            fetchGames();
          });

        fetchGames();
        //observeGanes();
        return () => subscription.unsubscribe();

      }, [])

    async function fetchGames() {
        console.log('Fetch Games');
        try {
            const models = await DataStore.query(Game, (g) =>
            g.result.eq(null));
            console.log("Games are");
            console.log(models);
            setGames(models);
        } catch (err) { console.log('error fetching games: '); console.log(err) }
    }


    async function observeGanes() {
        const subscription = DataStore.observeQuery(
            Game
          ).subscribe(snapshot => {
            const { items, isSynced } = snapshot;
            console.log(`[Snapshot] item count: ${items.length}, isSynced: ${isSynced}`);
            if(isSynced) {
                console.log("sync completed, setting state with items");
                console.log(items);
                setGames(items);
            }
          });
    }

    async function hostNewGame() {
        console.log("start creating new game");
        const hostedGame = await DataStore.save(
            new Game({
                "hostId": user.username,
                "board":  JSON.stringify(emptyBoard),
                "turn": "X",
                "hostName": user.signInDetails.loginId
            })
        );
        console.log(hostedGame);
        changeActiveGame(hostedGame);
    }

    async function joinGame(gameToJoin) {
        console.log("join a new game");
        /* Models in DataStore are immutable. To update a record you must use the copyOf function
        to apply updates to the item’s fields rather than mutating the instance directly */
        await DataStore.save(Game.copyOf(gameToJoin, item => {
            // Update the values on {item} variable to update DataStore entry
            item.opponentId = user.username;
            item.opponentName = user.signInDetails.loginId;
        }));
        changeActiveGame(gameToJoin);
    }

    return (
        <div>
            <Header user={user} signOut={signOut}/>
            <button name={"btn"} style={createGameStyle} onClick={hostNewGame}>+ Create New Game</button>
            <GameList games={games} onClick={joinGame}/>
        </div>
    )
}

export default GameManager
```

Let's review what this component does in depth. First, it imports Amplify Data Store and the Game model for the Data Store management. Also, it imports the brand new GameList component we just created.

Then, in the

```
useEffect()
```

function (at line 26) it leverages Data Store to both query available games (via the fetchGames() funciton) and to observe changes to the Game model itself. Observing changes to the Game model allows the component to react in real-time to game updates such as a new games has just been created by a player and therefore must be displayed, or a game has been joined hence must be removed from the game list. This happens in real-time thanks to the Data Store sync mechanism.

The fetchGames() function queries all games without a result so players can join one of those games.

```
async function fetchGames() {
        console.log('Fetch Games');
        try {
            const models = await DataStore.query(Game, (g) =>
            g.result.eq(null));
            console.log("Games are");
            console.log(models);
            setGames(models);
        } catch (err) { console.log('error fetching games') }
    }
```

The games state model is then used to setup the GameList component games property.

The function hostGame essentially creates a new instance of the game model, setup the hostId as the user id of the player (provided by the Auth feature), the board as an empty board, and the turn to the "X" player (the host).

The function joinGame essentially updates an existing game, specifying the gameId to update and setup the opponentId as the user id of the player that is joining(provided by the Auth feature). This function is then provided as property to the GameList component to provide the callback function for the JOIN button.

## Create the Game Footer component

The GameFooter component provides a footer to be displayed below the game's board that shows info about the game:

- Game Id
- Hosts' Name
- Oppoenent's Name

In Cloud9, create a new file src/components/gameFooter.jsx with the following contents:

gameFooter.jsx

```
import React from 'react'

const style = {
	width: "80vw",
	margin: "40px auto",
	padding: '10px',
	display: "grid",
    fontSize: "16px",
	fontWeight: "400",
    textAlign: 'center',
	color: '#ec7211'
};

const GameFooter = (props) => (
    <div>
        <label style={style}>Game ID: {props.gameId}</label>
        <label style={style}>X Player: {props.playerX}</label>
        <label style={style}>O Player: {props.playerO}</label>
    </div>
)

export default GameFooter
```

## Modify Game Component

As briefly seen in the previous lab, the Game component is responsible for managing a single instance of a game. It contains the business logic such as:

- input handling
- turn handling
- win/loss/draw business logic decisions

Now it's time to update the component in order to make it capable of managing online real-time interactions between two remote players.

In Cloud9, open the file src/components/game.js and replace the content with the following:

```
import React, { useState, useEffect } from 'react'
import Board from './board'

import Message from './message'
import Refresh from './refresh'
import Header from './header'
import Signout from './signout'
import GameFooter from './gameFooter'
import { DataStore } from '@aws-amplify/datastore';
import { Game as GameModel } from '../models';
import { GameResult } from '../models'
import { Amplify, Auth } from 'aws-amplify';



const isWon = (board) => {
    // list of postion that is winning
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    // checking each of the postition seeing if the combination is there
    // if it does return the True
    // else return false
    for (let i=0; i< lines.length; i++) {
        let [a, b, c] = lines[i];
        //console.log(board[a] === board[b] && board[a] === board[c])
        if (board[a]!=="" &&board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}


const Game = ({ signOut, user, currentGame }) => {
    console.log('Entering Game')
    console.log(user);
    // this is for board
    // default value for all the elemnt is ""
    const [board, setBoard] = useState(Array(9).fill(""));
    // first player is "X"
    // if the game is over put "" as player
    const [isPlayer, setIsPlayer] = useState("X");
    const [message, setMessage] = useState("Click to Start");
    const [playingGame, setPlayingGame] = useState(currentGame);
    const [whoAmI, setWhoAmI] = useState(currentGame.hostId == user.username ? 'X' : 'O');



    useEffect(() => {
        const subscription = DataStore.observe(GameModel, currentGame.id).subscribe(msg => {
            console.log('received update on game');
            console.log(msg.model, msg.opType, msg.element);
            fetchGame();
          });
        return () => subscription.unsubscribe();

      }, [])




    async function fetchGame() {
        console.log('Fetch Game');
        try {
            const model = await DataStore.query(GameModel, currentGame.id);
            console.log("Game is ");
            console.log(model);
            setPlayingGame(model);
            setBoard(model.board.board);
            setIsPlayer(model.turn);
            if(model.result != null) {
                switch(model.result) {
                    case GameResult.DRAW: setMessage("DRAW"); break;
                    case GameResult.WON_X: setMessage("X WON !"); break;
                    case GameResult.WON_Y: setMessage("O WON"); break;
                }
            }  else {
                setMessage(`TURN: ${model.turn}`);
            }
        } catch (err) { console.log('error fetching game' + err) }
    }

    const refresh  = () => {
        setBoard(Array(9).fill(""));
        setMessage("Click to start");
        setIsPlayer("X");
    }


    const handleInput = (pos) => {
        console.log('handleInput, isPlayer is ' + isPlayer);
        console.log('handleInput, pos is '  + pos);
        console.log('handleInput, board[pos] ' + board[pos]);
        if (isPlayer === "" || board[pos] !== "") {
            //is the game is over don't play
            // if the box has been clocked already then return
            console.log("is the game is over don't play");
            return;
        }

        if(isPlayer != whoAmI) {
            // it's not my turn, return
            alert('HOLD ON ... not your turn, player ' + whoAmI + ' !');
            return;
        }

        const boardCopy = [...board];
        boardCopy[pos] = isPlayer;
        setBoard(boardCopy); // updating board for current player

        console.log('BOARD IS: ' + JSON.stringify(boardCopy));

        if (isWon(boardCopy)){
            // once game is over
            setMessage(`WON: ${isPlayer}`)
            let result = isPlayer == "X" ? GameResult.WON_X : GameResult.WON_Y;
            // since the game is over putting ""
            setIsPlayer("");
            DataStore.save(GameModel.copyOf(playingGame, item => {
                item.turn = "";
                item.result = result;
                item.board.board = boardCopy;
            }));
            return;
        }

        if (boardCopy.indexOf("")=== -1){
            // if no more moves game is draw
            setMessage("DRAW")
            setIsPlayer("");
            DataStore.save(GameModel.copyOf(playingGame, item => {
                item.turn = "";
                item.result = GameResult.DRAW;
                item.board.board = boardCopy;
            }));
        } else {
            let nextPlayer = (isPlayer === "X") ? "O" : "X"
            setIsPlayer(nextPlayer); // updating player
            setMessage(`TURN: ${nextPlayer}`);
            DataStore.save(GameModel.copyOf(playingGame, item => {
                item.turn = nextPlayer;
                item.board.board = boardCopy;
            }));
        }
    }

    return (<div>
            <Header user={user} signOut={signOut}/>
            <Message value={message} />
            <Board onClick={handleInput} value={board} />
            <Refresh onClick={refresh} value={'Refresh'} />
            <GameFooter gameId={currentGame.id} playerX={playingGame?.hostName} playerO={playingGame?.opponentName}/>
        </div>)
}

export default Game
```

Let's review what changes we are applying to the component. First, we import models defined in data store such as Game and GameResult. Please note that to avoid conflict with components name, the Game model is imported as GameModel. We also import the GameFooter component we just created.

Then, we change the properties expected from the component by adding the currentGame property. This property refer to the Game model instance of the current game playes. Also, it initialize the whoAmI property to setup the player as the X player if the game's hostId equals the the username or to the O player if the game's opponentId equals the username.

In the useEffect() function, the component query the Game via the fetchGame() function, to setup the initial game status. Also it observe changes to the Game itself, in order to receive real-time game status changes whenever the other player performs a move.

The fetchGame() function queries the local Data Store using the currentGame.id, and then updates the board wuth the new status as well it updates the turn. It also manages the message to display in case of game ending with a result.

The handleInput() function manages inputs from the players. When a new move is performed by a player, it updates the game model by copying the model itself (Data Store models are immmutable) and updating the game board. Also, the funcion handles the logic for verifying the result. If the game must end because of either a won/loss result or a draw, the function updates the game models by setting the result field. In real-time, thanks to the observe method we setup in the useEffect() function, the other player can receive updates in real-time on the game status.

## Modify App component

As last step, we must modify the App component in order add the new business logic provide by new and modified components. In Cloud9, open the file src/App.js and replace the content with the follwing:

App.js

```
import React, { useEffect, useState }  from 'react'
import Game from './components/game'
import GameManager from './components/gameManager';
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

import { DataStore } from '@aws-amplify/datastore';
import { Game as GameModel } from './models';

import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

DataStore.start();

const App = ({ signOut, user }) => {
    const [activeGame, setActiveGame] = useState();
    console.log('ACTIVE GAME IS: ' + JSON.stringify(activeGame));
    useEffect(() => {
        document.title = "tic-tac-toe"
    }, [])

    if(!activeGame || activeGame?.id == "") {
        return <GameManager signOut={signOut} user={user} changeActiveGame={setActiveGame}/>
    } else {
        console.log('active game is ');
        console.log(activeGame);
        return <Game signOut={signOut} user={user} currentGame={activeGame}/>
    }
}
export default withAuthenticator(App);
```

In the App.js component we import the new GameManager component and we inkect the user object from the Auth. Then, the component checks the activeGame state model. If no activeGame is present, then the GameManager will be rendered, else the current Game will be rendered via the Game component.

## Play the Game

Play the Game
Now that we connected the frontend app with our backend resources and we implemented the game business logic we can test our game online. So, let's play the game

## Publish the new app version

In order to test our online multiplayer game, we must first publish the changes we applied to our frontend application.

From the root folder of your React project, inside the Cloud9 terminal run the following command:

```
amplify publish -y
```

Once the publish is complete, open the hosting URL of our web app in two different browsers (e.g. Firefox and Chrome). Please login with the two different accounts you created in Lab 3 in the two browser windows.

Then hit the + Create New Game button with one player.

![Alt text](image-43.png)

The Game board will appear but the footer will show that no opponent joined the game, as shown in the next image. As you see, the O Player label is empty.

![Alt text](image-44.png)

The available game will appear in the second account's window and the player will be able to JOIN by hitting the JOIN button.

![Alt text](image-45.png)

When the opponent joins the game, both Game boards will show the Game's data and both player are ready to start. First turn is for the host, X player.

![Alt text](image-46.png)

You can play using both browser and after some moves you can win your first game! When a game is won, the UI updates like the following image.

![Alt text](image-47.png)

## Lab 5: Implement Leaderboard

In this lab we'll setup the data model and business logic we must leverage to manage scoring and leaderboard in our real-time online multiplayer game.

The following sections will guide you through the steps to create the Leaderboard data model in the cloud for our TicTacToe application. Game business logic will interact with cloud data in real-time in order to make the leaderboard updating live whenever a game is completed.

The following image shows the web app page of the real-time leaderboard. The page has a list of players with the relative:

- Score (1 point assigned for a Draw, 3 points assigned for a Win)
- Streak (winning streak, loosing streak or DRAW if last game was a draw)
- Total number of games played

![Alt text](image-48.png)

## Design Leaderboard Data Model

In this section we'll setup the data model that supports our online real-time Leaderboard. We'll use the Amplify Studio Data Model visual designer to define data model and permissions.

## Design Data Model in Amplify Studio

In Amplify Studio, select Data in the Set up section on the left menu sidebar.

![Alt text](image-49.png)

You can now use the + Add Model button to start modeling your application's data.

![Alt text](image-50.png)

## Leaderboard model

The Leaderboard model must be designed to hold the overall score and ranking system for our gaming platform. For each player we must manage:

- overall score, based on the following scoring rules
  - 3 points for a victory
  - 1 point for a draw
- total number of games played since account creation
- winning or loosing streak, valued as
  - W[number of consecutive victory] if the last game was won
  - L[number of consecutive loss] if the last game was lost
  - DRAW if the last game ended as a draw

Let's model the Leaderboard model as described in the following image:

![Alt text](image-51.png)

Please note that we are going to use a playerId field of type String!, which means that you must flag the playerId as is required on the right menu sidebar when you put your cursor on the playerId field. Also, for the sake of this workshop we are not modeling players in our data model, leveraging only the Auth mechanism provided by Amplify itself. Hence, there is no relationship between Leaderboard and other models.

Then, let's setup permission for accessing Leaderboard data. To do that, please select the Leaderboard model and configure the permission settings in the right sidebar as described in the following image.

![Alt text](image-52.png)

## Deploy changes to Data Model

We can now deploy changes to data model by selecting the Save and deploy button in the right top corner. Amplify will manage the deployment of a new Amazon DynamoDB table and the update of the GraphQL API powered by AWS AppSync (including a new version of the GraphQL schema). The deployment may takes up to 5 minutes to be completed.

![Alt text](image-53.png)

Once the deployment is completed, Amplify Studio will provide the amplify pull command you've already use in all other labs of this workshop. Again, copy this command because you'll use at the beginning of the next chapter.

## Implement online Leaderboard business logic

Now that we designed and deployed our data model and all backend resources needed to manage the data model for the Leaderboard featurein the cloud, we can implement the business logic of our game in order to make it an real-time leaderboard inside the TicTacToe game web application.

## Pull the latest config in the client project

In Cloud9 terminal, from the React project root folder, run the command provided by Amplify Studio that you copied at the end of the previous chapter. It will looks like the following:

```
amplify pull --appId YOUR_APP_ID --envName staging
```

Launch the command, and when the synchronization is completed you are ready to start implementing the business logic for the game that will leverage the data model and synchronization features provided by Amplify in the cloud.

## Create UserLeaderboard component

The UserLeaderboard component allows us to display the leaderboard score of a single player in the gaming platform. For each player you will be able to see total score and winning / loosing streak.

In Cloud9, create a new file src/components/userLeaderboard.jsx with the following contents:

userLeaderboard.jsx

```
import React from 'react'
import Header from './header';

const style = {
	width: "auto",
	margin: "20px 20px auto",
	padding: '10px',
    fontSize: "16px",
	fontWeight: "200",
	color: '#fff' ,
    backgroundColor: '#232f3e',
    textAlign: 'center',
    display: 'inline-block'
};
const styleH2= {
	width: "80wv",
	margin: "40px auto",
	padding: '10px',
	display: "inline-block",
    fontSize: "18px",
	fontWeight: "800",
	color: '#232f3e' ,
    textAlign: 'center',
    borderTop: '1px solid #232f3e',
    borderBottom: '1px solid #232f3e'
};

const containerStyle = {
    margin: "0px auto 0px",
    width: '100vw',
    textAlign: 'center'
}

const styleUL= {
	width: "80vw",
	margin: "0px auto",
	padding: '10px',
	display: "grid",
    fontSize: "18px",
	fontWeight: "200",
	color: '#232f3e' ,
};

const gameStyle = {
    borderBottom: "1px solid #232f3e",
    padding: '20px'
}

const UserLeaderboard = (props) => (
    <div style={containerStyle}>
        <h2 style={styleH2}>
         Your performance - SCORE: {props.userleaderboard?.score} - STREAK: {props.userleaderboard?.streak} - GAMES: {props.userleaderboard?.gamesPlayed}
        </h2>
        <button name="btn" style={style} onClick={() => props.onClick()}> Show Leaderboard</button>
    </div>
)

export default UserLeaderboard
```

The UserLeaderboard component takes all user leaderbords as property and it iterates over them to display info about scores and streak.

## Create LeaderboardList Component

The LeaderboardList component allows us to display all leaderboard scores, one for each player in the gaming platform. In our gaming web app we will have a specific page for the global leaderboard, to provide a ranking page that users can use to compare their performance.

To create the component, in Cloud9, create a new file src/components/leaderboardList.js with the following contents:

```

import React, { useState, useEffect } from 'react'
import UserLeaderboard from './userLeaderboard';
import Header from './header';
import { DataStore } from '@aws-amplify/datastore';
import { Leaderboard } from '../models';

import { Amplify, Auth } from 'aws-amplify';

const LeaderboardList = ({ signOut, user, showLoaderboard }) => {
    // this is for board
    // default value for all the elemnt is ""
    const [leaderboards, setLeaderboards] = useState([]);

    const style = {
        width: "100px",
        margin: "20px auto",
        padding: '10px',
        fontSize: "16px",
        fontWeight: "200",
        color: '#232f3e' ,
        textAlign: 'center'
    };
    const styleH2= {
        width: "80vw",
        margin: "40px auto",
        padding: '10px',
        display: "grid",
        fontSize: "18px",
        fontWeight: "800",
        color: '#232f3e' ,
        textAlign: 'center',
        borderTop: '1px solid #232f3e',
        borderBottom: '1px solid #232f3e'
    };

    const containerStyle = {
        margin: "0px auto 40px",
        display: "grid",
        width: '100vw'
    }

    const styleUL= {
        width: "80vw",
        margin: "0px auto",
        padding: '10px',
        display: "grid",
        fontSize: "18px",
        fontWeight: "200",
        color: '#232f3e' ,
    };

    const gameStyle = {
        borderBottom: "1px solid #232f3e",
        padding: '20px'
    };

    const gameStyleYou = {
        borderBottom: "1px solid #232f3e",
        padding: '20px',
        color: '#ec7211'
    };

    const createGameStyle = {
        width: "250px",
        margin: "0 auto",
        padding: '10px',
        display: "grid",
        fontSize: "26px",
        fontWeight: "400",
        backgroundColor: '#ec7211',
        color: '#fff'
    };


    useEffect(() => {
        console.log('entering leaderboards');
        console.log(user);
        const subscription = DataStore.observe(Leaderboard).subscribe((msg) => {
            console.log('observe received message');
            console.log(msg.model, msg.opType, msg.element);
            console.log('load fetch Leaderboard');
            fetchLeaderboard();
          });

        fetchLeaderboard();
        return () => subscription.unsubscribe();

      }, [])

    async function fetchLeaderboard() {
        console.log('Fetch Leaderboard');
        try {
            const models = await DataStore.query(Leaderboard);
            console.log("Leaderboard are");
            console.log(models);
            setLeaderboards(models);
        } catch (err) { console.log('error fetching Leaderboard') }
    }

    async function showGames() {
        console.log('showGames');
        showLoaderboard(false);
    }

    return (
        <div>
            <Header user={user} signOut={signOut}/>
            <div style={containerStyle}>
            <button name={"btn"} style={createGameStyle} onClick={showGames}>Back To Games</button>
                <h2 style={styleH2}>
                    Global Leaderboard: {leaderboards.length} players
                </h2>
                <ul style={styleUL}>
                    {leaderboards.map((lb) => <li style={lb.playerId === user.username ? gameStyleYou : gameStyle} key={lb.id}> <b>Player:</b> {lb.playerId === user.username ? 'YOU' : lb.playerId} <b>Score:</b> {lb.score} <b>Streak:</b> {lb.streak} <b>Games:</b> {lb.gamesPlayed}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default LeaderboardList
```

In the LeaderboardList component we use Data Store to query the leaderboard model from the local storage, using the fetchLeaderboard() function. Also, we subscribe to changes to the leaderboard model so we can act upon model changes. In this way, anytime either a new leaderboard is created or a leaderboard is updated, we can refresh the leaderboard list in real-time and refresh the page accordingly.

## Change GameManager component

Now that we created the LeaderboardList component and the UserLeaderboard component, we can modify the GameManager component in order to embedd two new features:

- The user's score from its own UserLeaderboard component
- An action to navigate to the Leaderboard list

In Cloud9, open the file src/components/gameManager.js and replace the content with the following:

```
import React, { useState, useEffect } from 'react'
import GameList from './gameList';
import Header from './header'
import UserLeaderboard from './userLeaderboard';

import { DataStore } from '@aws-amplify/datastore';
import { Game, GameResult } from '../models';
import { Leaderboard } from '../models';

import { Amplify, Auth } from 'aws-amplify';

const GameManager = ({ signOut, user, changeActiveGame, showLoaderboard }) => {
    // this is for board
    // default value for all the elemnt is ""
    const [games, setGames] = useState([]);
    const [userLeaderboard, setUserLeaderboard] = useState(null);
    const emptyBoard = {board:Array(9).fill("")}
    const createGameStyle = {
        width: "250px",
        margin: "0 auto",
        padding: '10px',
        display: "grid",
        fontSize: "26px",
        fontWeight: "400",
        backgroundColor: '#ec7211',
        color: '#fff'
    };

    useEffect(() => {
        console.log('entering GameManager');
        console.log(user);
        const subscription = DataStore.observe(Game).subscribe((msg) => {
            console.log('observe received message');
            console.log(msg.model, msg.opType, msg.element);
            console.log('load fetch games');
            fetchGames();
          });

        fetchGames();
        fetchUserLeaderboard();
        //observeGanes();
        return () => subscription.unsubscribe();

      }, [])

    async function fetchGames() {
        console.log('Fetch Games');
        try {
            const models = await DataStore.query(Game, (g) =>
            g.result.eq(null));
            console.log("Games are");
            console.log(models);
            setGames(models);
        } catch (err) { console.log('error fetching games: '); console.log(err) }
    }

    async function fetchUserLeaderboard() {
        console.log('Fetch User Leaderboard');
        try {
            const models = await DataStore.query(Leaderboard, (g) =>
            g.playerId.eq(user.username));
            console.log("User Loeaderboard are");
            console.log(models);
            if(models != null && models.length == 1) {
                setUserLeaderboard(models[0]);
            }
        } catch (err) { console.log('error fetching user leaderboard') }
    }

    async function observeGanes() {
        const subscription = DataStore.observeQuery(
            Game
          ).subscribe(snapshot => {
            const { items, isSynced } = snapshot;
            console.log(`[Snapshot] item count: ${items.length}, isSynced: ${isSynced}`);
            if(isSynced) {
                console.log("sync completed, setting state with items");
                console.log(items);
                setGames(items);
            }
          });
    }

    async function hostNewGame() {
        console.log("start creating new game");
        const hostedGame = await DataStore.save(
            new Game({
                "hostId": user.username,
                "board":  JSON.stringify(emptyBoard),
                "turn": "X",
                "hostName": user.signInDetails.loginId
            })
        );
        console.log(hostedGame);
        changeActiveGame(hostedGame);
    }

    async function joinGame(gameToJoin) {
        console.log("join a new game");
        /* Models in DataStore are immutable. To update a record you must use the copyOf function
        to apply updates to the item’s fields rather than mutating the instance directly */
        await DataStore.save(Game.copyOf(gameToJoin, item => {
            // Update the values on {item} variable to update DataStore entry
            item.opponentId = user.username;
            item.opponentName = user.signInDetails.loginId;
        }));
        changeActiveGame(gameToJoin);
    }

    async function showLoaderboards() {
        console.log('showLeaderboard');
        showLoaderboard(true);
    }

    return (
        <div>
            <Header user={user} signOut={signOut}/>
            <UserLeaderboard userleaderboard={userLeaderboard} onClick={showLoaderboards}></UserLeaderboard>
            <button name={"btn"} style={createGameStyle} onClick={hostNewGame}>+ Create New Game</button>
            <GameList games={games} onClick={joinGame}/>
        </div>
    )
}

export default GameManager
```

In the GameManager component we use Data Store to fetch the player's leaderboard inside the fetchUserLeaderboard() function. As you can see the query specifically lookup the loaderboard with playerId equals the user.username. That's because user.username is the Id we use when we save a new leaderboard (we'll take a look at it in the next paragraph).

```
const models = await DataStore.query(Leaderboard, (g) =>
            g.playerId.eq(user.username));
```

Also, we added functions to navigate between the landing page for joining available games and the leaderboard list page. This is done via the showLoaderboards() function.

## Modifiy Game Component

Now we must modify the Game component in order to update the leaderboard scores when a game is completed.

In Cloud9, open the file src/components/game.js and replace the content with the following:

game.js

```
import React, { useState, useEffect } from 'react'
import Board from './board'

import Message from './message'
import Refresh from './refresh'
import Header from './header'
import Signout from './signout'
import GameFooter from './gameFooter'
import { DataStore } from '@aws-amplify/datastore';
import { Game as GameModel } from '../models';
import { GameResult } from '../models';
import { Leaderboard } from '../models'
import { Amplify, Auth } from 'aws-amplify';



const isWon = (board) => {
    // list of postion that is winning
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    // checking each of the postition seeing if the combination is there
    // if it does return the True
    // else return false
    for (let i=0; i< lines.length; i++) {
        let [a, b, c] = lines[i];
        //console.log(board[a] === board[b] && board[a] === board[c])
        if (board[a]!=="" &&board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}


const Game = ({ signOut, user, currentGame, changeActiveGame }) => {
    console.log('Entering Game')
    console.log(user);
    // this is for board
    // default value for all the elemnt is ""
    const [board, setBoard] = useState(Array(9).fill(""));
    // first player is "X"
    // if the game is over put "" as player
    const [isPlayer, setIsPlayer] = useState("X");
    const [message, setMessage] = useState("Click to Start");
    const [playingGame, setPlayingGame] = useState(currentGame);
    const [whoAmI, setWhoAmI] = useState(currentGame.hostId == user.username ? 'X' : 'O');


    useEffect(() => {
        const subscription = DataStore.observe(GameModel, currentGame.id).subscribe(msg => {
            console.log('received update on game');
            console.log(msg.model, msg.opType, msg.element);
            fetchGame();
          });
        return () => subscription.unsubscribe();

      }, [])




    async function fetchGame() {
        console.log('Fetch Game');
        try {
            const model = await DataStore.query(GameModel, currentGame.id);
            console.log("Game is ");
            console.log(model);
            setPlayingGame(model);
            setBoard(model.board.board);
            setIsPlayer(model.turn);
            if(model.result != null) {
                switch(model.result) {
                    case GameResult.DRAW: setMessage("DRAW"); break;
                    case GameResult.WON_X: setMessage("X WON !"); break;
                    case GameResult.WON_Y: setMessage("O WON"); break;
                }
            }  else {
                setMessage(`TURN: ${model.turn}`);
            }
        } catch (err) { console.log('error fetching game' + err) }
    }

    async function updateLeaderboard(winnerID, looserID, isDraw = false) {
        console.log('updateLeaderboard for winner: ' + winnerID);
        try {
            if(isDraw) {
                const winnerLeaderboard = await DataStore.query(Leaderboard, (l) =>
                 l.playerId.eq(winnerID));
                if(winnerLeaderboard != null && winnerLeaderboard.length == 1) {
                    DataStore.save(Leaderboard.copyOf(winnerLeaderboard[0], item => {
                        item.score += 1;
                        item.gamesPlayed += 1;
                        item.streak = "DRAW";
                    }));
                } else {
                    DataStore.save(new Leaderboard({
                        playerId: winnerID,
                        score: 1,
                        gamesPlayed : 1,
                        streak : "DRAW"
                    }));
                }

                const looserLeaderboard = await DataStore.query(Leaderboard, (l) =>
                l.playerId.eq(looserID));
                if(looserLeaderboard != null && looserLeaderboard.length == 1) {
                    DataStore.save(Leaderboard.copyOf(looserLeaderboard[0], item => {
                        item.score += 1;
                        item.gamesPlayed += 1;
                        item.streak = "DRAW";
                    }));
                } else {
                    DataStore.save(new Leaderboard({
                        playerId: looserID,
                        score: 1,
                        gamesPlayed : 1,
                        streak : "DRAW"
                    }));
                }

            } else {
                const winnerLeaderboard = await DataStore.query(Leaderboard, (l) =>
                 l.playerId.eq(winnerID));
                if(winnerLeaderboard != null  && winnerLeaderboard.length == 1) {
                    DataStore.save(Leaderboard.copyOf(winnerLeaderboard[0], item => {
                        item.score += 3;
                        item.gamesPlayed += 1;
                        item.streak = computeStreakForWin(item);
                    }));
                } else {
                    DataStore.save(new Leaderboard({
                        playerId: winnerID,
                        score: 3,
                        gamesPlayed : 1,
                        streak : "W1"
                    }));
                }

                const looserLeaderboard = await DataStore.query(Leaderboard, (l) =>
                l.playerId.eq(looserID));
                if(looserLeaderboard != null && looserLeaderboard.length == 1) {
                    DataStore.save(Leaderboard.copyOf(looserLeaderboard[0], item => {
                        item.gamesPlayed += 1;
                        item.streak = computeStreakForLost(item);
                    }));
                } else {
                    DataStore.save(new Leaderboard({
                        playerId: looserID,
                        score: 0,
                        gamesPlayed : 1,
                        streak : "L1"
                    }));
                }

            }
        } catch (e) {
            console.log('error fetching game' + e)
        }
    }

    function computeStreakForWin(leaderboard) {
        if(leaderboard.streak != "" && leaderboard.streak.indexOf("W") == 0) {
          var wins = 1 + parseInt(leaderboard.streak.split("W")[1]);
          return "W" + wins;
        } else {
          return "W1";
        }
      }

      function computeStreakForLost(leaderboard) {
        if(leaderboard.streak != "" && leaderboard.streak.indexOf("L") == 0) {
          var wins = 1 + parseInt(leaderboard.streak.split("L")[1]);
          return "L" + wins;
        } else {
          return "L1";
        }
      }

    const refresh  = () => {
        if(isWon(board) || board.indexOf("")=== -1) {
            changeActiveGame(null);
        } else {
            setBoard(Array(9).fill(""));
            setMessage("Click to start");
            setIsPlayer("X");
        }
    }


    const handleInput = (pos) => {
        console.log('handleInput, isPlayer is ' + isPlayer);
        console.log('handleInput, pos is '  + pos);
        console.log('handleInput, board[pos] ' + board[pos]);
        if (isPlayer === "" || board[pos] !== "") {
            //is the game is over don't play
            // if the box has been clocked already then return
            console.log("is the game is over don't play");
            return;
        }

        if(isPlayer != whoAmI) {
            // it's not my turn, return
            alert('HOLD ON ... not your turn, player ' + whoAmI + ' !');
            return;
        }

        const boardCopy = [...board];
        boardCopy[pos] = isPlayer;
        setBoard(boardCopy); // updating board for current player

        console.log('BOARD IS: ' + JSON.stringify(boardCopy));

        if (isWon(boardCopy)){
            // once game is over
            setMessage(`WON: ${isPlayer}`)
            let result = isPlayer == "X" ? GameResult.WON_X : GameResult.WON_Y;
            // since the game is over putting ""
            setIsPlayer("");

            DataStore.save(GameModel.copyOf(playingGame, item => {
                item.turn = "";
                item.result = result;
                item.board.board = boardCopy;
            }));

            if(result == GameResult.WON_X) {
                console.log('****** updating leaderboard for WON X');
                updateLeaderboard(playingGame.hostId, playingGame.opponentId)
            } else {
                console.log('****** updating leaderboard for WON O');
                updateLeaderboard(playingGame.opponentId, playingGame.hostId)
            }

            return;
        }

        if (boardCopy.indexOf("")=== -1){
            // if no more moves game is draw
            setMessage("DRAW")
            setIsPlayer("");
            DataStore.save(GameModel.copyOf(playingGame, item => {
                item.turn = "";
                item.result = GameResult.DRAW;
                item.board.board = boardCopy;
            }));

            updateLeaderboard(playingGame.hostId, playingGame.opponentId, true);

        } else {
            let nextPlayer = (isPlayer === "X") ? "O" : "X"
            setIsPlayer(nextPlayer); // updating player
            setMessage(`TURN: ${nextPlayer}`);
            DataStore.save(GameModel.copyOf(playingGame, item => {
                item.turn = nextPlayer;
                item.board.board = boardCopy;
            }));
        }
    }

    return (<div>
            <Header user={user} signOut={signOut}/>
            <Message value={message} />
            <Board onClick={handleInput} value={board} />
            <Refresh onClick={refresh} value={isWon(board) || board.indexOf("")=== -1 ? 'Exit' : 'Refresh'} />
            <GameFooter gameId={currentGame.id} playerX={playingGame?.hostName} playerO={playingGame?.opponentName}/>
        </div>)
}

export default Game

```

In this new version of the Game component we imported the Leaderboard model in order to interact with it via Data Store. Then we created the updateLeaderboard() function that contains the business logic to update the leaderboard of the two players. It set up the score, and process the streak value (via the computeStreakForWin or computeStreakForLoss functions). If no leaderboard is saved for the specific player, it creates a new Leaderboard, otherwise it updates the existing one.

The updateLeaderboard() function is invoked as soon as a game is completed, right after the last move.

## Change App Component

Last component to modify is the App.js in order to manage the new flow, such as moving between the game and the global leaderboard as well as showing the user leaderboard in the main page.

In Cloud9, open the file src/App.js and replace content with the following

App.js

```
import React, { useEffect, useState }  from 'react'
import Game from './components/game'
import GameManager from './components/gameManager';
import LeaderboardList from './components/leaderboardList';
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

import { DataStore } from '@aws-amplify/datastore';
import { Game as GameModel } from './models';

import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

DataStore.start();

const App = ({ signOut, user }) => {
    const [activeGame, setActiveGame] = useState();
    const [showLoaderboard, setShowLeaderboard] = useState(false);
    console.log('ACTIVE GAME IS: ' + JSON.stringify(activeGame));
    console.log('showLoaderboard IS: ' + JSON.stringify(showLoaderboard));
    useEffect(() => {
        document.title = "tic-tac-toe"
    }, [])

    if(showLoaderboard) {
        return <LeaderboardList signOut={signOut} user={user} showLoaderboard={setShowLeaderboard}/>
    } else if(!activeGame || activeGame?.id == "") {
        return <GameManager signOut={signOut} user={user} changeActiveGame={setActiveGame} showLoaderboard={setShowLeaderboard}/>
    } else {
        console.log('active game is ');
        console.log(activeGame);
        return <Game signOut={signOut} user={user} currentGame={activeGame} changeActiveGame={setActiveGame}/>
    }
}
export default withAuthenticator(App);
```

Reviewing code changes you can see we imported the LeaderboardList component and introduces state variable to manage the navigation state. If user choose to access the leaderboard function, then App.js renders the LeaderboardList component otherwise it shows either the list of available games to join or the active game to play.

## Play the Game and update your scores

Now that we connected the frontend app with our backend resources and we implemented the game business logic for the Leaderboard we can test our version of the online game. So, let's play the game and update your scores.

## Publish the new app version

In order to test our online multiplayer game, we must first publish the changes we applied to our frontend application. From the root folder of your React project, inside the Cloud9 terminal run the following command:

```
amplify publish -y
```

Once the publish is complete, open the hosting URL of our web app in two different browsers (e.g. Firefox and Chrome). Please login with the two different accounts you created in Lab 3 in the two browser windows. Then, play the game like you did in Lab 4. As soon as you complete your first game you should see the Leaderboard is starting tracking your scores. The new UI in the landing page will appear like this:

![Alt text](image-54.png)

We show the logged in user its own score and streak. If you click the showLeaderboard button, then the user is directed to the leaderboard page that will look like this:

![Alt text](image-55.png)

## Wrap up

Congratulations !! You completed Lab 5 and this concludes the real-time online multiplayer game workshop !!

## Summary and clean up

Congratulations! You completed this workshop.
In this workshop we built a fully functioning online multiplayer TicTacToe game, with real-time 1vs1 gameplay, game state management and leaderboard. The online game features player authentication via email and password, and real-time and offline synchronization of global leaderboard and scoring. Players are now able to either start a new game as a game host or join an already started game as an opponent.

## Clean up

If you are doing the workshop in your own account, you should delete your application in AWS Amplify including all of the application's backend resources. To delete the application, you can use either the Amplify Console or the Amplify CLI.

## To delete an Amplify application using the Amplify console

#### 1. Open the AWS Amplify console.

#### 2. In the left navigation pane, choose the name of the application that you want to delete: TicTacToe. The App page opens.

#### 3. On the App page, select the Actions dropdown list. Then, choose Delete app.

## To delete an Amplify application using the Amplify CLI

Within the project root directory run this command:

```
amplify delete
```
