# Brastlewark

### Web application made with React using Typescript and Hooks, allows to view and filter citizens as well as seeing their details.

I tried to use as few external libraries as possible, only using TailwindCSS for helper classes.

### Implementation details

The infinite scroll is a custom component based on IntersectionObserver.\
The gender detection is calculated by the last vocal of their first name.\
I decided to use Context hooks instead of Redux since its the new way to manage the application state and a lot of developers seems to prefer it, personally i have mixed feelings.\
Implemented a Story for all visual components\
Coverage at 100% in most components

<p align="center" >
  <img src="documents/library.png" alt="Library" />
</p>

<p align="center" >
  <img src="documents/details.png" alt="Details" />
</p>

## High level specifications

<ul>
<li>
Retrieve data from the URL provided. It is provided as an static json, but assume it might change randomly.
</li>
<li>
Show this data in the most user-friendly way you could think. Keep in mind our heroes will be quite busy dealing with Ores, so the app has to be really simple and easy to use. At least, it would be good to quickly browse (and even filter) all the individuals and be able to see the details of each one. 
</li>
</ul>

### Additional details

<ul>
<li>Be creative!</li> <li>UI must not blocked by network connections or long operations.</li> <li>Images coming from network should cached to improve performance.</li> <li>Snappiness & responsiveness over sluggishness & idleness.</li> <li>Use the framework you feel more comfortable using.</li> <li>Make visible the use of HTML & CSS.</li> <li>ES6 is highly recommended.</li> <li>Add minimum tests to the app.</li> <li>We expect to have a minimum documentation on a README file. We need to know what have you done and how to run your app. Also, if you have taken any decision or could not meet any of requirements, please explain it to us!</li> <li>Use github or any source control tool. It would be great if we can see incremental steps.</li> <li>Determine gender of gnomes (just joking on this one but feel free to make your guess) </li>
</ul>

<br>

## Starting the project

If you just want to test the application, you can go to [https://aaronhernandezperez.github.io/](https://aaronhernandezperez.github.io/)

To install locally follow the next steps

Install dependencies

```
yarn
```

Runs the app on [http://localhost:3000](http://localhost:3000)

```

yarn start

```

Launches the test runner in the interactive watch mode.See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```

yarn test

```

Generates the coverage report, most of the components are at 100%

```

yarn coverage

```

Launches the storybook browser on [http://localhost:6006/](http://localhost:6006/), you can checkout the components without having to run the app

```

yarn storybook

```

<p align="center" >
  <img src="documents/storybook.png" alt="Storybook" />
</p>
