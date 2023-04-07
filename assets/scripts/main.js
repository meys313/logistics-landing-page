"use strict"

// DOM элементы
const blockIntro = $('#intro');
const blockHeader = $('header');


const blockIntroHeight = blockIntro.innerHeight();

$(window).on("scroll", function (event){
    let windowTopPosition = $(this).scrollTop();
    if( windowTopPosition >= blockIntroHeight){
        blockHeader.addClass("header--scroll")
    } else{
        blockHeader.removeClass("header--scroll")
    }
});

