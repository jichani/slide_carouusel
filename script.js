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
  // 첫 번째 for 루프에서 let i = 0 대신 let i = slideCount; i--으로 변경하여 배열을 역순으로 탐색하는 것이 가독성에 좋습니다.
  for (let i = 0; i < slideCount; i++) {
    // a.cloneNode(), a.cloneNode(true);
    let clonedSlide = $$slide[i].cloneNode(true);
    clonedSlide.classList.add("clone");
    // a.appendchild(b);
    $slides.appendChild(clonedSlide);
  }
  // slides li 앞 쪽에 자식들을 추가해줌
  for (let i = slideCount - 1; i >= 0; i--) {
    // a.cloneNode(), a.cloneNode(true);
    let clonedSlide = $$slide[i].cloneNode(true);
    clonedSlide.classList.add("clone");
    // a.prepend(b);
    $slides.prepend(clonedSlide);
  }
  updateWidth();
  setInitialPosition();

  setTimeout(function () {
    $slides.classList.add("animated");
  }, 100);
}

function updateWidth() {
  let clonedSlides = document.querySelectorAll(".slides div");
  let newSlideCount = clonedSlides.length;

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
      updateCurrentSlideImage();

    }, 3000);
  }
}

function updateCurrentSlideImage() {
  // currentIdx가 5개일 때 prevBtn을 빠르게 누르면 -5 이하까지 내려가는데 -6부터 에러가 발생하므로 이를 방지하기 위해서 11을 더해주어야 한다.
  if (currentIdx < 0) {
    let currentImg = document.querySelector(`.slides div:nth-child(${currentIdx + 11}) img`);
    $inner.src = `./img/${currentImg.alt}.jpg`;
  }
  // currentIdx가 5개일 때 currentIdx는 1부터 시작하므로 우리가 바꿔야하는 이미지는 2번째 이미지 이므로 1을 더해준다.
  else {
    let currentImg = document.querySelector(`.slides div:nth-child(${currentIdx + 1}) img`);
    $inner.src = `./img/${currentImg.alt}.jpg`;
  }
}

function changeSlide() {
  moveSlide(currentIdx);
  updateCurrentSlideImage();
}

autoSlide();

function stopSlide() {
  clearInterval(timer);
  timer = undefined;
}

$slides.addEventListener("mouseenter", handleSlideInteraction);
$slides.addEventListener("mouseleave", handleSlideInteraction);
$nextBtn.addEventListener("click", handleSlideNavigation);
$prevBtn.addEventListener("click", handleSlideNavigation);

function handleSlideInteraction() {
  if (event.type === "mouseenter") {
    stopSlide();
  } else if (event.type === "mouseleave") {
    autoSlide();
  }
}

function handleSlideNavigation() {
  stopSlide();
  if (event.target === $nextBtn) {
    moveSlide(currentIdx + 1);
  } else if (event.target === $prevBtn) {
    moveSlide(currentIdx - 1);
  }
  changeSlide();
}

// 사이즈 조정 시 빠르게 움직이는 것을 제한하기 위한 코드
window.addEventListener('resize', function () {
  setTimeout(function () {
    $slides.classList.remove("animated");
  }, 50);
  setTimeout(function () {
    $slides.classList.add("animated");
  }, 500);
})