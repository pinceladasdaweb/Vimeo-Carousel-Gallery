[Vimeo Carousel Gallery](http://www.pinceladasdaweb.com.br/blog/uploads/vimeo-carousel-gallery/)
======================

Show videos from Vimeo into a chic gallery with jQuery. Unlike from Youtube, Vimeo does not allow you to create custom playlists to display your videos. Thinking about it I created a plugin that when passing a list of urls videos from Vimeo, you create a carousel with information coming from Vimeo, and videos can be seen through the prominently on the page.

##Usage

1. Paste right before your page's closing `</body>` tag

```html
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script type="text/javascript" src="assets/js/lib.js"></script>
```

2. From within a script tag or a JS file

```javascript
var data = {
    "main" : "http://vimeo.com/70161501",
    "videos" : [
        { "url" : "https://vimeo.com/71495477" },
        { "url" : "https://vimeo.com/70775770" },
        { "url" : "https://vimeo.com/71238762" },
        { "url" : "https://vimeo.com/70388552" },
        { "url" : "https://vimeo.com/67890000" },
        { "url" : "https://vimeo.com/70777838" },
        { "url" : "https://vimeo.com/38931673" },
        { "url" : "https://vimeo.com/70286906" }
    ]
}

Vimeo.init({
    container: $('.gallery') //DOM element to append the gallery
});
```
Pass a list of videos to date object where 'main' is the main video and 'videos' are the videos that will in carousel.

The script accepts the Vimeo URL's in the following formats:

```html
"https://vimeo.com/11111111",
"http://vimeo.com/11111111",
"https://www.vimeo.com/11111111",
"http://www.vimeo.com/11111111",
"https://vimeo.com/channels/11111111",
"http://vimeo.com/channels/11111111",
"https://vimeo.com/groups/name/videos/11111111",
"http://vimeo.com/groups/name/videos/11111111",
"https://vimeo.com/album/2222222/video/11111111",
"http://vimeo.com/album/2222222/video/11111111",
"https://vimeo.com/11111111?param=test",
"http://vimeo.com/11111111?param=test"
```
