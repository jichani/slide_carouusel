let slides = document.querySelector(".slides"),
  slide = document.querySelectorAll(".slides div"),
  currentIdx = 0,
  slideCount = slide.length,
  slideWidth = 10.4166,
  slideMargin = 1.5625,
  prevBtn = document.querySelector(".prev"),
  nextBtn = document.querySelector(".next");

makeClone();

function makeClone() {
  // slides li 뒤 쪽에 자식들을 추가해줌
  for (let i = 0; i < slideCount; i++) {
    // a.cloneNode(), a.cloneNode(true);
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    // a.appendchild(b);
    slides.appendChild(cloneSlide);
  }
  // slides li 앞 쪽에 자식들을 추가해줌
  for (let i = slideCount - 1; i >= 0; i--) {
    // a.cloneNode(), a.cloneNode(true);
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    // a.prepend(b);
    slides.prepend(cloneSlide);
  }
  updateWidth();
  setInitialPosition();

  setTimeout(function () {
    slides.classList.add("animated");
  }, 100);
}

function updateWidth() {
  let currentSlides = document.querySelectorAll(".slides div");
  let newSlideCount = currentSlides.length;

  let newWidth =
    (slideWidth + slideMargin) * newSlideCount - slideMargin + "vw";
  slides.style.width = newWidth;
}

function setInitialPosition() {
  let initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
  // slides { transform:translateX(-1000px);}
  slides.style.transform = `translateX(${initialTranslateValue}vw)`;
}

nextBtn.addEventListener("click", function () {
  moveSlide(currentIdx + 1);
});
prevBtn.addEventListener("click", function () {
  moveSlide(currentIdx - 1);
});

function moveSlide(num) {
  slides.style.left = -num * (slideWidth + slideMargin) + "vw";
  currentIdx = num;
  // console.log(currentIdx, slideCount);

  if (currentIdx == slideCount || currentIdx == -slideCount) {
    setTimeout(function () {
      slides.classList.remove("animated");
      slides.style.left = "0px";
      currentIdx = 0;
    }, 500);
    setTimeout(function () {
      slides.classList.add("animated");
    }, 600);
  }
}

// 이미지 선택 시 이미지 변경

const buttons = document.querySelectorAll(".slides div img");
// console.dir(buttons);

function buttonClickHandler() {
  // console.log(this.alt);
  let inner = document.querySelector(".inner img");
  inner.src = `./img/${this.alt}.jpg`;
}

buttons.forEach((button) => {
  button.addEventListener("click", buttonClickHandler);
});



// 무한 반복 (loop)
// clearInterval(timer);

var timer = undefined;

function autoSlide() {
  if (timer == undefined) {
    timer = setInterval(function () {
      moveSlide(currentIdx + 1);
      // 여기에 집어넣기
      let inner = document.querySelector(".inner img");
      // console.log(currentIdx);
      // 바껴야 하는 값은 div가 2부터 시작이므로 1을 더해주어야 한다.
      let currentImg = document.querySelector(`.slides div:nth-child(${currentIdx + 1}) img`)

      // console.dir(currentImg);
      inner.src = `./img/${currentImg.alt}.jpg`;

    }, 3000);
  }
}

autoSlide();

function stopSlide() {
  clearInterval(timer);

  timer = undefined;
  //   console.log(timer);
}
slides.addEventListener("mouseenter", function () {
  stopSlide();
});
slides.addEventListener("mouseleave", function () {
  autoSlide();
});

// 사이즈 조정 시 빠르게 움직이는 것을 제한하기 위한 코드
window.addEventListener('resize', function () {
  setTimeout(function () {
    slides.classList.remove("animated");
  }, 50);
  setTimeout(function () {
    slides.classList.add("animated");
  }, 500);
})