/*
--------------------------------
Vimeo Carousel Gallery
--------------------------------
+ https://github.com/pinceladasdaweb/Vimeo-Carousel-Gallery
+ version 1.2.0
+ Copyright 2014 Pedro Rogerio
+ Licensed under the MIT license

+ Documentation: https://github.com/pinceladasdaweb/Vimeo-Carousel-Gallery
*/

var Vimeo = {
    init: function (config) {
        this.container = config.container;
        this.attach();
        this.fetch();
    },
    getId: function (url) {
        var vid = url.match(/https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/);
        if (vid) {
            return vid[3];
        }
    },
    attach: function () {
        var self = this,
            main = self.getId(data.main),
            structure = [
            '<div class="featured">',
                '<iframe src="http://player.vimeo.com/video/'+main+'" width="960" height="540" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen />',
            '</div>',
            '<div class="carousel-container cf">',
                '<span class="shadow shadow-left" />',
                '<span class="prev controll" />',
                '<div class="carousel-inner">',
                    '<ul class="slider cf" />',
                '</div>',
                '<span class="next controll" />',
                '<span class="shadow shadow-right" />',
            '</div>'
        ];

        if (main) {
            $(structure.join('')).appendTo(self.container);
        } else {
            throw new Error('The url of the video page is wrong or not defined');
        }
    },
    fetch: function () {
        var self     = this,
            videos   = data.videos,
            carousel = $('.carousel-container'),
            i, l;

        for (i = 0, l = videos.length; i < l; i += 1) {
            var id = self.getId(videos[i].url);

            $.getJSON('http://www.vimeo.com/api/v2/video/' + id + '.json?callback=?', {format: "json"}).done(function (data) {
                var url   = data[0].url,
                    thumb = data[0].thumbnail_large,
                    title = data[0].title,
                    els   = [
                        '<li class="thumb">',
                            '<a title="'+title+'" href="'+url+'">',
                                '<img src="'+thumb+'" alt="'+title+'" title="'+title+'">',
                            '</a>',
                        '</li>'
                    ].join('');

                carousel.find('.slider').append(els);
            });
        }

        $(window).load(function () {
            self.carousel();
        })
    },
    carousel: function () {
        var self      = this,
            slider    = $('.slider'),
            controll  = $('.carousel-container .controll'),
            featured  = $('.featured'),
            photosLen = slider.find('li').length;

        if (photosLen > 3) {
            var itemWidth = $('.slider li').outerWidth(true);

            controll.css({display: 'block'});

            slider.css({
                left: '-'+itemWidth+'px'
            });

            slider.find('li:first').before(slider.find('li:last'));

            $(self.container).on('click', '.carousel-container .controll', function (){
                var $this = $(this);

                if ($this.hasClass('next')) {
                    var leftIndent = parseInt(slider.css('left')) - itemWidth;

                    $('.slider:not(:animated)').animate({'left' : leftIndent}, 500, function () {
                        slider.find('li:last').after(slider.find('li:first'));
                        slider.css({left : '-'+itemWidth+'px'});
                    });
                } else {
                    var leftIndent = parseInt(slider.css('left')) + itemWidth;
                    $('.slider:not(:animated)').animate({'left' : leftIndent}, 500, function () {
                        slider.find('li:first').before(slider.find('li:last'));
                        slider.css({left : '-'+itemWidth+'px'});
                    });
                }
            });
        };

        $(self.container).on('click', '.thumb', function (e) {
            e.preventDefault();
            var href = $(this).find('a').attr('href');

            featured.find('iframe').attr({'src' : 'http://player.vimeo.com/video/'+self.getId(href)+'?autoplay=1'});
            slider.find('li').removeClass('current');
            $(this).addClass('current');
        });
    }
}