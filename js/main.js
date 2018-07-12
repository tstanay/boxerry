$(function () {
    bx.init();

    $('.auth-btn').click(function () {
        var block = $('.auth-form__backdrop');
        block.removeClass('topline-modal-hidden dn');
        setTimeout(function () {
            block.find('.auth-form__sidebar-container').removeClass('hidden-sidebar');
        }, 20);

        return false;
    });

    $('.topline-modal__close').click(function () {
        var block = $('.auth-form__backdrop');
        block.find('.auth-form__sidebar-container').addClass('hidden-sidebar');

        setTimeout(function () {
            block.addClass('topline-modal-hidden dn');
        }, 200);

    });

    $('.restore-password').click(function (evt) {
        $('.request-password-reset').show();
        $('.account-login').hide();
        $('.signup-modal').hide();
        evt.preventDefault();
    });

    $('.auth-form__back-link').click(function (evt) {
        $('.account-login').show();
        $('.request-password-reset').hide();
        $('.signup-modal').hide();
        evt.preventDefault();
    });

    $('.reg-modal').click(function (evt) {
        $('.signup-modal').show();
        $('.account-login').hide();
        $('.request-password-reset').hide();
        evt.preventDefault();
    });

    $('.authorization-btn-modal').click(function (evt) {
        $('.signup-modal').hide();
        $('.account-login').show();
        $('.request-password-reset').hide();
        evt.preventDefault();
    });

    $('#point_1').click(function(){
        $('.block_1').show();
        $('.block_2').hide();
        $('.block_3').hide();
    });

    $('#point_2').click(function(){
        $('.block_2').show();
        $('.block_1').hide();
        $('.block_3').hide();
    });

    $('#point_3').click(function(){
        $('.block_3').show();
        $('.block_1').hide();
        $('.block_2').hide();
    });
});

$('.wpb_wrapper').mousemove(function(e){
    parallaxIt(e, '.slideshow_1', -200);
    parallaxIt(e, '.slideshow_2', -100);
    //parallaxIt(e, '.main-page-slider', -300);
});

function parallaxIt(e, target, movement){
    var $this = $('.wpb_wrapper');
    var relX = e.pageX - $this.offset().left;
    var relY = e.pageY - $this.offset().top;

    TweenMax.to(target, 1, {
        x: (relX - $this.width()/2) / $this.width() * movement,
        y: (relY - $this.height()/2) / $this.height() * movement
    })
}

var bx = {
    init: function () {
        this.initAddToCart();
        this.initQuickView();
    },
    calculatePrice: function (id, points, success) {
        $.get('/cart/calculate-price', {id: id, points: points}, function (r) {
            if (r.price) {
                success(r);
            }
        });
    },
    initProduct: function () {
        $('#product-pack').owlCarousel({
            items: 1,
            loop: false,
            margin: 10,
            nav: true,
            singleItem: true
        });

        $('.product-info .images-list a').on('click', function (e) {
            e.preventDefault();
            var button = $(this).find('img');

            $('.product-info .main-image img').prop('src', button.data('image'));

            return false;
        })
    },
    initAddToCart: function () {
        $(document).on('click', '.add_to_cart_button, .add_tocartbutton', function (e) {
            e.preventDefault();
            var button = $(this),
                ballInput = button.parents('.product-info').find('.qty[type="text"]'),
                params = {};

            if (button.is("[disabled]")) {
                return false;
            }

            if (!e.which) {
                return false;
            }

            if (ballInput.length) {
                params['points'] = ballInput.val();
            }

            $.post('/cart/add/' + button.data('id'), params, function (r) {
                if (r.status == 1) {
                    alert('РџСЂРѕРґСѓРєС‚ СѓСЃРїРµС€РЅРѕ РґРѕР±Р°РІР»РµРЅ РІ РєРѕСЂР·РёРЅСѓ');
                    $('#top-navbar .shopping-cart span').text(r.count);
                } else {
                    alert(r.text);
                }
            });

            return false;
        });

        $('.quantity-adder.quantity .add-action').on('click', function () {
            var input = $("[alt=quantity]", '.quantity-adder'),
                points = parseInt(input.val()),
                block = $('.cart input.qty'),
                amount = block.parents('.summary').find('.amount');

            if ($(this).hasClass('add-up')) {
                points = points + 1;
                bx.calculatePrice(block.data('id'), points, function (r) {
                    amount.text(r.price);
                    input.val(r.points);
                });
            } else {
                if (points > 0) {
                    points = points - 1;
                    bx.calculatePrice(block.data('id'), points, function (r) {
                        amount.text(r.price);
                        input.val(r.points);
                    });
                }
            }
        });

        $('.cart input.qty').on('change', function () {
            var block = $(this),
                points = block.val(),
                amount = block.parents('.summary').find('.amount');

            bx.calculatePrice(block.data('id'), points, function (r) {
                amount.text(r.price);
                block.val(r.points);
            });

        });

        $(document).on('click', '.cart_item .remove', function (e) {
            e.preventDefault();
            var button = $(this);

            $.post('/cart/delete/' + button.data('id'), function (r) {
                if (r.status) {
                    button.parents('.cart_item').remove();
                    //alert('РџСЂРѕРґСѓРєС‚ СѓСЃРїРµС€РЅРѕ СѓРґР°Р»С‘РЅ РёР· РєРѕСЂР·РёРЅС‹');
                }
            });

            return false;
        });
    },
    initQuickView: function () {
        $('a.quickview').click(function (e) {
            e.preventDefault();
            var id = $(this).data('id');
            console.log(id);
            $.get('/product/quickview', {id: id}, function (r) {
                $('#wpo_modal_quickview .modal-body').html(r);
            });
        });

        $('#wpo_modal_quickview').on('hidden.bs.modal', function () {
            $(this).find('.modal-body').empty().append('<span class="spinner"></span>');
        });
    },
    initCartPage: function () {
        $('.checkout-button').on('click', function (e) {
            var btn = $(this);

            $.get('/subscribe/check', function (r) {
                if (r.error) {
                    var modal = $('#cartModal'),
                        productCount = $('.table.cart .cart_item').length;
                    modal.find('.modal-body p').text(r.error);

                    if (productCount <= 1) {
                        modal.find('img.for-2').hide();
                        modal.find('img.for-1').show();
                    } else if (productCount === 2) {
                        modal.find('img.for-1').hide();
                        modal.find('img.for-2').show();
                    }

                    modal.modal('show');
                } else {
                    window.location = btn.attr('href');
                }
            });

            return false;
        })
    }
}