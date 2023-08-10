const tlLeave = gsap.timeline({
  defaults: {duration: 0.75, ease: 'Power2.easeOut'}
});

const tlEnter = gsap.timeline({
  defaults: {duration: 0.75, ease: 'Power2.easeOut'}
});

// make the functions for leave and enter animations
const leaveAnimation = (current,done) => {
  const product = current.querySelector('.image-container');
  const text = current.querySelector('.showcase-text')
  const circles = current.querySelectorAll('.circle');
  const arrow = current.querySelector('.showcase-arrow');

  return (

    tlLeave.fromTo(arrow, {opacity: 1, y:0}, {opacity: 0, y: 50}),
    tlLeave.fromTo(product, {y:0, opacity: 1}, {y: 100, opacity: 0, onComplete: done}, '<'),
    tlLeave.fromTo(text, {y: 0, opacity: 1}, {y: 100, opacity: 0}, '<'),
    tlLeave.fromTo(circles, {y: 0, opacity: 1}, {
      y: -200,
      opacity: 0, 
      stagger: 0.15, 
      ease: 'back.out(1.7)', 
      duration: 1 
    }, '<')
  );
}

const enterAnimation = (current,done, gradient) => {
  const product = current.querySelector('.image-container');
  const text = current.querySelector('.showcase-text')
  const circles = current.querySelectorAll('.circle');
  const arrow = current.querySelector('.showcase-arrow');
  // const gradient = getGradient(current.dataset.barbaNamespace);
  // console.log(current);
  // console.dir(current);
  // console.log(current.dataset.barbaNamespace);
  
  return (
    tlEnter.fromTo(arrow, {opacity: 0, y: 50}, {opacity: 1, y: 0}),
    tlEnter.to('body', {background: gradient, duration: 1}, '<'),
    tlEnter.fromTo(product, {y: -100, opacity: 0}, {y: 0, opacity: 1, onComplete: done}, '<'),
    tlEnter.fromTo(text, {y: 100, opacity: 0}, {y: 0, opacity: 1}, '<'),
    tlEnter.fromTo(circles, {y: -200, opacity: 0}, {
      y: 0,
      opacity: 1, 
      stagger: 0.15, 
      ease: 'back.out(1.7)', 
      duration: 1 
    }, '<')
  );
}

const leaveProductAnimation = (current, done) => {
  console.log('in product anim');
  return (
    tlEnter.fromTo(current, {y: 0, opacity: 1}, {y: '30%', opacity: 0, onComplete: done, duration: 0.75})
  );
}

let cartjs = 
`
    const img = document.querySelectorAll('.price-right img');
    console.log(img);
    img.forEach((element, index) => {
      element.addEventListener('click', (event) => {
        const cartIndex = Number(event.target.dataset.id);
        const span = document.querySelector(\`.addtocart-text-container-id-\${cartIndex} span\`);
        const svg = document.querySelector(\`.addtocart-text-container-id-\${cartIndex} svg\`);
        if (index == cartIndex) {
          gsap.fromTo(span, {y: 20, opacity: 0}, {y: 0, opacity: 1, duration: 0.75, ease: 'power3.out'});
          gsap.fromTo(svg, {y: 20, opacity: 0}, {y: 0, opacity: 1, duration: 0.75, ease: 'power3.out'}, '<');

          gsap.to(span, {y: -20, opacity: 0, duration: 0.75, ease: 'power3.out', delay: 1});
          gsap.to(svg, {y: -20, opacity: 0, duration: 0.75, ease: 'power3.out'},'<');
        }
      })
    });
`;

const enterProductAnimation = (next, done) => {

  console.log('in product anim');
  let js = cartjs
  console.log(js);
  eval(js);
  return (
    tlEnter.fromTo(next, {y: '100%'}, {y: 0, duration: 1, onComplete: done})
  );
}


// Run Animation
barba.init({
  preventRunning: true,
  transitions: [
    // showcase transitions
    {
      name: 'default',
      once(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        gsap.set('body', {background: gradient});
        enterAnimation(next, done, gradient);
      },
      leave(data) {
        const done = this.async(); 
        let current = data.current.container; // access to current page data.
        if (data.current.namespace === 'product') {
          console.log('leaving product');
          leaveProductAnimation(current, done);
        } else {
          leaveAnimation(current, done);
        }
      },
      enter(data) {
        const done = this.async(); 
        let next = data.next.container; // access to data that needs to updated
        let gradient = getGradient(data.next.namespace);
        if (data.next.namespace === 'product') {
          console.log('in product');
          enterProductAnimation(next, done);
        } else {
          enterAnimation(next, done, gradient);
        }
      }
    }
  ]
});


// changing gradient on showcase
function getGradient(name) {
  switch (name) {
    case 'handbag': {
      return `linear-gradient(260deg, #b75d62, #754d4f)`;
    }
    case 'boot': {
      return 'linear-gradient(260deg, #5d8cb7, #4c4f70';
    }
    case 'hat': {
      return 'linear-gradient(260deg, #b27a5c, #7f5450)';
    }
  }
}

// create add to cart animation
const img = document.querySelectorAll('.price-right img');
console.log(img);
img.forEach((element, index) => {
  element.addEventListener('click', (event) => {
    const cartIndex = Number(event.target.dataset.id);
    const span = document.querySelector(`.addtocart-text-container-id-${cartIndex} span`);
    const svg = document.querySelector(`.addtocart-text-container-id-${cartIndex} svg`);
    if (index == cartIndex) {
      gsap.fromTo(span, {y: 20, opacity: 0}, {y: 0, opacity: 1, duration: 0.75, ease: 'power3.out'});
      gsap.fromTo(svg, {y: 20, opacity: 0}, {y: 0, opacity: 1, duration: 0.75, ease: 'power3.out'}, '<');

      gsap.to(span, {y: -20, opacity: 0, duration: 0.75, ease: 'power3.out', delay: 1});
      gsap.to(svg, {y: -20, opacity: 0, duration: 0.75, ease: 'power3.out'},'<');
    }
  })
});
