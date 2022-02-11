const data = {
  item1: 'bb',
  item2: 'cc'
};
const jsx = Dong.createElement("ul", {
  className: "list"
}, Dong.createElement("li", {
  className: "item",
  style: {
    background: 'blue',
    color: 'pink'
  },
  onClick: () => alert(2)
}, "aa"), Dong.createElement("li", {
  className: "item"
}, data.item1, Dong.createElement("i", null, "xxx")), Dong.createElement("li", {
  className: "item"
}, data.item2));
console.log(JSON.stringify(jsx, null, 4));
Dong.render(jsx, document.getElementById("root"));