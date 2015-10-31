import {Tab} from './index.js';

export default class TabDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index1: 1,
        }
    }
    displayChange(index){
        this.setState({
            index: index 
        });
    }

    render() {
        const items  =  <div>
                            <Tab.Item key='0'>
                                <a href="javascript:;">first</a>
                            </Tab.Item>
                            <Tab.Item key='1'>
                                <a href="javascript:;">second</a>
                            </Tab.Item>
                            <Tab.Item key='2'>
                                <a target='_blank' href="http://www.baidu.com">third</a>
                            </Tab.Item>
                            <Tab.Item key='3'>
                                <a href="javascript:;">
                                    fourth
                                    <i>^_^</i>
                                </a>
                            </Tab.Item>
                        </div>;


        return (
            <ol>
                <li>
                    <h4>tab</h4>
                    <p>you selected item index is {this.state.index}</p>
                    <Tab onSelect={this.displayChange.bind(this)} selectedIndex={this.state.index} items={items}/>
                </li>
                <li>
                    <h4>tab with selectedIndex</h4>
                    <Tab selectedIndex={this.state.index1} items={items}/>
                </li>
                <li>
                    <h4>tabs with position</h4>
                    <Tab items={items} position='left'/>
                    <Tab items={items} position='right'/>
                    <Tab items={items} position='top'/>
                    <Tab items={items} position='bottom'/>
                </li>
            </ol>
        );
    }
}
