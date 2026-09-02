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

});

//          MODAL-ORDER-PAGE

document.addEventListener("DOMContentLoaded", () => {
    let openAlert = false;
    let detectExit = true;

    const whatsappURL = "https://wa.me/5567998933945?text=Olá!%20Gostaria%20de%20estar%20realizando%20um%20pedido";
    
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
});


// ORDER MODAL 

document.addEventListener("DOMContentLoaded", () => {
    let openAlert = false;
    let detectExit = true;

    const whatsappURL = "https://wa.me/5567998933945?text=Olá!%20Gostaria%20de%20estar%20realizando%20um%20pedido";
    
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
});

document.addEventListener("DOMContentLoaded", () => {
    const WHATSAPP_NUMBER = "5567998933945";
    const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

    const products = {
        flavoredIce: {
            name: "Gelos Saborizados",
            flavors: ["Limão", "Morango", "Melancia", "Água de coco", "Maracujá", "Maçã verde", "Uva", "Energético", "Menta", "Bob Marley", "Laranja"],
            price: 3.00,
            wholesalePrice: 1.50,
            wholesaleMinQuantity: 30
        },
        gourmetIce: {
            name: "Gelos Gourmet",
            flavors: ["ainda falta valor aqui"],
            price: 4.00,
            wholesalePrice: 2.20,
            wholesaleMinQuantity: 30
        },
        fruitPopsicle: {
            name: "Picolés de Frutas",
            flavors: ["Morango", "Abacaxi", "Limão","Groselha", "Maracujá", "Melancia", "Uva", "Açaí"],
            price: 2.00,
            wholesalePrice: 1.35,
            wholesaleMinQuantity: 15
        },
        milkPopsicle: {
            name: "Picolés de Leite",
            flavors: ["Leite Condensado", "Chocolate", "Coco branco", "Coco queimado", "Doce de leite", "Milho verde", "Morango ao leite", "Blue Ice"],
            price: 3.00,
            wholesalePrice: 2.00,
            wholesaleMinQuantity: 10
        },
        specialMoreninha: {
            name: "Especial Moreninha",
            flavors: ["Tradicional/Cobertura de chocolate"],
            price: 8.00,
            wholesalePrice: null,
            wholesaleMinQuantity: null
        },
        cup300ml: {
            name: "Copo de Massa 300ml",
            flavors: ["Morango", "Chocolate", "Napolitano", "Ninho", "Ninho trufado", "Leite condensado", "Milho verde", "Flocos"],
            price: 10.00,
            wholesalePrice: null,
            wholesaleMinQuantity: null
        },
        pot1_5kg: {
            name: "Pote de Massa 1.5kg",
            flavors: ["Morango", "Chocolate", "Napolitano", "Ninho", "Ninho trufado", "Leite condensado", "Milho verde", "Flocos"],
            price: 22.00,
            wholesalePrice: null,
            wholesaleMinQuantity: null
        },
        pot5kg: {
            name: "Pote de Massa 5kg",
            flavors: ["Morango", "Chocolate", "Napolitano", "Ninho", "Ninho trufado", "Leite condensado", "Milho verde", "Flocos"],
            price: 80.00,
            wholesalePrice: null,
            wholesaleMinQuantity: null
        },
        bucket10kg: {
            name: "Balde de Massa 10kg",
            flavors: ["Morango", "Chocolate", "Napolitano", "Ninho", "Ninho trufado", "Leite condensado", "Milho verde", "Flocos"],
            price: 150.00,
            wholesalePrice: null,
            wholesaleMinQuantity: null
        },
        crushedIce3kg: {
            name: "Comestível Triturado 3kg",
            flavors: ["Tradicional"],
            price: 6.00,
            wholesalePrice: null,
            wholesaleMinQuantity: null
        },
        crushedIce5kg: {
            name: "Comestível Triturado 5kg",
            flavors: ["Tradicional"],
            price: 10.00,
            wholesalePrice: null,
            wholesaleMinQuantity: null
        }
    };

    function createModal() {
        const modalHTML = `
            <div id="orderModal" class="order-modal" style="display: none;">
                <div class="order-modal-content">
                    <span class="order-modal-close">&times;</span>
                    <div id="orderModalBody">
                        <!-- Dynamic content will be inserted here -->
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    function showAlert(icon, title, text) {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: icon,
                title: title,
                text: text,
                confirmButtonColor: '#8e3fa3',
                confirmButtonText: 'OK',
                timer: 3000,
                timerProgressBar: true
            });
        } else {
            alert(`${title}\n\n${text}`);
        }
    }

    function openModal(productId) {
        const modal = document.getElementById('orderModal');
        const body = document.getElementById('orderModalBody');
        const product = products[productId];

        if (!product) return;

        let html = `
            <h2>\u{1F366} ${product.name}</h2>
            <div class="order-price">
                <p>
                    <strong>R$ ${product.price.toFixed(2)}</strong> / unidade
                    ${product.wholesalePrice ? `<br><span class="price-wholesale">\u{1F4E6} Atacado (${product.wholesaleMinQuantity}+ unid): R$ ${product.wholesalePrice.toFixed(2)}/unidade</span>` : ''}
                </p>
            </div>
            
            <div class="order-flavors">
                <label><strong> Selecione os sabores:</strong></label>
                <div class="order-flavors-grid">
        `;

        product.flavors.forEach(flavor => {
            const id = `flavor_${flavor.replace(/\s/g, '_').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`;
            html += `
                <div class="order-flavor-item">
                    <input type="checkbox" class="flavor-checkbox" value="${flavor}" id="${id}">
                    <label for="${id}">${flavor}</label>
                </div>
            `;
        });

        html += `
                </div>
                <div id="flavorError" class="order-error" style="display: none; color: #e74c3c; font-size: 13px; margin-top: 8px;">
                    \u{26A0}\u{FE0F} Selecione pelo menos um sabor!
                </div>
            </div>

            <div class="order-quantity">
                <label for="quantity">\u{1F4CA} Quantidade:</label>
                <input type="number" id="quantity" min="1" value="1">
                <div id="quantityError" class="order-error" style="display: none; color: #e74c3c; font-size: 13px; margin-top: 5px;">
                    \u{26A0}\u{FE0F} Informe uma quantidade válida!
                </div>
            </div>

            <div class="order-observation">
                <label for="observation">\u{1F4DD} Observações (opcional):</label>
                <textarea id="observation" rows="2" placeholder="Ex: sem açúcar, entrega para..."></textarea>
            </div>

            <button id="sendOrderBtn" class="button btn-send-order" data-product="${productId}">
                \u{1F49A} ENVIAR PEDIDO PARA O WHATSAPP
            </button>
        `;

        body.innerHTML = html;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        setupModalEvents(productId);
    }

    function closeModal() {
        const modal = document.getElementById('orderModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function setupModalEvents(productId) {
        const closeBtn = document.querySelector('.order-modal-close');
        closeBtn.addEventListener('click', closeModal);

        const modal = document.getElementById('orderModal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        const sendBtn = document.getElementById('sendOrderBtn');
        sendBtn.addEventListener('click', () => {
            sendOrder(productId);
        });

        const quantityInput = document.getElementById('quantity');
        quantityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendOrder(productId);
            }
        });

        quantityInput.addEventListener('input', () => {
            document.getElementById('quantityError').style.display = 'none';
        });

        document.querySelectorAll('.flavor-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                document.getElementById('flavorError').style.display = 'none';
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });
    }

    function sendOrder(productId) {
        const product = products[productId]; 
        const checkboxes = document.querySelectorAll('.flavor-checkbox:checked');
        const selectedFlavors = Array.from(checkboxes).map(cb => cb.value);
        
        const quantity = parseInt(document.getElementById('quantity').value) || 0;
        const observation = document.getElementById('observation').value.trim();

        let hasError = false;

        if (selectedFlavors.length === 0) {
            document.getElementById('flavorError').style.display = 'block';
            document.querySelector('.order-flavors').scrollIntoView({ behavior: 'smooth', block: 'center' });
            hasError = true;
        }

        if (quantity < 1) {
            document.getElementById('quantityError').style.display = 'block';
            document.getElementById('quantity').focus();
            hasError = true;
        }

        if (hasError) {
            showAlert('warning', 'Ops!', 'Por favor, corrija os campos destacados acima.');
            return;
        }

        let unitPrice = product.price;
        if (product.wholesalePrice && quantity >= product.wholesaleMinQuantity) {
            unitPrice = product.wholesalePrice;
        }
        const total = unitPrice * quantity;

        let message = `*FRUITSALLES - NOVO PEDIDO* %0A%0A`;
        message += `*Produto:* ${product.name}%0A`;
        message += `*Sabores:* ${selectedFlavors.join(', ')}%0A`;
        message += `*Quantidade:* ${quantity} unidade(s)%0A`;
        message += `*Valor unitário:* R$ ${unitPrice.toFixed(2)}%0A`;
        message += `*Total:* R$ ${total.toFixed(2)}%0A%0A`;

        if (observation) {
            message += `*Observações:* ${observation}%0A%0A`;
        }

        message += `Olá! Gostaria de confirmar meu pedido.`;

        const url = WHATSAPP_URL + message;
        window.open(url, '_blank');
        closeModal();
    }

    function setupOrderButtons() {
        const productMapping = {
            'Gelos Saborizados': 'flavoredIce',
            'Gelos Gourmet': 'gourmetIce',
            'Picolés de Frutas': 'fruitPopsicle',
            'Picolés de Leite': 'milkPopsicle',
            'Especial Moreninha': 'specialMoreninha',
            'Copo de Massa 300ml': 'cup300ml',
            'Pote de Massa 1.5kg': 'pot1_5kg',
            'Pote de Massa 5kg': 'pot5kg',
            'Balde de Massa 10kg': 'bucket10kg',
            'Comestível Triturado 3kg': 'crushedIce3kg',
            'Comestível Triturado 5kg': 'crushedIce5kg'
        };

        const buttons = document.querySelectorAll('.button-green, .button-pink, .button-purple, .button-yellow, .button-blue');
        
        buttons.forEach(button => {
            if (button.textContent.includes('PEDIR AGORA') || button.textContent.includes('PEDIR')) {
                const card = button.closest('.product-card, .flavors-card, .fruit-content, .contact-box');
                let productId = null;

                if (card) {
                    const title = card.querySelector('h2, h3');
                    if (title) {
                        const productName = title.textContent.trim();
                        for (const [name, id] of Object.entries(productMapping)) {
                            if (productName.includes(name) || name.includes(productName)) {
                                productId = id;
                                break;
                            }
                        }
                    }
                }

                if (!productId) {
                    if (button.closest('.flavors-card')) productId = 'flavoredIce';
                    else if (button.closest('.fruit-content')) productId = 'gourmetIce';
                    else if (button.closest('.fruits')) productId = 'fruitPopsicle';
                    else if (button.closest('.crushed')) productId = 'specialMoreninha';
                    else if (button.closest('.milk')) {
                        const title = button.closest('.product-card')?.querySelector('h3');
                        if (title) {
                            const text = title.textContent;
                            if (text.includes('Picolés de Leite')) productId = 'milkPopsicle';
                            else if (text.includes('Copo')) productId = 'cup300ml';
                            else if (text.includes('1.5kg')) productId = 'pot1_5kg';
                            else if (text.includes('5kg') && !text.includes('1.5')) productId = 'pot5kg';
                            else if (text.includes('10kg')) productId = 'bucket10kg';
                            else if (text.includes('Triturado 3') || text.includes('triturado – 3')) productId = 'crushedIce3kg';
                            else if (text.includes('Triturado 5') || text.includes('triturado – 5')) productId = 'crushedIce5kg';
                        }
                    }
                }

                if (productId && products[productId]) {
                    button.removeAttribute('href');
                    button.style.cursor = 'pointer';
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openModal(productId);
                    });
                }
            }
        });
    }

    createModal();
    if (document.readyState === 'complete') {
        setupOrderButtons();
    } else {
        window.addEventListener('load', () => {
            setTimeout(setupOrderButtons, 300);
        });
    }
    console.log('\u{1F366} FruitSalles Order System initialized!');
});