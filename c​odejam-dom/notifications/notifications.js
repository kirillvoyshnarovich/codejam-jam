// class Notifications {
//     constructor() {
//         data()
//     }
// }


class Carusel {
    constructor(element) {
        let el = document.querySelector(element)
        this.init(el)
    }

    init(element) {
        this.tape = element.querySelector(".position-notifications__wrapper");
        this.control = element.querySelectorAll(".button-control");
        this.positions = element.querySelectorAll(".position-notifications__item");
        this.posts = element.querySelectorAll(".position-notifications__post");

        this.styleTape = getComputedStyle(this.tape);
        this.stepTransition = parseFloat(this.styleTape.width)/this.posts.length;
        this.navigation(this.control)
    }

    navigation(buttons) {
        for(let i=0; i<buttons.length; i++) {
            this.handlerButton(buttons[i])
        }
    }

    handlerButton(button) {
        button.addEventListener('click', ({ target }) => {

            
            let rightValue = parseFloat(this.styleTape.right);
            let currentIndex = Math.round(rightValue/this.stepTransition);
            let newIndex;

            if(target.classList.contains('notifications__control--button-right')) {
                newIndex = (currentIndex != this.posts.length-1) ? currentIndex + 1 : currentIndex;
            } else {
                newIndex = (currentIndex > 0) ? currentIndex - 1 : 0;
            }

            this.tape.style.right = (newIndex)*this.stepTransition+"px";
            this.activePosition(currentIndex, newIndex)            
        })

    }

    activePosition(curr, next) {
        this.positions[curr].classList.remove('position-notifications__item_active')
        this.positions[next].classList.add('position-notifications__item_active')
    }

}

document.addEventListener("DOMContentLoaded", function() {
    var reviewSlider = new Carusel(".notifications")
})



