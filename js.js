let tasksDiv = document.querySelector('#tasks'),
    tasksArray = [],
    itemCout = 0,
    shortInfoArr = {},
    currentAsideKey = '',
    iscommentnotredacting = true,
    comment = document.querySelector('.comment'),

    addBtn = document.querySelector('#addTask'),
    popup = document.querySelector('#popup'),
    openBtn = document.querySelector('#openForm'),
    myForm = document.querySelector('#taskForm'),
    cancelBtn = document.querySelector('#cancel'),
    innerAside = document.querySelector('.innerAside'),
    aside = document.querySelector('.aside'),
    popupIpu = document.querySelector('#inputTask');


popup.addEventListener('submit', createTask);
openBtn.addEventListener('click', openForm);
cancelBtn.addEventListener('click', closeForm);
aside.addEventListener('mouseout', disactivateAside);

function openForm() {
    myForm.style.display = 'flex';
    popupIpu.focus();
}

function closeForm() {
    myForm.style.display = 'none';
}

function disactivateAside() {
    aside.classList.remove('active');
}

function drawDiv(txt, keyfor = itemCout, done = false) {

    let div = createElement('div', [
        {
            attr: 'class',
            value: 'task'
        }
    ]);
    let p = createElement('p', [
        {
            attr: 'class',
            value: 'taskText'
        }
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
]);


    let checkbox = createElement('input', [
        {
            attr: 'for',
            value: keyfor
        },
        {
            attr: 'type',
            value: 'checkbox'
        },
        {
            attr: 'class',
            value: 'checkB'
        },

    ]);
    if (done) {
        checkbox.checked = true;
    };
    checkbox.addEventListener('change', (e) => {

        shortInfoArr[checkbox.attributes.for.value].checked = checkbox.checked;
        saveData();

    })
    p.appendChild(btn);
    p.innerHTML += txt;
    div.appendChild(checkbox);
    div.appendChild(p);

    return div;
}

function addEvents(elem) {
    elem.querySelector('button').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        let delKey = elem.firstChild.attributes.for.value;
        if (delKey == currentAsideKey) {
            currentAsideKey = 0;
            innerAside.innerHTML = '';
        };
        delete shortInfoArr[delKey];
        tasksArray.splice(tasksArray.indexOf(elem), 1);

        tasksDiv.removeChild(elem);
        saveData();
    })
    elem.lastChild.addEventListener('click', (e) => {
        currentAsideKey = elem.firstChild.attributes.for.value;
        iscommentnotredacting = true;
        drawDisctiption(currentAsideKey);
        aside.classList.add('active');
        setInterval(disactivateAside, 10000)
    })
}

function drawDisctiption(keyNumber) {
    innerAside.innerHTML = '';
    let headAside = document.createElement('h3');
    headAside.innerHTML = shortInfoArr[keyNumber].task;
    let asideText = document.createElement('input');
    asideText.classList.add('description');
    asideText.addEventListener('focus', editDescription);
    asideText.value = shortInfoArr[keyNumber].comment;
    asideText.addEventListener('blur',confirmComment);
    asideText.addEventListener('keypress', checkInputKey);
    innerAside.appendChild(headAside);
    innerAside.appendChild(asideText);

}

function checkInputKey(e){
    if(e.keyCode==13){
        this.blur();
    }
}

function editDescription() {
    if (iscommentnotredacting) {
        iscommentnotredacting = false;
        aside.classList.add('active');
//        let editButton = document.createElement('button');
//        editButton.innerHTML = "Edit"
//        editButton.classList.add('edit');
//        editButton.addEventListener('click', confirmComment);
//        innerAside.appendChild(editButton);
    }}



function confirmComment(e){
    if (this.value) {
                    shortInfoArr[currentAsideKey].comment = this.value;
                } else {
                    shortInfoArr[currentAsideKey].comment = 'No comment';
                }
                iscommentnotredacting = true;
                disactivateAside();
                saveData();
                drawDisctiption(currentAsideKey);
}



function createTask(e) {
    e.preventDefault();
    itemCout++;
    let txtInput = document.querySelector('#inputTask'),
        txt = txtInput.value,
        commentText = comment.value;
    if (commentText == '') {
        commentText = 'No comment'
    };

    if (txt) {
        shortInfoArr[itemCout] = {
            task: txt,
            comment: commentText,
            checked: false
        };
        const newTask = drawDiv(txt);
        tasksArray.push(newTask);
        tasksDiv.appendChild(newTask);

        addEvents(newTask);
        closeForm();
        txtInput.value = '';
        comment.value = '';
        txtInput.focus();
    }
    saveData();
}


function createElement(type, arr) {
    const newElem = document.createElement(type);
    arr.forEach(elem => {
        newElem.setAttribute(elem.attr, elem.value)
    })

    return newElem;
}

function saveData() {
    localStorage.setItem('tasks', JSON.stringify(shortInfoArr));
}



window.onload = function () {
    let savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        shortInfoArr = JSON.parse(savedTasks);
        for (let key in shortInfoArr) {
            txt = shortInfoArr[key].task;
            let ischecked = shortInfoArr[key].checked;
            itemCout = parseInt(key);

            const newTask = drawDiv(txt, key, ischecked);
            tasksArray.push(newTask);
            tasksDiv.appendChild(newTask);
            addEvents(newTask);

            document.body.addEventListener('click', checkTarget);




        }
    }
}

function checkTarget(e) {
    if (e.target != innerAside && !(e.target.classList.contains('taskText'))) {

        disactivateAside();
    };

}