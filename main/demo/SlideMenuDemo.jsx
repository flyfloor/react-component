import React from 'react';
import {SlideMenu, Data} from './index.js';

export default class SlideMenuDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            slide: false,
            slide1: false,
            positionTop: false,
            positionLeft: false,
            positionRight: false,
            positionBottom: false,
        }
    }

    handleCloseSlide1(){
        if (confirm('close slide?')) {
            this.setState({
                slide1: false 
            });
        }
    }

    handleOpenSlide(e){
        let value = Data.getData(e.target, 'state');
        console.log(value)
        this.setState({
            [value.toString()]: true 
        });
    }

    handleAllSlideClose(){
        this.setState({
            slide: false,
            slide1: false,
            positionTop: false,
            positionLeft: false,
            positionRight: false,
            positionBottom: false 
        });
    }


    render() {
        return (
            <ol>
                <li>
                    <h4>default slide menu</h4>
                    <a href="javascript:;" onClick={this.handleOpenSlide.bind(this)} data-state="slide">open slide menu</a>
                    <SlideMenu display={this.state.slide} onSlideClose={this.handleAllSlideClose.bind(this)}>
                        <h4>this is header</h4>
                        <p>this is content, where have something here, fill in</p>
                        <a href="http://braavos.me" target="_blank">落在深海</a>
                    </SlideMenu>
                </li>
                    <li>
                        <h4>slide menu with position</h4>
                        <a href="javascript:;" onClick={this.handleOpenSlide.bind(this)} data-state="positionLeft">left</a>
                        <SlideMenu position="left" display={this.state.positionLeft} onSlideClose={this.handleAllSlideClose.bind(this)}>
                            <h4>this is header</h4>
                            <p>this is content, where have something here, fill in</p>
                            <a href="http://braavos.me" target="_blank">落在深海</a>
                        </SlideMenu>
                        <a href="javascript:;" onClick={this.handleOpenSlide.bind(this)} data-state="positionRight">right</a>
                        <SlideMenu position="right" display={this.state.positionRight} onSlideClose={this.handleAllSlideClose.bind(this)}>
                            <h4>this is header</h4>
                            <p>this is content, where have something here, fill in</p>
                            <a href="http://braavos.me" target="_blank">落在深海</a>
                        </SlideMenu>
                        <a href="javascript:;" onClick={this.handleOpenSlide.bind(this)} data-state="positionTop">top</a>
                        <SlideMenu position="top" display={this.state.positionTop} onSlideClose={this.handleAllSlideClose.bind(this)}>
                            <h4>this is header</h4>
                            <p>this is content, where have something here, fill in</p>
                            <a href="http://braavos.me" target="_blank">落在深海</a>
                        </SlideMenu>
                        <a href="javascript:;" onClick={this.handleOpenSlide.bind(this)} data-state="positionBottom">bottom</a>
                        <SlideMenu position="bottom" display={this.state.positionBottom} onSlideClose={this.handleAllSlideClose.bind(this)}>
                            <h4>this is header</h4>
                            <p>this is content, where have something here, fill in</p>
                            <a href="http://braavos.me" target="_blank">落在深海</a>
                        </SlideMenu>
                    </li>
                    <li>
                        <h4>with close slide menu action</h4>
                        <a href="javascript:;" onClick={this.handleOpenSlide.bind(this)} data-state="slide1">open slide</a>
                        <SlideMenu display={this.state.slide1} >
                            <h4>this is header</h4>
                            <p>this is content, where have something here, fill in</p>
                            <a href="http://braavos.me" target="_blank">落在深海</a>
                            <br/>
                            <a href="javascript:;" onClick={this.handleCloseSlide1.bind(this)}>close this slide</a>
                        </SlideMenu>
                    </li>
            </ol>
        );
    }
}
