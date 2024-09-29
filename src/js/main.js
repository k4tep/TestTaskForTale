import '../scss/styles.scss';
import * as bootstrap from 'bootstrap';

const picArray = document.querySelectorAll('.js-thumbnail');
const indicators = document.querySelectorAll('.carousel__indicatorItem');
const picShow = document.querySelector('.js-imageCarousel');
const sizes = document.querySelectorAll('.js-sizeSelector');
const image = document.querySelector('.carousel__image');
const detailsElements = document.querySelectorAll('.js-customAccordionItem');

let currentIndex = 0;

let isProgrammaticScroll = false;

function selectPicture(index) {
    isProgrammaticScroll = true;
    picShow.scrollTo({
        top: index === 0 ? 0 : index * image.clientHeight,
    });
    picArray.forEach((img) =>
        img.classList.remove('pdp__thumbnail--active', 'pdp__thumbnail--focused')
    );
    picArray[index].classList.add('pdp__thumbnail--active', 'pdp__thumbnail--focused');

    setTimeout(() => {
        isProgrammaticScroll = false;
    }, 200);
}

function selectSize(index) {
    sizes.forEach((size) => size.classList.remove('pdp__size--clicked'));
    sizes[index].classList.add('pdp__size--clicked');
}

function selectDetail(index) {
    detailsElements.forEach((detail) => detail.removeAttribute('open'));
}

picShow.addEventListener('scroll', () => {
    if (isProgrammaticScroll) return;
    if (window.innerWidth > 991) {
        picArray.forEach((img) =>
            img.classList.remove('pdp__thumbnail--active', 'pdp__thumbnail--focused')
        );
        picArray[Math.floor(picShow.scrollTop / image.clientHeight)].classList.add(
            'pdp__thumbnail--active',
            'pdp__thumbnail--focused'
        );
    } else {
        indicators.forEach((indicator) =>
            indicator.classList.remove('carousel__indicatorItem--active')
        );
        indicators[Math.round(picShow.scrollLeft / image.clientWidth)].classList.add(
            'carousel__indicatorItem--active'
        );
    }
});

sizes.forEach((size, index) => {
    size.addEventListener('click', () => {
        selectSize(index);
    });
});

detailsElements.forEach((detail, index) => {
    detail.addEventListener('click', () => {
        if (!detail.hasAttribute('open')) {
            selectDetail(index);
        }
    });
});

picArray.forEach((picture, index) => {
    picture.addEventListener('click', () => {
        currentIndex = index;
        selectPicture(index);
    });
    picture.addEventListener('mouseover', () => {
        selectPicture(index);
        picArray[currentIndex].classList.add('pdp__thumbnail--active', 'pdp__thumbnail--focused');
    });
    picture.addEventListener('mouseout', () => {
        selectPicture(currentIndex);
    });
});
