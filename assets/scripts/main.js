"use strict"

$(function (){

    //  window height
    let windowHeight = $(window).height();

    // DOM элементы
    const body = $('body');
    const blockIntro = $('#intro');
    const blockHeader = $('header');

    const blockIntroHeight = blockIntro.innerHeight();


    $(window).on("scroll", function (event){
        let windowTopPosition = $(this).scrollTop();
        headerScroll(windowTopPosition);
        detectActiveNav(windowTopPosition);
    });

    $("[data-scroll]").on("click", function (event){
        event.preventDefault();
        goToSection(event);
    })


    const headerScroll = (windowTopPosition) => {
        if( windowTopPosition >= blockIntroHeight){
            blockHeader.addClass("header--scroll")
        } else{
            blockHeader.removeClass("header--scroll")
        }
    }

    const goToSection = (event) => {
        let element = $(event.currentTarget).data("scroll");
        let elementPosition = $(element).offset().top;

        $("html, body").animate({
            scrollTop: elementPosition
        }, 500)
    }



    const detectActiveNav = (windowTopPosition) => {
        const sections =  $("[data-scrollspy]");
        sections.each(
            function (){
                let section = $(this).data('scrollspy')
                let sectionTopPosition = $(this).offset().top - (windowHeight * 0.3);
                if(windowTopPosition >= sectionTopPosition){
                    $(".nav [data-scroll]").removeClass('active')
                    $(`.nav [data-scroll="#${section}"]`).addClass('active')
                }

                if(windowTopPosition === 0){
                    $(".nav [data-scroll]").removeClass('active')
                }
            }
        )
    }

    //     modal

    $('[data-modal]').on('click', function(event){
        event.preventDefault();

        let modal = $(this).data('modal');
        body.addClass('no-scroll');

        $(modal).addClass("show");

        setTimeout(function (){
            $(modal).find('.modal__inner').addClass('animate')
        })

    });

    $('[data-modal-close]').on('click', function (event){
        event.preventDefault();

        let modal =  $(this).parents('.modal');
        $(modal).find('.modal__inner').removeClass('animate')
        setTimeout(function (){
            modal.removeClass('show');
            body.removeClass('no-scroll');

        }, 200)
    })

    $('.modal').on('click', function(event){
        $(this).find('.modal__inner').removeClass('animate')
        setTimeout(() => {
            $(this).removeClass('show');
            body.removeClass('no-scroll');

        }, 200)
    })
    $('.modal__inner').on('click', function(event){
        event.stopPropagation();
    })

});




