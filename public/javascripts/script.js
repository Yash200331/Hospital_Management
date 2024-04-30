function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#wrapper"),
      smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#wrapper" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#wrapper", {
      scrollTop(value) {
          return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#wrapper").style.transform ? "transform" : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}

loco()

function loadingAnimation() {
  var tl = gsap.timeline()

  tl.from(".load h1,.load h2", {
      y: 120,
      duration: 1,
      delay: 0.2,
      stagger: 0.2
  })
  tl.to(".load", {
      opacity: 0,
      delay: 1.6,
      stagger: -0.2
  })
  tl.to("#loader", {
      top: "-100%",
      duration: 1,
      ease: "power4.out"
  })
  tl.from(".text h1, .text h2,.text h3", {
      y: 200,
      opacity: 0,
      stagger: {
          amount: 0.5
      },
  })
  tl.from("#nav", {
      opacity: 0,
  }, "-=0.5")

  var timer = document.querySelector("#timer h4")
  var grow = 0
  var int = setInterval(function () {
      if (grow < 100) {
          grow++
          timer.innerHTML = grow
      }
  }, 20)

  setTimeout(function () {
      clearInterval(int)
  }, 3000)


}
loadingAnimation()

var swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
});
