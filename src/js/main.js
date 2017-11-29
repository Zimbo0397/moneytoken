// import { browser } from './browser';
// import { dialog } from './dialog';

// browser();
var APP;

(function (window, undefined) {
    'use strict';
    APP = function () {
        var methods = {
            js: {
                print: function () {
                    var pdf = document.getElementById('pdf');
                    
                    pdf.focus();
                    pdf.contentWindow.print();
                },
                navigation: function (_self) {
                    // define basic DOM elements START
                    var burgerBtn = document.querySelector('#burger-btn');
                    var headerMobile = document.querySelector('#navigation-panel');
                    var blackshadowEl = document.querySelector('.blackshadow');
                    var mobileMenu = document.querySelector('#mobile-menu');

                    // burger button click behavior START
                    burgerBtn.addEventListener('click', function (e) {
                        e.preventDefault();

                        if (headerMobile.classList.contains('navigation-panel_opened')) {
                            // if header-mobile element is opened

                            APP.js.disable_elements(['navigation-panel_opened', 'mobile-menu_opened']);

                            headerMobile.classList.add('navigation-panel_transparent');

                            APP.js.body_overflow.unfixBody();
                        } else {
                            // if header-mobile element is not opened

                            headerMobile.classList.add('navigation-panel_opened');
                            mobileMenu.classList.add('mobile-menu_opened');

                            APP.js.body_overflow.fixBody();

                            APP.js.disable_elements(['navigation-panel_transparent']);
                        }

                        APP.js.disable_elements(['mobile-information_opened', 'blackshadow_active', 'footer-nav__link_active']);
                    });
                    // burger button click behavior END

                    // blackshadow element click behavior START
                    blackshadowEl.addEventListener('click', function () {

                        APP.js.disable_elements(['side-panel__help-link_active', 'panel-list_opened', 'side-panel_opened', 'footer-nav__link_active', 'mobile-information_opened', 'information-list_active', 'navigation-panel_opened', 'side-panel__help-panel_opened', 'blackshadow_active', 'side-panel__navigation-link_active']);

                        APP.js.body_overflow.unfixBody();
                    });
                    // blackshadow element click behavior END

                    // top fixed panel behavior with window scrolling START
                    (function () {
                        var lastScroll = 0;
                        $(window).on('scroll', function () {
                            var offset = window.pageYOffset;
                            // $('#scrollScroll').text('window' + windowScrollTop + 'offset' + offset);

                            if (offset <= 0) {
                                APP.js.disable_elements(['navigation-panel_hidden']);
                                headerMobile.classList.add('navigation-panel_transparent');
                                return;
                            }

                            if (lastScroll - offset > 0) {
                                headerMobile.classList.remove('navigation-panel_hidden');
                                headerMobile.classList.remove('navigation-panel_transparent');
                                lastScroll = offset;
                            }

                            if (lastScroll < offset) {
                                headerMobile.classList.add('navigation-panel_hidden');
                                lastScroll = offset;
                            }
                        });
                    })();
                },
                // slider_big: function slider_big(_self) {
                //     _self.owlCarousel({
                //         items: 1,
                //         loop: true,
                //         margin: 10,
                //         nav: true,
                //         navText: ''
                //     });
                // },
                body_overflow: function () {
                    var $body = $('body');
                    var isOpened = false;
                    var scrollTop = void 0;
                    return {
                        fixBody: function fixBody() {
                            if (isOpened) return;
                            isOpened = true;
                            scrollTop = $body.scrollTop();

                            $body.width($body.width()).addClass('fixed').css('top', -scrollTop);
                        },
                        unfixBody: function unfixBody() {

                            if (!isOpened) return;

                            isOpened = false;

                            $body.css({
                                'width': 'auto'
                            }).removeClass('fixed');

                            $body.scrollTop(scrollTop);
                        },
                        toggle: function toggle() {
                            if (isOpened) {
                                APP.js.body_overflow.fixBody();
                            } else {
                                APP.js.body_overflow.unfixBody();
                            }
                        },
                        resize: function () {
                            APP.js.body_overflow.unfixBody();
                        }.bind(this)
                    };
                }(),
                disable_elements: function disable_elements(arr) {
                    if (Array.isArray(arr) && arr.length) {
                        arr.forEach(function (elClass) {
                            var elSelector = '.' + elClass;
                            var domElements = Array.from(document.querySelectorAll(elSelector));
                            if (!domElements) {
                                return;
                            }
                            domElements.forEach(function (item) {
                                item.classList.remove(elClass);
                            });
                        });
                    }
                }
            },
            init: function init() {
                $('[data-js]').each(function () {
                    var self = $(this);
                    if (typeof APP.js[self.data('js')] === 'function') {
                        APP.js[self.data('js')](self, self.data());
                    } else {
                        console.log('No `' + self.data('js') + '` function in app.js');
                    }
                });
            }
        };

        return methods;
    }();

    $(function () {
        APP.init();
    });
})(window);