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
    html5: true,  // 强制使用 HTML5 Audio
  });
  sound.play();
  
}

const UtilAudio = {
  audioClick,
  audioBell
};

export default UtilAudio;