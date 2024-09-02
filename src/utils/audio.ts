import { Howl } from 'howler';

import clickAudio from 'audio/click.mp3';
import bellAudio from 'audio/bell.mp3';
import rollingAudio from 'audio/rolling.mp3';
import rolling2Audio from 'audio/rolling2.mp3';
import celebrationAudio from 'audio/celebration.mp3';

const soundClick = new Howl({ src: [clickAudio], html5: true, pool: 10 });
const soundBell = new Howl({ src: [bellAudio], html5: true, pool: 10 });
const soundRolling = new Howl({ src: [rollingAudio], html5: true, pool: 10 });
const soundRolling2 = new Howl({ src: [rolling2Audio], html5: true, pool: 10 });
const soundCelebration = new Howl({ src: [celebrationAudio], html5: true, pool: 10 });

function audioClick() {
  soundClick.play();
}

function audioBell() {
  soundBell.play();
}

function audioRolling() {
  soundRolling.play();
}

function audioRolling2() {
  soundRolling2.play();
}

function audioCelebration() {
  soundCelebration.play();
}
function cleanupAudio() {
  soundClick.unload();
  soundBell.unload();
  soundRolling.unload();
  soundRolling2.unload();
  soundCelebration.unload();
}

const UtilAudio = {
  audioClick,
  audioBell,
  audioRolling,
  audioRolling2,
  audioCelebration,
  cleanupAudio
};

export default UtilAudio;

// https://juejin.cn/post/7270831230077681722
// 應複用音頻物件