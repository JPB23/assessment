'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {//子どもの要素がある限り削除
        element.removeChild(element.firstChild);
    }
}
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    console.log('ボタンが押されました');
    if (userName.length == 0) { // 名前が空の時は処理を終了する
        return;
    }
    console.log(userName);
    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a')
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
        + encodeURIComponent('あなたのいいところ')
        + '&ref_src=twsrc%5Etfw';
    
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result)
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor)

    // widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js')
    tweetDivided.appendChild(script)
}

userNameInput.onkeydown = (event) => {
    if (event.key == 'Enter') {
        // ボタンのonclick() 処理を呼び出す
        assessmentButton.onclick();
    }
}
const answers = [
    '{userName}の良いところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}の良いところは眼差しです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}の良いところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}の良いところは厳しさです。{userName}の厳しさが物事をいつも成功に導きます。',
    '{userName}の良いところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}の良いところはユニークさです。{userName}だけのその特徴がみんなを楽しくさせます。',
    '{userName}の良いところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}の良いところは見た目です。内側から溢れ出る{userName}の良さにみんなが気を惹かれます。',
    '{userName}の良いところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒されています。'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName){
    // 診断結果を実装する
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i=0; i<userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, userName);
    return result;
}

// テストコード
console.assert(
    assessment('太郎') == '太郎の良いところは声です。太郎の特徴的な声は皆を惹きつけ、心に残ります。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.log(assessment('太郎'));
console.assert(
    assessment('太郎') == assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
