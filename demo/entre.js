import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

import resetCss from './css/reset.less';
import demoCss from './css/demo.less';
import carousel_css from './css/carousel.less';
import carousel_demo_css from './css/carousel_demo.less';
import popup_css from './css/popup.less';
import dropdown_css from './css/dropdown.less';
import menu_css from "./css/menu.less";
import menu_demo_css from './css/menu_demo.less';
import modal_css from './css/modal.less';
import pin_css from './css/pin.less';
import pin_demo_css from './css/pin_demo.less';
import tab_css from './css/tab.less';
import slidemenu_css from './css/slide-menu.less';
import pagination_css from './css/pagination.less';
import timepicker_css from './css/time-picker.less';
import datepicker_css from './css/date-picker.less';

import Pin from '../component/Pin';

import CheckBoxDemo from "./example/CheckBoxDemo.jsx";
import RadioDemo from "./example/RadioDemo.jsx";
import RadioGroupDemo from "./example/RadioGroupDemo.jsx";
import CheckBoxGroupDemo from "./example/CheckBoxGroupDemo.jsx";
import DropDownDemo from "./example/DropDownDemo.jsx";
import MenuDemo from "./example/MenuDemo.jsx";
import ConfirmBoxDemo from "./example/ConfirmBoxDemo.jsx";
import TooltipDemo from "./example/TooltipDemo.jsx";
import ModalDemo from "./example/ModalDemo.jsx";
import TabDemo from "./example/TabDemo.jsx";
import PinDemo from "./example/PinDemo.jsx";
import CarouselDemo from "./example/CarouselDemo.jsx";
import PaginationDemo from "./example/PaginationDemo.jsx";
import SlideMenuDemo from "./example/SlideMenuDemo.jsx";
import TimeInputDemo from "./example/TimeInputDemo.jsx";
import DatePickerDemo from "./example/DatePickerDemo.jsx";
import CalenderDemo from "./example/CalenderDemo.jsx";

class Nav extends React.Component {
    render(){
        const props = this.props;
        return (
            <Pin className="demo-nav">
                <ul>
                    <li><h4><NavLink to="/checkbox">checkbox</NavLink></h4></li>
                    <li><h4><NavLink to="/radio">radio</NavLink></h4></li>
                    <li><h4><NavLink to="/radio-group">radio group</NavLink></h4></li>
                    <li><h4><NavLink to="/checkbox-group">checkbox group</NavLink></h4></li>
                    <li><h4><NavLink to="/dropdown">drop down</NavLink></h4></li>
                    <li><h4><NavLink to="/menu">menu</NavLink></h4></li>
                    <li><h4><NavLink to="/confirm-box">confirm box</NavLink></h4></li>
                    <li><h4><NavLink to="/tooltip">tooltip</NavLink></h4></li>
                    <li><h4><NavLink to="/modal">modal</NavLink></h4></li>
                    <li><h4><NavLink to="/tab">tab</NavLink></h4></li>
                    <li><h4><NavLink to="/pin">pin</NavLink></h4></li>
                    <li><h4><NavLink to="/carousel">carousel</NavLink></h4></li>
                    <li><h4><NavLink to="/pagination">pagination</NavLink></h4></li>
                    <li><h4><NavLink to="/slide-menu">slide menu</NavLink></h4></li>
                    <li><h4><NavLink to="/time-input">time input</NavLink></h4></li>
                    <li><h4><NavLink to="/date-picker">date picker</NavLink></h4></li>
                    <li><h4><NavLink to="/calender">calender</NavLink></h4></li>
                </ul>
            </Pin>
        );
    }
}

const NavLink = (props) => {
    return (
        <Link {...props} activeClassName="active"></Link>
    );
}

class App extends React.Component {
    render() {
        return ( 
            <div>
                <div className="header">
                    <div className="container">
                        <h1><a href="http://imiao.in">React Component</a></h1>
                        <div className="table">
                            <div className="row">
                                <div className="cell">
                                    <blockquote>Some basic component, <b>barely no css</b>, <b>build with ReactJs</b></blockquote> 
                                </div>
                                <div className="cell">
                                    <span>
                                        <a target="_blank" href="http://braavos.me">落在深海</a>
                                    </span>
                                    <span><a target="_blank" href="http://github.com/jerryshew/react-component">Github repo</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" id="demo_list">
                    <Nav/>
                    <div className="children">
                        {this.props.children}
                    </div>
                </div>
                <div className="footer center container">
                    <a href="http://braavos.me" target="_blank">@落在深海</a>
                </div>
            </div>
        );
    }
}


ReactDOM.render(<Router history={hashHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={CheckBoxDemo}></IndexRoute>
                        <Route path="/checkbox" component={CheckBoxDemo}/>
                        <Route path="/checkbox-group" component={CheckBoxGroupDemo}/>
                        <Route path="/radio" component={RadioDemo}/>
                        <Route path="/radio-group" component={RadioGroupDemo}/>
                        <Route path="/dropdown" component={DropDownDemo}/>
                        <Route path="/menu" component={MenuDemo}/>
                        <Route path="/confirm-box" component={ConfirmBoxDemo}/>
                        <Route path="/tooltip" component={TooltipDemo}/>
                        <Route path="/modal" component={ModalDemo}/>
                        <Route path="/tab" component={TabDemo}/>
                        <Route path="/pin" component={PinDemo}/>
                        <Route path="/carousel" component={CarouselDemo}/>
                        <Route path="/pagination" component={PaginationDemo}/>
                        <Route path="/slide-menu" component={SlideMenuDemo}/>
                        <Route path="/time-input" component={TimeInputDemo}/>
                        <Route path="/date-picker" component={DatePickerDemo}/>
                        <Route path="/calender" component={CalenderDemo}/>
                    </Route>
                </Router> , document.getElementById('root'));
