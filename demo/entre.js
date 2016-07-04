import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import css from './css/demo.less';

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
import ProgressDemo from "./example/ProgressDemo.jsx";
import MessageDemo from "./example/MessageDemo.jsx";
import NoticeDemo from "./example/NoticeDemo.jsx";

class Nav extends React.Component {
    render(){
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
                    <li><h4><NavLink to="/progress">progress</NavLink></h4></li>
                    <li><h4><NavLink to="/message">message</NavLink></h4></li>
                    <li><h4><NavLink to="/notice">notice</NavLink></h4></li>
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
                                    <span><a target="_blank" href="http://github.com/jerryshew/react-component">Github</a></span>
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
                        <Route path="/progress" component={ProgressDemo}/>
                        <Route path="/message" component={MessageDemo}/>
                        <Route path="/notice" component={NoticeDemo}/>
                    </Route>
                </Router> , document.getElementById('root'));
