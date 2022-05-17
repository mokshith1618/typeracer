let time = document.getElementById("timer");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let quote = document.getElementById("quoteDisplay");
let spinner = document.getElementById("spinner");
let page = document.getElementById("speedTypingTest");
let result = document.getElementById("result");
let input=document.getElementById("quoteInput");

let span = document.createElement("span");
span.classList.add("h6", "m-1");
span.textContent = "seconds";

let quoteGen = function() {
    quote.textContent = "";
    spinner.classList.remove("d-none");
    page.classList.toggle("d-none");
    let options = {
        method: "GET"
    };
    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsondata) {
            spinner.classList.add("d-none");
            page.classList.toggle("d-none");
            quote.textContent = JSON.stringify(jsondata.content).slice(1, -1);
        });
}
quoteGen();
let counter = 0;
let uniqueId = setInterval(function() {
    time.textContent = counter;
    time.appendChild(span);
    counter += 1;
}, 1000);
resetBtn.onclick = function() {
    result.textContent = "";
    quoteGen();
    clearInterval(uniqueId);
    let counter = 0;
    uniqueId = setInterval(function() {
        time.textContent = counter;
        time.appendChild(span);
        counter += 1;
    }, 1000);
}

submitBtn.onclick = function() {
    if (quote.textContent===input.value){
        clearInterval(uniqueId);
        result.textContent="You typed in "+ time.textContent;
    }
    else{
        result.textContent="You typed incorrect sentence";
    }
}