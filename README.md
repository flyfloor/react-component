# react-component

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

#### the hierarchy

```
├── component
│   ├── mixin
│   ├── util
├── css //basic style of component demos
├── demo.html // demo page
├── dist 
├── main //include demo component

```

#### how to use  

simply import as a module, then use it. just like:

```javascript
import {Tooltip} from 'react-ui-component';
```

to use basic css:  

```
import style from 'react-ui-component/css/all.less';
```
or just use simple component css:

```
import pagination_css from 'react-ui-component/css/pagination.less'
```


> hint: only have basic style, need to write custom styles.

