/*
--------------------------------
Vimeo Carousel Gallery
--------------------------------
+ https://github.com/pinceladasdaweb/Vimeo-Carousel-Gallery
+ version 1.0
+ Copyright 2013 Pedro Rogerio
+ Licensed under the MIT license

+ Documentation: https://github.com/pinceladasdaweb/Vimeo-Carousel-Gallery
*/

var Vimeo = {
    init: function(config) {
        this.container = config.container;
        this.fetch();
    },
    fetch: function() {
        var self        = this,
            carousel    = $('<div class="carousel-container cf"><span class="shadow shadow-left"></span><span class="prev controll"></span><div class="carousel-inner"><ul class="slider cf"></ul></div><span class="next controll"></span><span class="shadow shadow-right"></span></div>'),
            featured    = $('<div class="featured"></div>'),
            main        = self.getId(data.main),
            videos      = data.videos,
            videosUrl   = [];

        if (main) {
            $(self.container).append(featured).append(carousel);
            featured.html(function(){
                var mainVideo = self.getId(data.main);
                return '<iframe src="http://player.vimeo.com/video/'+mainVideo+'" width="960" height="540" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
            });
        } else {
            throw new Error('The url of the video page is wrong or not defined');
        }

        for (var i = 0, l = videos.length; i < l; i += 1) {
            videosUrl.push(videos[i].url);
        }

        for (var i = 0, l = videosUrl.length; i < l; i += 1) {
            var id = self.getId(videosUrl[i]);

            $.getJSON('http://www.vimeo.com/api/v2/video/' + id + '.json?callback=?', {format: "json"}, function(data) {
                var url     = data[0].url,
                    thumb   = data[0].thumbnail_large,
                    title   = data[0].title;
                
                carousel.find('.slider').append('<li class="thumb"><a title="'+title+'" href="'+url+'"><img src="'+thumb+'" alt="'+title+'" title="'+title+'"></a></li>');
            });
        }

        $(window).load(function() {
            self.carousel();
        })
    },
    getId: function(url){
        var vid = url.match(/https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/);
        if(vid){
            return vid[3];
        }
    },
    carousel: function() {
        var self        = this,
            slider      = $('.slider'),
            controll    = $('.carousel-container .controll'),
            featured    = $('.featured'),
            photosLen   = slider.find('li').length;

        if (photosLen > 3) {
            var itemWidth = $('.slider li').outerWidth(true);

            controll.css({display: 'block'});

            slider.css({
                left: '-'+itemWidth+'px'
            });

            slider.find('li:first').before(slider.find('li:last'));

            $(document.body).on('click', '.carousel-container .controll', function(){
                var $this = $(this);

                if($this.hasClass('next')){
                    var leftIndent = parseInt(slider.css('left')) - itemWidth;

                    $('.slider:not(:animated)').animate({'left' : leftIndent}, 500, function() {
                        slider.find('li:last').after(slider.find('li:first'));
                        slider.css({left : '-'+itemWidth+'px'});
                    });
                } else {
                    var leftIndent = parseInt(slider.css('left')) + itemWidth;
                    $('.slider:not(:animated)').animate({'left' : leftIndent}, 500, function() {
                        slider.find('li:first').before(slider.find('li:last'));
                        slider.css({left : '-'+itemWidth+'px'});
                    });
                }
            });
        };

        $(document.body).on('click', '.thumb', function(e) {
            e.preventDefault();
            var href = $(this).find('a').attr('href');

            featured.find('iframe').attr({'src' : 'http://player.vimeo.com/video/'+self.getId(href)+'?autoplay=1'});
            slider.find('li').removeClass('current');
            $(this).addClass('current');
        });
    }
}