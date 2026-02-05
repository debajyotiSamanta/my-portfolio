import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";

// Components
import Contact from "./components/contact";
import Footer from "./components/footer";
import Header from "./components/header";
import Home from "./components/home";
import Projects from "./components/projects";
import Qualification from "./components/qualifications";
import Services from "./components/services";
import Skills from "./components/skills";
import Testimonial from "./components/testimonial";

function App() {
  useEffect(() => {
    // Swipers
    new Swiper(".testimonial__container", {
      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      modules: [Navigation],
    });

    new Swiper(".projects__container", {
      loop: true,
      spaceBetween: 24,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: { el: ".swiper-pagination" },
      mousewheel: true,
      keyboard: true,
      modules: [Navigation, Pagination, Mousewheel, Keyboard],
    });

    // ScrollReveal
    const sr = ScrollReveal({
      distance: "80px",
      duration: 2000,
      delay: 400,
      easing: "ease-in-out",
      reset: true,
    });

    sr.reveal(`.home__data, .projects__container, .testimonial__container, .footer__container`, { origin: "top" });
    sr.reveal(`.home__info div`, { delay: 600, origin: "bottom", interval: 150 });
    sr.reveal(`.skills__content:nth-child(1), .contact__content:nth-child(1)`, { origin: "left", duration: 2200 });
    sr.reveal(`.skills__content:nth-child(2), .contact__content:nth-child(2)`, { origin: "right", duration: 2200 });
    sr.reveal(`.qualification__content, .services__card`, { interval: 150, scale: 0.9 });
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <Home />
        <Skills />
        <Qualification />
        <Services />
        <Projects />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
export default App;
