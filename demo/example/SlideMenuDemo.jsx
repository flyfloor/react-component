import React from 'react';
import {SlideMenu} from './index.js';

export default class SlideMenuDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            slide: false,
            slide1: false,
            position1: false,
            positionTop: false,
            positionLeft: false,
            positionRight: false,
            positionBottom: false,
        };
    }

    handleCloseSlide1(){
        if (confirm('close slide?')) {
            this.setState({
                slide1: false 
            });
        }
    }

    handleOpenSlide(state){
        this.setState({
            [state.toString()]: true 
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
        let contentNode  =  <div style={{'padding': '20px'}}>
                                <h4>this is header</h4>
                                <p>this is content, where have something here, fill in</p>
                                <a href="http://braavos.me" target="_blank">blog</a>
                            </div>;

        return (
            <div>
                <h3>Slide menu</h3>
                <ol>
                    <li>
                        <h4>Default slidemenu</h4>
                        <a href="javascript:;" onClick={() => this.handleOpenSlide('slide')}>click</a>
                        <SlideMenu display={this.state.slide} onClose={this.handleAllSlideClose.bind(this)}>
                            {contentNode}
                        </SlideMenu>
                        <pre>
                            <code>
{`
<SlideMenu display={display} onClose={handleClose}>
    ...
</SlideMenu>    
`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>slide menu with position</h4>
                        <a href="javascript:;" onClick={() => this.handleOpenSlide('positionLeft')}>left</a>
                        <SlideMenu position="left" display={this.state.positionLeft} onClose={this.handleAllSlideClose.bind(this)}>
                            {contentNode}
                        </SlideMenu>
                        <pre>
                            <code>
{`
<SlideMenu position="left" display={display} onClose={handleClose}>
    ...
</SlideMenu>
`}                            
                            </code>
                        </pre>
                        <a href="javascript:;" onClick={() => this.handleOpenSlide('positionRight')}>right</a>
                        <SlideMenu position="right" display={this.state.positionRight} onClose={this.handleAllSlideClose.bind(this)}>
                            {contentNode}
                        </SlideMenu>
                        <pre>
                            <code>
{`
<SlideMenu position="right" display={display} onClose={handleClose}>
    ...
</SlideMenu>
`}                                 
                            </code>
                        </pre>
                        <a href="javascript:;" onClick={() => this.handleOpenSlide('positionTop')}>top</a>
                        <SlideMenu position="top" display={this.state.positionTop} onClose={this.handleAllSlideClose.bind(this)}>
                            {contentNode}
                        </SlideMenu>
                        <pre>
                            <code>
{`
<SlideMenu position="top" display={display} onClose={handleClose}>
    ...
</SlideMenu>
`}                                     
                            </code>
                        </pre>
                        <a href="javascript:;" onClick={() => this.handleOpenSlide('positionBottom')}>bottom</a>
                        <SlideMenu position="bottom" display={this.state.positionBottom} onClose={this.handleAllSlideClose.bind(this)}>
                            {contentNode}
                        </SlideMenu>
                        <pre>
                            <code>
{`
<SlideMenu position="bottom" display={display} onClose={handleClose}>
    ...
</SlideMenu>
`}                                   
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Width</h4>
                        <a href="javascript:;" onClick={() => this.handleOpenSlide('position1')}>click</a>
                        <SlideMenu display={this.state.position1} width={500} onClose={this.handleAllSlideClose.bind(this)}>
                            {contentNode}
                            <h4 style={{'textAlign': 'center'}}>width: 500px</h4>
                        </SlideMenu>
                        <pre>
                            <code>
{`
<SlideMenu width={500} display={display} onClose={handleClose}>
    ...
</SlideMenu>
`}                                   
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Close slidemenu action</h4>
                        <a href="javascript:;" onClick={() => this.handleOpenSlide('slide1')}>click</a>
                        <SlideMenu display={this.state.slide1} onClose={this.handleAllSlideClose.bind(this)}>
                            {contentNode}
                            <div style={{'padding': '10px'}}>
                                <h3>
                                    <a href="javascript:;" onClick={this.handleCloseSlide1.bind(this)} 
                                    style={{'color': 'red'}}>Click to close</a>
                                </h3>
                            </div>
                        </SlideMenu>
                        <pre>
                            <code>
{`
<SlideMenu width={500} display={display} onClose={handleClose}>
    ...
    <a href="javascript:;" onClick={this.setState({display: false});}
</SlideMenu>
`}                                    
                            </code>
                        </pre>
                    </li>
                </ol>
            </div>
        );
    }
}
