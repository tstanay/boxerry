$(function () {
	bx.init();

    $('.auth-btn').click(function(){
        var block = $('.auth-form__backdrop');
        block.removeClass('topline-modal-hidden dn');
        setTimeout(function() {block.find('.auth-form__sidebar-container').removeClass('hidden-sidebar');}, 50);
    });

    $('.topline-modal__close').click(function(){
        var block = $('.auth-form__backdrop');
        block.addClass('topline-modal-hidden dn');
    });

    $('.restore-password').click(function(evt){
    	$('.request-password-reset').show();
		$('.account-login').hide();
		$('.signup-modal').hide();
        evt.preventDefault();
	});

    $('.auth-form__back-link').click(function(evt){
        $('.account-login').show();
        $('.request-password-reset').hide();
        $('.signup-modal').hide();
        evt.preventDefault();
    });

    $('.reg-modal').click(function(evt){
        $('.signup-modal').show();
        $('.account-login').hide();
        evt.preventDefault();
    });

    $('.authorization-btn-modal').click(function(evt){
        $('.signup-modal').hide();
        $('.account-login').show();
        evt.preventDefault();
    });

});

var bx = {
	init: function () {
		this.initAddToCart();
		this.initQuickView();
	},
	initRevSlider: function () {
		$(document).ready(function () {
			var setREVStartSize = function () {
				try {
					var e = new Object, i = $(window).width(), t = 9999, r = 0, n = 0, l = 0, f = 0, s = 0, h = 0;
					e.c = $('#rev_slider_21_1');
					e.gridwidth = [1200];
					e.gridheight = [540];

					e.sliderLayout = "fullwidth";
					if (e.responsiveLevels && ($.each(e.responsiveLevels, function (e, f) {
							f > i && (t = r = f, l = e), i > f && f > r && (r = f, n = e)
						}), t > r && (l = n)), f = e.gridheight[l] || e.gridheight[0] || e.gridheight, s = e.gridwidth[l] || e.gridwidth[0] || e.gridwidth, h = i / s, h = h > 1 ? 1 : h, f = Math.round(h * f), "fullscreen" == e.sliderLayout) {
						var u = (e.c.width(), $(window).height());
						if (void 0 != e.fullScreenOffsetContainer) {
							var c = e.fullScreenOffsetContainer.split(",");
							$.each(c, function (e, i) {
								u = $(i).length > 0 ? u - $(i).outerHeight(!0) : u
							}), e.fullScreenOffset.split("%").length > 1 && void 0 != e.fullScreenOffset && e.fullScreenOffset.length > 0 ? u -= $(window).height() * parseInt(e.fullScreenOffset, 0) / 100 : void 0 != e.fullScreenOffset && e.fullScreenOffset.length > 0 && (u -= parseInt(e.fullScreenOffset, 0))
						}
						f = u
					} else void 0 != e.minHeight && f < e.minHeight && (f = e.minHeight);
					e.c.closest(".rev_slider_wrapper").css({height: f})
				} catch (d) {
					console.log("Failure at Presize of Slider:" + d)
				}
			};

			setREVStartSize();
			if ($("#rev_slider_21_1").revolution == undefined) {
				revslider_showDoubleJqueryError("#rev_slider_21_1");
			} else {
				$("#rev_slider_21_1").show();
				var revapi21 = $("#rev_slider_21_1").revolution({
					sliderType: "standard",
					jsFileLocation: "/js/",
					sliderLayout: "fullwidth",
					dottedOverlay: "none",
					delay: 9000,
					navigation: {
						keyboardNavigation: "off",
						keyboard_direction: "horizontal",
						mouseScrollNavigation: "off",
						onHoverStop: "off",
						touch: {
							touchenabled: "on",
							swipe_threshold: 75,
							swipe_min_touches: 1,
							swipe_direction: "horizontal",
							drag_block_vertical: false
						}
						,
						arrows: {
							style: "hades",
							enable: true,
							hide_onmobile: false,
							hide_onleave: true,
							hide_delay: 200,
							hide_delay_mobile: 1200,
							tmp: '<div class="tp-arr-allwrapper">	<div class="tp-arr-imgholder"></div></div>',
							left: {
								h_align: "left",
								v_align: "center",
								h_offset: 20,
								v_offset: 0
							},
							right: {
								h_align: "right",
								v_align: "center",
								h_offset: 20,
								v_offset: 0
							}
						}
					},
					gridwidth: 1200,
					gridheight: 540,
					lazyType: "none",
					parallax: {
						type: "mouse",
						origo: "enterpoint",
						speed: 400,
						levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
					},
					shadow: 0,
					spinner: "spinner0",
					stopLoop: "off",
					stopAfterLoops: -1,
					stopAtSlide: -1,
					shuffle: "off",
					autoHeight: "off",
					disableProgressBar: "on",
					hideThumbsOnMobile: "off",
					hideSliderAtLimit: 0,
					hideCaptionAtLimit: 0,
					hideAllCaptionAtLilmit: 0,
					startWithSlide: 0,
					debugMode: false,
					fallbacks: {
						simplifyAll: "off",
						nextSlideOnWindowFocus: "off",
						disableFocusListener: "off"
					}
				});
			}
		});
	},
	calculatePrice: function(id, points, success) {
		$.get('/cart/calculate-price', {id: id, points: points}, function(r) {
			if (r.price) {
				success(r);
			}
		});
	},
	initProduct: function() {
		$('#product-pack').owlCarousel({
			items: 1,
			loop: false,
			margin: 10,
			nav: true,
			singleItem: true
		});

		$('.product-info .images-list a').on('click', function(e) {
			e.preventDefault();
			var button = $(this).find('img');

			$('.product-info .main-image img').prop('src', button.data('image'));

			return false;
		})
	},
	initAddToCart: function () {
		$(document).on('click', '.add_to_cart_button', function (e) {
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
				bx.calculatePrice(block.data('id'), points, function(r) {
					amount.text(r.price);
					input.val(r.points);
				});
			} else {
				if (points > 0) {
					points = points - 1;
					bx.calculatePrice(block.data('id'), points, function(r) {
						amount.text(r.price);
						input.val(r.points);
					});
				}
			}
		});

		$('.cart input.qty').on('change', function() {
			var block = $(this),
				points = block.val(),
				amount = block.parents('.summary').find('.amount');

			bx.calculatePrice(block.data('id'), points, function(r) {
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
	}
}