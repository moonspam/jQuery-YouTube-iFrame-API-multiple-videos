// YouTube IFrame API ////////////////////////////////////////////////////////////////
// https://developers.google.com/youtube/iframe_api_reference ////////////////////////
var player = [];
var _curClick = 0; // click array
function onYouTubeIframeAPIReady() {
	if(typeof ytPlayList === 'undefined')
		return;

	for(var i = 0; i < ytPlayList.length; i++) {
		player[i] = createPlayer(ytPlayList[i]);
	}
}

function createPlayer(ytInfo) {
	return new YT.Player(ytInfo.id, {
		videoId: ytInfo.VideoId,
		playerVars: {
			'controls': 0,
			'showinfo': 0,
			'wmode': "opaque"
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function onPlayerReady(event) {
	event.target.getPlaybackQuality('default');
	event.target.mute();
	event.target.playVideo();
}
function onPlayerStateChange(event) {
	if (event.data === 0) {
		event.target.playVideo();
	}
}
//////////////////////////////////////////////////////////////////////////////////////

// YouTube videos all pause
function ytTogglePlay() {
	for(var i = 0; i < ytPlayList.length; i++) {
		if(player[i].getPlayerState() === 2) {
			player[i].playVideo();
		} else {
			player[i].pauseVideo();
		}
	}
}

// YouTube Resize
function ytResize() {
	var x_percent = $(window).width() / 1280,
		y_percent = $(window).height() / 720;
	var x_num = parseInt(1280 * y_percent),
		y_num = parseInt(720 * y_percent);
	if(x_num >= $(window).width()){
		$(".yt_wrap").css({"height" : y_num});
		$(".yt_box").css({"width" : x_num, "height" : y_num, "marginLeft" : x_num/-2 + "px", "marginTop" : y_num/-2 + "px"});
	}else{
		var x_num = parseInt(1280 * x_percent);
		var y_num = parseInt(720 * x_percent);
		$(".yt_wrap").css({"height" : y_num});
		$(".yt_box").css({"width" : x_num, "height" : y_num, "marginLeft" : x_num/-2 + "px", "marginTop" : y_num/-2 + "px"});
	}
}

$(function(){
	// start YouTube resize
	ytResize();
});

$(window).resize(function() {
	ytResize();
});
