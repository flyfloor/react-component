import {ConfirmBox} from './index.js';

export default class ConfirmBoxDemo extends React.Component {
    render() {
        return (
            <ol>
                <li>
                    <h4>default confirm box</h4>
                    <ConfirmBox>
                    </ConfirmBox>
                </li>
                <li>
                    <h4>conform box with different direction</h4>
                    <ConfirmBox>
                    </ConfirmBox>
                </li>
            </ol>
        );
    }
}
