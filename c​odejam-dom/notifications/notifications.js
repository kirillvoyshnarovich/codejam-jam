let data = ['More than 60% of emails we send do not require a response. Use "No response needed" to make sure recipients know that a response is unnecessary.',
            'In publishing and graphic design, lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content.',
            'Replacing the actual content with placeholder text allows designers to design the form of the content before the content itself has been produced.',
            'Many popular Word Processors use this format as a placeholder. Some examples are Pages or Microsoft Word. It is not known exactly when the text obtained its current standard form.',
            'Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?']

class Notifications {
    constructor(arr) {
        this.scope = document.querySelector("body")
        this.arr = arr;

        this.createNotification()
    }

    createElement(tag, props, ...children) {
        const element = document.createElement(tag);

        var newChildren = (children.length == 1 && Array.isArray(children[0])) ? children[0] : children;

        Object.keys(props).forEach(key => element.setAttribute(key, props[key]));
    
        newChildren.forEach((child, index, arr) => {
            if (typeof child === 'string') {
                child = document.createTextNode(child);
            }
    
            element.appendChild(child);
        });
    
        return element;
    }

    createControl() {
        const controls = this.arr.map((item, index)=> {
            if(index == 0) {
                return this.createElement('span', {class:'position-notifications__item position-notifications__item_active', 'data-index':index})
            } else {
                return this.createElement('span', {class:'position-notifications__item', 'data-index':index})
            }            
        })

        const buttonPrevios = this.createElement('button', {class:'button-control notifications__control--button-left'})
        const buttunNext= this.createElement('button', {class:'button-control notifications__control--button-right'})
        const positionControl = this.createElement('div', {class:"position-notifications"}, controls)
        const control = this.createElement('div', {class:'notifications__control'}, buttonPrevios, positionControl, buttunNext)

        console.log(control)

        return control
    }

    createCarusel() {

        const posts = this.arr.map((item) => {
            return this.createElement('p', {class:'position-notifications__post'}, item)
        })

        const caruselWrapper = this.createElement('div', {class:'position-notifications__wrapper'}, posts)
        const caruselHeading = this.createElement('h3', {class:'position-notifications__heading'}, 'Email Tip Of The Day')

        const carusel = this.createElement('div', {class:'notifications__carusel'}, caruselHeading, caruselWrapper)
        
        console.log(carusel)

        return carusel;
    }

    createDisable() { 
        const checkbox = this.createElement('input', {type:'checkbox', class: 'notifications__disable--checkbox', id:"disabled"})
        const label = this.createElement('label', {class:'notifications__disable--label', for:"disabled"}, 'Disable Tips');

        const disable = this.createElement('div', {class:'notifications__disable'}, checkbox, label)

        console.log(disable)
        return disable
    }

    createNotification() {
        const carusel = this.createCarusel()
        const disable = this.createDisable()
        const control = this.createControl()
        const close = this.createElement('div', {class:'notifications__close'},"&#9587")//почитать промнемонку, когда вставляю так &#9587- тогда символ не отображаетя

        const notification = this.createElement('div', {class:'notifications'}, carusel, disable, control, close)
        this.scope.appendChild(notification)
        this.addHandler()
    }

    addHandler() {
        new Carusel(".notifications")
        this.handlerCheckbox()
        this.handlerClose()
    }

    handlerCheckbox() {
        let checkbox = document.querySelector('.notifications__disable--checkbox')
        checkbox.addEventListener('change', function({ target }) {
            if(target.checked) {
                localStorage.setItem('disabled_tips', target.checked)
            } else {
                localStorage.setItem('disabled_tips', target.checked)
            }
        })
    }

    handlerClose() {
        console.log('handlerClose')
        let checkbox = document.querySelector('.notifications__close');
        checkbox.addEventListener('click', function() {
            console.log('событие handlerClose')
            let notifications = document.querySelector('.notifications')
            notifications.classList.add('notifications_hidden')
        })
    }

}

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
    if(localStorage.getItem('disabled_tips') == "false") {
        var notifications = new Notifications(data)
    }
})





