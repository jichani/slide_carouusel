let $slides = document.querySelector(".slides"),
  $$slide = document.querySelectorAll(".slides div"),
  $prevBtn = document.querySelector(".prev"),
  $nextBtn = document.querySelector(".next"),
  $inner = document.querySelector(".inner img"),
  currentIdx = 0,
  slideCount = $$slide.length,
  slideWidth = 10.4166,
  slideMargin = 1.5625,
  timer = undefined;


makeClone();

function makeClone() {
  // slides li 뒤 쪽에 자식들을 추가해줌
  for (let i = 0; i < slideCount; i++) {
    // a.cloneNode(), a.cloneNode(true);
    let cloneSlide = $$slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    // a.appendchild(b);
    $slides.appendChild(cloneSlide);
  }
  // slides li 앞 쪽에 자식들을 추가해줌
  for (let i = slideCount - 1; i >= 0; i--) {
    // a.cloneNode(), a.cloneNode(true);
    let cloneSlide = $$slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    // a.prepend(b);
    $slides.prepend(cloneSlide);
  }
  updateWidth();
  setInitialPosition();

  setTimeout(function () {
    $slides.classList.add("animated");
  }, 100);
}

function updateWidth() {
  let currentSlides = document.querySelectorAll(".slides div");
  let newSlideCount = currentSlides.length;

  let newWidth =
    (slideWidth + slideMargin) * newSlideCount - slideMargin + "vw";
  $slides.style.width = newWidth;
}

function setInitialPosition() {
  let initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
  // slides { transform:translateX(-1000px);}
  $slides.style.transform = `translateX(${initialTranslateValue}vw)`;
}

function moveSlide(num) {
  $slides.style.left = -num * (slideWidth + slideMargin) + "vw";
  currentIdx = num;
  // console.log(currentIdx, slideCount);

  if (currentIdx == slideCount || currentIdx == -slideCount) {
    setTimeout(function () {
      $slides.classList.remove("animated");
      $slides.style.left = "0px";
      currentIdx = 0;
    }, 500);
    setTimeout(function () {
      $slides.classList.add("animated");
    }, 600);
  }
}

// 이미지 선택 시 이미지 변경
const $$buttons = document.querySelectorAll(".slides div img");
// console.dir(buttons);

function buttonClickHandler() {
  // console.log(this.alt);
  $inner.src = `./img/${this.alt}.jpg`;
}

$$buttons.forEach((button) => {
  button.addEventListener("click", buttonClickHandler);
});

// 무한 반복 (loop)
// clearInterval(timer);
function autoSlide() {
  if (timer == undefined) {
    timer = setInterval(function () {
      moveSlide(currentIdx + 1);
      // 여기에 집어넣기
      // console.log(currentIdx);
      // currentIdx가 5개일 때 -5까지 내려가므로 6을 더해주어야 한다.
      let currentImg = document.querySelector(`.slides div:nth-child(${currentIdx + 6}) img`)

      // console.dir(currentImg);
      $inner.src = `./img/${currentImg.alt}.jpg`;

    }, 3000);
  }
}

function changeSlide() {
  moveSlide(currentIdx);
  // console.log(currentIdx);
  // currentIdx가 5개일 때 -5까지 내려가므로 6을 더해주어야 한다.
  let currentImg = document.querySelector(`.slides div:nth-child(${currentIdx + 6}) img`)
  // console.dir(currentImg);
  $inner.src = `./img/${currentImg.alt}.jpg`;
}

autoSlide();

function stopSlide() {
  clearInterval(timer);
  timer = undefined;
  //   console.log(timer);
}

$slides.addEventListener("mouseenter", function () {
  stopSlide();
});
$slides.addEventListener("mouseleave", function () {
  autoSlide();
});
$nextBtn.addEventListener("click", function () {
  stopSlide();
  moveSlide(currentIdx + 1);
  changeSlide();
});
$prevBtn.addEventListener("click", function () {
  stopSlide();
  moveSlide(currentIdx - 1);
  changeSlide();
});

// 사이즈 조정 시 빠르게 움직이는 것을 제한하기 위한 코드
window.addEventListener('resize', function () {
  setTimeout(function () {
    $slides.classList.remove("animated");
  }, 50);
  setTimeout(function () {
    $slides.classList.add("animated");
  }, 500);
})