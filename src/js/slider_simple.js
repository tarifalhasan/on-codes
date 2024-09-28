import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import { Mousewheel, Pagination } from "swiper/modules";

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    modules: [Pagination, Mousewheel],
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: true,
    // autoplay: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});
