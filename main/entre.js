import React from 'react';
import ReactDOM from 'react-dom';
import resetCss from './css/reset.less';
import demoCss from './css/demo.less';
import carousel_css from './css/carousel.less';
import popup_css from './css/popup.less';
import draggable_css from './css/draggable.less';
import dropdown_css from './css/dropdown.less';
import menu_css from "./css/menu.less";
import modal_css from './css/modal.less';
import pin_css from './css/pin.less';
import tab_css from './css/tab.less';
import slidemenu_css from './css/slide-menu.less';
import pagination_css from './css/pagination.less';

import CheckBoxDemo from "./demo/CheckBoxDemo.jsx";
import RadioDemo from "./demo/RadioDemo.jsx";
import RadioGroupDemo from "./demo/RadioGroupDemo.jsx";
import CheckBoxGroupDemo from "./demo/CheckBoxGroupDemo.jsx";
import DropDownDemo from "./demo/DropDownDemo.jsx";
import MenuDemo from "./demo/MenuDemo.jsx";
import ConfirmBoxDemo from "./demo/ConfirmBoxDemo.jsx";
import TooltipDemo from "./demo/TooltipDemo.jsx";
import ModalDemo from "./demo/ModalDemo.jsx";
import TabDemo from "./demo/TabDemo.jsx";
import PinDemo from "./demo/PinDemo.jsx";
import DraggableDemo from "./demo/DraggableDemo.jsx";
import CarouselDemo from "./demo/CarouselDemo.jsx";
import PaginationDemo from "./demo/PaginationDemo.jsx";
import SlideMenuDemo from "./demo/SlideMenuDemo.jsx";

class Demo extends React.Component {
    render() {
        return ( 
            <div>
                <div className="header">
                    <div className="container">
                        <h2>React Component</h2>
                        <blockquote>Some basic component,<b>barely no css</b>, <b>build with ReactJs</b></blockquote> 
                        <ul>
                            <li>Auther: <a target="_blank" href="http://braavos.me">落在深海</a></li>
                            <li>Github repo: <a target="_blank" href="http://github.com/jerryshew/react-component">react-component</a></li>
                            <li>Npm: <a href="https://www.npmjs.com/package/react-ui-component" target="_blank">react-ui-component</a></li>
                            <li>Group: <a target="_blank" href="http://wecatch.me">wecatch</a></li>
                        </ul>
                    </div>
                </div>
                <div className="wrapper">
                    <ol className="container">
                        <li>
                            <h3>checkbox</h3>
                            <CheckBoxDemo/>
                        </li>
                        <li>
                            <h3>radio</h3>
                            <RadioDemo/>
                        </li>
                        <li>
                            <h3>radio group</h3>
                            <RadioGroupDemo/>
                        </li>
                        <li>
                            <h3>checkbox group</h3>
                            <CheckBoxGroupDemo/>
                        </li>
                        <li>
                            <h3>drop down</h3>
                            <DropDownDemo/>
                        </li>
                        <li>
                            <h3>menu</h3>
                            <MenuDemo/>
                        </li>
                        <li>
                            <h3>confirm box</h3>
                            <ConfirmBoxDemo/>
                        </li>
                        <li>
                            <h3>tooltip</h3>
                            <TooltipDemo/>
                        </li>
                        <li>
                            <h3>modal</h3>
                            <ModalDemo/>
                        </li>
                        <li>
                            <h3>tab</h3>
                            <TabDemo/>
                        </li>
                        <li>
                            <h3>pin, something fixed position</h3>
                            <PinDemo/>
                        </li>
                        <li>
                            <h3>something can drag</h3>
                            <DraggableDemo/>
                        </li>
                        <li>
                            <h3>carousel</h3>
                            <CarouselDemo/>
                        </li>
                        <li>
                            <h3>pagination</h3>
                            <PaginationDemo/>
                        </li>
                        <li>
                            <h3>slide bar</h3>
                            <SlideMenuDemo/>
                        </li>
                    </ol>
                </div>
            </div>
        );
    }
}


ReactDOM.render(<Demo/> , document.getElementById('root'));
