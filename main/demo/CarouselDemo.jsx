import React from 'react';
import {Carousel} from "./index.js";

export default class CarouselDemo extends React.Component {
    render() {
        let items = <div>
                        <img style={{'width': '100%'}} src="https://raw.githubusercontent.com/jerryshew/design/master/png/ambition-morty.png"/>
                        <img style={{'width': '100%'}} src="https://raw.githubusercontent.com/jerryshew/design/master/png/awkward-morty.png"/>
                        <img style={{'width': '100%'}} src="https://raw.githubusercontent.com/jerryshew/design/master/png/despise.png"/>
                        <img style={{'width': '100%'}} src="https://raw.githubusercontent.com/jerryshew/design/master/png/pride-morty.png"/>
                        <img style={{'width': '100%'}} src="https://raw.githubusercontent.com/jerryshew/design/master/png/surprise-morty.png"/>
                    </div>;

        let leftArrow = <p>left</p>;
        let rightArrow = <p>right</p>;
        return (
            <ul className="two carousel-demo">
                <li>
                    <h4>Default carousel</h4>
                    <div style={{'width': '300', 'height': '300'}}>
                        <Carousel items={items}></Carousel>
                    </div>
                </li>
                <li>
                    <h4>Auto play carousel</h4>
                    <div style={{'width': '300', 'height': '300'}}>
                        <Carousel items={items} autoPlay={true} delay={5000}></Carousel>
                    </div>
                </li>
                <li>
                    <h4>Carousel with control arrows</h4>
                    <div style={{'width': '300', 'height': '300'}}>
                        <Carousel items={items} showArrow={true}></Carousel>
                    </div>
                </li>
                <li>
                    <h4>Carousel with custom control arrows</h4>
                    <div style={{'width': '300'}}>
                        <Carousel items={items} leftArrow={leftArrow} rightArrow={rightArrow} showArrow={true}></Carousel>
                    </div>
                </li>
            </ul>
        );
    }
}
