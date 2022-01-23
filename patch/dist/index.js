function Item(props) {
  return createElement("li", {
    className: "item",
    style: props.style
  }, props.children, "  ", createElement("a", {
    href: "#",
    onClick: props.onRemoveItem
  }, "X "));
}

class List extends Component {
  constructor(props) {
    super();
    this.state = {
      list: [{
        text: 'aaa',
        color: 'pink'
      }, {
        text: 'bbb',
        color: 'orange'
      }, {
        text: 'ccc',
        color: 'yellow'
      }]
    };
  }

  handleItemRemove(index) {
    this.setState({
      list: this.state.list.filter((item, i) => i !== index)
    });
  }

  handleAdd() {
    this.setState({
      list: [...this.state.list, {
        text: this.ref.value
      }]
    });
  }

  render() {
    return createElement("div", null, createElement("ul", {
      className: "list"
    }, this.state.list.map((item, index) => {
      return createElement(Item, {
        style: {
          background: item.color,
          color: this.state.textColor
        },
        onRemoveItem: () => this.handleItemRemove(index)
      }, item.text);
    })), createElement("div", null, createElement("input", {
      ref: ele => {
        this.ref = ele;
      }
    }), createElement("button", {
      onClick: this.handleAdd.bind(this)
    }, "add")));
  }

}

render(createElement(List, {
  textColor: '#000'
}), document.getElementById('root'));