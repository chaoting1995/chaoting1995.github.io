import { Howl } from 'howler';

import clickAudio from 'audio/click.mp3';
import bellAudio from 'audio/bell.mp3';
import rollingAudio from 'audio/rolling.mp3';
// import rolling2Audio from 'audio/rolling2.mp3';
import celebrationAudio from 'audio/celebration.mp3';

// 兩難：
// 網頁載入時，先不初始化 Howl，則手機版第一次音效會延遲
// let soundClick: Howl | null = null;
// let soundBell: Howl | null = null;
// let soundRolling: Howl | null = null;
// let soundRolling2: Howl | null = null;
// let soundCelebration: Howl | null = null;

// 網頁載入時，立刻初始化 Howl，則出現以下警告資訊
// The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page.
//  HTML5 Audio pool exhausted, returning potentially locked audio object.

const soundClick = new Howl({ src: [clickAudio], html5: true, pool: 50 });
const soundBell = new Howl({ src: [bellAudio], html5: true, pool: 50 });
const soundRolling = new Howl({ src: [rollingAudio], html5: true, pool: 50 });
// const soundRolling2 = new Howl({ src: [rolling2Audio], html5: true, pool: 50 });
const soundCelebration = new Howl({ src: [celebrationAudio], html5: true, pool: 50 });

function audioClick() {
  soundClick.play();
}

function audioBell() {
  soundBell.play();
}

function audioRolling() {
  soundRolling.play();
}

// function audioRolling2() {
//   soundRolling2.play();
// }

function audioCelebration() {
  soundCelebration.play();
}

function cleanupAudio() {
  soundClick.unload();
  soundBell.unload();
  soundRolling.unload();
  // soundRolling2.unload();
  soundCelebration.unload();
}

const UtilAudio = {
  audioClick,
  audioBell,
  audioRolling,
  // audioRolling2,
  audioCelebration,
  cleanupAudio
};

export default UtilAudio;
