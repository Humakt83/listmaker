const clearList = () => {
    listItems = [];
    updateList();
};

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

