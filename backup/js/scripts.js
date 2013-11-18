//popup windows
<script type="text/javascript">
function poponload(page)
{
testwindow= window.open (page, "mywindow",
    "location=0,status=0,scrollbars=0,width=1000,height=700");
testwindow.moveTo(0,0);
}
</script>

//nav js
<script type="text/javascript">
  $(document).ready(function(){
		$("#nav-one li").hover(
			function(){ $("ul", this).fadeIn("fast"); }, 
			function() { } 
		);
	if (document.all) {
			$("#nav-one li").hoverClass ("sfHover");
		}
  });
  
	$.fn.hoverClass = function(c) {
		return this.each(function(){
			$(this).hover( 
				function() { $(this).addClass(c);  },
				function() { $(this).removeClass(c); }
			);
		});
	};	  
</script>