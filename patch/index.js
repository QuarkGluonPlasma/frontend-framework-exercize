function Item(props) {
    return <li className="item" style={props.style}>{props.children}  <a href="#" onClick={props.onRemoveItem}>X </a></li>;
}

class List extends Component {
    constructor(props) {
        super();
        this.state = {
            list: [
                {
                    text: 'aaa',
                    color: 'pink'
                },
                {
                    text: 'bbb',
                    color: 'orange'
                },
                {
                    text: 'ccc',
                    color: 'yellow'
                }
            ]
        }
    }

    handleItemRemove(index) {
        this.setState({
            list: this.state.list.filter((item, i) => i !== index)
        });
    }
    
    handleAdd() {
        this.setState({
            list: [
                ...this.state.list, 
                {
                    text: this.ref.value
                }
            ]
        });
    }

    render() {
        return <div>
            <ul className="list">
                {this.state.list.map((item, index) => {
                    return <Item style={{ background: item.color, color: this.state.textColor}} onRemoveItem={() => this.handleItemRemove(index)}>{item.text}</Item>
                })}
            </ul>
            <div>
                <input ref={(ele) => {this.ref = ele}}/>
                <button onClick={this.handleAdd.bind(this)}>add</button>
            </div>
        </div>;
    }
}

render(<List textColor={'#000'}/>, document.getElementById('root'));
