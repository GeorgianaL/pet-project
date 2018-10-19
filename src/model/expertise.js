import { getRandomColor } from '../lib';
import d3Icon from '../../public/d3.png';
import lodashIcon from '../../public/lodash.png';
import momentjs from '../../public/momentjs.png';
import redux from '../../public/redux.png';
import expressjs from '../../public/expressJS.png';
import react from '../../public/react.png';
import mongodb from '../../public/mongo-db.png';
import nodejs from '../../public/nodejs.png';
import HTML from '../../public/HTML.png';
import css from '../../public/css.png';
import javascript from '../../public/js.jpg';
import graphql from '../../public/graphql.png';
import sass from '../../public/sass.png';
import github from '../../public/github.png';
import webpack from '../../public/webpack.svg';

const data = [
  {
    cat: 'library',
    name: 'D3',
    value: 40,
		icon: d3Icon,
		desc: `
			D3.js (or just D3 for Data-Driven Documents) is a JavaScript library for
			producing dynamic, interactive data visualizations in web browsers.
			It makes use of the widely implemented SVG, HTML5, and CSS standards.<br>
			This infographic you are viewing is made with D3.
		`,
    color: getRandomColor(),
  },
  {
    cat: 'library',
    name: 'Lodash',
    value: 30,
		icon: lodashIcon,
		desc: `
			Lodash is a JavaScript library which provides <strong>utility functions</strong> for
			common programming tasks using the functional programming paradigm.`,
    color: getRandomColor(),
  },
  {
    cat: 'library', name: 'Moment JS', value: 30,
		icon: momentjs,
		desc: `
			Handy and resourceful JavaScript library to parse, validate, manipulate, and display dates and times.
		`,
    color: getRandomColor(),
  },
  {
			cat: 'library', name: 'Redux', value: 40,
			icon: redux,
			desc: `
				Redux is an open-source JavaScript library designed for managing
				application state. It is primarily used together with React for building user interfaces.
				Redux is inspired by Facebook’s Flux and influenced by functional programming language Elm.
			`,
      color: getRandomColor(),
		},
    {
			cat: 'framework', name: 'ExpressJS', value: 50,
			icon: expressjs,
			desc: `
				Express.js, or simply Express, is a JavaScript framework designed for building web applications and APIs.
				It is the de facto server framework for Node.js.
			`,
      color: getRandomColor(),
		},
    {
			cat: 'library', name: 'ReactJS', value: 40,
			icon: react,
			desc: `
				React (sometimes written React.js or ReactJS) is an open-source JavaScript framework maintained by Facebook for building user interfaces.
				React processes only user interface in applications and can be used in combination with other JavaScript libraries
				or frameworks such as Redux, Flux, Backbone...
			`,
      color: getRandomColor(),
		},
    {
			cat: 'database', name: 'MongoDB', value: 40,
			icon: mongodb,
			desc: `
				The de-facto Database solution for JavaScript and Node.js applications. It is a light weight,
				high performance NoSQL database and can be used for small and large websites.
			`,
      color: getRandomColor(),
		}, {
			cat: 'language', name: 'NodeJS', value: 40,
			icon: nodejs,
			desc: `
				Node.js is a cross-platform JavaScript runtime environment.
				Node.js allows creation of high performance and high concurrency websites with smaller footprint compared to
				other server-side solution. Node.js ecosystem is growing very fast and is trusted by a lot of big companies who
				are adopting it to enhance current products as well as for new ones.
			`,
      color: getRandomColor(),
		},
    {
			cat: 'language', name: 'HTML5', value: 50,
			icon: HTML,
			desc: `
				HTML is the standard markup language for creating Web pages.
			`,
      color: getRandomColor(),
		},
    {
      cat: 'language', name: 'CSS3', value: 50,
      icon: css,
      desc: `
      CSS stands for Cascading Style Sheets and it describes how HTML elements are to be displayed
       on screen, paper, or in other media.
      `,
      color: getRandomColor(),
    },
    {
			cat: 'language', name: 'JavaScript', value: 50,
			icon: javascript,
			desc: `
				JavaScript is the heart of modern Web front end development and essential element of any Single Page
				Applications. In Nau, we invest a good deal in training developers to have good control of this universal language
				and now caplable of developing full stack websites with only JavaScript.
			`,
      color: getRandomColor(),
		},
    {
			cat: 'language', name: 'GraphQL', value: 50,
			icon: graphql,
			desc: `
				GraphQL is a data query language developed by Facebook publicly released in 2015.
				It provides an alternative to REST and ad-hoc webservice architectures. In combination
				with RelayJS, this combo help us reduce the time to develop web apps for weeks.
			`,
      color: getRandomColor(),
		},
    {
			cat: 'language', name: 'SASS', value: 50,
			icon: sass,
			desc: `
				This is our main CSS preprocessor language helping us lay structured foundation to CSS as well
				as assisting on writing more convenient BEM anotations.
			`,
      color: getRandomColor(),
		},
    {
			cat: 'workflow', name: 'Gitflow Workflow', value: 30,
			icon: github,
			desc: `
				Our code version control tool is Git, and Gitflow is one of its workflow standard which
				ensure good collaboration and avoid conflict-resolving efforts. For more info, visit: code.naustud.io
			`,
      color: getRandomColor(),
		},
    {
			cat: 'workflow', name: 'Webpack', value: 30,
			icon: webpack,
			desc: `
				A module bundler library that is becoming de-facto tool to use in ReactJS or SPA apps nowadays.
			`,
      color: getRandomColor(),
		},
];

export default data;
