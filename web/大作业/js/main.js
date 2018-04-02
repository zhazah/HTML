$(function(){
	play();
})
function play(){
	var nums = $('.list').find('.image').length;
	var perWidth = $('.list').find('.image').outerWidth();
	var allWidth = perWidth*nums;
	var withCloneWidth = perWidth*(nums+2);
	var firstChild = $('.list').find('.image').first().clone();
	var lastChild = $('.list').find('.image').last().clone();
	var speed = 500;
	var autoSpeed = 3000;
	var isPlay = false;
	firstChild.addClass('clone-first-img');
	lastChild.addClass('clone-last-img');	
	var dot = '';
	for(var i=0;i<nums;i++){
		var myclass = ' class=""';
		if(i==0) myclass = ' class="active"';
		dot +='<span'+myclass+' date-index='+i+'></span>';
	}
	$('.list').after('<div class="dots">'+dot+'</div>');
	$('.list').after('<div class="control left">&lt;</div><div class="control right">&gt;</div>');
	$('.list').css('width',withCloneWidth+'px');
	$('.list').find('.image').last().after(firstChild);
	$('.list').find('.image').first().before(lastChild);
	$('.list').css('left',-perWidth+'px');
	
	
	var auto = function(){
		var nowLeft = parseInt($('.list').css('left'));
		var targetIndex = Math.abs(nowLeft/perWidth);
		if(targetIndex == nums) targetIndex = 0;
		if(isPlay == false){
			isPlay = true;
			$('.list').animate({'left':nowLeft - perWidth+'px'},speed,function(){
				if(nowLeft== -(allWidth)) $('.list').css('left',- perWidth+'px');
				$('.dots').find('span').removeClass('active').eq(targetIndex).addClass('active');
				isPlay = false;
			});		
					
		}
	}
	
	auto_play = setInterval(auto,autoSpeed);
	
	$('.control').click(function(e) {
		var direction;
		if($(this).hasClass('left'))  direction='left';
		else if($(this).hasClass('right'))  direction='right';
		var nowLeft = parseInt($('.list').css('left'));
		var nowIndex = -(nowLeft/perWidth)-1;
		var targetIndex;
		if(isPlay == false){
			isPlay = true;
			clearInterval(auto_play);
			if(direction=='right') {
				targetIndex = nowIndex + 1;
				if(targetIndex == nums) targetIndex = 0;		
				$('.list').animate({'left':nowLeft - perWidth+'px'},speed,function(){
					if(nowLeft== -(allWidth)) $('.list').css('left',- perWidth+'px');
					$('.dots').find('span').removeClass('active').eq(targetIndex).addClass('active');
					isPlay = false;
					auto_play = setInterval(auto,autoSpeed);
				});	
			}
			if(direction=='left') {
				targetIndex = nowIndex - 1;
				if(targetIndex == -1) targetIndex = nums-1;
				$('.list').animate({'left':nowLeft + perWidth+'px'},speed,function(){
					if(nowLeft== -(perWidth)) $('.list').css('left',-allWidth+'px');
					$('.dots').find('span').removeClass('active').eq(targetIndex).addClass('active');
					isPlay = false;
					auto_play = setInterval(auto,autoSpeed);				
				});				
			};				
		}
		return false;
	});
	
	$('.dots').find('span').click(function(e) {		
		var targetIndex = $('.dots').find('span').index(this);
		var targetLeft = (targetIndex+1)*perWidth;
		if(isPlay == false){
			clearInterval(auto_play);
			isPlay = true;
			$('.list').animate({'left':-targetLeft+'px'},speed,function(){
				$('.dots').find('span').removeClass('active').eq(targetIndex).addClass('active');
				isPlay = false;
				auto_play = setInterval(auto,autoSpeed);			
			});	
		}
		return false;	
	});
	
	return false;
}