
class SmoothScroll {
    constructor(_containerSelector, _params) {
  
      // Init DOM elements
      this.$ = {
        container: document.querySelector(_containerSelector),
        containerBody: document.querySelector(_containerSelector + '__body'),
        hitbox: document.querySelector(_containerSelector + '--hitbox'), 
        // controlsDuration: document.querySelector('.controls input[type=range]'),// inutile
        // controlsEasing: document.querySelectorAll('.controls__radio'),// inutile
        // controlsEasingRadio: document.querySelectorAll('.controls input[type=radio]'),// inutile
        // duration: document.querySelector('.controls__duration'), /* duration : _params.duration*/
      }
  
      console.log("test")
  
      // Init params
      this.params = {
        containerHeight: this.$.containerBody.offsetHeight,
        duration: _params.duration,
        timingFunction: _params.timingFunction,
      }
  
      // Launch init functions
      document.addEventListener('DOMContentLoaded', (event) => { 
        console.log("DOM entièrement chargé et analysé");
        this._initStyle()
        this._initListeners()
        event.preventDefault();
      })

     
    }
      
    
  
    _initStyle() {
  
      const currentScrollY = window.scrollY
  
      // Set container style
      this.$.container.style.overflow = `hidden`
      this.$.container.style.position = `fixed`
      this.$.container.style.height = `100vh`
      
      // Set containerBody style
      this.$.containerBody.style.transform = `translateY(${-window.scrollY}px)` // Scroll to current scroll
      
      // Add transtion after scroll to
      const addTransition = () => {
        // Set currentTranslateY
        const regex = /\s?([,])\s?/ 
        const splitTransform = getComputedStyle(this.$.containerBody).transform.split(regex)
        const currentTranslateY = parseInt(splitTransform[splitTransform.length-1])
        
        if(-currentTranslateY != currentScrollY) {
          setTimeout(() => {
            addTransition(currentTranslateY)
          }, 10);
        } else {
          // Add transition
          this.$.containerBody.style.transition = `transform ${this.params.duration}ms ${this.params.timingFunction}`
        }
      }
  
      // Run addTranstion
      addTransition()
  
      // Set hitbox style
      this.$.hitbox.style.height = `${this.params.containerHeight}px` // inutile
  
    }
  
    _initListeners() {
  
      window.addEventListener('scroll', (event) => { this._handleScroll(event); event.preventDefault(); })
      window.addEventListener('resize', () => { this._handleResize() })
  
      // Listening mouseup on duration range
    //   this.$.controlsDuration.addEventListener('mouseup', () => { this._handleDuration() }) // inutile
  
      // Listening mouseup on radio 
    //   for(let i = 0; i < this.$.controlsEasing.length; i++) {
    //     this.$.controlsEasing[i].addEventListener('mouseup', () => { this._handleEasing(this.$.controlsEasingRadio[i].value) }) // inutile
    //   }
    }
  
    _handleScroll(_event) {
  
      this.$.containerBody.style.transform = `translateY(${-window.scrollY}px)`
    }
  
    _handleResize() {
      // Update usefull params
      this.params.containerHeight = this.$.containerBody.offsetHeight
      
      // Update usefull style
      this.$.hitbox.style.height = `${this.params.containerHeight}px` 
    }
  
    
  }
  
  const params = {
    duration: 1000,
    timingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'
  }
  
  new SmoothScroll('.container', params)

  /* cubic-bezier(0.075, 0.82, 0.165, 1) */

