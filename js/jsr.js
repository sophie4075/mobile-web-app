class ListOperations {
    static addNewListItem(listRoot, dolly, obj) {
        const li = document.importNode(dolly.content, true).querySelector("li");
        li.querySelector(".album_cover").src = obj.src;
        li.querySelector("h2").textContent = obj.title;
        li.querySelector(".myapp-origin").textContent = obj.owner;
        li.querySelector("time").textContent = obj.added;
        li.querySelector("p").textContent = obj.numOfTags;
        listRoot.appendChild(li);
    }

    static loadAndDisplayListItems(callback) {
        const request = new XMLHttpRequest();
        request.open("GET", "data/listitems.json");
        request.send();
        request.onload = () => {
            const responseText = request.responseText;
            console.log(responseText);
            const responseItems = JSON.parse(responseText);
            if (callback) {
                callback(responseItems);
            }
        }
    }


    static prepareAddingNewListItem(event, listRoot, dolly, titleArray, ownerArray, addedArray, numOfTagsArray, srcArray, callback) {


            event.stopPropagation();

            const selectedTitle = titleArray[Date.now() % titleArray.length];
            const selectedOwner = ownerArray[Date.now() % ownerArray.length];
            const addedTag = addedArray[Date.now() % addedArray.length];
            const numberOfTags = numOfTagsArray[Date.now() % numOfTagsArray.length];
            const selectedSrc = srcArray[Date.now() % srcArray.length];

            const obj = {
                title: selectedTitle,
                owner: selectedOwner,
                added: addedTag ,
                numOfTags: numberOfTags,
                src:selectedSrc
            };

            callback(listRoot, dolly, obj);

    }

    static updateJSONArrays(responseItem, viewController) {
        viewController.titleArray = responseItem.map(e => e.title);
        viewController.ownerArray = responseItem.map(e => e.owner);
        viewController.addedArray = responseItem.map(e => e.added);
        viewController.numOfTagsArray = responseItem.map(e => e.numOfTags);
        viewController.srcArray = responseItem.map(e => e.src);
    }
}
