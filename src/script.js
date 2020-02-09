
function generate_qr() {
    const img = document.getElementById("qr");
    const spn = document.getElementById("id_span1");
    const fivecode = document.forms.id_form1.id_textbox1.value;
    
    if (!String(fivecode).match(/^\d{5}$/g)){
        spn.innerText = "半角5桁で入力してください！"
        return false;
    }

    const checkdigit = fillCheckDigit(fivecode);
    const isbnfull = "9784641" + fivecode + checkdigit;
    const url = "http://www.yuhikaku.co.jp/books/detail/" + isbnfull;
    spn.innerText = url;
    const link = spn.firstChild.nodeValue;
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.target = "_brank";
    aTag.appendChild(document.createTextNode(link));
    spn.replaceChild(aTag, spn.firstChild);
    img.setAttribute("src", "http://chart.apis.google.com/chart?chs=300x300&cht=qr&chl=http%3a%2f%2fwww.yuhikaku.co.jp%2fbooks%2fdetail%2f" + isbnfull + "&choe=utf8");
    return false;
}

function fillCheckDigit(fivecode) {
    const isbn12 = "9784641" + fivecode;
    const array = String(isbn12).split("");
    let total = 0;
    for (let i = 0; i <= 11; i++) {
        if (i % 2 == 0) {
            total += Number(array[i]);
        }
        else {
            total += Number(array[i]) * 3;
        }
    }
    const checkDigit = ((10 - (total % 10))) % 10;
    return checkDigit;
}
