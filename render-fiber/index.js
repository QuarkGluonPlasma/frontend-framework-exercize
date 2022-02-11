const data = {
    item1: 'bb',
    item2: 'cc'
}

const jsx =  <ul className="list">
    <li className="item" style={{ background: 'blue', color: 'pink' }} onClick={() => alert(2)}>aa</li>
    <li className="item">{data.item1}<i>xxx</i></li>
    <li className="item">{data.item2}</li>
</ul>;

console.log(JSON.stringify(jsx, null, 4));

Dong.render(jsx, document.getElementById("root"));
