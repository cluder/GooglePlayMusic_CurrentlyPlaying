// script runs every 5 seconds

// makes a POST request with the extracted infos to http://localhost:8080/music_data
setInterval(function() {
	console.log('checking song info ...');
	var title = '';
	var album = '';
	var artist = '';
	var imgUrl = '';
	var isPlaying = 'false';

	let cur_playing_title = document.getElementById('currently-playing-title');
	if (cur_playing_title != null) {
		title = cur_playing_title.innerText;
	}

	let player_artist = document.getElementById('player-artist');
	if (player_artist != null) {
		artist = player_artist.innerText;
	}

	let player_albums = document.getElementsByClassName('player-album');
	if (player_albums.length > 0) {
		album = player_albums[0].innerText;
	}

	// player art
	let playerBarArt = document.getElementById('playerBarArt');
	if (playerBarArt != null) {
		imgUrl = playerBarArt.src;
	}

	let play_pause_button = document.getElementById('player-bar-play-pause');
	if (play_pause_button != null) {
		if (play_pause_button.className.includes('playing')) {
			isPlaying = 'true';
		} else {
			isPlaying = 'false';
		}
	}

	var params = 'title=' + title + '&album=' + album + '&artist=' + artist
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
