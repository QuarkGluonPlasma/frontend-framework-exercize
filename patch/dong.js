
function isTextVdom(vdom) {
    return typeof vdom == 'string' || typeof vdom == 'number';
}

function isElementVdom(vdom) {
    return typeof vdom == 'object' && typeof vdom.type == 'string';
}

function isComponentVdom(vdom) {
    return typeof vdom.type == 'function';
}

const render = (vdom, parent = null) => {
    const mount = parent ? (el => parent.appendChild(el)) : (el => el);
    if (isTextVdom(vdom)) {
        return mount(document.createTextNode(vdom));
    } else if (isElementVdom(vdom)) {
        const dom = mount(document.createElement(vdom.type));
        for (const child of [].concat(...vdom.children)) {// children 元素也是 数组，要拍平
            render(child, dom);
        }
        for (const prop in vdom.props) {
            setAttribute(dom, prop, vdom.props[prop]);
        }
        return dom;
    } else if (isComponentVdom(vdom)) {
        return renderComponent(vdom, parent);
    } else {
        throw new Error(`Invalid VDOM: ${vdom}.`);
    }
};

function renderComponent(vdom, parent) {
    const props = Object.assign({}, vdom.props, {
        children: vdom.children
    });

    if (Component.isPrototypeOf(vdom.type)) {
        const instance = new vdom.type(props);

        instance.componentWillMount();

        const componentVdom = instance.render();
        instance.dom = render(componentVdom, parent);
        instance.dom.__instance = instance;
        instance.dom.__key = vdom.props.key;

        instance.componentDidMount();

        return instance.dom;
    } else {
        const componentVdom = vdom.type(props);
        return render(componentVdom, parent);
    }
}

function patch(dom, vdom, parent = dom.parentNode) {
    const replace = parent ? el => {
        parent.replaceChild(el, dom);
        return el;
    } : (el => el);

    if(isComponentVdom(vdom)) {
        const props = Object.assign({}, vdom.props, {children: vdom.children});
        if (dom.__instance && dom.__instance.constructor == vdom.type) {
            dom.__instance.componentWillReceiveProps(props);
            dom.__instance.props = props;
            return patch(dom, dom.__instance.render(), parent);
        } else if (Component.isPrototypeOf(vdom.type)) {
            const componentDom = renderComponent(vdom, parent);
            if (parent){
                parent.replaceChild(componentDom, dom);
                return componentDom;
            } else {
                return componentDom
            }
        } else if (!Component.isPrototypeOf(vdom.type)) {
            return patch(dom, vdom.type(props), parent);
        }
    }else if (dom instanceof Text) {
        if (typeof vdom === 'object') {
            return replace(render(vdom, parent));
        } else {
            return dom.textContent != vdom ? replace(render(vdom, parent)) : dom;
        }
    } else if (dom.nodeName !== vdom.type.toUpperCase() && typeof vdom === 'object') {
        return replace(render(vdom, parent));
    } else if(dom.nodeName === vdom.type.toUpperCase() && typeof vdom === 'object'){
        const active = document.activeElement;

        const oldDoms = {};
        [].concat(...dom.childNodes).map((child, index) => {
            const key = child.__key || `__index_${index}`;
            oldDoms[key] = child;
        });
        [].concat(...vdom.children).map((child, index) => {
            const key = child.props && child.props.key || `__index_${index}`;
            dom.appendChild(oldDoms[key] ? patch(oldDoms[key], child) : render(child, dom));
            delete oldDoms[key];
        });
        for (const key in oldDoms) {
            const instance = oldDoms[key].__instance;
            if (instance) instance.componentWillUnmount();
            oldDoms[key].remove();
        }
        for (const attr of dom.attributes) dom.removeAttribute(attr.name);
        for (const prop in vdom.props) setAttribute(dom, prop, vdom.props[prop]);

        active.focus();

        return dom;
    }
}

function isEventListenerAttr(key, value) {
    return typeof value == 'function' && key.startsWith('on');
}

function isStyleAttr(key, value) {
    return key == 'style' && typeof value == 'object';
}

function isPlainAttr(key, value) {
    return typeof value != 'object' && typeof value != 'function';
}

function isRefAttr(key, value) {
    return key === 'ref' && typeof value === 'function';
}

const setAttribute = (dom, key, value) => {
    if (isEventListenerAttr(key, value)) {
        const eventType = key.slice(2).toLowerCase();
        dom.__handlers = dom.__handlers || {};
        dom.removeEventListener(eventType, dom.__handlers[eventType]);
        dom.__handlers[eventType] = value;
        dom.addEventListener(eventType, dom.__handlers[eventType]);
    } else if (key == 'checked' || key == 'value' || key == 'className') {
        dom[key] = value;
    } else if(isRefAttr(key, value)) {
        value(dom);
    } else if (isStyleAttr(key, value)) {
        Object.assign(dom.style, value);
    } else if (key == 'key') {
        dom.__key = value;
    } else if (isPlainAttr(key, value)) {
        dom.setAttribute(key, value);
    }
}

const createElement = (type, props, ...children) => {
    if (props === null)  props = {};
    return {type, props, children};
};

class Component {
    constructor(props) {
        this.props = props || {};
        this.state = null;
    }
  
    setState(nextState) {
        this.state = Object.assign(this.state, nextState);
        if(this.dom && this.shouldComponentUpdate(this.props, nextState)) {
            patch(this.dom, this.render());
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props || nextState != this.state;
    }

    componentWillMount() {}
  
    componentDidMount() {}

    componentWillReceiveProps() {}

    componentWillUnmount() {}
}
