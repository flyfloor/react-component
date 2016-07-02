import React from 'react';
import {Modal} from './index.js';

export default class ModalDemo extends React.Component {
    constructor(props){
        super(props);
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

    openModal(ref){
        const node = this.refs[ref]
        node.open()
    }

    handleClose(){
        return confirm('close')
    }

    render() {
        const content = <div>
                            <h4>this is content</h4>
                            <p>This is a modal window. You can do the following things with it:</p>
                            <ul>
                                <li>Read: modal windows will probably tell you something important so don't forget to read what they say.</li>
                                <li>Look: a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                <li>Close: click on the button to close the modal.</li>
                                <li>
                                    <a href="http://braavos.me" target="_blank">blog</a>
                                </li>
                            </ul>
                        </div>
        return (
            <div>
                <h3>Modal</h3>
                <pre>
                    <code>onConfirm, onCancel, onClose need a return value(Boolean) to decide whether to close modal</code>
                </pre>
                <ol>
                    <li>
                        <h4>Default modal</h4>
                        <button onClick={this.openModal.bind(this, 'modal0')}>click</button>
                        <Modal ref="modal0" title={<h4>Confirm deleted</h4>}>
                            {content}
                        </Modal>
                        <pre>
                            <code>
{`
<a href="#" onClick={this.refs.modal.open}>click</a>
<Modal title={<h4>Confirm deleted</h4>} ref="modal">
    ...
</Modal>
`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Modal with confirm, cancel action</h4>
                        <button onClick={this.openModal.bind(this, 'modal1')}>click</button>
                        <Modal ref="modal1" onConfirm={this.handleConfirm.bind(this)} 
                            onCancel={this.handleCancel.bind(this)}>
                            {content}
                        </Modal>
                        <pre>
                            <code>
{`
<a href="#" onClick={this.refs.modal.open}>click</a>
<Modal ref="modal" onConfirm={handleConfirm} onCancel={handleCancel}>
    {content}
</Modal>
`}                                 
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Modal with only confirm action</h4>
                        <button onClick={this.openModal.bind(this, 'modal2')}>click</button>
                        <Modal ref="modal2" onConfirm={this.handleConfirm1.bind(this)} closeIcon={<p>关闭</p>}>
                            {content}
                        </Modal>
                        <pre>
                            <code>
{`
<a href="#" onClick={this.refs.modal.open}>click</a>
<Modal ref="modal" onConfirm={handleConfirm}>
    {content}
</Modal>   
`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Modal with onClose action</h4>
                        <button onClick={this.openModal.bind(this, 'modal3')}>click</button>
                        <Modal ref="modal3" onClose={this.handleClose.bind(this)} closeIcon={<p>关闭</p>}>
                            {content}
                        </Modal>
                        <pre>
                            <code>
{`
<a href="#" onClick={this.refs.modal.open}>click</a>
<Modal ref="modal" onClose={handleClose} closeIcon={<p>关闭</p>}>
    {content}
</Modal>   
`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Modal force to close</h4>
                        <button onClick={this.openModal.bind(this, 'modal4')}>click</button>
                        <Modal ref="modal4" force={true} onConfirm={this.handleConfirm1.bind(this)}>
                            {content}
                        </Modal>
                        <pre>
                            <code>
{`
<a href="#" onClick={this.refs.modal.open}>click</a>
<Modal ref="modal" force={true}
    onConfirm={handleConfirm}>
    {content}
</Modal>
`}                                
                            </code>
                        </pre>
                    </li>
                </ol>
            </div>
        );
    }
}
