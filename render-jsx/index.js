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


const jsx = <ul className="list">
    <li className="item" style={{ background: 'blue', color: 'pink' }} onClick={() => alert(2)}>aaa</li>
    <li className="item">bbb</li>
</ul>

const vdom = {
    type: 'ul',
    props: {
        className: 'list',
        children: [
            {
                type: 'li',
                props: {
                    className: 'item',
                    style: {
                        background: 'blue',
                        color: 'pink'
                    },
                    onClick: () => alert(2),
                    children: [
                        'aaa'
                    ]
                }
            },
            {
                type: 'li',
                props: {
                    className: 'item',
                    children: ['bbb']
                }
            }
        ]
    }
};


const fiberRoot = vdom;

let currentFiber = fiberRoot;



function reconcileChildren(wipFiber, elements) {
    let index = 0
    let oldFiber =
        wipFiber.alternate && wipFiber.alternate.child
    let prevSibling = null
    
    while (
        index < elements.length ||
        oldFiber != null
    ) {
        const element = elements[index]
        let newFiber = null
    
        const sameType =
        oldFiber &&
        element &&
        element.type == oldFiber.type
    
        if (sameType) {
        newFiber = {
            type: oldFiber.type,
            props: element.props,
            dom: oldFiber.dom,
            parent: wipFiber,
            alternate: oldFiber,
            effectTag: "UPDATE",
        }
        }
        if (element && !sameType) {
        newFiber = {
            type: element.type,
            props: element.props,
            dom: null,
            parent: wipFiber,
            alternate: null,
            effectTag: "PLACEMENT",
        }
        }
        if (oldFiber && !sameType) {
        oldFiber.effectTag = "DELETION"
        deletions.push(oldFiber)
        }
    
        if (oldFiber) {
        oldFiber = oldFiber.sibling
        }
    
        if (index === 0) {
        wipFiber.child = newFiber
        } else if (element) {
        prevSibling.sibling = newFiber
        }
    
        prevSibling = newFiber
        index++
    }
    }
    