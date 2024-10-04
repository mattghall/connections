import $ from 'jquery';
let lastMessage = "";

export function logMe(text) {
    if (lastMessage == text) {
        return;
    } else {
        lastMessage = text;
    }

    if (debugMode) {
        console.log(text);
        $("#logs").append("<br/>" + text);
        $(".logDivs").scrollTop($(".logDivs")[0].scrollHeight)
    }
}

export let debugMode = false;

export function toggleDebug() {
    debugMode = !debugMode;
}