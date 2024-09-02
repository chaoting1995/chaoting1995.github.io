import { Howl } from 'howler';

import clickAudio from 'audio/click.mp3';
import bellAudio from 'audio/bell.mp3';
import rollingAudio from 'audio/rolling.mp3';
import rolling2Audio from 'audio/rolling2.mp3';
import celebrationAudio from 'audio/celebration.mp3';

export function audioClick(): void {
  const sound = new Howl({
    src: [clickAudio],
    html5: true,
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
    // console.log('音乐播放了',id);
      sound.duration(id);
      // const duration = sound.duration(id);
      // console.log(duration, 'duration');
  })
  
  // 音频结束监听
  sound.on('end', function () {
      // console.log('音乐播放停止')
      // 销毁实例
      sound.unload();
  })
}

export function audioRolling(): void {
  const sound = new Howl({
    src: [rollingAudio],
    html5: true,
  });

  sound.play();
}

export function audioRolling2(): void {
  const sound = new Howl({
    src: [rolling2Audio],
    html5: true,
  });
  sound.play();
}

export function audioCelebration(): void {
  const sound = new Howl({
    src: [celebrationAudio],
    html5: true,
  });
  sound.play();
}

const UtilAudio = {
  audioClick,
  audioBell,
  audioRolling,
  audioRolling2,
  audioCelebration
};

export default UtilAudio;

// https://juejin.cn/post/7270831230077681722