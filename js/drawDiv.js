function drawDiv() {
    let div = createElement('div', [
        {attr: 'class',
        value:'task'}
    ]);
     let p = createElement('p', [
        {attr: 'class',
        value:'taskText'}
    ]);
    const btn = createElement('button', [
    {
        attr: 'type',
        value: 'button'
    },
    {
        attr: 'class',
        value: 'deleteTask'
    },
])

    const checkboxID = Math.ceil(Math.random()*100000);
        const label = createElement('label',[
    {
        attr: 'for',
        value: checkboxID
    }
]) 
        const checkbox = createElement('input',[
    {
        attr: 'for',
        value: checkboxID
    },
            {
        attr: 'type',
        value: 'checkox'
    }
]) 
                                    
                                    
     .textContent = 'click';
    p.appendChild(btn);
    label.appendChild(checkbox);
    label.appendChild(p);
    div.appendChild(p);

    return div; 
}
