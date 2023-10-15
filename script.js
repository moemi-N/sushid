// /quatable.ioのAPIを呼び出す。
const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random"
// ドキュメントを表示させたいidを取得しておく
const typedisplay = document.getElementById("type-display");

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
        //  正誤で色をつけたい。正解時のクラス追加
        characterSpan.classList.add("correct");
    });

    // テキストボックスの中身を消す。
    
}
RenderNsentence();



// 持ってきた文章を分解して、１文字ずつspanタグを設定
// 正誤判定に利用




