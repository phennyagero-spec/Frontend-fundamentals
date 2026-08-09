document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("reservationForm");
    if (!form) return;

    const loadingOverlay = document.getElementById("resLoadingOverlay");
    const successOverlay = document.getElementById("resSuccessOverlay");
    const successMsg = document.getElementById("resSuccessMsg");

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("resName").value.trim();
        const date = document.getElementById("resDate").value;
        const time = document.getElementById("resTime").value;
        const guests = document.getElementById("resGuests").value;

        if (!name || !document.getElementById("resPhone").value.trim() || !date || !time || !guests) {
            return;
        }

        loadingOverlay.classList.add("show");

        setTimeout(() => {

            loadingOverlay.classList.remove("show");

            const formattedDate = new Date(date + "T00:00:00").toLocaleDateString(undefined, {
                day: "numeric", month: "short", year: "numeric"
            });

            successMsg.textContent =
                `Thank you, ${name}! Your table for ${guests} on ${formattedDate} at ${time} is confirmed.`;

            successOverlay.classList.add("show");

            setTimeout(() => {
                window.location.href = "menu.html";
            }, 2800);

        }, 1900);

    });

});