document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       CHARACTER COUNTER
    ========================= */

    const promptBox = document.getElementById("promptBox");
    const charCount = document.getElementById("charCount");

    if (promptBox && charCount) {

        promptBox.addEventListener("input", () => {

            charCount.textContent =
                `${promptBox.value.length} / 2000`;

        });

    }

    /* =========================
       EXAMPLE CARDS
    ========================= */

    const exampleCards =
        document.querySelectorAll(".example-card");

    exampleCards.forEach(card => {

        card.addEventListener("click", () => {

            const text =
                card.querySelector("p").innerText;

            if (promptBox) {

                promptBox.value = text;

                charCount.textContent =
                    `${text.length} / 2000`;

                promptBox.focus();
            }

        });

    });

    /* =========================
       CTRL + ENTER SUBMIT
    ========================= */

    if (promptBox) {

        promptBox.addEventListener("keydown", (e) => {

            if (e.ctrlKey && e.key === "Enter") {

                const form =
                    document.querySelector(".prompt-form");

                if (form) {
                    form.submit();
                }

            }

        });

    }

    /* =========================
       SEARCH CHAT
    ========================= */

    const searchInput =
        document.getElementById("searchChat");

    const historyCards =
        document.querySelectorAll(".history-card");

    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const value =
                searchInput.value.toLowerCase();

            historyCards.forEach(card => {

                const text =
                    card.innerText.toLowerCase();

                card.style.display =
                    text.includes(value)
                    ? "block"
                    : "none";

            });

        });

    }

    /* =========================
       NEW CHAT
    ========================= */

    const newChatBtn =
        document.querySelector(".new-chat-btn");

    if (newChatBtn) {

        newChatBtn.addEventListener("click", () => {

            if (promptBox) {

                promptBox.value = "";

                charCount.textContent =
                    "0 / 2000";

                promptBox.focus();

            }

        });

    }

    /* =========================
       DARK MODE TOGGLE
    ========================= */

    const moonIcon =
        document.querySelector(".fa-moon");

    if (moonIcon) {

        moonIcon.parentElement.addEventListener(
            "click",
            () => {

                document.body.classList.toggle("light-mode");

                localStorage.setItem(
                    "theme",
                    document.body.classList.contains("light-mode")
                    ? "light"
                    : "dark"
                );

            }
        );

    }

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

    }

});

document.querySelectorAll(".markdown-content")
.forEach(element => {

    element.innerHTML =
        marked.parse(element.textContent);

});
function togglePassword(inputId, icon){

    const input =
    document.getElementById(inputId);

    if(input.type === "password"){

        input.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    }
    else{

        input.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

}
function loadChat(chatId){

    document
    .querySelectorAll(".chat-content")
    .forEach(chat => {

        chat.style.display = "none";

    });

    const selectedChat =
        document.getElementById("chat-" + chatId);

    if(selectedChat){

        selectedChat.style.display = "block";

    }
}
function togglePassword(inputId, element){

    const input =
    document.getElementById(inputId);

    if(input.type === "password"){

        input.type = "text";

        element.textContent = "🙈";

    }else{

        input.type = "password";

        element.textContent = "👁";

    }

}

const promptForm =
document.querySelector(".prompt-form");

if(promptForm){

    promptForm.addEventListener("submit", () => {

        const sendBtn =
        document.querySelector(
            ".prompt-footer button"
        );

        sendBtn.disabled = true;

        sendBtn.innerHTML =
        "Generating...";

    });

}
function deleteChat(event, chatId){

    event.stopPropagation();

    if(confirm("Delete this chat?")){

        window.location.href =
        "/delete_chat/" + chatId;

    }

}