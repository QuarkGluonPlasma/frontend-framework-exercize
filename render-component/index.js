const data = {
    item1: 'bbb',
    item2: 'ddd'
}
function Item(props) {
    return <li className="item" style={props.style} onClick={props.onClick}>{props.children}</li>;
}

class List extends Component {
    constructor() {
        super();
        this.state = {
            list: [
                {
                    text: 'aaa',
                    color: 'blue'
                },
                {
                    text: 'bbb',
                    color: 'orange'
                },
                {
                    text: 'ccc',
                    color: 'red'
                }
            ]
        }
    }

    render() {
        return <ul className="list">
            {this.state.list.map((item, index) => {
                return <Item style={{ background: item.color }} onClick={() => alert(item.text)}>{item.text}</Item>
            })}
        </ul>;
    }
}

render(<List/>, document.getElementById('root'));
