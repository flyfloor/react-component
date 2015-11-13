import React from 'react';

import {Carousel} from "./index.js";

export default class CheckBoxDemo extends React.Component {
    render() {
        let items = <div>
                        <Carousel.Item key='0'>
                            <img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png"/>
                        </Carousel.Item>
                        <Carousel.Item key='1'>
                            <img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png"/>
                        </Carousel.Item>
                        <Carousel.Item key='2'>
                            <img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png"/>
                        </Carousel.Item>
                        <Carousel.Item key='3'>
                            <img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png"/>
                        </Carousel.Item>
                    </div>
        return (
            <ol>
                <li>
                    <h4>carousel</h4>
                    <Carousel items={items}></Carousel>
                </li>
            </ol>
        );
    }
}
