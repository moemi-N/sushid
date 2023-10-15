// /quatable.ioのAPIを呼び出す。
const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random"
// ドキュメントを表示させたいidを取得しておく
const typedisplay = document.getElementById("type-display");
// 入力済のテキストを消すために、idを取得しておく。
const typeInput = document.getElementById("inputanswer");

const timer = document.getElementById("timer");

// 一文字ごとの正誤判定を行う
// addEventListener:ターゲットに特定のイベントが配信されるたびに呼び出される関数を設定
typeInput.addEventListener("input", () => {
    // 判定するための比較する式を描く
    // typedisplayの中の参照要素全て持ってくる
    const sentenceArray = typedisplay.querySelectorAll("span");
    // console.log(sentenceArray);
    // 比較したいテキストボックス内の文字も一つずつ持ってくる。
    // valueを使うことで文字を持ってくる。splitで１つ1つに分ける。
    // inputするたびに文字が１つ１つ追加される。
    const arrayValue = typeInput.value.split("");
    console.log(arrayValue);

    // sentenceArrayとarraayValueを１つずつ比較⇒色付ける
    sentenceArray.forEach((characterSpan, index) =>{
        if ((arrayValue[index] == null)){
            characterSpan.classList.remove("incorrect"); 
            characterSpan.classList.remove("correct");
        }else if (characterSpan.innerText == arrayValue[index]){
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");           
        } else {
            characterSpan.classList.add("incorrect");
            characterSpan.classList.remove("correct");
        }
    })
});

// これからリンク先のcontentの中身を取得したい/ 
// 非同期処理でランダムな文章取得
    // お店で在庫確認してもらうのと同じように即時取得は不可能なのと一緒
    // APIを持ってくる通信は遅いので非同期処理で取得
function GetRsentence(){
    // 非同期通信でリクエストを発行、そのレスポンスを取得
        // プロミス状態の後の状態
        // fetchでデータを取ると、返り値としてPromiseを返す
    return fetch(RANDOM_SENTENCE_URL_API)
    .then((response) => response.json()) //変数responseをjson形式に変更
    .then((data) => data.content);//dataにプロミス後のAPIの中のcontentをいれる
    
}

// ランダムな文章を取得してtype-displayに表示させる
// GetRsentenceの非同期処理を待機させるために、asyncとawait追加
async function RenderNsentence(){
    const sentence = await GetRsentence();
    // console.log(sentence);

// idにテキスト表示させる。
    typedisplay.innerText = "";
// 文章を１文字ずつ分解してspanタグを生成
// splitで文章を１文字ずつ分解⇒配列に
    let letter = sentence.split("");
    
    // forEach()与えられた関数を配列の各要素に大して１度ずつ実行
    letter.forEach(character => {
        // createElementでspanタグを自動生成
        const characterSpan = document.createElement("span");
        // 生成したspanタグの中に
        characterSpan.innerText = character;
        // console.log(characterSpan);
        // type-displayの中身がspanタグで分けられた！
        typedisplay.appendChild(characterSpan);
        
    });

    // テキストボックスの中身を消す。
    typeInput.innerText ="";

    // RenderNsentenceが読まれたらタイマーを起動する。
    StartTimer();
}
RenderNsentence();

let startTime;
let originTime = 30;
function StartTimer(){
    timer.innerText = originTime;
    startTime = new Date;
    // console.log(startTime);
    setInterval(() =>{
        timer.innerText = originTime - getTimerTime();
    },1000);

function getTimerTime(){
    return Math.floor((new Date() - startTime)/1000);
}
    
}



// 持ってきた文章を分解して、１文字ずつspanタグを設定
// 正誤判定に利用




