const data = {
  item1: 'bbb',
  item2: 'ddd'
};
const jsx = createElement("ul", {
  className: "list"
}, createElement("li", {
  className: "item",
  style: {
    background: 'blue',
    color: 'pink'
  },
  onClick: () => alert(2)
}, "aaa"), createElement("li", {
  className: "item"
}, data.item1, createElement("i", null, "aaa")), createElement("li", {
  className: "item"
}, data.item2));
render(jsx, document.getElementById('root'));