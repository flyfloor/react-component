import React from 'react';
import {Modal} from './index.js';

export default class ModalDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            display: false,
            display1: false,
            display2: false
        };
    }
    
    handleConfirm(){
        return confirm('close modal?');
    }

    handleCancel(){
        return true;
    }

    handleConfirm1(){
        alert('confirmed');
        return true;
    }

    showModal(stat){
        this.setState({
            [String(stat)]: true, 
        });
    }

    handleClose(){
        this.setState({
            display: false, 
            display1: false, 
            display2: false, 
            display3: false
        });
    }

    render() {
        return (
            <div>
                <h3>Modal</h3>
                <ol>
                    <li>
                        <h4>Default modal</h4>
                        <a href="javascript:;" onClick={this.showModal.bind(this, 'display')}>click</a>
                        <Modal title='confirm deleted' onClose={this.handleClose.bind(this)} display={this.state.display}>
                            <h4>this is content</h4>
                            <p>asdfhkjfkwlg mean no shit</p>
                            <a href="http://braavos.me" target="_blank">hello</a>
                        </Modal>
                    </li>
                    <li>
                        <h4>Modal with confirm, cancel action</h4>
                        <a href="javascript:;" onClick={this.showModal.bind(this, 'display1')}>click</a>
                        <Modal display={this.state.display1} onClose={this.handleClose.bind(this)} 
                            onConfirm={this.handleConfirm.bind(this)} onCancel={this.handleCancel.bind(this)}>
                            <a href='http://braavos.me' target="_blank">hello</a>
                        </Modal>
                    </li>
                    <li>
                        <h4>Modal with only confirm action</h4>
                        <a href="javascript:;" onClick={this.showModal.bind(this, 'display2')}>click</a>
                        <Modal display={this.state.display2} onClose={this.handleClose.bind(this)}
                            onConfirm={this.handleConfirm1.bind(this)} closeIcon={<p>关闭</p>}>
                            <a href='http://braavos.me' target="_blank">hello</a>
                        </Modal>
                    </li>
                    <li>
                        <h4>Modal force to close</h4>
                        <a href="javascript:;" onClick={this.showModal.bind(this, 'display3')}>click</a>
                        <Modal display={this.state.display3} force={true} onClose={this.handleClose.bind(this)}
                            onConfirm={this.handleConfirm1.bind(this)}>
                            <a href='http://braavos.me' target="_blank">hello</a>
                        </Modal>
                    </li>
                </ol>
            </div>
        );
    }
}
