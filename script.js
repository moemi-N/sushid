// /quatable.ioのAPIを呼び出す。
const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random"

// これからリンク先のcontentの中身を取得したい/ 
// 非同期処理でランダムな文章取得
    // お店で在庫確認してもらうのと同じように即時取得は不可能なのと一緒
    // APIを持ってくる通信は遅いので非同期処理で取得
function GetRsentence(){
    // 非同期通信でリクエストを発行、そのレスポンスを取得
        // プロミス状態の後の状態
    return fetch(RANDOM_SENTENCE_URL_API)
    .then((response) => response.json()) //変数responseをjson形式に変更
    .then((data) => console.log(data.content));//data:プロミス後のAPIの中のcontent
}

GetRsentence();