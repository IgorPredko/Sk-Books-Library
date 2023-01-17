const books = document.querySelectorAll(".book__header");

function playSound() {
  const click = new Audio();
  click.src = "clickSound/click.mp3";
  click.autoplay = true;
}

/////////CIRCLE////////////
const circlePlus = document.querySelectorAll(".circle-plus");
const circlePlusTwo = document.querySelectorAll(".circle-plus-two");

circlePlus.forEach((plus) => {
  plus.addEventListener("click", (event) => {
    plus.classList.toggle("openedCross");
    event.target.closest(".book").classList.toggle("active");
    playSound();
  });
});

circlePlusTwo.forEach((plus) => {
  plus.addEventListener("click", () => {
    plus.classList.toggle("openedCross");
  });
});

///////////STARS////////////
const stars = document.querySelectorAll(".star");
const starInfo = document.querySelector(".star-info");
const cleanBtn = document.querySelectorAll(".clean-btn");

cleanBtn.forEach((btn) => {
  btn.addEventListener("click", function (event) {
    playSound();
    const bookElement = event.target.closest(".book");
    const localStars = bookElement.querySelectorAll(".star");
    const starInfo = bookElement.querySelector(".star-info");

    localStars.forEach((star) => {
      star.innerHTML = "&#9734";
    });

    starInfo.innerHTML = "0 of 5";

    localStorage.removeItem(bookElement.id);
  });
});

stars.forEach((star, i) => {
  const bookId = Math.floor(i / 5);
  const rating = i - 5 * bookId + 1;

  star.onclick = function (event) {
    const bookElement = event.target.closest(".book");
    const localStars = bookElement.querySelectorAll(".star");
    const starInfo = bookElement.querySelector(".star-info");
    localStars.forEach((star, key) => {
      if (key < rating) {
        star.innerHTML = "&#9733";
      } else {
        star.innerHTML = "&#9734";
      }
    });

    starInfo.innerHTML = `${rating} of 5`;

    localStorage.setItem(bookElement.id, rating);
  };
});

/////////////INPUT CLICK SOUND/////////////////////
const inputs = document.querySelectorAll("input");
inputs.forEach((inp) => {
  inp.addEventListener("click", () => {
    playSound();
  });
});
//////////////////LOCAL STORAGE///////////////////////////

document.querySelectorAll("input").forEach((el) => {
  el.onchange = () => localStorage.setItem(el.id, el.checked);
  el.checked = localStorage.getItem(el.id) === "true";
});

document.querySelectorAll(".book").forEach((book) => {
  const savedRecord = localStorage.getItem(book.id);

  if (savedRecord !== null && savedRecord !== undefined) {
    const localStars = book.querySelectorAll(".star");
    const starInfo = book.querySelector(".star-info");

    localStars.forEach((star, key) => {
      if (key < savedRecord) {
        star.innerHTML = "&#9733";
      } else {
        star.innerHTML = "&#9734";
      }
    });

    starInfo.innerHTML = `${savedRecord} of 5`;
  }
});

//////////////////TIMELINE/////////////////////
// let newDiv = document.querySelectorAll(".list");
// newDiv.forEach((elem) => {
//   elem.addEventListener("click", () => {
//     playSound();
//   });
// });

const neonButton = document.querySelector(".neon-button");
let fogImage = document.querySelectorAll(".fog-img");
const timeLine = document.querySelector(".timeline-container");
const content = document.querySelector(".content");
const bookWrap = document.querySelector(".book-wrapper");
let book = document.querySelectorAll(".book");

neonButton.addEventListener("click", () => {
  playSound();
  console.log("hello");

  if (neonButton.classList.contains("openNeon")) {
    neonButton.classList.remove("openNeon");
    neonButton.innerHTML = "Show Timeline";
    fogImage.forEach((fog) => {
      fog.style.display = "none";
    });
    timeLine.style.opacity = "0";
    showAllBooks();
  } else {
    neonButton.classList.add("openNeon");
    neonButton.innerHTML = "Show All";
    // timeLine.style.display = "table";
    timeLine.style.opacity = "1";
    fogImage.forEach((fog) => {
      fog.style.display = "flex";
      content.style.animation = "2s backgroundWhite forwards";
      removeAllBooks();
    });
  }
});

function showAllBooks() {
  for (let i = 0; i < book.length; i++) {
    bookWrap.appendChild(book[i]);
    bookWrap.style.animation = "2s backgroundBlack forwards";
    book[i].style.width = "100%";
  }
}

function removeAllBooks() {
  for (let i = 0; i < book.length; i++) {
    bookWrap.removeChild(book[i]);
    // bookWrap.style.display = "none";
    bookWrap.style.animation = "2s backgroundWhite forwards";
    timeLine.appendChild(book[i]);
  }
}

function removeAllBooks() {
  bookWrap.style.display = "none";
  // location.reload();
  setTimeout(() => {
    bookWrap.style.animation = "2s backgroundWhite forwards";
    location.reload();
  }, 130);
}

// function someFunc() {
//   var w = window.innerWidth;
//   if (w < 700) {
//     showAllBooks();
//   }
// }
// someFunc();

// window.addEventListener("resize", function () {
//   someFunc();
//   showAllBooks();
// });
