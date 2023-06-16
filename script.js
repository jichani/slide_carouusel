let slides = document.querySelector('.slides'),
    slide = document.querySelectorAll('.slides img'),
    currentIdx = 0,
    slideCount = slide.length,
    slideWidth = 160,
    slideMargin = 20,
    prevBtn = document.querySelector('.prev'),
    nextBtn = document.querySelector('.next');

makeClone();

function makeClone() {
    // slides li 뒤 쪽에 자식들을 추가해줌
    for (let i = 0; i < slideCount; i++) {
        // a.cloneNode(), a.cloneNode(true);
        let cloneSlide = slide[i].cloneNode(true);
        cloneSlide.classList.add('clone');
        // a.appendchild(b);
        slides.appendChild(cloneSlide);
    }
    // slides li 앞 쪽에 자식들을 추가해줌
    for (let i = slideCount - 1; i >= 0; i--) {
        // a.cloneNode(), a.cloneNode(true);
        let cloneSlide = slide[i].cloneNode(true);
        cloneSlide.classList.add('clone');
        // a.prepend(b);
        slides.prepend(cloneSlide);
    }
    updateWidth();
    setInitialPosition();

    setTimeout(function () {
        slides.classList.add('animated');
    }, 100)

}

function updateWidth() {
    let currentSlides = document.querySelectorAll('.slides img');
    let newSlideCount = currentSlides.length;

    let newWidth = (slideWidth + slideMargin) * newSlideCount - slideMargin + 'px';
    slides.style.width = newWidth;
}

function setInitialPosition() {
    let initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
    // slides { transform:translateX(-1000px);}
    slides.style.transform = `translateX(${initialTranslateValue}px)`
}

nextBtn.addEventListener('click', function () {
    moveSlide(currentIdx + 1);
})
prevBtn.addEventListener('click', function () {
    moveSlide(currentIdx - 1);
})

function moveSlide(num) {
    slides.style.left = -num * (slideWidth + slideMargin) + 'px';
    currentIdx = num;
    console.log(currentIdx, slideCount);

    if (currentIdx == slideCount || currentIdx == - slideCount) {
        setTimeout(function () {
            slides.classList.remove('animated');
            slides.style.left = '0px';
            currentIdx = 0;
        }, 500);
        setTimeout(function () {
            slides.classList.add('animated');
        }, 600)
    }
}

// 이미지 선택 시 이미지 변경

const buttons = document.querySelectorAll('.slides img');

function buttonClickHandler() {
    // console.log(this.alt);
    let inner = document.querySelector('.inner img');
    inner.src = `./img/new/${this.alt}.jpg`;
}

buttons.forEach(button => {
    button.addEventListener('click', buttonClickHandler);
});