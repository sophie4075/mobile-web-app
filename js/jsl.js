class ViewController {

    root;
    titleArray;
    ownerArray;
    addedArray;
    numOfTagsArray;
    srcArray;

    constructor() {

    }

    onCreate() {
        this.prepareViewSwitching();
        this.prepareFading();
        this.prepareListInteraction();

        ListOperations.loadAndDisplayListItems((items) => {
            ListOperations.updateJSONArrays(items, this);
            items.forEach(item => ListOperations.addNewListItem(this.root.querySelector("ul"), this.root.querySelector("template"), item));
        });
    }

    prepareViewSwitching() {
        const switchElement = this.root.getElementsByTagName("header")[0];



        function changeViewButtonImage(element, tileViewVisibilty) {
            if (tileViewVisibilty === 'hidden') {
                element.setAttribute('tile-view', 'visible');
            } else if (tileViewVisibilty === 'visible') {
                element.setAttribute('tile-view', 'hidden');
            }
        }

        switchElement.onclick = e => {
            const clickedElement = e.target.id

            switch (clickedElement) {
                case 'view':
                    const fadingTarget = this.root.getElementsByTagName("main")[0];
                    fadingTarget.classList.toggle("myapp-faded");


                    const onTransitioned = () => {

                        fadingTarget.classList.toggle("myapp-faded");
                        fadingTarget.removeEventListener("transitionend", onTransitioned);
                        this.root.classList.toggle("myapp-tiles");
                        changeViewButtonImage(e.target, e.target.getAttribute('tile-view'));

                    };

                    fadingTarget.addEventListener("transitionend", onTransitioned);


                    break;
                    
                 case 'add':
                    ListOperations.prepareAddingNewListItem(e,
                        this.root.querySelector("ul"),this.root.querySelector("template"),
                        this.titleArray,
                        this.ownerArray, this.addedArray,
                        this.numOfTagsArray,
                        this.srcArray,
                        (listRoot, dolly, obj) => ListOperations.addNewListItem(this.root.querySelector("ul"), this.root.querySelector("template"), obj));
                    break;
                    
                default:
                    console.log("Sorry, nothing to handle here yet");
            }
        }
    }


    prepareFading() {
        const fadingTrigger = document.getElementById("myapp-fadingTrigger");
        const fadingTarget = this.root.getElementsByTagName("main")[0];

        fadingTrigger.onclick = () => {
            fadingTarget.classList.toggle("myapp-faded");

            const onTransitioned = () => {
                const ul = document.getElementById('track-list');
                const items = ul.querySelectorAll('li');

                items.forEach(item => {
                    item.remove();
                });
                
                fadingTarget.classList.toggle("myapp-faded");
                fadingTarget.removeEventListener("transitionend", onTransitioned);

                 ListOperations.loadAndDisplayListItems((items =>{
                    ListOperations.updateJSONArrays(items, this);
                        items.forEach(item => ListOperations.addNewListItem(this.root.querySelector("ul"), this.root.querySelector("template"), item));
                    }
                ));
            };

            fadingTarget.addEventListener("transitionend", onTransitioned);
        }


    }

    prepareListInteraction() {
        const list = document.getElementById("track-list");
        console.log(list);

        list.onclick = e => {
            const target = e.target;
            const listElement = target.closest('li');
            console.log(e.target);

            if (!listElement) {
                console.log("nothing here")
                return;
            }

            const title = listElement.querySelector('h2').textContent;

            if (target.classList.contains('myapp-li-options-img')) {
                const imgSrc = list.querySelector('img').src;
                //alert(`Titel: ${title}, Bild-URL: ${imgSrc}`);
                if (confirm(`Would you like to remove: ${title} with image url: ${imgSrc} ?`)) {
                    listElement.remove();
                }
            } else {
                alert(`Titel: ${title}`);
            }

            e.stopPropagation();

        }

    }


}


window.onload = () => {
    const viewController = new ViewController();
    viewController.root = document.body;
    viewController.onCreate();
}
