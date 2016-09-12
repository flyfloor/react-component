# react-component

[![Build Status](https://travis-ci.org/jerryshew/react-component.svg?branch=master)](https://travis-ci.org/jerryshew/react-component)
[![Downloads](https://img.shields.io/npm/dt/react-ui-component.svg)](https://www.npmjs.com/package/react-ui-component)
[![Version](https://img.shields.io/npm/v/react-ui-component.svg)](https://www.npmjs.com/package/react-ui-component)

>some everyday use component built with reactjs.

### Demo

[demo](http://imiao.in)

 
### Components
 
* checkbox
* radio
* checkbox group
* radio group
* drop down(single | multi | search)
* menu
* confirm box
* tooltip
* modal
* tab
* pin
* carousel
* pagination
* slide menu
* time picker  
* date picker  
* calender
* progress
* message
* notice

### Getting Started

#### install

install with npm

```
npm install react-ui-component
```

or install the latest version from github

```
npm install https://github.com/jerryshew/react-component
```

#### with:

* ReactJs
* ES6 syntax
* Webpack

#### Directory hierarchy

```
├── __test__ // test
├── component
│   ├── mixin
│   ├── util
│   ...
├── lib // babel transformed dist
├── css //basic style of component demos
├── index.html // demo page
├── demo // demo page
├── dist // demo build dist 

```

#### how to use  

simply import as a module. just like:

```javascript
import {Tooltip} from 'react-ui-component'
```

or  
```javascript
const Tooltip = require('react-ui-component').Tooltip
```

#### to use basic css:  

```
import style from 'react-ui-component/css/all.less';
```
or just use single component css:

```
import pagination_css from 'react-ui-component/css/pagination.less'
```

> hint: only have basic style, need to write custom styles.


#### Fork repo, first you need to install cross-env, eslint, babel global. 
