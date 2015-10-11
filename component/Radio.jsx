export default class Radio extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            disabled: props.disabled,
        }
    }
    
    checkedChange(e){
        if(this.props.onChange) this.props.onChange(e, this.props.storeValue);
    }

    render() {
        return (
            <label>
                <input type="radio" ref="radioInput" disabled={this.state.disabled} checked={this.props.checked} onChange={this.checkedChange.bind(this)} />
                {this.props.children}
            </label>
        );
    }
}
