const storageKey = 'listmakerlist';
var listItems = [];
var draggingIndex = -1;

const setDraggingIndex = (event) => {
    draggingIndex = findMatchingIndex(event);
};

const addListItem = (item) => {
    const id = document.getElementsByClassName('listItem').length + 1;
    const listItem = {id: id, item: item};
    listItems.push(listItem);
    updateList();
};

const createElement = (item) => {
    const element = document.createElement('div');
    element.className = 'listItem';
    element.innerHTML = `<span class="elementId">${item.id}.</span> ${item.item} <div class="deleteItem" onclick="deleteThis(${item.id})">x</div>`;
    element.draggable = true;
    element.addEventListener('dragstart', setDraggingIndex);
    return element;
}

const deleteThis = (itemIndex) => {
    listItems = listItems.filter(val => val.id !== itemIndex);
    listItems.forEach((val ,index) => val.id = index + 1);
    updateList();
};

const updateList = () => {
    const listParent = document.getElementById('listItems');
    listParent.innerHTML = '';
    listItems.forEach((item, index) => {
        listParent.appendChild(createElement(item));       
    });
    localStorage.setItem(storageKey, JSON.stringify(listItems));
};

const dropAndSort = (event) => {
    const matchingIndex = findMatchingIndex(event);
    if (matchingIndex !== draggingIndex) {
        const draggedItem = listItems.find(item => item.id === draggingIndex);
        let items = listItems.filter(item => item.id !== draggingIndex);
        draggedItem.id = matchingIndex;
        items.forEach((item, index) => { 
            if ((index + 1) >= matchingIndex) {
                item.id = index + 2;
            } else {
                item.id = index + 1;
            }
        });
        items.push(draggedItem)
        items.sort((a, b) => a.id - b.id);
        listItems = items;
        updateList();
    }
};

const findMatchingIndex = (event) => {
    const elementPositions = [].map.call(document.getElementsByClassName('listItem'), (element) => element.getBoundingClientRect().top);
    const mouseYPosition = event.clientY;
    let matchingIndex = 0;
    elementPositions.forEach((position, index) => matchingIndex = position > mouseYPosition ? matchingIndex : index);
    return matchingIndex + 1;
}

const allowDrop = (event) => {
    event.preventDefault();
}

document.getElementById('addItemToList').addEventListener('click', () => {
    addListItem(document.getElementById('itemInput').value);
});

const loadItems = () => {
    const items = localStorage.getItem(storageKey);    
    if (!!items) {
        listItems = JSON.parse(items);
        updateList();
    }
};
