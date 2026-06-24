/* ==========================================
   PROMPT COMPANION AI
   MAIN JAVASCRIPT FILE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       CHARACTER COUNTER
    ========================================== */

    const promptBox = document.getElementById("promptBox");
    const charCount = document.getElementById("charCount");

    if (promptBox && charCount) {

        promptBox.addEventListener("input", () => {

            charCount.textContent =
                `${promptBox.value.length} / 2000`;

        });

    }

    /* ==========================================
       EXAMPLE CARDS CLICK
    ========================================== */

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

    /* ==========================================
       CTRL + ENTER SUBMIT
    ========================================== */

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

    /* ==========================================
       SEARCH CHAT
    ========================================== */

    const searchInput = document.getElementById("searchChat");

    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const value =
                searchInput.value.toLowerCase();

            document
                .querySelectorAll(".history-item")
                .forEach(item => {

                    const text =
                        item.innerText.toLowerCase();

                    item.style.display =
                        text.includes(value)
                        ? "flex"
                        : "none";

                });

        });

    }

    /* ==========================================
       NEW CHAT BUTTON
    ========================================== */

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

            document
                .querySelectorAll(".chat-content")
                .forEach(chat => {

                    chat.style.display = "none";

                });

        });

    }

    /* ==========================================
       PREVENT DOUBLE SUBMIT
    ========================================== */

    const promptForm =
        document.querySelector(".prompt-form");

    if (promptForm) {

        promptForm.addEventListener("submit", () => {

            const sendBtn =
                document.querySelector(
                    ".prompt-footer button"
                );

            sendBtn.disabled = true;

            sendBtn.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';

        });

    }

    /* ==========================================
       LOAD SAVED THEME
    ========================================== */

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

    }

});


/* ==========================================
   MARKDOWN RENDERING
========================================== */

document
.querySelectorAll(".markdown-content")
.forEach(element => {

    element.innerHTML =
        marked.parse(element.textContent);

});


/* ==========================================
   LOAD CHAT
========================================== */

function loadChat(chatId) {

    document
    .querySelectorAll(".chat-content")
    .forEach(chat => {

        chat.style.display = "none";

    });

    const selectedChat =
        document.getElementById(
            "chat-" + chatId
        );

    if (selectedChat) {

        selectedChat.style.display =
            "block";

    }

}


/* ==========================================
   DELETE CHAT
========================================== */

function deleteChat(event, chatId) {

    event.stopPropagation();

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this chat?"
        );

    if (confirmDelete) {

        window.location.href =
            "/delete_chat/" + chatId;

    }

}


/* ==========================================
   COPY TEXT
========================================== */

function copyText(text) {

    navigator.clipboard
        .writeText(text)
        .then(() => {

            alert("Copied Successfully");

        });

}


/* ==========================================
   EDIT PROMPT
========================================== */

function editPrompt(prompt, chatId) {

    const promptBox =
        document.getElementById("promptBox");

    const editChatId =
        document.getElementById("editChatId");

    if(promptBox){

        promptBox.value = prompt;

        promptBox.focus();

    }

    if(editChatId){

        editChatId.value = chatId;

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

function copyText(text){

    navigator.clipboard.writeText(text)
    .then(() => {

        alert("Copied Successfully");

    })
    .catch(err => {

        console.error(err);

    });

}


/* ==========================================
   PASSWORD TOGGLE
========================================== */

function togglePassword(inputId, icon) {

    const input =
        document.getElementById(inputId);

    if (!input) return;

    if (input.type === "password") {

        input.type = "text";

        icon.classList.remove("fa-eye");

        icon.classList.add("fa-eye-slash");

    }

    else {

        input.type = "password";

        icon.classList.remove(
            "fa-eye-slash"
        );

        icon.classList.add("fa-eye");

    }

}


/* ==========================================
   DARK MODE TOGGLE
========================================== */

function toggleTheme() {

    document.body.classList.toggle(
        "light-mode"
    );

    localStorage.setItem(
        "theme",
        document.body.classList.contains(
            "light-mode"
        )
            ? "light"
            : "dark"
    );

}