import EmblaCarousel, { type EmblaOptionsType } from "embla-carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

const addPrevNextBtnsClickHandlers = (
  emblaApi: any,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement
) => {
  const scrollPrev = () => emblaApi.scrollPrev();
  const scrollNext = () => emblaApi.scrollNext();
  prevBtn.addEventListener("click", scrollPrev, false);
  nextBtn.addEventListener("click", scrollNext, false);

  return () => {
    prevBtn.removeEventListener("click", scrollPrev, false);
    nextBtn.removeEventListener("click", scrollNext, false);
  };
};

const addDotBtnsAndClickHandlers = (emblaApi: any, dotsNode: HTMLElement) => {
  let dotNodes: HTMLElement[] = [];

  const addDotBtnsWithClickHandlers = () => {
    dotsNode.innerHTML = emblaApi
      .scrollSnapList()
      .map(() => '<button class="about_embla__dots" type="button"></button>')
      .join("");

    dotNodes = Array.from(dotsNode.querySelectorAll(".about_embla__dots"));
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener("click", () => emblaApi.scrollTo(index), false);
    });

    // Set the initial active dot
    if (dotNodes.length > 0) {
      dotNodes[emblaApi.selectedScrollSnap()].classList.add(
        "about_embla__dot--selected"
      );
    }
  };

  const toggleDotBtnsActive = () => {
    const selected = emblaApi.selectedScrollSnap();
    dotNodes.forEach((dotNode, index) => {
      dotNode.classList.toggle(
        "about_embla__dot--selected",
        index === selected
      );
    });
  };

  emblaApi
    .on("init", addDotBtnsWithClickHandlers)
    .on("select", toggleDotBtnsActive);

  return () => {
    dotsNode.innerHTML = "";
  };
};

export const initAboutEmbla = () => {
  const emblaNode = document.querySelector(".about_embla");
  const viewportNode = emblaNode?.querySelector(
    ".about_embla__viewport"
  ) as HTMLElement;
  const prevBtnNode = emblaNode?.querySelector(
    ".about_embla__button--prev"
  ) as HTMLElement;
  const nextBtnNode = emblaNode?.querySelector(
    ".about_embla__button--next"
  ) as HTMLElement;
  const dotsNode = emblaNode?.querySelector(
    ".about_embla__dots"
  ) as HTMLElement;

  if (viewportNode && prevBtnNode && nextBtnNode && dotsNode) {
    const OPTIONS: EmblaOptionsType = { loop: true, axis: "y" };
    const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [
      WheelGesturesPlugin(),
    ]);

    const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
      emblaApi,
      prevBtnNode,
      nextBtnNode
    );
    const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
      emblaApi,
      dotsNode
    );

    emblaApi.on("destroy", removePrevNextBtnsClickHandlers);
    emblaApi.on("destroy", removeDotBtnsAndClickHandlers);
  }
};
