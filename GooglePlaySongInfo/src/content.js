// script runs every 5 seconds

// makes a POST request with the extracted infos to http://localhost:8080/music_data
setInterval(function() {
	console.log('checking song info ...');
	var title = '';
	var artist = '';
	var imgUrl = '';
	var isPlaying = 'false';
    
    var cur_playing_title;
    var player_artist;
    var playerBarArt;
    var play_pause_button;

    function isYouTube() {return window.location.toString().includes("music.youtube");}
    function isPlayMusic() {return url.includes("play.google");}

	if (isYouTube()) {
		var complexString = document.getElementsByClassName("ytmusic-player-bar complex-string")[0];
		
        cur_playing_title = document.getElementsByClassName('yt-simple-endpoint style-scope yt-formatted-string')[1];
        player_artist = document.getElementsByClassName('yt-simple-endpoint style-scope yt-formatted-string')[0];
		playerBarArt = document.getElementsByClassName('image style-scope ytmusic-player-bar')[0];
		play_pause_button = document.getElementById('play-pause-button');
		if (play_pause_button != null) {
			if (play_pause_button.title.toLowerCase().includes('paus')) {
				isPlaying = 'true';
			} else {
				isPlaying = 'false';
			}
		}
	} else if (isPlayMusic()) {
		cur_playing_title = document.getElementById('currently-playing-title');
		player_artist = document.getElementById('player-artist');
		playerBarArt = document.getElementById('playerBarArt');
		play_pause_button = document.getElementById('player-bar-play-pause');

		if (play_pause_button != null) {
			if (play_pause_button.className.includes('playing')) {
				isPlaying = 'true';
			} else {
				isPlaying = 'false';
			}
		}
	}

	if (cur_playing_title != null) {
		title = cur_playing_title.innerText;
	}

	if (player_artist != null) {
		artist = player_artist.innerText;
	}

	if (playerBarArt != null) {
		imgUrl = playerBarArt.src;
	}

	var params = 'title=' + title + '&artist=' + artist
			+ '&imgUrl=' + imgUrl + '&isPlaying=' + isPlaying;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:8080/music_data/", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log('post response: ' + xhr.responseText);
		}
	}

	console.log('sending info to localhost:' + params);
	xhr.send(params);

}, 5000);
