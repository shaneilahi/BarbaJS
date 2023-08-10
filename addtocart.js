const tl = gsap.timeline({defaults: {duration: 0.75, ease: 'power3.out'}});
    // add to cart animation 
    const img = document.querySelectorAll('.price-right img');
    console.log(img);
    img.forEach((element, index) => {
      element.addEventListener('click', (event) => {
        const cartIndex = Number(event.target.dataset.id);
        const span = document.querySelector(`.addtocart-text-container-id-${cartIndex} span`);
        const svg = document.querySelector(`.addtocart-text-container-id-${cartIndex} svg`);
        if (index == cartIndex) {
          tl.fromTo(span, {y: 20, opacity: 0}, {y: 0, opacity: 1});
          tl.fromTo(svg, {y: 20, opacity: 0}, {y: 0, opacity: 1}, '<');

          tl.to(span, {opacity: 0, delay: 1});
          tl.to(svg, {opacity: 0}, '<');
          // tl.to(span, {y: -20, opacity: 0, delay: 0.4});
          // tl.to(svg, {y: -20, opacity: 0, delay: 0.4}, '<');
          // gsap.set()
        }
      })
    });