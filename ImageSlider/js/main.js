// Number of Current Slide
let currentSlide = document.querySelector(".slide-number");

// Slider Images
let imgs = document.querySelectorAll(".slider-container img");

// Container of numbering The images
let containerNum = document.querySelector(".slider-controls ul");

// Control on Slides
let control = document.querySelector(".slider-controls");

// Next Button to Display Next Image
let nxt = document.querySelector(".slider-controls .next");

// Previous Button to Display Previous Image
let prv = document.querySelector(".slider-controls .prev");

// Add Class Active to first Image
imgs[0].classList.add("active");

// Create Numbering Selector According To number of Images
for (let i = 1; i <= imgs.length; i++) {
  let numImgs = document.createElement("li");

  // Add Class Active to first num
  if (i == 1) numImgs.classList.add("active");
  numImgs.innerText = `${i}`;

  containerNum.appendChild(numImgs);
}

// Numbering The Slide According the Selected Image
function numSlide() {
  imgs.forEach((img, index) => {
    if (img.classList.contains("active"))
      currentSlide.innerText = `Slide #${index + 1} of ${imgs.length}`;
  });
}

// Check if Image is the First Or Last to prevent next or Previous
function checkNxtBrv() {
  if (imgs[0].classList.contains("active")) {
    prv.classList.add("disable");
  } else {
    prv.classList.remove("disable");
  }
  if (imgs[imgs.length - 1].classList.contains("active")) {
    nxt.classList.add("disable");
  } else {
    nxt.classList.remove("disable");
  }
}

// Numbring Images
let numImgsSelector = document.querySelectorAll(".slider-controls li");

function numSlector() {
  imgs.forEach((img, index) => {
    // Remove All Active Class Then Add it To The Selctor image
    if (img.classList.contains("active")) {
      numImgsSelector.forEach((e) => e.classList.remove("active"));
      numImgsSelector[index].classList.add("active");
    }
  });
}

// To Track the Limitations of Slides
let nextCounter = 0;

function controlSlides() {
  checkNxtBrv();
  numSlide();
  control.onclick = (e) => {
    if (e.target.classList.contains("next")) {
      nextCounter++;

      imgs.forEach((img) => {
        img.classList.remove("active");
      });

      imgs[nextCounter].classList.add("active");
    } else if (e.target.classList.contains("prev")) {
      nextCounter--;

      imgs.forEach((img) => {
        img.classList.remove("active");
      });

      imgs[nextCounter].classList.add("active");
    }
    checkNxtBrv();
    numSlector();
    numSlide();
  };
  
  numImgsSelector.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      imgs.forEach((img) => {
        img.classList.remove("active");
      });
      imgs[+e.target.innerText - 1].classList.add("active");
      nextCounter = +e.target.innerText - 1;
    });
  });

}

controlSlides();
