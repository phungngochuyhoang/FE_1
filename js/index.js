const $submennu = $(".submenu");
const $submenuItem = $(".submenu-item");

const constObject = {
  speedWeb: 200,
  delayWeb: 2000,
  events: {
    click: "click",
    mousemove: "mousemove",
    change: "change",
    keydown: "keydown",
  },
};

// only with menu level 1
const dropdownTreeLevelOne = function (parent, child, speedTime = null) {
  $submenuItem.hide();
  parent.each(function (i, el) {
    $(el).click(function () {
      child.each((index, element) => {
        if ($(element).data("submenu-id") == i + 1)
          $(element).slideToggle(speedTime);
      });
    });
  });
};
// read url file, but logic works with imgs
const readURL = function (input, imagePreview) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      $(imagePreview).css("background-image", `url(${e.target.result})`);
      $(imagePreview).hide();
      $(imagePreview).fadeIn(650);
    };
    reader.readAsDataURL(input.files[0]);
  }
};
// code animation event scroll - (logic chưa nghĩ ra tốt hơn)
const animationSilde = function ($elementParent, classElement) {
  $elementParent.hide();
  $elementParent.each(function () {
    let imagePos = $(this).offset().top;
    let topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow + 1) {
      $(this).show();
      $(this).addClass(classElement);
    }
  });
};
// slide down only use for select
const slideDown = function (
  parentEvent,
  eventName,
  showList,
  speedTime = null
) {
  showList.hide();
  parentEvent.on(eventName, function (event) {
    event.stopPropagation();
    $(window).click(() => showList.slideUp(speedTime));
    showList.slideToggle(speedTime);
  });
};
// select input
const selectInput = function (parentEvent, eventName, inputValue, typeList) {
  inputValue.val(typeList);
  parentEvent.each((i, el) => {
    $(el).on(eventName, () => inputValue.val(el.innerHTML));
  });
};
// select image
const selectImg = function ($replaceImage, $listImage) {
  $listImage.each((i, el) =>
    $(el).click(() => {
      $replaceImage.css("background-image", `url(${el.src})`);
      $replaceImage.hide();
      $replaceImage.fadeIn(650);
    })
  );
};
// enabled input
const enabledInput = function ($eleSelect, eventName, enabled = false) {
  $eleSelect.on(eventName, function () {
    console.log($(this).prev());
    $(this).prev().prop("disabled", enabled);
    enabled = !enabled;
  });
};
//menu mobile transition
const menuMobileTransition = function (
  menu,
  eventName,
  leftIndex,
  time,
  $start,
  $end
) {
  if (!$end) {
    $start.on(eventName, () => {
      menu.animate({ left: `${leftIndex}%` }, time);
      $("body").css("overflow", "hidden");
    });
  } else {
    $end.on(eventName, () => {
      menu.animate({ left: `${leftIndex}%` }, time);
      $("body").css("overflow", "");
    });
  }
};

$(document).ready(function () {
  menuMobileTransition(
    $(".temp-navbar"),
    constObject.events.click,
    0,
    constObject.speedWeb,
    $(".open-nav")
  );
  menuMobileTransition(
    $(".temp-navbar"),
    constObject.events.click,
    -100,
    constObject.speedWeb,
    $(".open-nav"),
    $(".temp-navbar .fa-angle-left")
  );
  dropdownTreeLevelOne($submennu, $submenuItem, constObject.speedWeb);
});
