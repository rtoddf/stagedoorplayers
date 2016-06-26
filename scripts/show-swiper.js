$( document ).ready(function() {
	Images.get()
})

var isDefined = function(obj){
	return typeof(obj) !== 'undefined' && obj !== null ? obj : ''
}

var Photo = function(detail){
	this.title = isDefined(detail.title)
	this.directory = isDefined(detail.directory)
	this.num_photos = isDefined(detail.num_photos)
	this.text = isDefined(detail.text)
}

var Images = new function(){
	this.get = function(){
		var show = $('.swiper-container').attr('id')
		var gallery_data = '../galleries/data/' + show + '.json'
		var photos = []
		

		$.getJSON(gallery_data, function(data){
			data.forEach(function(p){
				var photo = new Photo(p)
				photos.push(photo)
			})

			console.log('photos: ', photos)

			var template_photos_compiled = _.template(template_photos_raw, {
				photos: photos
			})

			$('.swiper-wrapper').html(template_photos_compiled)

			Images.setup()
		})
	}

	this.setup = function(){
		console.log('woops')
		var swiper = new Swiper('.swiper-container', {
		    pagination: '.swiper-pagination',
		    paginationClickable: false,
		    loop : true,
		    speed : 600,
		    autoplay : 5000,
		    direction : 'horizontal'
		});
	}
}

var template_photos_raw = '<% for (var i=1; i < photos[0].num_photos; i++){ %> \
	<% var source = i < 10 ? "0" + i + ".jpg" : i + ".jpg" %> \
	<div class="swiper-slide"> \
		<img src="../images/galleries/<%= photos[0].directory %>/<%= photos[0].directory %><%= source %>" /> \
	</div> \
<% } %>'





