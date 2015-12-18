import React from 'react';
import {SlideMenu} from './index.js';

export default class SlideMenuDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            slide: false,
            slide1: false,
            slideTop: false,
            slideLeft: false,
            slideRight: false,
            slideBottom: false,
        }
    }

    handleCloseSlide1(){
        if (confirm('close slide?')) {
            this.setState({
                slide1: false 
            });
        }
    }

    handleOpenSlide(){
        this.setState({
            slide: true 
        });
    }

    handleAllSlideClose(){
        this.setState({
            slide: false,
            slide1: false,
            slideTop: false,
            slideLeft: false,
            slideRight: false,
            slideBottom: false 
        });
    }


    render() {
        return (
            <ol>
                <li>
                    <h4>default slide menu</h4>
                    <a href="javascript:;" onClick={this.handleOpenSlide.bind(this)}>open slide menu</a>
                    <SlideMenu display={this.state.slide} onSlideClose={this.handleAllSlideClose.bind(this)}>
                        <h4>this is header</h4>
                        <p>this is content, where have something here, fill in</p>
                        <a href="http://baidu.com">baidu</a>
                    </SlideMenu>
                </li>
                {
                    /*
                        <li>
                            <h4>slide menu with position</h4>
                            <a href="javascript:;">left</a>
                            <SlideMenu position="left" display={this.state.slideLeft}>
                                <h4>this is header</h4>
                                <p>this is content, where have something here, fill in</p>
                                <a href="http://baidu.com">baidu</a>
                            </SlideMenu>
                            <a href="javascript:;">right</a>
                            <SlideMenu position="right" display={this.state.slideRight}>
                                <h4>this is header</h4>
                                <p>this is content, where have something here, fill in</p>
                                <a href="http://baidu.com">baidu</a>
                            </SlideMenu>
                            <a href="javascript:;">top</a>
                            <SlideMenu position="top" display={this.state.slideTop}>
                                <h4>this is header</h4>
                                <p>this is content, where have something here, fill in</p>
                                <a href="http://baidu.com">baidu</a>
                            </SlideMenu>
                            <a href="javascript:;">bottom</a>
                            <SlideMenu position="bottom" display={this.state.slideBottom}>
                                <h4>this is header</h4>
                                <p>this is content, where have something here, fill in</p>
                                <a href="http://baidu.com">baidu</a>
                            </SlideMenu>
                        </li>
                        <li>
                            <h4>with close slide menu action</h4>
                            <a href="javascript:;">close slide</a>
                            <SlideMenu display={this.state.slide1}>
                                <h4>this is header</h4>
                                <p>this is content, where have something here, fill in</p>
                                <a href="http://baidu.com">baidu</a>
                                <a href="javascript:;" onClick={this.handleCloseSlide1.bind(this)}>close this slide</a>
                            </SlideMenu>
                        </li>
                    */
                }
            </ol>
        );
    }
}
