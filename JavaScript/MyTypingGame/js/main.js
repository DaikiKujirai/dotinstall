'use strict'
{

  function setWord() {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    // wordの重複を防ぐためにspliceを使う。
    // spliceで取り出された値は配列になるので、[0]をつけることによって配列から取り出してあげる。
    target.textContent = word;
    loc = 0; //wordがセットされたら_を0に戻す。
  }
  const words = [
    'red',
    'blue',
    'pink',
  ];
  let word;
  let loc = 0; //location  再代入するからlet
  let startTime;
  let isPlaying = false;

  const target = document.getElementById('target');

  document.addEventListener('click', () => {
    if (isPlaying === true) {
      return;
    }
    // もしゲームが始まっていたら以下の処理はしない。
    isPlaying = true;
    startTime = Date.now();
    setWord();
  });

  document.addEventListener('keydown', e => {
    if (e.key !== word[loc]) {
      return;
    }
    //　メインとなるものを強調するために、それ以外を早めに除外することを早期リターン、もしくはアーリーリターンと呼ぶ。

    loc++;

    // 1: _ed
    // 2: __d
    // 3: ___
    target.textContent = '_'.repeat(loc) + word.substring(loc);

    if (loc === word.length) {
      if (words.length === 0) {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        // ミリ秒単位を1000で割って秒単位に直す。
        // toFixed(2)小数点以下を2ケタまで表示。
        const result = document.getElementById('result');
        result.textContent = `Finished! ${elapsedTime} seconds!`;
        // クリアまでの時間を表示
        return;
      }
      setWord();
    }
  });
}