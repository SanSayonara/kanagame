(function () {

    const menuButton = document.querySelector('.header__menu');
    const navigation = document.querySelector('.navigation');
    const blockerBackground = document.querySelector('.overlay-blocker-background');

    menuButton.onclick = () => {
      navigation.classList.add('navigation-mobile-show');
      blockerBackground.classList.add('is-visible');

      blockerBackground.onclick = () => {
        navigation.classList.remove('navigation-mobile-show');
        blockerBackground.classList.remove('is-visible');
        blockerBackground.onclick = null;
      }
    }


  class KanaGameEngine {
    constructor() {
      this.__askedCharacter = 'あ';
      this.goodAnswers = 0;
      this.badAnswers = 0;

      const hiraganaCharSet = {
        'あ': 'A',
        'い': 'I',
        'う': 'U',
        'え': 'E',
        'お': 'O',
        'か': 'KA',
        'き': 'KI',
        'く': 'KU',
        'け': 'KE',
        'こ': 'KO',
        'が': 'GA',
        'ぎ': 'GI',
        'ぐ': 'GU',
        'げ': 'GE',
        'ご': 'GO',
        'さ': 'SA',
        'し': 'SHI',
        'す': 'SU',
        'せ': 'SE',
        'そ': 'SO',
        'ざ': 'ZA',
        'じ': 'JI',
        'ず': 'ZU',
        'ぜ': 'ZE',
        'ぞ': 'ZO',
        'た': 'TA',
        'ち': 'CHI',
        'つ': 'TSU',
        'て': 'TE',
        'と': 'TO',
        'だ': 'DA',
        'ぢ': 'JI',
        'づ': 'ZU',
        'で': 'DE',
        'ど': 'DO',
        'な': 'NA',
        'に': 'NI',
        'ぬ': 'NU',
        'ね': 'NE',
        'の': 'NO',
        'は': 'HA',
        'ひ': 'HI',
        'ふ': 'FU',
        'へ': 'HE',
        'ほ': 'HO',
        'ば': 'BA',
        'び': 'BI',
        'ぶ': 'BU',
        'べ': 'BE',
        'ぼ': 'BO',
        'ぱ': 'PA',
        'ぴ': 'PI',
        'ぷ': 'PU',
        'ぺ': 'PE',
        'ぽ': 'PO',
        'ま': 'MA',
        'み': 'MI',
        'む': 'MU',
        'め': 'ME',
        'も': 'MO',
        'や': 'YA',
        'ゆ': 'YU',
        'よ': 'YO',
        'ら': 'RA',
        'り': 'RI',
        'る': 'RU',
        'れ': 'RE',
        'ろ': 'RO',
        'わ': 'WA',
        'を': 'WO',
        'ん': 'N'
      };

      const katakanaCharSet = {
        'ア': 'A',
        'イ': 'I',
        'ウ': 'U',
        'エ': 'E',
        'オ': 'O',
        'カ': 'KA',
        'キ': 'KI',
        'ク': 'KU',
        'ケ': 'KE',
        'コ': 'KO',
        'ガ': 'GA',
        'ギ': 'GI',
        'グ': 'GU',
        'ゲ': 'GE',
        'ゴ': 'GO',
        'サ': 'SA',
        'シ': 'SHI',
        'ス': 'SU',
        'セ': 'SE',
        'ソ': 'SO',
        'ザ': 'ZA',
        'ジ': 'JI',
        'ズ': 'ZU',
        'ゼ': 'ZE',
        'ゼ': 'ZO',
        'タ': 'TA',
        'チ': 'CHI',
        'ツ': 'TSU',
        'テ': 'TE',
        'ト': 'TO',
        'ダ': 'DA',
        'ヂ': 'JI',
        'ヅ': 'ZU',
        'デ': 'DE',
        'ド': 'DO',
        'ナ': 'NA',
        'ニ': 'NI',
        'ヌ': 'NU',
        'ネ': 'NE',
        'ノ': 'NO',
        'ハ': 'HA',
        'ヒ': 'HI',
        'フ': 'FU',
        'ヘ': 'HE',
        'ホ': 'HO',
        'バ': 'BA',
        'ビ': 'BI',
        'ブ': 'BU',
        'ベ': 'BE',
        'ボ': 'BO',
        'パ': 'PA',
        'ピ': 'PI',
        'プ': 'PU',
        'ペ': 'PE',
        'ポ': 'PO',
        'マ': 'MA',
        'ミ': 'MI',
        'ム': 'MU',
        'メ': 'ME',
        'モ': 'MO',
        'ヤ': 'YA',
        'ユ': 'YU',
        'ヨ': 'YO',
        'ラ': 'RA',
        'リ': 'RI',
        'ル': 'RU',
        'レ': 'RE',
        'ロ': 'RO',
        'ワ': 'WA',
        'ヲ': 'WO',
        'ン': 'N'
      };

      this.charSet = { ...katakanaCharSet, ...hiraganaCharSet };

      this.__charSetIndices = Object.keys(this.charSet);
    }

    ask() {
      const randomCharacter = this.__charSetIndices[Math.floor(Math.random() * this.__charSetIndices.length)];
      this.__askedCharacter = randomCharacter;

      return this.__askedCharacter;
    }

    answer(response) {
      response = response.toUpperCase();
      const correctAnswer = this.charSet[this.__askedCharacter];
      let isCorrect = false;

      if (correctAnswer == response) {
        this.goodAnswers += 1;
        isCorrect = true;
      } else {
        this.badAnswers += 1;
      }

      return {
        correctAnswer, isCorrect
      }
    }
  }

  class KanaGameInterface {
    constructor(responseHandler) {
      this.gameContainer = document.querySelector('.game-container');

      this.gameScreenText = document.querySelector('.game-screen-text');
      this.currentKanas = document.querySelectorAll('.current-kana');

      this.gameResponseField = document.getElementById('game-response-field');
      this.gameCheckButton = document.getElementById('game-check-button');

      const blockerBackground = document.querySelector('.overlay-blocker-background');

      const hintOverlay = document.getElementById('hint-overlay');
      const statsOverlay = document.getElementById('stats-overlay');
      const settingsOverlay = document.getElementById('settings-overlay');

      const gameHintButton = document.getElementById('game-hint-button');
      const gameStatsButton = document.getElementById('game-stats-button');
      const gameSettingsButton = document.getElementById('game-settings-button');

      const overlayCloseButtons = document.querySelectorAll('.overlay__close-button');

      this.fontSelector = document.getElementById('font-selector');
      this.fonts = [
        "noto-sans-jp-font",
        "hachi-maru-pop-font",
        "potta-one-font",
        "reggae-one-font",
        "rocknroll-one-font",
        "shippori-mincho-b1-font",
        "stick-font"
      ];
      this.currentFont = 0;

      this.goodAnswersCount = document.getElementById('good-answers-count');
      this.badAnswersCount = document.getElementById('bad-answers-count');
      this.totalAnswersCount = document.getElementById('total-answers-count');

      let lastOverlay = null;

      function toggleOverlay(overlay) {
        blockerBackground.classList.toggle('is-visible');
        overlay.classList.toggle('is-visible');

        lastOverlay = overlay;
      }

      overlayCloseButtons.forEach(element => {
        element.onclick = () => {
          toggleOverlay(lastOverlay);
        }
      });

      gameHintButton.onclick = () => {
        toggleOverlay(hintOverlay);
      }

      gameStatsButton.onclick = () => {
        toggleOverlay(statsOverlay);
      }

      gameSettingsButton.onclick = () => {
        toggleOverlay(settingsOverlay);
      }

      this.gameResponseField.onkeyup = event => {
        if (event.key === 'Enter') {
          responseHandler(this.gameResponseField.value);
        }
      }

      this.gameCheckButton.onclick = () => {
        responseHandler(this.gameResponseField.value);
      };

      this.fontSelector.onchange = () => {
        this.updateKanaFont(parseInt(this.fontSelector.value));
      }
    }

    updateCharacter(character) {
      this.currentKanas.forEach(element => {
        element.textContent = character;
      });

      this.gameResponseField.value = '';
    }

    goodAnswer(nextCharacter) {
      this.gameContainer.classList.add('correct-answer');

      setTimeout(() => {
        this.gameContainer.classList.remove('correct-answer');
      }, 1000);

      this.updateCharacter(nextCharacter);
    }

    badAnswer(nextCharacter, correctAnswer) {
      if (document.documentElement.clientWidth > 500) {
        this.gameContainer.classList.add('bad-answer-pc');
      } else {
        this.gameContainer.classList.add('bad-answer-mobile')
      }

      this.updateCharacter(correctAnswer);

      setTimeout(() => {
        if (document.documentElement.clientWidth > 500) {
          this.gameContainer.classList.remove('bad-answer-pc');
        } else {
          this.gameContainer.classList.remove('bad-answer-mobile')
        }

        this.updateCharacter(nextCharacter);
      }, 1000);
    }

    updateStats(goodAnswers, badAnswers) {
      this.goodAnswersCount.textContent = goodAnswers;
      this.badAnswersCount.textContent = badAnswers;
      this.totalAnswersCount.textContent = goodAnswers + badAnswers;
    }

    updateKanaFont(fontInt) {
      this.currentKanas.forEach(element => {
        element.classList.remove(this.fonts[this.currentFont]);
        element.classList.add(this.fonts[fontInt]);
      });

      this.currentFont = fontInt;
    }
  }

  class KanaGame {
    constructor() {
      this.engine = new KanaGameEngine();
      this.interface = new KanaGameInterface(this.responseHandler.bind(this));

      this.interface.updateCharacter(this.engine.ask());
    }

    updateStats() {
      this.interface.updateStats(this.engine.goodAnswers, this.engine.badAnswers);
    }

    responseHandler(response) {
      const resultObj = this.engine.answer(response);

      if (resultObj.isCorrect) {
        this.interface.goodAnswer(this.engine.ask());
      } else {
        this.interface.badAnswer(this.engine.ask(), resultObj.correctAnswer);
      }

      this.updateStats();
    }
  }

  new KanaGame();

})();