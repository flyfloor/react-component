import {Draggable} from './index.js';

export default class DraggableDemo extends React.Component {
    render() {
        return (
            <Draggable>
                <div style={{'width': '300', 'padding': '10', 'border': '1px solid #222', 'background': '#fff'}}>
                    <h4>title</h4>
                    <p>content contefjaiwefjiweajojilsjfl</p>
                </div>
            </Draggable>
        );
    }
}
