# Amazon CodeWhisperer

Build applications faster and more securely with your AI coding companion. CodeWhisperer is trained on billions of lines of code and can generate code suggestions ranging from snippets to full functions in real time based on your comments and existing code. Bypass time-consuming coding tasks and accelerate building with unfamiliar APIs.

## What to expect from this workshop?

In this workshop, you will use Amazon CodeWhisperer to learn the basics of prompt engineering. We will start with several examples highlighting how the service is leveraging your comments and existing code for the results. Then you will dive into challenges designed to improve your productivity. In these challenges, we will give you hints if you get stuck. The idea is to allow you to use the service without boundaries, embrace your creativity, and have fun developing.

## CodeWhisperer for React

In this section, you will take on the role of a developer who has inherited a project from a colleague. The project's objective is to build a range of calculators for the AWSomeMath website using React and Bootstrap.

**Note**

Please note that the module's complexity is 300/400.

Next, we will delve into advanced prompting techniques and uncover strategies for effectively utilizing Amazon CodeWhisperer even without explicit prompts. Throughout this module, we'll employ examples to illustrate how these methods can significantly boost daily developer productivity. For instance:

- Exploring new libraries and languages (e.g., venturing into React for the first time)
- Rapidly initiating the initial draft of new code
- Streamlining maintenance of existing code to match coding style
- Helping in code refactoring processes
- Accelerating manual and repetitive tasks (e.g., documentation, test case creation)

## Setup

### When running the module within your local environment

### Prerequisites

If you are running this module in your local environment, you need to install Node.js & npm.

### Install dependencies

Open a terminal, navigate to the root of the folder, and install all dependencies with npm:

```
cd react/calculator
npm install
```

This command will download all necessary packages to get started with React and Bootstrap. While it is running, open the project react/calculator in your IDE, and explore its content. The project was set up using the command npx create-react-app calculator, and your colleague has already made different components and pages.

Your job is to finalize the project as you go through the sections. Each section can be tackled separately, and you can choose the order your preference. If you run into errors and cannot complete a section, you can go roll-back your changes and revert to the original version.

## Run the application

Once npm has finished installing packages, go back to the terminal and run the React development server:

```
npm start
```

This will start the application, and you can view it in your browser at http://localhost:3000 .

## Start Page

In this initial section, we explore enhancing prompts for Amazon CodeWhisperer and showcase how context influences results. We'll begin by creating the initial page for our app at http://localhost:3000/. Alternatively, click the Pi-symbol in the navigation bar. You'll notice a note in the browser from your colleague: to be done.

### A first version of the start page

Open the file src/pages/StartPage.js. It should look something like this:

```
import React from 'react';

// React component that renders the component StartPage with
// a list of pages. Each page has a title, description, image and path
// (path is used to navigate to the page). There is a welcome message:s
// "Welcome to AWSomeMath - try our calculators"
//
// example:
//   <StartPage pages={pages}>
//
// props:
//   pages: Array of objects with the following properties:
//     title: String
//     description: String
//     path: String
//     image: String

export default function StartPage(props) {
  // <tbd> please provide this function
  return (<div>to be done</div>)
}
```

This is an example of a detailed prompt to study how Amazon CodeWhisperer considers your context when generating code. We progressively add more context to direct Amazon CodeWhisperer towards the desired outcome.

To proceed, go to the StartPage function, remove the two lines in the body of the function:

```
  // <tbd> please provide this function
  return (<div>to be done</div>)
```

Trigger Amazon CodeWhisperer by positioning your cursor on a new line between the curly braces.

```
import React from 'react';

// React component that renders the component StartPage with
// a list of pages. Each page has a title, description, image and path
// (path is used to navigate to the page). There is a welcome message:
// "Welcome to AWSomeMath - try our calculators"
//
// example:
//   <StartPage pages={pages}>
//
// props:
//   pages: Array of objects with the following properties:
//     title: String
//     description: String
//     path: String
//     image: String

export default function StartPage(props) {

}
```

Allow Amazon CodeWhisperer's auto-suggestions or manually engage it with Option + C on MacOS or Alt + C on Windows.

Navigate options with arrows, select with tab, then save to see updates in the browser. Dissatisfied? Clear generated code, explore other suggestions, or tweak the prompt.

```
export default function StartPage(props) {
  return (
    <div className="start-page">
      <h1>Welcome to AWSomeMath - try our calculators</h1>
      <ul>
        {props.pages.map(page => (
          <li key={page.path}>
            <a href={page.path}>
              <img src={page.image} alt={page.title} />
              <h2>{page.title}</h2>
              <p>{page.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Adding CardForPage component

Without any further context, Amazon CodeWhisperer crafts basic HTML code. You can enhance this with a CSS style sheet. Yet, we aim to integrate the CardForPage component.

#### 1. Revisit src/pages/StartPage.js and import the CardForPage component.

#### 2. Delete generated code within braces and trigger Amazon CodeWhisperer

#### 3. Iterate as needed until it generates code including the CardForPage component. Each time, save code, observe browser updates.

**Note**

The CrossFile context feature is applicable to JavaScript. This implies that Amazon CodeWhisperer seamlessly integrates the context of the files currently open in your code editor.

Hint

Use the following import statements in your code:

```
import React from 'react';
import {CardForPage} from '../components';
```

Solution

There are two methods to instruct Amazon CodeWhisperer to utilize CardForPage. First, extend the documentation to specify that pages are rendered using CardForPage. After implementing this change, Amazon CodeWhisperer will recognize the updated context and generate code featuring that component. To rectify any errors, modify the import statements as indicated in the provided hint. Alternatively, the second approach involves directly importing the component without altering the documentation. With this fresh context, Amazon CodeWhisperer now suggests solutions that incorporate our component.

```
import React from 'react';
import {CardForPage} from '../components';

