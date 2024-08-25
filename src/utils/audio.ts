import { Howl } from 'howler';

import clickAudio from 'audio/click.mp3';
import bellAudio from 'audio/bell.mp3';

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
  sound.on('end', function () {
      sound.unload();
  })
}

const UtilAudio = {
  audioClick,
  audioBell
};

export default UtilAudio;

// https://juejin.cn/post/7270831230077681722