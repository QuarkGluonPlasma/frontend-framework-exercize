const data = {
    item1: 'bbb',
    item2: 'ddd'
}
const jsx = <ul className="list">
    <li className="item" style={{ background: 'blue', color: 'pink' }} onClick={() => alert(2)}>aaa</li>
    <li className="item">{data.item1}<i>aaa</i></li>
    <li className="item">{data.item2}</li>
</ul>

render(jsx, document.getElementById('root'));