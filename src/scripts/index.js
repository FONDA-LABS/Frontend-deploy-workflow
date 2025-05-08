// Stylesheets
import '../styles/styles.scss';

// Scripts
import App from "./app.js";
import GallerySwiper from "./gallery-swiper.js";
import AkkordionTag from "./akkordion-tag.js";
import Filter from "./filter.js";
import FactsAnimated from "./facts-animated.js";
import TagSwiper from "./tag-swiper.js";
import CardSwiper from "./card-swiper.js";
import HeroSwiper from "./hero-swiper.js";
import BreadcrumbSwiper from "./breadcrumb-swiper.js";
import TimerSwiper from "./timer-swiper.js";
import Header from "./header.js";
import ColumnCardSwiper from "./column-card-swiper.js";
import Tablist from "./tabs.js";
import BentoAnimated from "./bento-box.js";

// Remove Comment to support Container Queries
/*
const supportsContainerQueries = "container" in document.documentElement.style;
if (!supportsContainerQueries) {
    import("container-query-polyfill");
}
*/

const scripts = {
    app: new App(),
    gallerySwiper: new GallerySwiper(),
    heroSwiper: new HeroSwiper(),
    akkordionTag: new AkkordionTag(),
    filter: new Filter(),
    factsAnimated: new FactsAnimated(),
    tagSwiper: new TagSwiper(),
    cardSwiper: new CardSwiper(),
    breadcrumbSwiper: new BreadcrumbSwiper(),
    timerSwiper: new TimerSwiper(),
    columnCardSwiper: new ColumnCardSwiper(),
    header: new Header(),
    tab: new Tablist(),
    bentoBox: new BentoAnimated(),
};

window.addEventListener("DOMContentLoaded", () => {
    window.site = {};
    Object.entries(scripts).forEach(([key, script]) => {
        window.site[key] = script;
        script._init();
    });
});

window.addEventListener("resize", () => {
    Object.entries(scripts).forEach(([key, script]) => {
    });
});
