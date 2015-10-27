import {Modal} from './index.js';

export default class ModalDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            display: false,
            display1: false,
            display2: false
        }
    }
    
    handleConfirm(){
        console.log('confirmed');
        return confirm('close modal?');
    }

    handleCancel(){
        console.log('canceled');
        return true;
    }

    handleConfirm1(){
        console.log('another medel confirmed');
        return true;
    }

    showModal(){
        this.setState({
            display: true, 
        });
    }

    showModal1(){
        this.setState({
            display1: true, 
        });
    }

    showModal2(){
        this.setState({
            display2: true, 
        });
    }

    handleClose(){
        this.setState({
            display: false, 
            display1: false, 
            display2: false, 
        });
    }

    render() {
        return (
            <ol>
                <li>
                    <h4>default modal</h4>
                    <a href="javascript:;" onClick={this.showModal.bind(this)}>open modal</a>
                    <Modal title='confirm deleted' onClose={this.handleClose.bind(this)} display={this.state.display}>
                        <h4>this is content</h4>
                        <p>asdfhkjfkwlg mean no shit</p>
                        <a href="javascript:;">delete user</a>
                    </Modal>
                </li>
                <li>
                    <h4>default confirm box, with confirm cancel action handle</h4>
                    <a href="javascript:;" onClick={this.showModal1.bind(this)}>open another modal</a>
                    <Modal display={this.state.display1} onClose={this.handleClose.bind(this)} onConfirm={this.handleConfirm.bind(this)} onCancel={this.handleCancel.bind(this)}>
                        <a href='javascript:;'>delete</a>
                    </Modal>
                </li>
                <li>
                    <h4>default confirm box, with confirm action handle</h4>
                    <a href="javascript:;" onClick={this.showModal2.bind(this)}>open another modal</a>
                    <Modal display={this.state.display2} onClose={this.handleClose.bind(this)} onConfirm={this.handleConfirm1.bind(this)}>
                        <a href='javascript:;'>delete</a>
                    </Modal>
                </li>
            </ol>
        );
    }
}
