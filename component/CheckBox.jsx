export default class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: !!props.disabled,
            checked: !!props.defaultChecked,
        };
    }
    
    checkedChange(e){
        this.setState({
            checked: e.target.checked
        });
        if(this.props.onChange) this.props.onChange(e);
    }

    render() {
        return ( 
            <label>
                <input type="checkbox" disabled={this.state.disabled} checked={this.state.checked} onChange={this.checkedChange.bind(this)}/>
                {this.props.label}
            </label>
        );
    }
}
