import { Howl } from 'howler';

import clickAudio from 'Audio/click.mp3';
import bellAudio from 'Audio/bell.mp3';

export function audioClick(): void {
  const sound = new Howl({
    src: [clickAudio],
  });
  sound.play();
}

export function audioBell(): void {
  const sound = new Howl({
    src: [bellAudio],
  });
  sound.play();
}

const UtilAudio = {
  audioClick,
  audioBell
};

export default UtilAudio;

//--一般方法，ios會出事-----------------------------------
// const audio = new Audio(btnAudio);
// audio.play();