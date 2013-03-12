var browser_size = function(){
    var window_width = $(window).width()
	return window_width
}

var photos = []

$(document).ready(function() {
	$('.carousel').carousel({
	    interval: 10000
	})

	setPhotos('outoforder')

	$('.accordion-body a').bind('click', function(){
		var project = $(this).data('gallery')
		setPhotos(project)
	})
})

function setPhotos(show){
	$('.carousel-inner').html('');
	var photos = []
	var json_path = 'gallery/json/gallery.json'
	
	$.getJSON(json_path, function(data){
		for(var i=1;i <= data[show].numberofphotos; i++){
			if(i < 10){
				i = '0' + i
			} else {
				i = i
			}
			var photo = new Photo(data[show], i, show)
			photos.push(photo)
		}
		photos.forEach(function(photo){
            $('.carousel-inner').append(photo.render_photos(photo))
        })

		$('.gallery_title').html(data[show].title + ' - ' + data[show].year)
		if(data.caption){
			$('.gallery_caption').html(data.caption)
		} else {
			$('.gallery_caption').html('')
		}
		$('.carousel-inner .item:first-child').addClass('active');
    })
}

function Photo(project, image){
	this.title = project.title
	this.year = project.year
	this.image_path = 'gallery/images/' + project.gallery + '/' + project.gallery  + image + '.jpg'
	this.caption = project.title
}

// render listitem html
Photo.prototype.render_photos = function(photos){
    var template_photo = 
    '<div class="item"> \
		<img src="{{ image_path }}" class="treatment" alt="{{ title }}" title="{{ title }}" /> \
    </div>'

    var html_photo = Mustache.to_html(template_photo, photos)
    return(html_photo)
}