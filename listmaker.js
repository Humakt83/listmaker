const storageKey = 'listmakerlist';
const storageNotificationRemoved = 'listmakernotification';
const itemIdPrefix = 'item';
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
    element.innerHTML = `<span class="elementId">${item.id}.</span> 
        <span id="${itemIdPrefix + item.id}">${item.item}</span>
        <div class="deleteItem" onclick="deleteThis(${item.id})" title="Remove">x</div>
        <div class="editItem" onclick="editThis(${item.id})" title="Edit">E</div>
        `;
    element.draggable = true;
    element.addEventListener('dragstart', setDraggingIndex);
    return element;
}

const editThis = (itemId) => {
    const element = document.getElementById(itemIdPrefix + itemId);
    const item = listItems.filter(item => item.id === itemId)[0];
    element.innerHTML = `<form class="editForm" onclick="event.preventDefault; event.stopPropagating;" id="editForm${itemId}">
        <input id="editField${itemId}" type="text" value="${item.item}">
        </form>`;
    const formElement = document.getElementById('editForm' + itemId);
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        item.item = document.getElementById('editField' + itemId).value;
        updateList();
    });
    formElement.children[0].focus();
};

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
        const items = listItems.filter(item => item.id !== draggingIndex);
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

document.getElementById('addItemForm').addEventListener('submit', (event) =>  {
    event.preventDefault();
    addListItem(document.getElementById('itemInput').value);
});

const loadItems = () => {
    const items = localStorage.getItem(storageKey);    
    if (!!items) {
        listItems = JSON.parse(items);
        updateList();
    }
};

const clearList = () => {
    listItems = [];
    updateList();
};

const showListAsText = () => {
    const text = listItems.reduce((previous, current) => previous + `<br>${current.id}. ${current.item}`, '');
    document.getElementById('textList').innerHTML = text;
}

const openPaste = () => {
    document.getElementById('curtain').style = 'display: block';
}

const closeCurtain = () => {
    document.getElementById('curtain').style = 'display: none';
}

const addPasteList = (stripNumbers) => {
    const listContent = document.getElementById('pasteArea').value;
    const list = listContent.split('\n');
    let idToUse = listItems.length > 0 ? listItems[listItems.length - 1].id + 1 : 1;
    for (item of list) {
        if (stripNumbers && item.includes('.')) {
            item = item.split('.').reduce((previous, current, index) => index <= 1 ? current : previous + '.' + current);
        }
        if (item.trim().length > 0) {
            listItems.push({id: idToUse, item: item});
            idToUse++;
        }
    }
    updateList();
    document.getElementById('pasteArea').value = '';
    closeCurtain();
}

const removeFooter = () => {
    localStorage.setItem(storageNotificationRemoved, true);
    document.getElementById('footer').remove();
}

const showFooterIfNeeded = () => {
    if (!!localStorage.getItem(storageNotificationRemoved)) {
        return;
    }
    const footer = document.createElement('div');
    footer.id = 'footer';
    footer.innerHTML = `
        <span>Please note that this site utilizes your browser's localstorage to store the list you have entered so it remains here on your next visit as well.</span>
        <div class="removeFooter" onclick="removeFooter()" title="Remove">Remove this</div>`;
    document.getElementsByTagName('body')[0].appendChild(footer);
}

const init = () => {
    loadItems();
    showFooterIfNeeded();
}
