import React from 'react';
import {Carousel} from "./index.js";

export default class CheckBoxDemo extends React.Component {
    render() {
        let items = <div>
                        <Carousel.Item key='0'>
                            <img src="https://raw.githubusercontent.com/jerryshew/design/master/png/ambition-morty.png"/>
                        </Carousel.Item>
                        <Carousel.Item key='1'>
                            <img src="https://raw.githubusercontent.com/jerryshew/design/master/png/awkward-morty.png"/>
                        </Carousel.Item>
                        <Carousel.Item key='2'>
                            <img src="https://raw.githubusercontent.com/jerryshew/design/master/png/despise.png"/>
                        </Carousel.Item>
                        <Carousel.Item key='3'>
                            <img src="https://raw.githubusercontent.com/jerryshew/design/master/png/pride-morty.png"/>
                        </Carousel.Item>
                        <Carousel.Item key='4'>
                            <img src="https://raw.githubusercontent.com/jerryshew/design/master/png/surprise-morty.png"/>
                        </Carousel.Item>
                    </div>;
        return (
            <ol style={{'width': '600'}}>
                <li>
                    <h4>carousel</h4>
                    <Carousel items={items} index='1'></Carousel>
                </li>
            </ol>
        );
    }
}
