"use strict"

$(function (){
    // DOM элементы
    const body = $('body');
    const blockIntro = $('#intro');
    const blockHeader = $('header');

    const blockIntroHeight = blockIntro.innerHeight();

    // nav
    let navToggle = $('#navToggle');
    let nav = $('#nav');

    navToggle.on('click', function(event){
        event.preventDefault();
        $(this).toggleClass('active');
        nav.toggleClass('show');

        body.toggleClass('no-scroll')
    })

    nav.on('click', function (){
        if($(this).hasClass('show')){
            navToggle.removeClass('active');
            $(this).removeClass('show');
            body.removeClass('no-scroll');
        }
    })
    //  window height
    let windowHeight = $(window).height();



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

    // aos

    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 400, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });

});




