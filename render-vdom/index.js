
const vdom = {
    type: 'ul',
    props: {
        className: 'list'
    },
    children: [
        {
            type: 'li',
            props: {
                className: 'item',
                style: {
                    background: 'blue',
                    color: '#fff'
                },
                onClick: function() {
                    alert(1);
                }
            },
            children: [
                'aaaa'
            ]
        },
        {
            type: 'li',
            props: {
                className: 'item'
            },
            children: [
                'bbbbddd'
            ]
        },
        {
            type: 'li',
            props: {
                className: 'item'
            },
            children: [
                'cccc'
            ]
        }
    ]
};

render(vdom, document.getElementById('root'));
