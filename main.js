// Lấy các phần tử giao diện
let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let playlistContainer = document.querySelector('.playlist');
let showPlaylistBtn = document.querySelector('.show-playlist');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;
let player; // Biến chứa YouTube Player

// Danh sách nhạc sử dụng YouTube video IDs
// Thay bằng ID video thực tế
const music_list = [
  {
    img: 'img/mono.jpg',
    name: 'Chăm Hoa',
    artist: 'MONO',
    youtubeId: 'WCm2elbTEZQ' // Thay bằng ID video thực tế
  },
  
  {
    img: 'img/lifeiyu.jpg',
    name: 'Ngày Em Đẹp Nhất',
    artist: 'Lofi',
    youtubeId: 'mnQMvKnvEKs'
  },
  {
    img: 'img/st.jpg',
    name: 'Em Của Ngày Hôm Qua',
    artist: 'Sơn Tùng M-TP',
    youtubeId: 'Vt4kAu-ziRY'
  },
  {
    img: 'img/st.jpg',
    name: 'Nơi Này Có Anh',
    artist: 'Sơn Tùng M-TP',
    youtubeId: 'FN7ALfpGxiI'
  },
  {
    img: 'img/st.jpg',
    name: 'Chúng Ta Không Thuộc Về Nhau',
    artist: 'Sơn Tùng M-TP',
    youtubeId: 'qGRU3sRbaYw'
  },
  {
    img: 'img/lifeiyu.jpg',
    name: 'Bất Phàm',
    artist: 'Vương Tranh Lượng',
    youtubeId: 'n4Dp1wJMP9c'
  },
  {
    img: 'img/music.jpg',
    name: 'Thời Gian Sẽ Trả Lời',
    artist: 'Qkhanh Remix & BigDaddy',
    youtubeId: 'xxHhcALPvMo'
  },
  {
    img: 'img/music.jpg',
    name: 'Đối lừa',
    artist: 'Nguyễn Đình Vũ',
    youtubeId: 'ebJbfdAQUGY'
  },
  {
    img: 'img/music.jpg',
    name: 'Khi Anh Đã Thấy Em',
    artist: 'PhucXp ft. Freak D',
    youtubeId: 'OYUY7Ugupts'
  },
  {
    img: 'img/st.jpg',
    name: 'Đừng làm trái tim anh đau ',
    artist: 'Sơn Tùng M-TP',
    youtubeId: 'abPmZCZZrFA'
  },
  {
    img: 'img/kiva.jpg',
    name: 'Break the chain',
    artist: 'Tourbillon',
    youtubeId: 'ere4mNKr-QI'
  },
  {
    img: 'img/huyvac.jpg',
    name: 'Chạnh Lòng Thương Cô 2',
    artist: 'Huy Vạc x Mee Media',
    youtubeId: 'K0tTvoPnKP8'
  },
  {
    img: 'img/music.jpg',
    name: '清丶风',
    artist: '(DiESi Remix)',
    youtubeId: 'nN-tJvEplB4'
  },
  {
    img: 'img/music.jpg',
    name: 'Em Có Biết',
    artist: 'H2K',
    youtubeId: 'ouNQ7wofAYo'
  },
  {
    img: 'img/music.jpg',
    name: 'Sự Thật Sau Một Lời Hứa',
    artist: 'Chi Dân',
    youtubeId: 'bdxuSWEhKkU'
  },
  {
    img: 'img/shinkenger.jpg',
    name: 'Shinkenger opening',
    artist: 'Psychic Lover',
    youtubeId: 'jvD3LMEL7G4'
  },
  {
    img: 'img/j.jpg',
    name: 'Juken Sentai Gekiranger Opening',
    artist: '',
    youtubeId: 'qYe1defOvkM'
  },
  {
    img: 'img/music.jpg',
    name: 'TheFatRat Lab - Glitch Hop Mashup 2.0',
    artist: '',
    youtubeId: 'EuA44p-LVwY'
  },
  {
    img: 'img/music.jpg',
    name: 'Mashup of TheFatRat',
    artist: '',
    youtubeId: 'z7zoabFKD60'
  },
  {
    img: 'img/music.jpg',
    name: 'Unity + The Storm',
    artist: '',
    youtubeId: '-PILtAkBdrk'
  },
  {
    img: 'img/music.jpg',
    name: 'Fifty Fifty ',
    artist: 'Cupid ',
    youtubeId: '62TrmUvQGjo'
  },
  {
    img: 'img/music.jpg',
    name: 'Hồng Nhan',
    artist: 'Jack',
    youtubeId: '8x2NjwwHUbQ'
  },
  {
    img: 'img/music.jpg',
    name: 'Bạc Phận',
    artist: 'Jack',
    youtubeId: 'WX7dUj14Z00'
  },
  {
    img: 'img/music.jpg',
    name: 'Sóng Gió',
    artist: 'Jack',
    youtubeId: 'j8U06veqxdU'
  },
  {
    img: 'img/music.jpg',
    name: 'Đừng Hỏi Em Ổn Không ',
    artist: 'H2k',
    youtubeId: 'QKJ1pTFhuig'
  },
  {
    img: 'img/music.jpg',
    name: 'Kẹo Bông Gòn ',
    artist: 'H2k',
    youtubeId: 'sHa5nQO3jwA'
  },
  {
    img: 'img/music.jpg',
    name: 'Về Bên Anh ',
    artist: 'Jack',
    youtubeId: 'fArpx8TRWU8'
  },
  {
    img: 'img/music.jpg',
    name: 'Cause I Love You ',
    artist: 'Noo Phước Thịnh',
    youtubeId: '7iiPGUDHC0Q'
  },
  {
    img: 'img/Dragon_Soul.jpg',
    name: 'Dragon Soul ',
    artist: '',
    youtubeId: '48eSSpsZiLE'
  },
  {
    img: 'img/music.jpg',
    name: 'Không Thuộc Về ',
    artist: 'Minh Lý',
    youtubeId: 'GrnpwSa2QN4'
  },
  {
    img: 'img/music.jpg',
    name: 'PLAYING WITH FIRE ',
    artist: 'BLACKPINK',
    youtubeId: 'BmzAGDnJzss'
  },
  {
    img: 'img/music.jpg',
    name: 'Blood Sweat & Tears ',
    artist: 'BTS',
    youtubeId: 'b23_UkBrrQk'
  },
];

