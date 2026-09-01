document.addEventListener("DOMContentLoaded", () => {
    let openAlert = false;
    let detectExit = true;

    const whatsappURL ="https://wa.me/5567998933945?text=Olá!%20Gostaria%20de%20estar%20realizando%20um%20pedido";
    function showExitAlert() {
        if (openAlert || !detectExit) {
            return;
        }
        openAlert = true;
        Swal.fire({
            title: "Antes de você ir... \u{1F49C}",
            html: `
                <div class="exit-alert">
                    <div class="exit-icon">\u{1F4AC}</div>
                    <p class="exit-main">
                        Visite nosso <strong>WhatsApp!</strong>
                    </p>

                    <p class="exit-text">
                        Lá tiramos todas as suas dúvidas
                        e ajudamos você com o que precisar.
                    </p>

                    <span class="exit-tag">
                        \u{1F49C} Estamos esperando por você!
                    </span>

                </div>
            `,
            showCancelButton: true,

            confirmButtonText: "Ir para o WhatsApp \u{1F4AC}",
            cancelButtonText: "Continuar na página",
            customClass: {
                popup: "fruitsalles-exit",
                title: "fruitsalles-exit-title",
                confirmButton: "fruitsalles-exit-button",
                cancelButton: "fruitsalles-exit-cancel"
            },

            buttonsStyling: false,
            reverseButtons: true,
            allowOutsideClick: false,
            allowEscapeKey: true
        }).then((result) => {

            if (result.isConfirmed) {
                window.open(whatsappURL, "_blank");
                openAlert = false;
            } else {
                openAlert = false;
            }
        });
    }

    history.pushState(null, "", location.href);

    window.addEventListener("popstate", () => {
        if (openAlert) {
            return;
        }

        history.pushState(null, "", location.href);
        showExitAlert();
    });

    document.addEventListener("mouseout", (event) => {
        if (!event.relatedTarget && event.clientY <= 5) {
            showExitAlert();
        }
    });

    document.addEventListener("mouseout", (event) => {
        if (!event.relatedTarget) {
            if (event.clientY <= 5) {
                showExitAlert();
            }
        }
    });
});