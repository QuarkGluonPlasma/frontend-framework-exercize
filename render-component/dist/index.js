function Item(props) {
  return createElement("li", {
    className: "item",
    style: props.style,
    onClick: props.onClick
  }, props.children);
}

class List extends Component {
  constructor(props) {
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
      }],
      textColor: props.textColor
    };
  }

  render() {
    return createElement("ul", {
      className: "list"
    }, this.state.list.map((item, index) => {
      return createElement(Item, {
        style: {
          background: item.color,
          color: this.state.textColor
        },
        onClick: () => alert(item.text)
      }, item.text);
    }));
  }

}

render(createElement(List, {
  textColor: 'pink'
}), document.getElementById('root'));