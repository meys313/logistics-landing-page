"use strict"

$(function (){

    //
    // DOM элементы
    const blockIntro = $('#intro');
    const blockHeader = $('header');


    const blockIntroHeight = blockIntro.innerHeight();

    $(window).on("scroll", function (event){
       headerScroll();
    });


    const headerScroll = () => {
        let windowTopPosition = $(this).scrollTop();
        if( windowTopPosition >= blockIntroHeight){
            blockHeader.addClass("header--scroll")
        } else{
            blockHeader.removeClass("header--scroll")
        }


    }



    $("[data-scroll]").on("click", function (event){
        event.preventDefault();
        let element = $(this).data("scroll");
        let elementPosition = $(element).offset().top;

        $("html, body").animate({
            scrollTop: elementPosition
        }, 500)
    })


    let windowHeight = $(window).height();

    $(window).on("scroll", function (){
        let windowTopPosition = $(this).scrollTop();
        $("[data-scrollspy]").each(function (){
           let section = $(this).data('scrollspy')
           let sectionTopPosition = $(this).offset().top - (windowHeight * 0.3);

            if(windowTopPosition >= sectionTopPosition){
                $(".nav [data-scroll]").removeClass('active')
                $(`.nav [data-scroll="#${section}"]`).addClass('active')
           }

            if(windowTopPosition === 0){
                $(".nav [data-scroll]").removeClass('active')
            }
        })
    });
});




