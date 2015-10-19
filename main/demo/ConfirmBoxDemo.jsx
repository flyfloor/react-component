import {ConfirmBox} from './index.js';

export default class ConfirmBoxDemo extends React.Component {
    handleConfirm(){
        console.log('confirmed')
    }

    handleCancel(){
        console.log('canceled')
    }

    render() {
        return (
            <ol>
                <li>
                    <h4>default confirm box</h4>
                    <ConfirmBox title='confirm delete?' onConfirm={this.handleConfirm.bind(this)} onCancel={this.handleCancel.bind(this)}>
                        <a href='javascript:;'>delete</a>
                    </ConfirmBox>
                </li>
                <li>
                    <h4>default confirm box</h4>
                    <ConfirmBox title='confirm delete?'>
                        <a href='javascript:;'>delete</a>
                    </ConfirmBox>
                </li>
                <li>
                    <h4>conform box with different direction</h4>
                    <ConfirmBox title='confirm delete?' direction='left'>
                        <a href='javascript:;'>left</a>
                    </ConfirmBox>
                    <ConfirmBox title='confirm delete?' direction='right'>
                        <a href='javascript:;'>right</a>
                    </ConfirmBox>
                    <ConfirmBox title='confirm delete?' direction='top'>
                        <a href='javascript:;'>top</a>
                    </ConfirmBox>
                    <ConfirmBox title='confirm delete?' direction='bottom'>
                        <a href='javascript:;'>bottom</a>
                    </ConfirmBox>
                </li>
            </ol>
        );
    }
}
