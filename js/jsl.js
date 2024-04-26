class ViewController {

    root;

    constructor() {

    }

    onCreate() {
        this.prepareViewSwitching();
        this.prepareFading();
        this.prepareListInteraction();
    }

    prepareViewSwitching() {
        const switchElement = this.root.getElementsByTagName("header")[0];

        console.log(switchElement);

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
                fadingTarget.classList.toggle("myapp-faded");
                fadingTarget.removeEventListener("transitionend", onTransitioned);
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
                alert(`Titel: ${title}, Bild-URL: ${imgSrc}`);
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