// React component that renders the component StartPage with
// a list of pages. Each page has a title, description, image and path
// (path is used to navigate to the page). There is a welcome message:
// "Welcome to AWSomeMath - try our calculators"
//
// example:
//   <StartPage pages={pages}>
//
// props:
//   pages: Array of objects with the following properties:
//     title: String
//     description: String
//     path: String
//     image: String
export default function StartPage(props) {
  return (
    <div className="start-page">
      <h1>Welcome to AWSomeMath - try our calculators</h1>
      <div className="start-page__cards">
        {props.pages.map(page => (
          <CardForPage key={page.path} page={page} />
        ))}
      </div>
    </div>
  );
}
```

## Adding Bootstrap

The team has agreed to use Bootstrap and the react-bootstrap package to style components. There are many libraries with a similar purpose and without further information, Amazon CodeWhisperer is unaware of our intentions. Using the same approach as before, adjust the prompt and generate a new implementation of the StartPage component that follows our styling guidelines.

What do you have to do?

Hint

Start with adding a (temporary) comment above the StartPage function ("use bootstrap"). This brings you one step closer to the solution, but how do we get Amazon CodeWhisperer to use the react-bootstrap components?

Solution

Again, we have the two options:

#### 1. Adding a comment with further instructions for Amazon CodeWhisperer.

#### 2. Adding an import statement with the preferred components to use.

Using the first approach is only partially successful:

```
// use bootstrap from the react-bootstrap package
export default function StartPage(props) {
  return (
    <div className="container">
      <h1>Welcome to AWSomeMath - try our calculators</h1>
      <div className="row">
        {props.pages.map((page, index) => (
          <div className="col-md-4" key={index}>
            <CardForPage page={page} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

The code generated indeed employs Bootstrap for rendering, yet it lacks the React components. To guide Amazon CodeWhisperer appropriately, we can introduce an extra import statement as shown below:

```
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {CardForPage} from '../components';

// React component that renders the component StartPage with
// a list of pages. Each page has a title, description, image and path
// (path is used to navigate to the page). There is a welcome message:
// "Welcome to AWSomeMath - try our calculators"
//
// example:
//   <StartPage pages={pages}>
//
// props:
//   pages: Array of objects with the following properties:
//     title: String
//     description: String
//     path: String
//     image: String

export default function StartPage(props) {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Welcome to AWSomeMath - try our calculators</h1>
        </Col>
      </Row>
      <Row>
        {props.pages.map((page, index) => (
          <Col key={index}>
            <CardForPage page={page} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
```

Experiment with the import statement (e.g., remove Container) and observe how this impacts the generation of code.

## StartPage beautified

Now we know how important the context is. With this new knowledge, the only thing left for us as a developer is to apply some fine tuning to render the page in the desired format. We could adjust the prompts to include more rendering details, or provide the final touches manually.

We do not need the start page for the rest of this module, but you can use the following beautified version before progressing to the next section.

```
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CardForPage } from '../components';

// React component that renders the component StartPage with
// a list of pages. Each page has a title, description, image and path
// (path is used to navigate to the page). There is a welcome message:
// "Welcome to AWSomeMath - try our calculators"
//
// example:
//   <StartPage pages={pages}>
//
// props:
//   pages: Array of objects with the following properties:
//     title: String
//     description: String
//     path: String
//     image: String

export default function StartPage(props) {
  return (
    <Container fluid>
      <h1 className='border-bottom'>Welcome to AWSomeMath - try our calculators</h1>
      <Row className='my-4'>
        {
          props.pages?.map((page, idx) =>
            <Col md='auto' key={idx}>
              <CardForPage {...page}/>
            </Col>
          )
        }
      </Row>
    </Container>
  );
}
```

## Simple Calculator

In the example before, we used a detailed prompt to generate the entire start page. As we add more to our code, we do not want to build everything again from scratch. Instead, we can use Amazon CodeWhisperer to apply the necessary code changes with 'implicit' prompting techniques, taking the context and existing code into account.

## Enable calculations

First, navigate to the calculator in the browser. If you completed the start page example, you can click the Show me! button for the calculator card. Otherwise, click on Calculator in the navigation bar at the top of the page, or jump directly to http://localhost:3000/calculator.

Try out the calculator in the browser: you notice that it does not calculate the results as you type numbers and press an operand or the equals button. Let's fix this with Amazon CodeWhisperer. Open the file src/pages/CalculatorPage.js and close all other files. The colleague from whom you inherited the project left various <tbd> comments in the code. Locate the performIntegerOperation function:

```
function performIntegerOperation(first, second, operand) {
  // <tbd> please provide this function
}
```

Delete the comment, go to the empty line within the function's curly braces, and prompt Amazon CodeWhisperer for code generation. Navigate suggestions using arrow keys, choosing an appropriate option. Afterward, save the file and assess your modifications in the calculator. Note: sometimes you have to press the equals button, or simply refresh the page to reset the state of the calculator component.

```
function performIntegerOperation(first, second, operand) {
  switch (operand) {
    case 'add':
      return first + second;
    case 'sub':
      return first - second;
    case 'mul':
      return first * second;
    case 'div':
      return first / second;
    default:
      return 0;
  }
}
```

This is an example where the prompt constitutes the entire file, and you only need to provide a self-documented declaration for the function that Amazon CodeWhisperer is expected to generate. For numerous daily tasks, this approach is significantly swifter than writing a prompt in a comment and subsequently removing the comment (unless it continues to serve as documentation). However, it requires the use of descriptive names in your code.

## Implement clear button

There is more work to do. You notice that the AC button is not working. Progress as before: remove the comment and let Amazon CodeWhisperer produce the code. Test it in the browser. Does it work now?

Hint

Locate the function handleClear in the code:

```
// invoked when clear button is clicked
const handleClear = (operand) => {
  // <tbd> please provide this function
}
```

Solution

```
// invoked when clear button is clicked
const handleClear = () => {
  setFirst('')
  setLastOperand('')
  setSecond('0')
  setResult('')
}
```

### Putting all together

If you did not finish the component yourself, you can copy the following solution:

```
// React component for start page with an example toast
import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

// React component that renders a simple integer calculator
// supporting addition, subtraction, multiplication and division.
//
// example:
//   <CalculatorPage />

export default function CalculatorPage() {
  // component state:
  //    first: string; first value for calculations, use setFirst to change
  //    lastOperand: string; last operand for calculations, use setLastOperand to change
  //    second: string; second value for calculations, use setSecond to change
  //    result: string; result of calculations, use setResult to change
  const [first, setFirst] = useState('');
  const [lastOperand, setLastOperand] = useState('');
  const [second, setSecond] = useState('0');
  const [result, setResult] = useState('');

  function performIntegerOperation(first, second, operand) {
    switch(operand) {
      case 'add':
        return first + second;
      case 'sub':
        return first - second;
      case 'mul':
        return first * second;
      case 'div':
        return first / second;
      default:
        return 0;
    }
  }

  // invoked when clear button is clicked
  const handleClear = () => {
    setFirst('')
    setLastOperand('')
    setSecond('0')
    setResult('')
  }

  // invoked when a digit button is clicked
  const handleDigit = (digit) => {
    setResult('')
    setSecond(second.toString().replace(/^0+/, '') + digit)
  }

  // invoked when an operand button is clicked
  const handleOperand = (operand) => {
    if(lastOperand){
      setFirst(Math.floor(performIntegerOperation(first, second, lastOperand)))
    } else if(result) {
      setFirst(result)
    } else {
      setFirst(second)
    }
    setLastOperand(operand)
    setSecond('0')
    setResult('')
  }

  // invoked when the equals button is clicked
  const handleEquals = () => {
    if(lastOperand){
      setResult(Math.floor(performIntegerOperation(first, second, lastOperand)))
    } else if(second) {
      setResult(second)
    }
    setFirst('')
    setLastOperand('')
    setSecond('')
  }

  // defines the text for the operand buttons
  const operandText = {
    add: '+',
    sub: '-',
    mul: '*',
    div: '/',
    clear: 'AC',
    equals: '='
  }

  // render the calculator page
  return (
    <Card className='shadow' style={{width: '300px'}}>
      <div className='bg-black text-white text-end p-2 h2 text-nowrap overflow-hidden '>
        <div className='bg-black text-white text-end fs-6'>
        {first && lastOperand ? first + (operandText[lastOperand] || '') : "\u00a0"}
        </div>
        {result || second || '0'}
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '10px', padding: '10px'}}>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('7')}>7</Button>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('8')}>8</Button>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('9')}>9</Button>
        <Button className='btn btn-secondary' onClick={() => handleOperand('div')}>{operandText.div}</Button>

        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('4')}>4</Button>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('5')}>5</Button>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('6')}>6</Button>
        <Button className='btn btn-secondary' onClick={() => handleOperand('mul')}>{operandText.mul}</Button>

        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('1')}>1</Button>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('2')}>2</Button>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('3')}>3</Button>
        <Button className='btn btn-secondary' onClick={() => handleOperand('sub')}>{operandText.sub}</Button>

        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('0')}>0</Button>
        <Button className='btn btn-primary' onClick={() => handleEquals()}>{operandText.equals}</Button>
        <Button className='btn btn-danger' onClick={() => handleClear()}>{operandText.clear}</Button>
        <Button className='btn btn-secondary' onClick={() => handleOperand('add')}>{operandText.add}</Button>
      </div>
    </Card>
  )
}
```

## Volumes Calculator

In the previous section, we observed how Amazon CodeWhisperer utilized the format of existing documentation to generate new suggestions. In this section, we take it a step further and use it to complete the code of the volume calculator based on a provided example.

## Analyze the existing code

First, navigate to the volumes calculator in the browser. If you completed the start page example, you can click the Show me! button for the volumes card. Otherwise, click on Volumes in the navigation bar at the top of the page, or jump directly to http://localhost:3000/volumes.

Try out the calculator in the browser! You'll notice that it currently only allows volume computation for cubes. However, the specifications requires spheres, cones, cylinders, cuboids, and pyramids. To fulfill this requirement, we must expand the code in the src/pages/VolumesPage.js file. Open the file within your IDE and close any other files. Find the function responsible for calculating cube volumes:

```
/**
 * Calculate the volume of a cube
 *
 * The function takes an object dimensions with property length, and
 * calculates the volume of the cube. It uses the formula:
 *
 * volume = length * length * length
 *
 * @param {object} dimensions with property length
 * @example calculateCubeVolume({length: 10})
 */
export function calculateCubeVolume(dimensions) {
  return dimensions.length * dimensions.length * dimensions.length;
}
```

A little further down, we come across the constant shapes, which contains the data for rendering forms related to various shapes:

```
// define list of shapes and their corresponding parameters to calculate volumes
const shapes = {
    Cube: {
      name:         'Cube',
      dimensions:   ['length'],
      formulaText:  'length * length * length',
      image:        'cube.svg',
      function:     calculateCubeVolume,
    },
    // <tbd> once the function above is implemented, please add shape data here
};
```

Incorporating an additional 5 shapes into the code typically requires substantial effort. However, with Amazon CodeWhisperer, this task becomes notably easier, allowing us the opportunity to enhance code stability as well.

## Adding spheres volume calculations

Locate the marker left by your colleague where you need to extend the code, and use Amazon CodeWhisperer to create a new function to compute the volumes of shapes:

```
/**
 * <tbd> please add more shapes
 */
```

Hint

Replace "tbd please add more shapes" with a new comment that starts with "Calculate ...". Extend the code with Amazon CodeWhisperer until done. Make sure that the next shape is indeed a sphere and modify the suggestion if another shape is proposed by Amazon CodeWhisperer. Use Option + C on MacOS or Alt + C on Windows to start Amazon CodeWhisperer.

Solution

To obtain the final result, we need to trigger Amazon CodeWhisperer multiple times. This is often the case, when Amazon CodeWhisperer is not confident to produce the entire output in one step and expects you to adjust the code generated thus far. Keep adding new lines to extend the documentation until completed. Then move the cursor below the comment to generate the function signature. Again, CoderWhisperer is likely to stop after the first line, giving you a chance to adjust the names of the function and parameters.

```
/**
 * Calculate the volume of a sphere
 *
 * The function takes an object dimensions with property radius, and
 * calculates the volume of the sphere. It uses the formula:
 *
 * volume = 4/3 * pi * radius * radius * radius
 *
 * @param {object} dimensions with property radius
 * @example calculateSphereVolume({radius: 10})
 */
export function calculateSphereVolume(dimensions) {
  return (4/3) * Math.PI * dimensions.radius * dimensions.radius * dimensions.radius;
}
```

## Adding spheres to the calculator

The new shape is not yet working in the calculator. Locate the shapes constant in the code, use Amazon CodeWhisperer to add a Sphere property, save the file, and explore your changes in the open browser.

A simple variable declaration is sufficient for Amazon CodeWhisperer to provide code recommendations.

Hint

Remove " < tbd> once the function above is implemented, please add shape data here" and use Option + C on MacOS or Alt + C on Windows to start Amazon CodeWhisperer.

Solution

Remove "< tbd> once the function above is implemented, please add shape data here" and use Option + C on MacOS or Alt + C on Windows to start Amazon CodeWhisperer. Code production is likely to happen line-by-line, giving you a chance to revisit the produced data and adjust if needed. In our case, we can accept all the suggestions until the entire Sphere object is produced:

```
// define list of shapes and their corresponding parameters to calculate volumes
const shapes = {
    Cube: {
      name:         'Cube',
      dimensions:   ['length'],
      formulaText:  'length * length * length',
      image:        'cube.svg',
      function:     calculateCubeVolume,
    },
    Sphere: {
      name:         'Sphere',
      dimensions:   ['radius'],
      formulaText:  '4/3 * pi * radius * radius * radius',
      image:        'sphere.svg',
      function:     calculateSphereVolume,
    },
  }
```

## Refactoring the volumes function

We observe that both functions do not check for the existence of the dimensions properties required for the volume calculations. Can you add input validation and throw an Error if properties are missing?

Hint

Amend the documentation with an @throws line and use Amazon CodeWhisperer for the rest. Use Option + C on MacOS or Alt + C on Windows to start Amazon CodeWhisperer.

Solution

We can add a new line in the documentation of the volume functions. As we type @throws, Amazon CodeWhisperer suggest how to complete the line for us. Accept the suggestions and move to the function. Create a new line after the curly braces and ask Amazon CodeWhisperer to complete for you. The end result should look like this:

```
/**
 * Calculate the volume of a cube
 *
 * The function takes an object dimensions with property length, and
 * calculates the volume of the cube. It uses the formula:
 *
 * volume = length * length * length
 *
 * @param {object} dimensions with property length
 * @throws {Error} if the object does not contain a property length
 * @example calculateCubeVolume({length: 10})
 */
export function calculateCubeVolume(dimensions) {
  if (!dimensions.length) {
    throw new Error('The object does not contain a property length');
  }
  return dimensions.length * dimensions.length * dimensions.length;
}
```

Do the same for the sphere function.

## Next shape: the cone

With this adjusted template for volume functions, let's add a new shape: the cone.

Hint

Create a new comment following the same format as the existing volume function. Do not forget to extend the shape constant once the volume function is done. Use Option + C on MacOS or Alt + C on Windows to start Amazon CodeWhisperer.

Solution

Firstly, create a new comment with /\*\* and wait for Amazon CodeWhisperer to extend the comments. You may have to change the shape name to "cone" should Amazon CodeWhisperer suggest a different form. Extend the comment until done, then move below the comment to generate first the declaration of the new function, and then the body of the function. Did you notice that Amazon CodeWhisperer automatically added input validation?

```
/**
 * Calculate the volume of a cone
 *
 * The function takes an object dimensions with property radius, and
 * calculates the volume of the sphere. It uses the formula:
 *
 * volume = 1/3 * pi * radius * radius * height
 *
 * @param {object} dimensions with property radius and height
 * @throws {Error} if the object does not contain a property radius or height
 * @example calculateConeVolume({radius: 10, height: 10}
 */
export function calculateConeVolume(dimensions) {
  if (!dimensions.radius || !dimensions.height) {
    throw new Error('The object does not contain a property radius or height');
  }
  return (1/3) * Math.PI * dimensions.radius * dimensions.radius * dimensions.height;
}
```

Secondly, we need to add a new entry in the shapes constant as before. Move to the end of the previous entry (make sure there is a comma after the closing curly braces), and hand-over to Amazon CodeWhisperer to complete for you. Again, you may be asked to complete line-by-line to revisit and confirm the generated data:

```
// define list of shapes and their corresponding parameters to calculate volumes
const shapes = {
    Cube: {
      name:         'Cube',
      dimensions:   ['length'],
      formulaText:  'length * length * length',
      image:        'cube.svg',
      function:     calculateCubeVolume,
    },
    Sphere: {
      name:         'Sphere',
      dimensions:   ['radius'],
      formulaText:  '4/3 * pi * radius * radius * radius',
      image:        'sphere.svg',
      function:     calculateSphereVolume,
    },
    Cone: {
      name:         'Cone',
      dimensions:   ['radius', 'height'],
      formulaText:  '1/3 * pi * radius * radius * height',
      image:        'cone.svg',
      function:     calculateConeVolume,
    },
  }
```

Save the file, and try it out in the open browser. That was fast, right?

(Optional) Complete the calculator
You don't have to finish the calculator; you can proceed directly to the next section if you prefer.

We're left with three more shapes to incorporate: cylinders, cuboids, and pyramids. How swiftly can you accomplish this task using Amazon CodeWhisperer?

Solution

We follow the same approach as before adding new volume functions and extending the shapes constant. Pay attention to what Amazon CodeWhisperer is generating. For instance, the pyramid may have a square or rectangular base. You can adjust the definitions as you step through the productions. The final code should look like as follows:

```
import React, { useState } from 'react';
import { Card, Form, Image, Row, Col, Button } from 'react-bootstrap';
import { ReactDOM } from 'react-dom';

/**
 * Calculate the volume of a cube
 *
 * The function takes an object dimensions with property length, and
 * calculates the volume of the cube. It uses the formula:
 *
 * volume = length * length * length
 *
 * @param {object} dimensions with property length
 * @throws {Error} if the object does not contain a property length
 * @example calculateCubeVolume({length: 10})
 */
export function calculateCubeVolume(dimensions) {
  if (!dimensions.length) {
    throw new Error('The object does not contain a property length');
  }
  return dimensions.length * dimensions.length * dimensions.length;
}

/**
 * Calculate the volume of a sphere
 *
 * The function takes an object dimensions with property radius, and
 * calculates the volume of the sphere. It uses the formula:
 *
 * volume = 4/3 * pi * radius * radius * radius
 *
 * @param {object} dimensions with property radius
 * @throws {Error} if the object does not contain a property radius
 * @example calculateSphereVolume({radius: 10})
 */
export function calculateSphereVolume(dimensions) {
  if (!dimensions.radius) {
    throw new Error('The object does not contain a property radius');
  }
  return (4/3) * Math.PI * dimensions.radius * dimensions.radius * dimensions.radius;
}

/**
 * Calculate the volume of a cone
 *
 * The function takes an object dimensions with property radius, and
 * calculates the volume of the sphere. It uses the formula:
 *
 * volume = 1/3 * pi * radius * radius * height
 *
 * @param {object} dimensions with property radius and height
 * @throws {Error} if the object does not contain a property radius or height
 * @example calculateConeVolume({radius: 10, height: 10}
 */
export function calculateConeVolume(dimensions) {
  if (!dimensions.radius || !dimensions.height) {
    throw new Error('The object does not contain a property radius or height');
  }
  return (1/3) * Math.PI * dimensions.radius * dimensions.radius * dimensions.height;
}

/**
 * Calculate the volume of a cylinder
 *
 * The function takes an object dimensions with property radius, and
 * calculates the volume of the sphere. It uses the formula:
 *
 * volume = pi * radius * radius * height
 *
 * @param {object} dimensions with property radius and height
 * @throws {Error} if the object does not contain a property radius or height
 * @example calculateCylinderVolume({radius: 10, height: 10}
 */
export function calculateCylinderVolume(dimensions) {
  if (!dimensions.radius || !dimensions.height) {
    throw new Error('The object does not contain a property radius or height');
  }
  return Math.PI * dimensions.radius * dimensions.radius * dimensions.height;
}

/**
 * Calculate the volume of a cuboid
 *
 * The function takes an object dimensions with property radius, and
 * calculates the volume of the sphere. It uses the formula:
 *
 * volume = length * width * height
 *
 * @param {object} dimensions with property length, width, height
 * @throws {Error} if the object does not contain a property length, width, or height
 * @example calculateCuboidVolume({length: 10, width: 10, height: 10}
 */
export function calculateCuboidVolume(dimensions) {
  if (!dimensions.length || !dimensions.width || !dimensions.height) {
    throw new Error('The object does not contain a property length, width, or height');
  }
  return dimensions.length * dimensions.width * dimensions.height;
}

/**
 * Calculate the volume of a pyramid
 *
 * The function takes an object dimensions with property radius, and
 * calculates the volume of the sphere. It uses the formula:
 *
 * volume = 1/3 * length * width * height
 *
 * @param {object} dimensions with property length, width, height
 * @throws {Error} if the object does not contain a property length, width, or height
 * @example calculatePyramidVolume({length: 10, width: 10, height: 10}
 */
export function calculatePyramidVolume(dimensions) {
  if (!dimensions.length || !dimensions.width || !dimensions.height) {
    throw new Error('The object does not contain a property length, width, or height');
  }
  return (1/3) * dimensions.length * dimensions.width * dimensions.height;
}

// define list of shapes and their corresponding parameters to calculate volumes
const shapes = {
    Cube: {
      name:         'Cube',
      dimensions:   ['length'],
      formulaText:  'length * length * length',
      image:        'cube.svg',
      function:     calculateCubeVolume,
    },
    Sphere: {
      name:         'Sphere',
      dimensions:   ['radius'],
      formulaText:  '4/3 * pi * radius * radius * radius',
      image:        'sphere.svg',
      function:     calculateSphereVolume,
    },
    Cone: {
      name:         'Cone',
      dimensions:   ['radius', 'height'],
      formulaText:  '1/3 * pi * radius * radius * height',
      image:        'cone.svg',
      function:     calculateConeVolume,
    },
    Cylinder: {
      name:         'Cylinder',
      dimensions:   ['radius', 'height'],
      formulaText:  'pi * radius * radius * height',
      image:        'cylinder.svg',
      function:     calculateCylinderVolume,
    },
    Cuboid: {
      name:         'Cuboid',
      dimensions:   ['length', 'width', 'height'],
      formulaText:  'length * width * height',
      image:        'cuboid.svg',
      function:     calculateCuboidVolume,
    },
    Pyramid: {
      name:         'Pyramid',
      dimensions:   ['length', 'height'],
      formulaText:  '1/3 * length * length * height',
      image:        'pyramid.svg',
      function:     calculatePyramidVolume,
    },
  }

// default shape and dimensions for the calculator page
const defaultShape = 'Cube';
const defaultDimensions = {length: 1, height: 1, width: 1, radius: 1};

// Render the volumes calculator page. It provides a dropdown
// to select the shape and text fields to enter the dimensions.
// The result is shown at the top.
//
// example:
//   <VolumesPage />

export default function VolumesPage() {
  const [result, setResult] = useState(1);
  const [shape, setShape] = useState(defaultShape);
  const [dimensions, setDimensions] = useState({...defaultDimensions});

  // calculate the volume of the shape and update the result
  const updateResult = (shape, dimensions) => {
    try {
      const volume = shapes[shape].function(dimensions);
      setResult(volume);
    } catch (error) {
      setResult(0);
    }
  }

  // invoked when the clear button is clicked
  const handleClear = () => {
    setShape(defaultShape);
    setDimensions({...defaultDimensions});
    updateResult(defaultShape, defaultDimensions);
  }

  // invoked when the shape dropdown value has changed
  const handleChangeShape = (newShape) => {
    setShape(newShape);
    updateResult(newShape, dimensions);
  }

  // invoked if the value of a dimension has changed
  // key: the name of the dimension
  // value: the new value for the dimension
  const handleChangeDimension = (key, value) => {
    let newDimensions = {...dimensions, [key]: value};
    setDimensions(newDimensions);
    updateResult(shape, newDimensions);
  }

  // renders the volume calculator component
  return (
    <Card className='shadow' style={{width: '400px'}}>
      <Form className='m-3'>
        <Image className='position-relative start-50 translate-middle-x mx-auto mb-3' src={shapes[shape].image} style={{height: '150px'}} fluid />
        <Form.Group as={Row} className='m-3'>
          <Col sm={{ span: 10, offset: 1 }}>
            <div className='bg-black text-white text-end p-2 h2 text-nowrap overflow-hidden '>
              <div className='bg-black text-white text-end fs-6'>
                {shapes[shape].formulaText + '='}
              </div>
              <span>{result.toPrecision(6).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')}</span>
            </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='m-3'>
          <Form.Label column sm={3}>shape</Form.Label>
          <Col sm={9}>
            <Form.Control as="select" value = {shape} onChange = {(event) => handleChangeShape(event.target.value)}>
              {
                Object.keys(shapes).map((key) =>
                  <option key={key} value={key}>{shapes[key].name}</option>
                )
              }
            </Form.Control>
          </Col>
        </Form.Group>
        {
          shapes[shape].dimensions.map((key) =>
            <Form.Group as={Row} className='m-3' key={key} >
              <Form.Label column sm={3}>{key}</Form.Label>
              <Col sm={9}>
                <Form.Control type="number" min="0" value={dimensions[key] || 0} onChange={(event) => handleChangeDimension(key, event.target.value)} />
              </Col>
            </Form.Group>
          )
        }
        <Form.Group as={Row} className='m-3'>
          <Col sm={{ span: 9, offset: 3 }}>
            <Button onClick={() => handleClear()}>Clear</Button>
          </Col>
        </Form.Group>
      </Form>
    </Card>
  );

}
```

## Test Cases

Testing is a crucial aspect of software development, ensuring that your code functions correctly and maintains its integrity over time. In this hands-on module, you will create tests for a small React calculator application.

## Testing the simple calculator

We have added the data-testid attribute in our JSX code to enable effective testing. By adding data-testid to elements, we create a consistent way for testing tools to identify and test those elements, ensuring stability even with component changes.

To proceed, please copy the following code into the file src/pages/CalculatorPage.js:

```
// React component for start page with an example toast
import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

// React component that renders a simple integer calculator
// supporting addition, subtraction, multiplication and division.
//
// example:
//   <CalculatorPage />

export default function CalculatorPage() {
  // component state:
  //    first: string; first value for calculations, use setFirst to change
  //    lastOperand: string; last operand for calculations, use setLastOperand to change
  //    second: string; second value for calculations, use setSecond to change
  //    result: string; result of calculations, use setResult to change
  const [first, setFirst] = useState('');
  const [lastOperand, setLastOperand] = useState('');
  const [second, setSecond] = useState('0');
  const [result, setResult] = useState('');

  function performIntegerOperation(first, second, operand) {
    switch (operand) {
      case 'add':
        return first + second;
      case 'sub':
        return first - second;
      case 'mul':
        return first * second;
      case 'div':
        return first / second;
      default:
        return first;
    }
  }

  // invoked when clear button is clicked
  const handleClear = () => {
    setFirst('')
    setLastOperand('')
    setSecond('0')
    setResult('')
  }

  // invoked when a digit button is clicked
  const handleDigit = (digit) => {
    setResult('')
    setSecond(second.toString().replace(/^0+/, '') + digit)
  }

  // invoked when an operand button is clicked
  const handleOperand = (operand) => {
    if(lastOperand){
      setFirst(Math.floor(performIntegerOperation(parseInt(first), parseInt(second), lastOperand)))
    } else if(result) {
      setFirst(result)
    } else {
      setFirst(second)
    }
    setLastOperand(operand)
    setSecond('0')
    setResult('')
  }

  // invoked when the equals button is clicked
  const handleEquals = () => {
    if(lastOperand){
      setResult(Math.floor(performIntegerOperation(parseInt(first), parseInt(second), lastOperand)))
    } else if(second) {
      setResult(second)
    }
    setFirst('')
    setLastOperand('')
    setSecond('')
  }

  // defines the text for the operand buttons
  const operandText = {
    add: '+',
    sub: '-',
    mul: '*',
    div: '/',
    clear: 'AC',
    equals: '='
  }

  // render the calculator page
  return (
    <Card className='shadow' style={{width: '300px'}}>
      <div className='bg-black text-white text-end p-2 h2 text-nowrap overflow-hidden '>
        <div className='bg-black text-white text-end fs-6'>
          <span data-testid="history">{first && lastOperand ? first + (operandText[lastOperand] || '') : "\u00a0"}</span>
        </div>
        <span data-testid="result">{result || second || '0'}</span>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '10px', padding: '10px'}}>

        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('7')}>7</Button>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('8')}>8</Button>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('9')}>9</Button>
        <Button className='btn btn-secondary' onClick={() => handleOperand('div')}>{operandText.div}</Button>

        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('4')}>4</Button>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('5')}>5</Button>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('6')}>6</Button>
        <Button className='btn btn-secondary' onClick={() => handleOperand('mul')}>{operandText.mul}</Button>

        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('1')}>1</Button>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('2')}>2</Button>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('3')}>3</Button>
        <Button className='btn btn-secondary' onClick={() => handleOperand('sub')}>{operandText.sub}</Button>

        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('0')}>0</Button>
        <Button className='btn btn-primary' onClick={() => handleEquals()}>{operandText.equals}</Button>
        <Button className='btn btn-danger' onClick={() => handleClear()}>{operandText.clear}</Button>
        <Button className='btn btn-secondary' onClick={() => handleOperand('add')}>{operandText.add}</Button>
      </div>
    </Card>
  )
}
```

## Running Jest in watch mode

Open your terminal and stop the React development server before you start with this module with Ctrl + C. Afterwards, run the following command from the root folder of the project:

```
cd react/calculator
npm test
```

This starts Jest in watch mode which automatically re-runs your test cases everytime you save a file in the project's folder. You should see something like this in the terminal:

```
 PASS  src/App.test.js
  CalculatorPage
    ✓ should display 0 when the calculator is opened (14 ms)
    ✓ should display 1 when the 1 button is clicked (37 ms)
    ✓ should display 3 if we press 1 + 2 = (49 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.351 s, estimated 1 s
Ran all test suites.

Watch Usage: Press w to show more.
```

## Adding a new test case

Now you are ready to start creating test cases for the component CalculatorPage. Open the src/App.test.js file. It contains initial test code that we will extend with Amazon CodeWhisperer:

```
// test cases for the calculator
describe('CalculatorPage', () => {
  test('should display 0 when the calculator is opened', () => {
    const { getByTestId } = render(<CalculatorPage />);
    const result = getByTestId('result');
    expect(result.textContent).toBe('0');
  });

  test('should display 1 when the 1 button is clicked', () => {
    const { getByRole, getByTestId } = render(<CalculatorPage />);
    fireEvent.click(getByRole('button', { name: '1' }));
    const result = getByTestId('result');
    expect(result.textContent).toBe('1');
  });

  test('should display 3 if we press 1 + 2 =', () => {
    const { getByRole, getByTestId } = render(<CalculatorPage />);
    fireEvent.click(getByRole('button', { name: '1' }));
    fireEvent.click(getByRole('button', { name: '+' }));
    fireEvent.click(getByRole('button', { name: '2' }));
    fireEvent.click(getByRole('button', { name: '=' }));
    const result = getByTestId('result');
    expect(result.textContent).toBe('3');
  });

  // <tbd> please add more test cases
});
```

Remove the comment at the end of this code block (please add more test cases) and add a test case for "2 \* 3 = 6" with the help of Amazon CodeWhisperer.

Save the file and check the test outcome in the terminal.

Hint

Add the following line and let Amazon CodeWhisperer complete the function. Close curly braces and parentheses as needed:

```
test('should display 6 if we press 2 * 3 =', () => {
```

Solution

```
test('should display 6 if we press 2 * 3 =', () => {
  const { getByRole, getByTestId } = render(<CalculatorPage />);
  fireEvent.click(getByRole('button', { name: '2' }));
  fireEvent.click(getByRole('button', { name: '*' }));
  fireEvent.click(getByRole('button', { name: '3' }));
  fireEvent.click(getByRole('button', { name: '=' }));
  const result = getByTestId('result');
  expect(result.textContent).toBe('6');
});
```

## Driving test cases from data

Following the same approach, we could easily add various other sequences with the support of Amazon CodeWhisperer. A better approach is to define the key sequences and result in a table and create test cases dynamically from that table. Can you do this with the help of Amazon CodeWhisperer?

Hint (creating the test case data)

In src/App.test.js, we create an example of how a test case should look like:

```
const testCases = [
  {
    sequence: ['1', '+', '2', '='],
    result: '3'
  },
];
```

Now, extend with new test case data using Amazon CodeWhisperer.

Hint (creating the test code)

Start a new line after the data definition, start typing "testCases." and invoke Amazon CodeWhisperer. Cycle through the suggestions and select a suitable version.

Solution

```
  const testCases = [
    {
      sequence: ['1', '+', '2', '='],
      result: '3'
    },
    {
      sequence: ['2', '*', '3', '='],
      result: '6'
    },
    {
      sequence: ['1', '+', '2', '*', '3', '='],
      result: '9'
    }
  ];

  testCases.forEach(testCase => {
    test(`should display ${testCase.result} if we press ${testCase.sequence.join(' ')}`, () => {
      const { getByRole, getByTestId } = render(<CalculatorPage />);
      testCase.sequence.forEach(button => {
        fireEvent.click(getByRole('button', { name: button }));
      });
      const result = getByTestId('result');
      expect(result.textContent).toBe(testCase.result);
    });
  });
```

## Testing the volumes calculator

We have added the data-testid attribute in our JSX code to enable effective testing. By adding data-testid to elements, we create a consistent way for testing tools to identify and test those elements, ensuring stability even with component changes.

To proceed, please copy the following code into the file src/pages/VolumesPage.js:

VolumesPage.js

```
import React, { useState } from 'react';
import { Card, Form, Image, Row, Col, Button } from 'react-bootstrap';
import { ReactDOM } from 'react-dom';

/**
 * Calculate the volume of a cube
 *
 * The function takes an object dimensions with property length, and
 * calculates the volume of the cube. It uses the formula:
 *
 * volume = length * length * length
 *
 * @param {object} dimensions with property length
 * @throws {Error} if the object does not contain a property length
 * @example calculateCubeVolume({length: 10})
 */
export function calculateCubeVolume(dimensions) {
  if (!dimensions.length) {
    throw new Error('The object does not contain a property length');
  }
  return dimensions.length * dimensions.length * dimensions.length;
}

/**
 * Calculate the volume of a sphere
 *
 * The function takes an object dimensions with property radius, and
 * calculates the volume of the sphere. It uses the formula:
 *
 * volume = 4/3 * pi * radius * radius * radius
 *
 * @param {object} dimensions with property radius
 * @throws {Error} if the object does not contain a property radius
 * @example calculateSphereVolume({radius: 10})
 */
export function calculateSphereVolume(dimensions) {
  if (!dimensions.radius) {
    throw new Error('The object does not contain a property radius');
  }
  return (4/3) * Math.PI * dimensions.radius * dimensions.radius * dimensions.radius;
}

/**
 * Calculate the volume of a cone
 *
 * The function takes an object dimensions with property radius, and
 * calculates the volume of the sphere. It uses the formula:
 *
 * volume = 1/3 * pi * radius * radius * height
 *
 * @param {object} dimensions with property radius and height
 * @throws {Error} if the object does not contain a property radius or height
 * @example calculateConeVolume({radius: 10, height: 10}
 */
export function calculateConeVolume(dimensions) {
  if (!dimensions.radius || !dimensions.height) {
    throw new Error('The object does not contain a property radius or height');
  }
  return (1/3) * Math.PI * dimensions.radius * dimensions.radius * dimensions.height;
}

/**
 * Calculate the volume of a cylinder
 *
 * The function takes an object dimensions with property radius, and
 * calculates the volume of the sphere. It uses the formula:
 *
 * volume = pi * radius * radius * height
 *
 * @param {object} dimensions with property radius and height
 * @throws {Error} if the object does not contain a property radius or height
 * @example calculateCylinderVolume({radius: 10, height: 10}
 */
export function calculateCylinderVolume(dimensions) {
  if (!dimensions.radius || !dimensions.height) {
    throw new Error('The object does not contain a property radius or height');
  }
  return Math.PI * dimensions.radius * dimensions.radius * dimensions.height;
}

/**
 * Calculate the volume of a cuboid
 *
 * The function takes an object dimensions with property radius, and
 * calculates the volume of the sphere. It uses the formula:
 *
 * volume = length * width * height
 *
 * @param {object} dimensions with property length, width, height
 * @throws {Error} if the object does not contain a property length, width, or height
 * @example calculateCuboidVolume({length: 10, width: 10, height: 10}
 */
export function calculateCuboidVolume(dimensions) {
  if (!dimensions.length || !dimensions.width || !dimensions.height) {
    throw new Error('The object does not contain a property length, width, or height');
  }
  return dimensions.length * dimensions.width * dimensions.height;
}

/**
 * Calculate the volume of a pyramid
 *
 * The function takes an object dimensions with property radius, and
 * calculates the volume of the sphere. It uses the formula:
 *
 * volume = 1/3 * length * width * height
 *
 * @param {object} dimensions with property length, width, height
 * @throws {Error} if the object does not contain a property length, width, or height
 * @example calculatePyramidVolume({length: 10, width: 10, height: 10}
 */
export function calculatePyramidVolume(dimensions) {
  if (!dimensions.length || !dimensions.width || !dimensions.height) {
    throw new Error('The object does not contain a property length, width, or height');
  }
  return (1/3) * dimensions.length * dimensions.width * dimensions.height;
}

// define list of shapes and their corresponding parameters to calculate volumes
const shapes = {
    Cube: {
      name:         'Cube',
      dimensions:   ['length'],
      formulaText:  'length * length * length',
      image:        'cube.svg',
      function:     calculateCubeVolume,
    },
    Sphere: {
      name:         'Sphere',
      dimensions:   ['radius'],
      formulaText:  '4/3 * pi * radius * radius * radius',
      image:        'sphere.svg',
      function:     calculateSphereVolume,
    },
    Cone: {
      name:         'Cone',
      dimensions:   ['radius', 'height'],
      formulaText:  '1/3 * pi * radius * radius * height',
      image:        'cone.svg',
      function:     calculateConeVolume,
    },
    Cylinder: {
      name:         'Cylinder',
      dimensions:   ['radius', 'height'],
      formulaText:  'pi * radius * radius * height',
      image:        'cylinder.svg',
      function:     calculateCylinderVolume,
    },
    Cuboid: {
      name:         'Cuboid',
      dimensions:   ['length', 'width', 'height'],
      formulaText:  'length * width * height',
      image:        'cuboid.svg',
      function:     calculateCuboidVolume,
    },
    Pyramid: {
      name:         'Pyramid',
      dimensions:   ['length', 'height'],
      formulaText:  '1/3 * length * length * height',
      image:        'pyramid.svg',
      function:     calculatePyramidVolume,
    },
  }

// default shape and dimensions for the calculator page
const defaultShape = 'Cube';
const defaultDimensions = {length: 1, height: 1, width: 1, radius: 1};

// Render the volumes calculator page. It provides a dropdown
// to select the shape and text fields to enter the dimensions.
// The result is shown at the top.
//
// example:
//   <VolumesPage />

export default function VolumesPage() {
  const [result, setResult] = useState(1);
  const [shape, setShape] = useState(defaultShape);
  const [dimensions, setDimensions] = useState({...defaultDimensions});

  // calculate the volume of the shape and update the result
  const updateResult = (shape, dimensions) => {
    try {
      const volume = shapes[shape].function(dimensions);
      setResult(volume);
    } catch (error) {
      setResult(0);
    }
  }

  // invoked when the clear button is clicked
  const handleClear = () => {
    setShape(defaultShape);
    setDimensions({...defaultDimensions});
    updateResult(defaultShape, defaultDimensions);
  }

  // invoked when the shape dropdown value has changed
  const handleChangeShape = (newShape) => {
    setShape(newShape);
    updateResult(newShape, dimensions);
  }

  // invoked if the value of a dimension has changed
  // key: the name of the dimension
  // value: the new value for the dimension
  const handleChangeDimension = (key, value) => {
    let newDimensions = {...dimensions, [key]: value};
    setDimensions(newDimensions);
    updateResult(shape, newDimensions);
  }

  // renders the volume calculator component
  return (
    <Card className='shadow' style={{width: '400px'}}>
      <Form className='m-3'>
        <Image className='position-relative start-50 translate-middle-x mx-auto mb-3' src={shapes[shape].image} style={{height: '150px'}} fluid />
        <Form.Group as={Row} className='m-3'>
          <Col sm={{ span: 10, offset: 1 }}>
            <div className='bg-black text-white text-end p-2 h2 text-nowrap overflow-hidden '>
              <div className='bg-black text-white text-end fs-6'>
                <span data-testid="formula">{shapes[shape].formulaText}</span>
              </div>
              <span data-testid="result">{result.toPrecision(6).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')}</span>
            </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='m-3'>
          <Form.Label column sm={3}>shape</Form.Label>
          <Col sm={9}>
            <Form.Control data-testid="shape-selection" as="select" value = {shape} onChange = {(event) => handleChangeShape(event.target.value)}>
              {
                Object.keys(shapes).map((key) =>
                  <option data-testid={'shape-'+key.toLowerCase()} key={key} value={key}>{shapes[key].name}</option>
                )
              }
            </Form.Control>
          </Col>
        </Form.Group>
        {
          shapes[shape].dimensions.map((key) =>
            <Form.Group as={Row} className='m-3' key={key} >
              <Form.Label column sm={3}>{key}</Form.Label>
              <Col sm={9}>
                <Form.Control data-testid={'dimension-'+key.toLowerCase()} type="number" min="0" value={dimensions[key] || 0} onChange={(event) => handleChangeDimension(key, event.target.value)} />
              </Col>
            </Form.Group>
          )
        }
        <Form.Group as={Row} className='m-3'>
          <Col sm={{ span: 9, offset: 3 }}>
            <Button onClick={() => handleClear()}>Clear</Button>
          </Col>
        </Form.Group>
      </Form>
    </Card>
  );

}
```

## Adding the first test cases manually

Now you are ready to test the component VolumesPage. Open the src/App.test.js file, and add the following code after test case for the simple calculator:

```
// test cases for the volume calculator
describe('VolumesPage', () => {
  test('should show Cube with length 1 when calculator is opened', () => {
    const { getByTestId } = render(<VolumesPage />);
    const result = getByTestId('result');
    const selection = getByTestId('shape-selection');
    const length = getByTestId('dimension-length');
    expect(selection.value).toBe('Cube');
    expect(length.value).toBe('1');
    expect(result.textContent).toBe('1');
  })

  test('should calculate Cube volume for length 2', () => {
    const { getByTestId } = render(<VolumesPage />);
    const length = getByTestId('dimension-length');
    fireEvent.change(length, { target: { value: '2' } });
    const result = getByTestId('result');
    expect(result.textContent).toBe('8');
  })
});

```

Save the changes and check the test results in the terminal

## Adding more test cases

Using Amazon CodeWhisperer, extend the code with two new test cases

- Should calculate Cube volume for length 3.
- Should show sphere with radius 1 when switching to Sphere.

Solution

```
test('should calculate Cube volume for length 3', () => {
  const { getByTestId } = render(<VolumesPage />);
  const length = getByTestId('dimension-length');
  fireEvent.change(length, { target: { value: '3' } });
  const result = getByTestId('result');
  expect(result.textContent).toBe('27');
})

test('should show sphere with radius 1 when switching to Sphere', () => {
  const { getByTestId } = render(<VolumesPage />);
  const selection = getByTestId('shape-selection');
  fireEvent.change(selection, { target: { value: 'Sphere' } });
  const radius = getByTestId('dimension-radius');
  expect(radius.value).toBe('1');
});
```

## Driving test cases from data

As with the simple calculator, define a data structure with various test cases for different shapes. Provide an example for the data structure and have Amazon CodeWhisperer produce more test cases. Then, generate the code to define the test cases from the data structure.

Hint (creating the test case data)

```
  const testCases = [
    {
      shape: 'Cube',
      dimensions: { length: '1' },
      result: '1'
    },
  ];
```

Hint (creating the test code)

In src/App.test.js, start a new line after the data definition, start typing "testCases." and invoke Amazon CodeWhisperer. Cycle through the suggestions and select a suitable version. :::

Hint (test case fails with wrong data)

The volumes calculator produces a string for the output of the result with a precision of 6. Amazon CodeWhisperer is not aware of this and may create result values with a different precision. In some cases, Amazon CodeWhisperer uses wrong assumptions about how the volumes are calculated. Amend the test case data to reflect the precision (use see the result in the test summary).

Solution

```
// test cases for the volume calculator
describe('VolumesPage', () => {
  test('should show Cube with length 1 when calculator is opened', () => {
    const { getByTestId } = render(<VolumesPage />);
    const result = getByTestId('result');
    const selection = getByTestId('shape-selection');
    const length = getByTestId('dimension-length');
    expect(selection.value).toBe('Cube');
    expect(length.value).toBe('1');
    expect(result.textContent).toBe('1');
  })

  test('should calculate Cube volume for length 2', () => {
    const { getByTestId } = render(<VolumesPage />);
    const length = getByTestId('dimension-length');
    fireEvent.change(length, { target: { value: '2' } });
    const result = getByTestId('result');
    expect(result.textContent).toBe('8');
  })

  test('should calculate Cube volume for length 3', () => {
    const { getByTestId } = render(<VolumesPage />);
    const length = getByTestId('dimension-length');
    fireEvent.change(length, { target: { value: '3' } });
    const result = getByTestId('result');
    expect(result.textContent).toBe('27');
  })

  test('should show sphere with radius 1 when switching to Sphere', () => {
    const { getByTestId } = render(<VolumesPage />);
    const selection = getByTestId('shape-selection');
    fireEvent.change(selection, { target: { value: 'Sphere' } });
    const radius = getByTestId('dimension-radius');
    expect(radius.value).toBe('1');
  });


  const testCases = [
    {
      shape: 'Cube',
      dimensions: { length: '1' },
      result: '1'
    },
    {
      shape: 'Sphere',
      dimensions: { radius: '2' },
      result: '33.5103'
    }

  ];

  testCases.forEach(testCase => {
    test(`should calculate ${testCase.shape} volume for ${testCase.dimensions}`, () => {
      const { getByTestId } = render(<VolumesPage />);
      const selection = getByTestId('shape-selection');
      fireEvent.change(selection, { target: { value: testCase.shape } });
      const dimensions = Object.keys(testCase.dimensions);
      dimensions.forEach(dimension => {
        const input = getByTestId(`dimension-${dimension}`);
        fireEvent.change(input, { target: { value: testCase.dimensions[dimension] } });
      });
      const result = getByTestId('result');
      expect(result.textContent).toBe(testCase.result);
    });

  })
});
```
