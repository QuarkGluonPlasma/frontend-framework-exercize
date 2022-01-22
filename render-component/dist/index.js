const data = {
  item1: 'bbb',
  item2: 'ddd'
};

function Item(props) {
  return createElement("li", {
    className: "item",
    style: props.style,
    onClick: props.onClick
  }, props.children);
}

class List extends Component {
  constructor() {
    super();
    this.state = {
      list: [{
        text: 'aaa',
        color: 'blue'
      }, {
        text: 'bbb',
        color: 'orange'
      }, {
        text: 'ccc',
        color: 'red'
      }]
    };
  }

  render() {
    return createElement("ul", {
      className: "list"
    }, this.state.list.map((item, index) => {
      return createElement(Item, {
        style: {
          background: item.color
        },
        onClick: () => alert(item.text)
      }, item.text);
    }));
  }

}

render(createElement(List, null), document.getElementById('root'));