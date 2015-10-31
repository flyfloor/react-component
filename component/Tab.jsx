import css from '../css/tab.less';

import Item from './Item.jsx';

export default class Tab extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            index: this.props.selectedIndex,
        }
    }

    handleItemClick(index){
        if (typeof this.props.onSelect === 'function') this.props.onSelect(index);
        this.setState({
            index: index, 
        });
    }

    makeTabItems(content){
        const NODES = content.props.children,
            INDEX = this.state.index;
        let itemNodes = [];
        if (NODES instanceof Array) {
            itemNodes = NODES.map((node, index) => {
                return <Item key={index} selected={ index == INDEX } itemIndex={index} onItemClick={this.handleItemClick.bind(this)}>{node.props.children}</Item>;
            })
        }
        return itemNodes;
    }

    render() {
        let content = this.makeTabItems(this.props.items);
        return (
            <div className={'ui tab ' + this.props.position}>
                {content}
            </div>
        );
    }
}


Tab.defaultProps = {
    selectedIndex: 0,
    position: 'top',
}

Tab.Item = Item;
