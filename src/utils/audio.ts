import { Howl } from 'howler';

import clickAudio from 'audio/click.mp3';
import bellAudio from 'audio/bell.mp3';
import rollingAudio from 'audio/rolling.mp3';
import rolling2Audio from 'audio/rolling2.mp3';
import celebrationAudio from 'audio/celebration.mp3';

let soundClick: Howl | null = null;
let soundBell: Howl | null = null;
let soundRolling: Howl | null = null;
let soundRolling2: Howl | null = null;
let soundCelebration: Howl | null = null;

function audioClick() {
  if (!soundClick) soundClick = new Howl({ src: [clickAudio], html5: true, pool: 10 });
  soundClick.play();
}

function audioBell() {
  if (!soundBell) soundBell = new Howl({ src: [bellAudio], html5: true, pool: 10 });
  soundBell.play();
}

function audioRolling() {
  if (!soundRolling) soundRolling = new Howl({ src: [rollingAudio], html5: true, pool: 10 });
  soundRolling.play();
}

function audioRolling2() {
  if (!soundRolling2) soundRolling2 = new Howl({ src: [rolling2Audio], html5: true, pool: 10 });
  soundRolling2.play();
}

function audioCelebration() {
  if (!soundCelebration) soundCelebration = new Howl({ src: [celebrationAudio], html5: true, pool: 10 });
  soundCelebration.play();
}
function cleanupAudio() {
  soundClick?.unload();
  soundBell?.unload();
  soundRolling?.unload();
  soundRolling2?.unload();
  soundCelebration?.unload();
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