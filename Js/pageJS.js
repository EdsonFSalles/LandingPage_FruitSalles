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

document.addEventListener("DOMContentLoaded", () => {
    const WHATSAPP_NUMBER = "5567998933945";
    const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

    const products = {
        flavoredIce: {
            name: "Gelos Saborizados",
            flavors: ["Limão", "Morango", "Melancia", "Água de coco", "Maracujá", "Maçã verde", "Uva", "Energético", "Menta", "Bob Marley", "Laranja", "Sortidos"],
            price: 3.00,
            wholesalePrice: 1.50,
            wholesaleMinQuantity: 30,
            sortidosIncrement: 10
        },
        gourmetIce: {
            name: "Gelos Gourmet",
            flavors: ["Morango", "Abacaxi", "Maracuja", "Limão", "Melancia", "Maçã verde", "Uva", "Sortidos"],
            price: 4.00,
            wholesalePrice: 2.20,
            wholesaleMinQuantity: 30,
            sortidosIncrement: 10
        },
        fruitPopsicle: {
            name: "Picolés de Frutas",
            flavors: ["Morango", "Abacaxi", "Limão", "Groselha", "Maracujá", "Melancia", "Uva", "Açaí", "Sortidos"],
            price: 2.00,
            wholesalePrice: 1.35,
            wholesaleMinQuantity: 15,
            sortidosIncrement: 5
        },
        milkPopsicle: {
            name: "Picolés de Leite",
            flavors: ["Leite Condensado", "Chocolate", "Coco branco", "Coco queimado", "Doce de leite", "Milho verde", "Morango ao leite", "Blue Ice", "Sortidos"],
            price: 3.00,
            wholesalePrice: 2.00,
            wholesaleMinQuantity: 10,
            sortidosIncrement: 5
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
            flavors: ["Morango", "Chocolate", "Napolitano", "Ninho", "Ninho trufado", "Leite condensado", "Milho verde", "Flocos", "Sortidos"],
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
                        <!-- Dynamic content -->
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('orderModal');
            if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
                closeModal();
            }
        });
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

        product.flavors.forEach((flavor, index) => {
            const id = `flavor_${index}`;
            const increment =
                flavor.toLowerCase() === 'sortidos'
                    ? product.sortidosIncrement
                    : 1;
            html += `
                <div class="order-flavor-item">
                <div class="flavor-name">
                    ${flavor}
                </div>

                <div class="flavor-controls">
                    <button
                        type="button"
                        class="flavor-minus"
                        data-flavor="${flavor}"
                        data-increment="${increment}">
                        −
                    </button>
                    <span
                        class="flavor-quantity"
                        id="${id}"
                        data-flavor="${flavor}"
                        data-quantity="0">
                        0
                    </span>
                    <button
                        type="button"
                        class="flavor-plus"
                        data-flavor="${flavor}"
                        data-increment="${increment}">
                        +
                    </button>
                </div>
                ${flavor.toLowerCase() === 'sortidos'
                    ? `<small class="assorted-info">
                           \u{1F4E6} Pacote com ${increment} unidades
                       </small>`
                    : ''
                }
            </div>
            `;
        });

        html += `
            </div>
                <div
                    id="flavorError"
                    class="order-error"
                    style="
                        display: none;
                        color: #e74c3c;
                        font-size: 13px;
                        margin-top: 8px;
                    ">
                    \u{26A0}\u{FE0F}  Selecione pelo menos uma quantidade!
                </div>
            </div>

            <div class="order-quantity">
                <label for="quantity">\u{1F4CA} Quantidade total:</label>
                <span id="totalQuantity">0</span> unidade(s)
            </div>

            <div class="order-observation">
                <label for="observation">\u{1F4DD} Observações (opcional):</label>
                <textarea id="observation" rows="2" placeholder="Ex: Entrega para..."></textarea>
                <div id="observationFeedback" style="
                    display: none;
                    color: #e74c3c;
                    font-size: 12px;
                    margin-top: 5px;
                    font-weight: 600;
                ">
                \u{26A0}\u{FE0F} Limite máximo de 200 caracteres atingido!
                </div>
                <div id="charCounter" style="
                    margin-left: auto;
                    font-size: 11px;
                    color: #806c85;
                ">
                    0/200
                </div>
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
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';

            const body = document.getElementById('orderModalBody');
            if (body) {
                body.innerHTML = '';
            }
        }
    }

    function setupModalEvents(productId) {
        const modal = document.getElementById('orderModal');
        const closeBtn = document.querySelector('.order-modal-close');
        const sendBtn = document.getElementById('sendOrderBtn');

        closeBtn.onclick = closeModal;

        modal.onclick = (e) => {
            if (e.target === modal) {
                closeModal();
            }
        };

        sendBtn.onclick = (e) => {
            e.preventDefault();
            sendOrder(productId);
        };

        document.querySelectorAll('.flavor-plus').forEach(button => {
            button.onclick = () => {
                const flavor = button.dataset.flavor;
                const increment = parseInt(button.dataset.increment);
                const quantityElement =
                    document.querySelector(`.flavor-quantity[data-flavor="${CSS.escape(flavor)}"]`);
                let quantity =
                    parseInt(quantityElement.dataset.quantity) || 0;

                quantity += increment;
                quantityElement.dataset.quantity = quantity;
                quantityElement.textContent = quantity;
                updateTotalQuantity();
            };

        });

        document.querySelectorAll('.flavor-minus').forEach(button => {
            button.onclick = () => {
                const flavor = button.dataset.flavor;
                const increment = parseInt(button.dataset.increment);
                const quantityElement =
                    document.querySelector(`.flavor-quantity[data-flavor="${CSS.escape(flavor)}"]`);

                let quantity =
                    parseInt(quantityElement.dataset.quantity) || 0;

                quantity -= increment;
                if (quantity < 0) {
                    quantity = 0;
                }

                quantityElement.dataset.quantity = quantity;
                quantityElement.textContent = quantity;
                updateTotalQuantity();
            };
        });

        const observation = document.getElementById('observation');
        const currentLength = observation.value.length;

        if (observation) {
            const feedbackElement = document.getElementById('observationFeedback');
            const charCounter = document.getElementById('charCounter');
            const maxLength = 200;

            observation.oninput = () => {
                const currentLength = observation.value.length;

                if (charCounter) {
                    charCounter.textContent = `${currentLength}/${maxLength}`;

                    if (currentLength > 180) {
                        charCounter.style.color = '#e74c3c';
                        charCounter.style.fontWeight = 'bold';
                    } else if (currentLength > 150) {
                        charCounter.style.color = '#f39c12';
                        charCounter.style.fontWeight = 'normal';
                    } else {
                        charCounter.style.color = '#806c85';
                        charCounter.style.fontWeight = 'normal';
                    }
                }

                if (currentLength > maxLength) {
                    observation.value = observation.value.substring(0, maxLength);

                    if (feedbackElement) {
                        feedbackElement.style.display = 'block';

                        feedbackElement.style.animation = 'none';
                        feedbackElement.offsetHeight;
                        feedbackElement.style.animation = 'shake 0.3s ease';
                    }

                    observation.style.borderColor = '#e74c3c';
                    observation.style.boxShadow = '0 0 0 4px rgba(231, 76, 60, 0.1)';

                    clearTimeout(observation.timeout);
                    observation.timeout = setTimeout(() => {
                        if (feedbackElement) {
                            feedbackElement.style.display = 'none';
                        }
                        observation.style.borderColor = '';
                        observation.style.boxShadow = '';
                    }, 2000);

                    if (charCounter) {
                        charCounter.textContent = `${maxLength}/${maxLength}`;
                    }
                }
            };
        }
    }

    function updateTotalQuantity() {

        let total = 0;

        document.querySelectorAll('.flavor-quantity').forEach(element => {

            const quantity =
                parseInt(element.dataset.quantity) || 0;

            total += quantity;
        });

        const totalElement =
            document.getElementById('totalQuantity');

        if (totalElement) {
            totalElement.textContent = total;
        }

        return total;
    }

    function sendOrder(productId) {
        const product = products[productId];

        if (!product) return;
        const flavorElements = document.querySelectorAll('.flavor-quantity');
        const selectedFlavors = [];
        let totalQuantity = 0;

        flavorElements.forEach(element => {
            const flavor = element.dataset.flavor;
            const quantity = parseInt(element.dataset.quantity) || 0;

            if (quantity > 0) {
                selectedFlavors.push({
                    flavor: flavor,
                    quantity: quantity
                });
                totalQuantity += quantity;
            }
        });

        if (totalQuantity === 0) {
            document.getElementById('flavorError').style.display = 'block';
            document
                .querySelector('.order-flavors')
                .scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            showAlert(
                'warning',
                'Ops!',
                'Selecione pelo menos uma quantidade.'
            );

            return;
        }

        let unitPrice = product.price;

        if (
            product.wholesalePrice &&
            totalQuantity >= product.wholesaleMinQuantity
        ) {
            unitPrice = product.wholesalePrice;
        }

        const total = unitPrice * totalQuantity;

        let message = `*FRUITSALLES - NOVO PEDIDO* %0A%0A`;
        message += `*Produto:* ${product.name}%0A%0A`;
        message += `*Sabores e quantidades:*%0A`;
        selectedFlavors.forEach(item => {
            message += `• ${item.flavor}: ${item.quantity} unidade(s)%0A`;
        });
        message += `%0A`;
        message += `*Quantidade total:* ${totalQuantity} unidade(s)%0A`;
        message += `*Valor unitário:* R$ ${unitPrice.toFixed(2)}%0A`;
        message += `*Total:* R$ ${total.toFixed(2)}%0A%0A`;

        const observationElement =
            document.getElementById('observation');

        const observation =
            observationElement ? observationElement.value.trim() : '';

        if (observation) {
            message +=
                `*Observações:* ${encodeURIComponent(observation)}%0A%0A`;
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
                    else if (button.closest('.item')) {
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
    setupOrderButtons();
    console.log('\u{1F366} FruitSalles Order System initialized!');
});