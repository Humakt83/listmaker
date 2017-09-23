const listItems = [];

const addListItem = (item) => {
    const id = document.getElementsByClassName('listItem').length + 1;
    listItems.push({id: id, item: item});
    const element = document.createElement('div');
    element.className = 'listItem';
    element.innerHTML = `<span class="elementId">${id}.</span> ${item} <div class="deleteItem" onclick="deleteThis(${id})">x</div>`;
    element.draggable = true;
    document.getElementById('listItems').appendChild(element);
};

const deleteThis = (itemIndex) => {
    const elementToRemove = document.getElementsByClassName('listItem')[itemIndex -1];
    document.getElementById('listItems').removeChild(elementToRemove);
    updateList();
};

const updateList = () => {
    const listElements = document.getElementsByClassName('listItem');
    [].forEach.call(listElements, (element, index) => {        
        const id = index + 1;
        element.innerHTML = `${id} <div class="deleteItem" onclick="deleteThis(${id})">x</div>`;        
    });
};

document.getElementById('addItemToList').addEventListener('click', () => {
    addListItem(document.getElementById('itemInput').value);
});
