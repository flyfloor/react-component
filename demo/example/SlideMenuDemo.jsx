import React from 'react';
import {SlideMenu} from './index.js';

export default class SlideMenuDemo extends React.Component {
    constructor(props){
        super(props);
    }

    handleClose(){
        return confirm('close slide?')
    }

    handleOpenSlide(ref){
        const node = this.refs[ref]
        node.open()
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
                <pre>
                    <code>onClose need a return value(Boolean), to decide whether close slide menu</code>
                </pre>
                <ol>
                    <li>
                        <h4>Default slidemenu</h4>
                        <button onClick={this.handleOpenSlide.bind(this, 'slide0')}>click</button>
                        <SlideMenu ref="slide0" >
                            {contentNode}
                        </SlideMenu>
                        <pre>
                            <code>
{`
<button onClick={this.refs.slide.open}>click</button>
<SlideMenu ref="slide">
    ...
</SlideMenu>    
`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>slide menu with position</h4>
                        <button onClick={this.handleOpenSlide.bind(this, 'slide1')}>click</button>
                        <SlideMenu position="left" ref="slide1" >
                            {contentNode}
                        </SlideMenu>
                        <pre>
                            <code>
{`
<SlideMenu position="left" ref="slide">
    ...
</SlideMenu>    
`}                             
                            </code>
                        </pre>
                        <button onClick={this.handleOpenSlide.bind(this, 'slide2')}>click</button>
                        <SlideMenu position="right" ref="slide2" >
                            {contentNode}
                        </SlideMenu>
                        <pre>
                            <code>
{`
<SlideMenu position="right" ref="slide">
    ...
</SlideMenu>    
`}                             
                            </code>
                        </pre>
                        <button onClick={this.handleOpenSlide.bind(this, 'slide3')}>click</button>
                        <SlideMenu position="top" ref="slide3" >
                            {contentNode}
                        </SlideMenu>
                        <pre>
                            <code>
{`
<SlideMenu position="top" ref="slide">
    ...
</SlideMenu>    
`}                             
                            </code>
                        </pre>
                        <button onClick={this.handleOpenSlide.bind(this, 'slide4')}>click</button>
                        <SlideMenu position="bottom" ref="slide4" >
                            {contentNode}
                        </SlideMenu>
                        <pre>
                            <code>
{`
<SlideMenu position="bottom" ref="slide">
    ...
</SlideMenu>    
`}                             
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Width</h4>
                        <button onClick={this.handleOpenSlide.bind(this, 'slide5')}>click</button>
                        <SlideMenu ref="slide5" width={500}>
                            {contentNode}
                            <h4 style={{'textAlign': 'center'}}>width: 500px</h4>
                        </SlideMenu>
                        <pre>
                            <code>
{`
<SlideMenu ref="slide" width={500}>
    ...
</SlideMenu>
`}                                   
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Close slidemenu action</h4>
                        <button onClick={this.handleOpenSlide.bind(this, 'slide6')}>click</button>
                        <SlideMenu ref="slide6" onClose={this.handleClose.bind(this)}>
                            {contentNode}
                            <div style={{'padding': '10px'}}>
                                <h3>
                                    <button onClick={() => {this.refs.slide6.close()}}>
                                        Click to close
                                    </button>
                                </h3>
                            </div>
                        </SlideMenu>
                        <pre>
                            <code>
{`
<SlideMenu ref="slide" onClose={closeFunc}>
    ...
    <button onClick={this.refs.slide.close}>click to close</button>
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
