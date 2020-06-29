$(document).ready(function(){
 
 /*header*/
 
 var searchHover=false
 
 $('#header_wrap').on({
 mouseover:function(){
  if(!searchHover){
  $(this).addClass('on')
  $('.snb').animate({opacity:1},50)
  $('.snb_menu').animate({opacity:1},50)
  }  
 },
  mouseleave:function(){
   $(this).removeClass('on')
   $('.profile_name').removeClass('on');
   $('.profile_menu').slideUp();
  $('.snb').animate({opacity:0},50)
  $('.snb_menu').animate({opacity:0},50)
  }
 })
 
 $('.profile_name').on('click',function(e){
  e.preventDefault();
  $(this).toggleClass('on')
  $('.profile_menu').stop().slideToggle();
 })
 
 
 $('#header_wrap .searchFrm').on('click',function(){
  $(this).toggleClass('on')
 })
 
 $('#header_wrap .searchFrm').hover(function(){
  searchHover=true;
  $('#header_wrap .searchBar').focus()
 },function(){
  searchHover=false;
 })
 
 
 /*mag*/
 
 var magNum=0
 var magSid=setInterval(magAuto,4000)
 
 function magBanner(num){
  $('.mag_list li').removeClass('on')
  $('.mag_list li:eq('+num+')').addClass('on')
  magNum=num
 }
 
 function magAuto(){
  if(++magNum>2)magNum=0
  magBanner(magNum)
 }
 
 $('.mag_list li').each(function(e){
  $(this).find('a').on({mouseenter:function(){
   magBanner(e)
   clearInterval(magSid)
  },mouseleave:function(){
   magSid=setInterval(magAuto,4000)
  }
  })
 })
 
 
 /*news*/
 
 var newsNum=0
 var newsSid=setInterval(newsAuto,4000)
 
 function newsAuto(){
  if(++newsNum>2)newsNum=0
  newsPlay(newsNum)
 }
 
 function newsPlay(num){
  $('.news_list li').removeClass('on')
  $('.news_list li:eq('+num+')').addClass('on')
  $('.news_btn li').removeClass('on')
  $('.news_btn li:eq('+num+')').addClass('on')
  newsNum=num
 }
 
 $('.news_btn li').each(function(e){
  var num=e
  $(this).on('click',function(e){
   e.preventDefault()
   newsPlay(num)
   clearInterval(newsSid)
   newsSid=setInterval(newsAuto,4000)
  })
 })
 
 
 /*dragSlide*/
 
 dragSlider('.tape','.tape_list');
 dragSlider('.recent','.recent_list');
 
 function dragSlider(sec,list){
  
 var contWidth=$(sec).width();
 var contLiWidth=$(''+list+' li').width();
 var contLiMargin=parseInt($(''+list+' li:eq(1)').css('marginLeft'));
 var contLiLength=$(''+list+' li').length;
 var contUlWidth=(contLiWidth+contLiMargin)*contLiLength-contLiMargin;
  
 var maxMargin=contWidth-contUlWidth;
 var ulMargin=parseInt($(list).css('marginLeft'));
 
 $(list).css('width',contUlWidth)
 
  $(window).resize(function(){
  contWidth=$(sec).width();
  maxMargin=contWidth-contUlWidth
  $(list).stop().animate({
    marginLeft:'0px'
   },500)
 })
 
 var downPos,upPos,currentPos,thisList;
 var hasClick=false;
 
  /*web*/
 
 $(document).on('mouseup',function(e){
  if(hasClick){
  hasClick=false;
   upPos=e.pageX-$(list).offset().left;
   var movePos=downPos-upPos
   tapeSlide(movePos);
   setTimeout(resetSlide,100)
  }
 })
  
 $(list).on({
  click:function(e){
   e.preventDefault();
  },
  dragstart:function(e){
   e.preventDefault();
  },
  mousedown:function(e){
   hasClick=true;
   thisList=$(this)
   downPos=e.pageX-$(sec).offset().left;
  },
  mousemove:function(e){
   if(hasClick){
    ulMargin=parseInt($(list).css('marginLeft'));
    currentPos=e.pageX-$(sec).offset().left;
    
    if(currentPos-downPos<0){
     $(list).css('marginLeft',ulMargin-10);
    }else{
     $(list).css('marginLeft',ulMargin+10);
    }
   }
  }
 })
  
  /*mobile*/
  
   $(document).on('touchend',function(e){
    if(hasClick){
    hasClick=false;
    
   upPos=e.originalEvent.changedTouches[0].pageX-$(list).offset().left;
   var movePos=downPos-upPos
   tapeSlide(movePos);
   setTimeout(resetSlide,100)
   }
 })
  
 $(list).on({
  click:function(e){
   e.preventDefault();
  },
  dragstart:function(e){
   e.preventDefault();
  },
  touchstart:function(e){
   hasClick=true;
   thisList=$(this)
   downPos=e.originalEvent.changedTouches[0].pageX-$(sec).offset().left;
  },
  touchmove:function(e){
   if(hasClick){
    ulMargin=parseInt($(list).css('marginLeft'));
    currentPos=e.originalEvent.changedTouches[0].pageX-$(sec).offset().left;
    
    if(currentPos-downPos<0){
     $(list).css('marginLeft',ulMargin-10);
    }else{
     $(list).css('marginLeft',ulMargin+10);
    }
   }
  }
 })
 
 function resetSlide(){
  if(ulMargin<maxMargin){
   $(list).stop().animate({marginLeft:maxMargin+'px'})
  }else if(ulMargin>0){
   $(list).stop().animate({marginLeft:'0px'})
  }
  thisList=null
 }
 
 function tapeSlide(pos){
  if(Math.abs(pos)>300){
   if(pos<maxMargin){
    $(thisList).stop().animate({
     marginLeft:'0px'
    },500)
   }else if(pos>0){
    $(thisList).stop().animate({
     marginLeft:maxMargin+'px'
    },500)
   }
  }
 }
 }
 
 /*mobile*/
 
  $('.m_header .searchFrm').on('click',function(){
  $(this).toggleClass('on');
   $('.m_header .searchBar').focus();
 })
 

 
 
 
 
  
})