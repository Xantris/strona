$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $("nav").addClass("scrolled");
  } else {
    $("nav").removeClass("scrolled");
  }

  checkPosition();
});

$(document).ready(function() {
  if ($(document).scrollTop() > 50) {
    $("nav").addClass("scrolled");
  }
  checkPosition();
});

function burgerMenu() {
  var nav = $(".navbar-small");
  if (nav.css("display") === "block") {
    nav.css("display", "none");
  } else {
    nav.css("display", "block");
  }
}

let currentTab;
function checkPosition() {
  let selected = false;
  $(".section").each(function() {
    if (isOverlap("#nav", this)) {
      let name = $(this).attr("id");
      let item = $("[data-section=" + name + "]");
      if (item.length) {
        selected = item;
      }
    }
  });

  if (selected && selected != currentTab) {
    $("body")
      .find('[class="active"]')
      .removeClass("active");
    selected.addClass("active");
    currentTab = selected;
  }
}
function isOverlap(idOne, idTwo) {
  let objOne = $(idOne),
    objTwo = $(idTwo),
    topOne = objOne.offset().top,
    topTwo = objTwo.offset().top,
    heightOne = objOne.height(),
    heightTwo = objTwo.height();
  return (
    topOne + heightOne >= topTwo && topOne + heightOne < topTwo + heightTwo
  );
}
