class ViewController{

    root;
    constructor() {

    }

    onCreate(){
        console.log("oncreate(): root is: ", this.root)

        this.initaliseViewSwitching()
    }

    initaliseViewSwitching() {
        const switchElement = this.root.getElementsByTagName("header")[0];

        switchElement.onclick = e => {
            const clickedElement = e.target.id

            switch (clickedElement){
                case 'view': this.root.classList.toggle("myapp-tiles");
                default: console.log("Sorry, nothing to handle here");
            }
        }
    }


}

window.onload = () => {
    const  viewController = new ViewController();
    viewController.root = document.body;
    viewController.onCreate();
}