// Hiển thị danh sách phát
showPlaylistBtn.addEventListener('click', () => {
  playlistContainer.style.display = (playlistContainer.style.display === 'none' || playlistContainer.style.display === '')
    ? 'block'
    : 'none';
});

function loadPlaylist() {
  let playlistHTML = '<ul>';
  music_list.forEach((track, index) => {
    playlistHTML += `<li onclick="playSelectedTrack(${index})">${track.name} - ${track.artist}</li>`;
  });
  playlistHTML += '</ul>';
  playlistContainer.innerHTML = playlistHTML;
}

function playSelectedTrack(index) {
  track_index = index;
  loadTrack(track_index);
  playTrack();
}

// Tạo danh sách phát ngay khi trang tải
loadPlaylist();

/* 
  Hàm onYouTubeIframeAPIReady() sẽ được gọi khi API của YouTube đã tải xong.
  Tạo đối tượng player để phát video (âm thanh) từ YouTube.
*/
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    videoId: music_list[track_index].youtubeId, // Video đầu tiên
    playerVars: {
      autoplay: 0,
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      rel: 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError
    }
  });
}

// Khi player đã sẵn sàng, tải track đầu tiên
function onPlayerReady(event) {
  loadTrack(track_index);
}

// Xử lý lỗi khi phát video
function onPlayerError(event) {
  console.error("Lỗi khi phát video: ", event.data);
  alert("Không thể phát video này. Chuyển sang bài tiếp theo.");
  nextTrack();
}

// Xử lý khi trạng thái video thay đổi (ví dụ: khi video kết thúc)
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    nextTrack();
  } else if (event.data === YT.PlayerState.PLAYING) {
    isPlaying = true;
  } else if (event.data === YT.PlayerState.PAUSED) {
    isPlaying = false;
  }
}

function loadTrack(index) {
  clearInterval(updateTimer);
  reset();

  let track = music_list[index];

  track_art.style.backgroundImage = "url(" + track.img + ")";
  track_name.textContent = track.name;
  track_artist.textContent = track.artist;
  now_playing.textContent = "Playing music " + (index + 1) + " of " + music_list.length;

  // Nếu player đã sẵn sàng thì tải video mới
  if (player && typeof player.loadVideoById === 'function') {
    player.loadVideoById(track.youtubeId);
  }

  updateTimer = setInterval(setUpdate, 1000);
  random_bg_color();
}

function random_bg_color() {
  let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.floor(Math.random() * hex.length);
      a += hex[x];
    }
    return a;
  }
  let Color1 = populate('#');
  let Color2 = populate('#');
  let angle = 'to right';
  let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
  document.body.style.background = gradient;
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add('randomActive');
}

function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
  loadTrack(track_index);
  playTrack();
}

function playpauseTrack() {
  if (player && player.getPlayerState) {
    let state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      pauseTrack();
    } else if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.UNSTARTED) {
      playTrack();
    }
  } else {
    console.error("Player chưa sẵn sàng!");
  }
}

function playTrack() {
  if (player) {
    player.playVideo();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }
}

function pauseTrack() {
  if (player) {
    player.pauseVideo();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  }
}

function nextTrack() {
  if (track_index < music_list.length - 1 && !isRandom) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom) {
    track_index = Math.floor(Math.random() * music_list.length);
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  if (player && player.getDuration) {
    let duration = player.getDuration();
    let seekto = duration * (seek_slider.value / 100);
    player.seekTo(seekto, true);
  }
}

function setVolume() {
  if (player) {
    player.setVolume(volume_slider.value);
  }
}

function setUpdate() {
  if (player && player.getDuration && player.getCurrentTime) {
    let duration = player.getDuration();
    let currentTime = player.getCurrentTime();
    if (duration) {
      let seekPosition = currentTime * (100 / duration);
      seek_slider.value = seekPosition;

      let currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      let durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);

      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }
}
