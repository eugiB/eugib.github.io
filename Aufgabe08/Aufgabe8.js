var Aufgabe06;
(function (Aufgabe06) {
    window.addEventListener("DOMContentLoaded", init);
    //    let address: string = "http://localhost:8100/";
    let address = "https://eugibheroku.herokuapp.com/";
    function init() {
        createInput();
        let buyButton = document.getElementById("Async");
        buyButton.addEventListener("click", handleASync);
    }
    //    function handleASync(_event: Event): void {
    //        let order: string = "";
    //        let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName("input");
    //        for (let i: number = 0; i < inputs.length; i++) {
    //            let input: HTMLInputElement = inputs[i];
    //            if (input.type == "number") {
    //                if (parseInt(input.value) > 0) {
    //                    order += input.name + "=" + parseInt(input.value) +"&";
    //                }
    //            }
    //    
    //
    //            if (input.checked == true) {
    //               order += input + "=" + input.value +"&";
    //
    //            }
    //        }
    //        sendRequestData(order);
    //        let product: string = (<HTMLInputElement>document.querySelector(":checked")).value;
    //    }
    function handleASync(_event) {
        let cart = document.getElementById("cart");
        let overview = document.querySelector("#cart").innerText;
        sendRequestData(overview);
        alert(overview);
    }
    function sendRequestData(order) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", address + "?" + order, true);
        xhr.addEventListener("readystatechange", handleStateChange);
        xhr.send();
    }
    function handleStateChange(_event) {
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);
        }
    }
    function createInput() {
        for (let key in Aufgabe06.offering) {
            let product = Aufgabe06.offering[key];
            let fieldset = document.getElementById(key);
            fieldset.addEventListener("change", createCart);
            for (let a = 0; a < product.length; a++) {
                let input = document.createElement("input");
                document.getElementById(key).appendChild(input);
                input.name = key;
                input.value = Aufgabe06.offering[key][a].name;
                input.id = Aufgabe06.offering[key][a].name;
                input.setAttribute("group", key);
                input.setAttribute("index", "" + a);
                input.setAttribute("price", "" + Aufgabe06.offering[key][a].price);
                let label = document.createElement("label");
                document.getElementById(key).appendChild(label);
                label.setAttribute("for", Aufgabe06.offering[key][a].name);
                label.innerHTML = Aufgabe06.offering[key][a].name + " " + Aufgabe06.offering[key][a].price + "Euro";
                if (key == "trees" || key == "treeholder" || key == "top" || key == "lightstring") {
                    input.type = "radio";
                }
                else {
                    input.type = "number";
                    input.name = Aufgabe06.offering[key][a].name;
                    input.step = "1.0";
                    input.min = "0";
                    input.max = "100";
                    input.value = "0";
                }
                document.getElementById(key).appendChild(document.createElement("br"));
            }
        }
    }
    function createCart() {
        let p = document.getElementById("cart");
        let total = 0;
        let inputs = document.getElementsByTagName("input");
        p.innerHTML = " ";
        p.innerHTML = "<h2>Cart</h2>";
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            if (input.type == "number") {
                if (parseInt(input.value) > 0) {
                    let value = parseFloat(input.value);
                    let name = input.getAttribute("name");
                    let price = parseFloat(input.getAttribute("price"));
                    p.innerHTML += "<p>" + value + "x " + name + " " + " " + (price * value).toFixed(2) + "Euro" + " " + "</p>";
                    total += parseFloat((price * value).toFixed(2));
                }
            }
            if (input.checked == true) {
                let value = input.getAttribute("value");
                let price = parseFloat(input.getAttribute("price"));
                total += parseFloat((price).toFixed(2));
                p.innerHTML += "<p>" + value + " " + " " + price + "Euro" + "</p>";
            }
        }
        p.innerHTML += "Price: " + total.toFixed(2) + "Euro";
    }
})(Aufgabe06 || (Aufgabe06 = {}));
//# sourceMappingURL=Aufgabe8.js.map