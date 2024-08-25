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

    // 播放监听事件
  sound.on('play', function (id) {
    console.log('音乐播放了',id);
      const duration = sound.duration(id);
      console.log(duration, 'duration');
  })
  
  // 音频结束监听
  sound.on('end', function () {
      console.log('音乐播放停止')
      // 销毁实例
      sound.unload();
  })
}

const UtilAudio = {
  audioClick,
  audioBell
};

export default UtilAudio;