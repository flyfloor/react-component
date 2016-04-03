import React from 'react';
import {Carousel} from "./index.js";

const src = ['ambition-morty', 'awkward-morty', 'despise', 'pride-morty', 'surprise-morty'];
const prefix = 'https://raw.githubusercontent.com/jerryshew/design/master/png';
const getImgs = function(){
    let rtn = [];
    for (let i of src){
        rtn.push(<img key={i} src={`${prefix}/${i}.png`} style={{'width': '100%'}}/>);
    }
    return rtn;
};

const imgNodes = getImgs();

export default class CarouselDemo extends React.Component {
    render() {
        let items = [];

        let prev = <h4>&lt;&lt;</h4>;
        let next = <h4>&gt;&gt;</h4>;
        return (
            <div>
                <h3>Carousel</h3>
                <ul className="two carousel-demo">
                    <li>
                        <h4>Default carousel</h4>
                        <Carousel>{imgNodes}</Carousel>
                    </li>
                    <li>
                        <h4>Auto play carousel</h4>
                        <Carousel autoPlay={true} delay={5000}>
                            {imgNodes}
                        </Carousel>
                    </li>
                    <li>
                        <h4>Carousel with control arrows</h4>
                        <Carousel showArrow={true}>
                            {imgNodes}
                        </Carousel>
                    </li>
                    <li>
                        <h4>Carousel custom control arrows</h4>
                        <Carousel prev={prev} next={next} showArrow={true}>
                            {imgNodes}
                        </Carousel>
                    </li>
                </ul>
            </div>
        );
    }
}
