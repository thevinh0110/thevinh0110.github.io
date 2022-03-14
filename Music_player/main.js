// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = 'F8_PLAYER';

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const volumeSlider = $('.volumeSlider')
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const sound = $(".volume-icon-sound")
const mute = $(".volume-icon-mute")
var currentSound
const app = {
   
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  songs: [
    {
      name: "Kẻ cắp gặp bà già",
      singer: "Hoàng Thùy Linh",
      path: "./assets/music/music1.mp3",
      image: "https://avatar-nct.nixcdn.com/song/2019/10/18/2/0/b/1/1571381118105.jpg"
    },
    {
      name: "Cao ốc",
      singer: "BRay",
      path: "./assets/music/music2.mp3",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
    },
    {
      name: "Ex hate me",
      singer: "BRay x Amee",
      path:
        "./assets/music/music3.mp3",
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
    },
    {
      name: "Đi Đu Đưa Đưa Đi",
      singer: "Bích Phương",
      path: "./assets/music/music4.mp3",
      image:
        "https://avatar-nct.nixcdn.com/song/2018/05/12/e/8/6/f/1526060337257.jpg"
    },
    {
      name: "Bùa Yêu",
      singer: "Bích Phương",
      path: "./assets/music/music5.mp3",
      image:
        "https://avatar-nct.nixcdn.com/song/2019/08/28/7/4/3/a/1566982655403.jpg"
    },
    {
      name: "Thức Giấc",
      singer: "Dalab",
      path:
        "./assets/music/music6.mp3",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/07/14/8/c/f/9/1626231010810.jpg"
    },
    {
      name: "Hãy Trao Cho Anh",
      singer: "Sơn Tùng MTP",
      path: "./assets/music/music7.mp3",
      image:
        "https://avatar-nct.nixcdn.com/song/2019/07/03/7/5/b/e/1562137543919.jpg"
    },
    {
      name: "Gone, Gone, Gone",
      singer: "Phillip Phillips",
      path: "./assets/music/music8.mp3",
      image:
        "https://avatar-nct.nixcdn.com/singer/avatar/2016/01/25/4/1/1/7/1453715837617.jpg"
    }

  ],
 
  render: function() {
      const htmls = this.songs.map((song, index) => {
          return `
          <div class="song" data-index="${index}">
              <div class="thumb" style="background-image: url(${song.image})">
              </div>
              <div class="body">
                  <h3 class="title">${song.name}</h3>
                  <p class="author">${song.singer}</p>
              </div>
              <div class="option">
                  <i class="fas fa-ellipsis-h"></i>
              </div>
          </div>
          `
      });
      playlist.innerHTML = htmls.join('')
  },
  defineProperties: function() {
      Object.defineProperty(this,'currentSong', {
          get: function() {
              return this.songs[this.currentIndex]
          }
      })
  },
  loadCurrentSong: function() {
   this.activeSong()
      heading.innerText = this.currentSong.name
      cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
      audio.src = this.currentSong.path
    },
     
 
  loadConfig: function() {
    this.isRandom =this.config.isRandom
    this.isRepeat = this.config.isRepeat
                         
                       
    

  },
  
  nextSong: function () {
      this.currentIndex++
      console.log(this.currentIndex)
      if(this.currentIndex >= this.songs.length) {
        this.currentIndex = 0
      }
      $('.song.active').classList.remove('active')
     this.loadCurrentSong()
  },
  prevSong: function() {
    this.currentIndex--
    if(this.currentIndex <0){
      this.currentIndex = this.songs.length - 1;

    }
    $('.song.active').classList.remove('active')

    this.loadCurrentSong()
  },
  playRandomSong: function () {
    let newIndex 
    do{
      newIndex = Math.floor(Math.random() * this.songs.length)
    } while(newIndex === this.currentIndex)
    this.currentIndex = newIndex
    $('.song.active').classList.remove('active')

    this.loadCurrentSong()
  },
  activeSong: function() {
    const arrSong = $$('.song')
    arrSong.forEach(song =>{
      if(Number(song.dataset.index) === this.currentIndex){
        song.classList.add('active')
      }
    })
  },
  scrollActiveSong: function () {
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    },300)
    },
   
  
  handleEvens: function() {
    const _this = this;
      
      const cdWidth = cd.offsetWidth
    //   xu li scrolltop
      document.onscroll = function() {
         const scrollTop = document.documentElement.scrollTop || window.scrollY; 
        const newCdWidth = (cdWidth - scrollTop >= 0) ? cdWidth - scrollTop :0;
        
        cd.style.width = newCdWidth + 'px'
        cd.style.opacity = newCdWidth / cdWidth
      }
      // xu li next song 
      nextBtn.onclick = function() {
        if(app.isRandom) {
          app.playRandomSong()
        } else {
          app.nextSong()
        }
        
        audio.play()
       
        app.scrollActiveSong()
      }
      // xu li prev song 
      prevBtn.onclick = function() {
        if(app.isRandom) {
          app.playRandomSong()
        } else {
          app.prevSong()
        }
        
        audio.play()
        
        app.scrollActiveSong()

      }
      // xu li random song
      randomBtn.onclick = function() {
        app.isRandom = !app.isRandom
        _this.setConfig("isRandom", _this.isRandom);
        randomBtn.classList.toggle('active',app.isRandom)
      }
       // xu li repeat song 
       repeatBtn.onclick = function() {
        app.isRepeat = !app.isRepeat
        _this.setConfig("isRepeat", _this.isRepeat);
        
        repeatBtn.classList.toggle('active',app.isRepeat)
      }
      // xu li click playlist
      playlist.onclick = function(e) {
        const songNode = e.target.closest('.song:not(.active)')
        if(songNode || e.target.closest('.option')) {
          // xu li click songNode 
          if(songNode){
            app.currentIndex = Number(songNode.dataset.index)           
          $('.song.active').classList.remove('active')
           
            app.loadCurrentSong()
            audio.play()
          }
        }
      }
      // xu li quay cd
      const cdThumbAnimate = cdThumb.animate([
       { transform: 'rotate(360deg)'}
      ],{
        duration:10000,
        iterations: Infinity
      })
      cdThumbAnimate.pause()
 //  xu li play audio
        playBtn.onclick = function() {
            
            if(app.isPlaying) {
                audio.pause()
               
            } else {
                audio.play()
               
            }
            
           
        }
        audio.onplay = function() {
            app.isPlaying = true
            player.classList.add('playing')     
            cdThumbAnimate.play()
        }
        audio.onpause = function() {
            app.isPlaying = false
            player.classList.remove('playing')     
            cdThumbAnimate.pause()

        }
        audio.ontimeupdate = function(e) {
          
            if( audio.duration) {
            const persenProgress = audio.currentTime / audio.duration *100;
            progress.value = persenProgress
            }
           
            
        }
        audio.onended = function() {
          if(app.isRepeat) {
            audio.play()
          } else {
            nextBtn.click()
          }
        }
        progress.onchange = function () {
            if(audio.duration) {
                const seekTime = progress.value / 100 * audio.duration
               
                audio.currentTime = seekTime
            }
           
        }
       
        progress.onmousedown= function () {
          audio.pause()
        } 
        volumeSlider.onchange = function () {
            
          if(Number(volumeSlider.value) === 0) {
            sound.style.display = 'none'
            mute.style.display = 'block'
          } else {
            sound.style.display = 'block'
            mute.style.display = 'none'
          }
         
          const newVolume = volumeSlider.value /100;
          currentSound = newVolume
          audio.volume = newVolume
        
        }
        sound.onclick = function () {
          sound.style.display = 'none'
          mute.style.display = 'block'
          volumeSlider.value = 0
          const newVolume = volumeSlider.value /100;
          audio.volume = newVolume
        }
        mute.onclick = function () {
          sound.style.display = 'block'
          mute.style.display = 'none'
          volumeSlider.value = currentSound * 100  
          audio.volume = currentSound
        }

        
      
      
      
  },
  start: function() {
      this.loadConfig()
      this.defineProperties()
      this.handleEvens()
      this.render()
      this.activeSong()
      this.activeSong()
      this.loadCurrentSong()
      
      randomBtn.classList.toggle('active',app.isRandom)
      repeatBtn.classList.toggle('active',app.isRepeat)
      
  },
 
};

app.start();
console.log();
