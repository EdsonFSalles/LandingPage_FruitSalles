// CONFIGURAÇÃO

const CONFIG = {
    WHATSAPP_NUMBER: "5567998933945",
    MAX_OBSERVATION_LENGTH: 200,
    ALERT_TIMER: 3000,
    ANIMATION_DURATION: 2000
};

const WHATSAPP_URL = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=`;

const EMOJIS = {
    cart: '\u{1F6D2}',
    edit: '\u{270F}\u{FE0F}',
    remove: '\u{1F5D1}\u{FE0F}',
    cancel: '\u{274C}',
    whatsapp: '\u{1F49A}',
    warning: '\u{26A0}\u{FE0F}',
    package: '\u{1F4E6}',
    chart: '\u{1F4CA}',
    note: '\u{1F4DD}',
    heart: '\u{1F49C}',
    iceCream: '\u{1F366}'
};

const state = {
    cart: [],
    currentProductId: null,
    openAlert: false,
    detectExit: true
};

//ARRAY PRODUCT
const PRODUCTS = {
    flavoredIce: createProduct({
        name: "Gelos Saborizados",
        flavors: ["Limão", "Morango", "Melancia", "Água de coco", "Maracujá", "Maçã verde", "Uva", "Energético", "Menta", "Bob Marley", "Laranja", "Sortidos"],
        price: 3.00,
        wholesalePrice: 1.50,
        wholesaleMinQuantity: 30,
        sortidosIncrement: 10
    }),
    gourmetIce: createProduct({
        name: "Gelos Gourmet",
        flavors: ["Morango", "Abacaxi", "Maracuja", "Limão", "Melancia", "Maçã verde", "Uva", "Sortidos"],
        price: 4.00,
        wholesalePrice: 2.20,
        wholesaleMinQuantity: 30,
        sortidosIncrement: 10
    }),
    fruitPopsicle: createProduct({
        name: "Picolés de Frutas",
        flavors: ["Morango", "Abacaxi", "Limão", "Groselha", "Maracujá", "Melancia", "Uva", "Açaí", "Sortidos"],
        price: 2.00,
        wholesalePrice: 1.35,
        wholesaleMinQuantity: 15,
        sortidosIncrement: 5
    }),
    milkPopsicle: createProduct({
        name: "Picolés de Leite",
        flavors: ["Leite Condensado", "Chocolate", "Coco branco", "Coco queimado", "Doce de leite", "Milho verde", "Morango ao leite", "Blue Ice", "Sortidos"],
        price: 3.00,
        wholesalePrice: 2.00,
        wholesaleMinQuantity: 10,
        sortidosIncrement: 5
    }),
    specialMoreninha: createProduct({
        name: "Especial Moreninha",
        flavors: ["Tradicional"],
        price: 8.00
    }),
    cup300ml: createProduct({
        name: "Copo de Massa 300ml",
        flavors: ["Morango", "Chocolate", "Napolitano", "Ninho", "Ninho trufado", "Leite condensado", "Milho verde", "Flocos", "Sortidos"],
        price: 10.00
    }),
    pot1_5kg: createProduct({
        name: "Pote de Massa 1.5kg",
        flavors: ["Morango", "Chocolate", "Napolitano", "Ninho", "Ninho trufado", "Leite condensado", "Milho verde", "Flocos"],
        price: 22.00
    }),
    pot5kg: createProduct({
        name: "Pote de Massa 5kg",
        flavors: ["Morango", "Chocolate", "Napolitano", "Ninho", "Ninho trufado", "Leite condensado", "Milho verde", "Flocos"],
        price: 80.00
    }),
    bucket10kg: createProduct({
        name: "Balde de Massa 10kg",
        flavors: ["Morango", "Chocolate", "Napolitano", "Ninho", "Ninho trufado", "Leite condensado", "Milho verde", "Flocos"],
        price: 150.00
    }),
    crushedIce3kg: createProduct({
        name: "Comestível Triturado 3kg",
        flavors: ["Tradicional"],
        price: 6.00
    }),
    crushedIce5kg: createProduct({
        name: "Comestível Triturado 5kg",
        flavors: ["Tradicional"],
        price: 10.00
    })
};

function createProduct({ name, flavors, price, wholesalePrice = null, wholesaleMinQuantity = null, sortidosIncrement = null }) {
    return { name, flavors, price, wholesalePrice, wholesaleMinQuantity, sortidosIncrement };
}

const DOM = {
    getElement: (id) => document.getElementById(id),

    getModalElements: () => ({
        modal: DOM.getElement('orderModal'),
        body: DOM.getElement('orderModalBody')
    }),

    showModal: () => {
        const { modal } = DOM.getModalElements();
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    },

    hideModal: () => {
        const { modal, body } = DOM.getModalElements();
        if (!modal) return;

        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        if (body) body.innerHTML = '';
    }
};

const AlertHelper = {
    show: (icon, title, text) => {
        if (typeof Swal === 'undefined') {
            alert(`${title}\n\n${text}`);
            return;
        }

        Swal.fire({
            icon,
            title,
            text,
            confirmButtonColor: '#8e3fa3',
            confirmButtonText: 'OK',
            timer: CONFIG.ALERT_TIMER,
            timerProgressBar: true
        });
    }
};

const PriceCalculator = {
    calculate: (product, quantity) => {
        const hasPromo = product.wholesalePrice && quantity >= product.wholesaleMinQuantity;
        const unitPrice = hasPromo ? product.wholesalePrice : product.price;

        return {
            unitPrice,
            hasPromo,
            total: unitPrice * quantity,
            regularTotal: product.price * quantity,
            savings: hasPromo ? (product.price - product.wholesalePrice) * quantity : 0
        };
    },

    calculateCartTotals: (cartItems) =>
        cartItems.reduce((acc, item) => ({
            grandTotal: acc.grandTotal + item.total,
            totalItems: acc.totalItems + item.totalQuantity,
            totalSavings: acc.totalSavings + (item.savings || 0)
        }), { grandTotal: 0, totalItems: 0, totalSavings: 0 })
};

const HTMLGenerator = {
    productPrice: (product) => `
        <strong>R$ ${product.price.toFixed(2)}</strong> / unidade
        ${product.wholesalePrice ?
            `<br><span class="price-wholesale">${EMOJIS.package} Atacado (${product.wholesaleMinQuantity}+ unid): R$ ${product.wholesalePrice.toFixed(2)}/unidade</span>`
            : ''}
    `,

    flavorControls: (flavor, increment, quantity = 0, prefix = '') => `
        <div class="order-flavor-item">
            <div class="flavor-name">${flavor}</div>
            <div class="flavor-controls">
                <button type="button" class="flavor-minus-five" data-flavor="${flavor}" data-increment="${increment * 5}">−5</button>
                <button type="button" class="flavor-minus" data-flavor="${flavor}" data-increment="${increment}">−</button>
                <span class="flavor-quantity" id="${prefix}flavor_${flavor.replace(/\s+/g, '_')}" 
                      data-flavor="${flavor}" data-quantity="${quantity}">${quantity}</span>
                <button type="button" class="flavor-plus" data-flavor="${flavor}" data-increment="${increment}">+</button>
                 <button type="button" class="flavor-plus-five" data-flavor="${flavor}" data-increment="${increment * 5}">+5</button>
            </div>
            ${flavor.toLowerCase() === 'sortidos' ?
            `<small class="assorted-info">${EMOJIS.package} Pacote com ${increment} unidades</small>`
            : ''}
        </div>
    `,

    observationField: (value = '') => `
        <div class="order-observation">
            <label for="observation">${EMOJIS.note} Observações (opcional):</label>
            <textarea id="observation" rows="2" placeholder="Ex: Entrega para...">${value}</textarea>
            <div id="observationFeedback" style="display: none; color: #e74c3c; font-size: 12px; margin-top: 5px; font-weight: 600;">
                ${EMOJIS.warning} Limite máximo de ${CONFIG.MAX_OBSERVATION_LENGTH} caracteres atingido!
            </div>
            <div id="charCounter" style="margin-left: auto; font-size: 11px; color: #806c85;">
                ${value.length}/${CONFIG.MAX_OBSERVATION_LENGTH}
            </div>
        </div>
    `,

    cartItem: (item, index) => `
        <div class="cart-item">
            <div class="cart-item-header">
                <strong>${item.productName}</strong>
                <span>R$ ${item.total.toFixed(2)}</span>
            </div>
            <div class="cart-item-flavors">
                ${item.flavors.map(f => `• ${f.flavor}: ${f.quantity} un`).join('<br>')}
            </div>
            <div class="cart-item-details">
                <span>Quantidade: ${item.totalQuantity} un</span>
                ${HTMLGenerator.priceDisplay(item)}
            </div>
            ${item.observation ? `<div class="cart-item-observation">Obs: ${item.observation}</div>` : ''}
            <div class="cart-item-actions">
                <button class="cart-edit-btn" data-index="${index}">${EMOJIS.edit} EDITAR</button>
                <button class="cart-remove-btn" data-index="${index}">${EMOJIS.remove} REMOVER</button>
            </div>
        </div>
    `,

    priceDisplay: (item) => {
        if (!item.hasPromo) return `<span>R$ ${item.total.toFixed(2)}</span>`;

        return `
            <span>
                <span style="text-decoration: line-through; color: #7c0596;">R$ ${item.regularTotal.toFixed(2)}</span>
                <span style="color: #55a86b; font-weight: bold;">R$ ${item.total.toFixed(2)}</span>
                <small style="display: block; color: #55a86b;">Economia: R$ ${item.savings.toFixed(2)}</small>
            </span>
        `;
    },

    cartSummary: (totals, cartLength) => `
        <div class="cart-summary">
            <div><span>Total de itens:</span><strong>${totals.totalItems} unidade(s)</strong></div>
            <div><span>Total de produtos:</span><strong>${cartLength} produto(s)</strong></div>
            ${totals.totalSavings > 0 ?
            `<div><span style="color: #55a86b;">Economia total:</span><strong style="color: #55a86b;">- R$ ${totals.totalSavings.toFixed(2)}</strong></div>`
            : ''}
            <div class="cart-total"><strong>VALOR TOTAL:</strong><strong>R$ ${totals.grandTotal.toFixed(2)}</strong></div>
        </div>
    `,

    cartActions: () => `
        <div style="display: flex; gap: 10px; flex-direction: column;">
            <button id="continueShoppingBtn" class="button btn-continue">${EMOJIS.cart} CONTINUAR PEDINDO</button>
            <button id="finalizeOrderBtn" class="button btn-finalize">${EMOJIS.whatsapp} FINALIZAR PEDIDO</button>
        </div>
    `
};

//MODEL SESSION
const ModalManager = {
    create: () => {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="orderModal" class="order-modal" style="display: none;">
                <div class="order-modal-content">
                    <span class="order-modal-close">&times;</span>
                    <div id="orderModalBody"></div>
                </div>
            </div>
        `);

        ModalManager.setupCloseEvents();
    },

    setupCloseEvents: () => {
        const closeBtn = document.querySelector('.order-modal-close');
        const modal = DOM.getElement('orderModal');

        if (closeBtn) {
            closeBtn.addEventListener('click', DOM.hideModal);
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) DOM.hideModal();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal?.style.display === 'flex') {
                DOM.hideModal();
            }
        });
    },

    openProduct: (productId) => {
        const product = PRODUCTS[productId];
        if (!product) return;

        state.currentProductId = productId;
        const { body } = DOM.getModalElements();

        body.innerHTML = ModalManager.generateProductHTML(product);
        DOM.showModal();
        EventManager.setupProductEvents();
    },

    generateProductHTML: (product) => {
        const { name, flavors, price, wholesalePrice, wholesaleMinQuantity } = product;
        const hasMultipleFlavors = flavors.length > 1;
        const hasSingleFlavor = flavors.length === 1;

        const flavorsHTML = hasMultipleFlavors
            ? ModalManager.generateFlavorsGrid(product)
            : hasSingleFlavor
                ? ModalManager.generateSingleFlavor(product)
                : ModalManager.generateQuantityInput();

        return `
            <h2>${EMOJIS.iceCream} ${name}</h2>
            <div class="order-price"><p>${HTMLGenerator.productPrice(product)}</p></div>
            ${flavorsHTML}
            <div class="order-quantity">
                <label>${EMOJIS.chart} Quantidade total:</label>
                <span id="totalQuantity">0</span> unidade(s)
            </div>
            ${HTMLGenerator.observationField()}
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button id="addToCartBtn" class="button btn-add-cart" style="flex: 1;">
                    ${EMOJIS.cart} ADICIONAR AO CARRINHO
                </button>
                <button id="viewCartBtn" class="button btn-view-cart" style="flex: 1; ${state.cart.length ? '' : 'display: none;'}">
                    ${EMOJIS.chart} VER PEDIDO (${state.cart.length})
                </button>
            </div>
        `;
    },

    generateFlavorsGrid: (product) => `
        <div class="order-flavors">
            <label><strong>Selecione os sabores:</strong></label>
            <div class="order-flavors-grid">
                ${product.flavors.map(flavor =>
        HTMLGenerator.flavorControls(flavor, ModalManager.getIncrement(product, flavor))
    ).join('')}
            </div>
            <div id="flavorError" class="order-error" style="display: none;">
                ${EMOJIS.warning} Selecione pelo menos uma quantidade!
            </div>
        </div>
    `,

    generateSingleFlavor: (product) => `
        <div class="order-flavors">
            <label><strong>Quantidade:</strong></label>
            <div class="order-flavors-grid">
                ${HTMLGenerator.flavorControls(product.flavors[0], 1)}
            </div>
            <div id="flavorError" class="order-error" style="display: none;">
                ${EMOJIS.warning} Selecione a quantidade!
            </div>
        </div>
    `,

    generateQuantityInput: () => `
        <div class="order-quantity">
            <label for="quantityInput">${EMOJIS.chart} Quantidade:</label>
            <input type="number" id="quantityInput" min="1" value="1" style="width: 100%; padding: 12px; border: 2px solid rgba(142, 63, 163, .12); border-radius: 12px; font-size: 16px;">
        </div>
    `,

    getIncrement: (product, flavor) =>
        flavor.toLowerCase() === 'sortidos' ? product.sortidosIncrement || 1 : 1
};

//CART
const CartManager = {
    updateHeaderBadge: () => {
        const cartCount = document.getElementById('cartCount');
        const headerLink = document.querySelector('.viewCartBtnHeader');

        if (cartCount) {
            cartCount.textContent = state.cart.length;
        }

        if (headerLink) {
            if (state.cart.length === 0) {
                headerLink.style.display = 'none';
            } else {
                headerLink.style.display = 'inline-flex';
                headerLink.style.alignItems = 'center';
                headerLink.style.gap = '8px';
            }
        }
    },
    addItem: () => {
        const product = PRODUCTS[state.currentProductId];
        if (!product) return;

        const selectedFlavors = CartManager.getSelectedFlavors(product);

        if (!selectedFlavors.length) {
            CartManager.showFlavorError();
            return;
        }

        const totalQuantity = selectedFlavors.reduce((sum, f) => sum + f.quantity, 0);
        const priceInfo = PriceCalculator.calculate(product, totalQuantity);
        const observation = DOM.getElement('observation')?.value.trim() || '';

        state.cart.push({
            productId: state.currentProductId,
            productName: product.name,
            flavors: selectedFlavors,
            totalQuantity,
            ...priceInfo,
            observation
        });

        DOM.hideModal();
        CartManager.updateHeaderBadge();
        CartManager.showAddedAlert(product, totalQuantity, priceInfo);
    },

    getSelectedFlavors: (product) => {
        const flavorElements = document.querySelectorAll('.flavor-quantity');

        if (flavorElements.length > 0) {
            return Array.from(flavorElements)
                .map(el => ({ flavor: el.dataset.flavor, quantity: parseInt(el.dataset.quantity) || 0 }))
                .filter(f => f.quantity > 0);
        }

        const quantityInput = DOM.getElement('quantityInput');
        const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;

        return [{
            flavor: product.flavors?.[0] || 'Tradicional',
            quantity
        }];
    },

    showFlavorError: () => {
        const errorElement = DOM.getElement('flavorError');
        if (errorElement) errorElement.style.display = 'block';
        AlertHelper.show('warning', 'Ops!', 'Selecione pelo menos uma quantidade.');
    },

    showAddedAlert: (product, quantity, priceInfo) => {
        Swal.fire({
            icon: 'success',
            title: 'Adicionado ao carrinho!',
            html: `
                <div style="margin: 15px 0;">
                    <p style="font-size: 16px; font-weight: bold; color: #321044;">${product.name}</p>
                    <p style="font-size: 14px; color: #555;">Quantidade: ${quantity} unidade(s)</p>
                    <p style="font-size: 14px; color: #555;">Subtotal: <strong style="color: #8e3fa3;">R$ ${priceInfo.total.toFixed(2)}</strong></p>
                    ${priceInfo.hasPromo ? '<p style="font-size: 12px; color: #55a86b;">✓ Preço promocional aplicado!</p>' : ''}
                    <p style="font-size: 13px; color: #806c85; margin-top: 10px;">${EMOJIS.cart} Total no carrinho: ${state.cart.length} produto(s)</p>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: `${EMOJIS.cart} VER CARRINHO`,
            cancelButtonText: `${EMOJIS.package} CONTINUAR COMPRANDO`,
            reverseButtons: true,
            customClass: {
                confirmButton: 'fruitsalles-exit-button',
                cancelButton: 'fruitsalles-exit-cancel'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) CartManager.view();
        });
    },
    generateEditHTML: (product, item, index) => {
        const hasMultipleFlavors = product.flavors.length > 1;
        const hasSingleFlavor = product.flavors.length === 1;

        // Criar mapa de quantidades por sabor
        const flavorMap = {};
        item.flavors.forEach(f => {
            flavorMap[f.flavor] = f.quantity;
        });

        // Gerar controles com as quantidades atuais
        const flavorsHTML = hasMultipleFlavors || hasSingleFlavor
            ? `<div class="order-flavors">
            <label><strong>${hasMultipleFlavors ? 'Selecione os sabores:' : 'Quantidade:'}</strong></label>
            <div class="order-flavors-grid">
                ${product.flavors.map(flavor =>
                HTMLGenerator.flavorControls(
                    flavor,
                    ModalManager.getIncrement(product, flavor),
                    flavorMap[flavor] || 0,
                    'edit_'
                )
            ).join('')}
            </div>
            <div id="flavorError" class="order-error" style="display: none;">
                ${EMOJIS.warning} Selecione pelo menos uma quantidade!
            </div>
        </div>`
            : HTMLGenerator.quantityInput(item.totalQuantity);

        return `
        <h2>${EMOJIS.edit} EDITAR: ${product.name}</h2>
        <div class="order-price"><p>${HTMLGenerator.productPrice(product)}</p></div>
        ${flavorsHTML}
        <div class="order-quantity">
            <label>${EMOJIS.chart} Quantidade total:</label>
            <span id="totalQuantity">${item.totalQuantity}</span> unidade(s)
        </div>
        ${HTMLGenerator.observationField(item.observation)}
        <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button id="updateCartBtn" class="button btn-update" style="flex: 1;">
                ${EMOJIS.edit} ATUALIZAR CARRINHO
            </button>
            <button id="cancelEditBtn" class="button btn-cancel" style="flex: 1;">
                ${EMOJIS.cancel} CANCELAR
            </button>
        </div>
    `;
    },

    view: () => {
        if (!state.cart.length) {
            AlertHelper.show('info', 'Carrinho vazio', 'Adicione produtos ao carrinho primeiro.');
            return;
        }
        CartManager.updateHeaderBadge();
        const { body } = DOM.getModalElements();
        const totals = PriceCalculator.calculateCartTotals(state.cart);

        body.innerHTML = `
            <h2>${EMOJIS.cart} SEU PEDIDO</h2>
            ${state.cart.map(HTMLGenerator.cartItem).join('')}
            ${HTMLGenerator.cartSummary(totals, state.cart.length)}
            ${HTMLGenerator.cartActions()}
        `;

        DOM.showModal();
        EventManager.setupCartEvents();
    },

    removeItem: (index) => {
        const item = state.cart[index];
        if (!item) return;

        Swal.fire({
            title: 'Remover item?',
            html: `
                <p>Deseja remover <strong>${item.productName}</strong> do carrinho?</p>
                <p>Quantidade: ${item.totalQuantity} unidade(s)<br>Subtotal: R$ ${item.total.toFixed(2)}</p>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `${EMOJIS.remove} REMOVER`,
            cancelButtonText: `${EMOJIS.cancel} CANCELAR`,
            confirmButtonColor: '#e74c3c',
            cancelButtonColor: '#806c85',
            reverseButtons: true
        }).then((result) => {
            if (!result.isConfirmed) return;

            state.cart.splice(index, 1);
            CartManager.updateHeaderBadge();
            state.cart.length ? CartManager.view() : DOM.hideModal();
        });

    },
    finalize: () => {
        if (!state.cart.length) return;

        const message = CartManager.generateWhatsAppMessage();
        window.open(WHATSAPP_URL + message, '_blank');

        state.cart = [];
        CartManager.updateHeaderBadge();
        DOM.hideModal();
        AlertHelper.show('success', 'Pedido enviado!', 'Seu pedido completo foi aberto no WhatsApp.');
    },

    editItem: (index) => {
        const item = state.cart[index];
        if (!item) return;

        const product = PRODUCTS[item.productId];
        if (!product) return;

        state.currentProductId = item.productId;
        const { body } = DOM.getModalElements();

        body.innerHTML = CartManager.generateEditHTML(product, item, index);
        DOM.showModal();
        EventManager.setupEditEvents(product, index);
    },
    updateItem: (product, index) => {
        const selectedFlavors = CartManager.getSelectedFlavors(product);

        if (!selectedFlavors.length) {
            CartManager.showFlavorError();
            return;
        }

        const totalQuantity = selectedFlavors.reduce((sum, f) => sum + f.quantity, 0);
        const priceInfo = PriceCalculator.calculate(product, totalQuantity);
        const observation = DOM.getElement('observation')?.value.trim() || '';

        state.cart[index] = {
            productId: state.currentProductId,
            productName: product.name,
            flavors: selectedFlavors,
            totalQuantity,
            ...priceInfo,
            observation
        };

        AlertHelper.show('success', 'Atualizado!', 'Item do carrinho atualizado com sucesso.');
        CartManager.view();
    },
    updateFlavorQuantity: (flavor, increment) => {
        const element = document.querySelector(`.flavor-quantity[data-flavor="${CSS.escape(flavor)}"]`);
        if (!element) return;

        const current = parseInt(element.dataset.quantity) || 0;
        const newQuantity = Math.max(0, current + increment);

        element.dataset.quantity = newQuantity;
        element.textContent = newQuantity;
        CartManager.updateTotalQuantity();
    },

    updateTotalQuantity: () => {
        const total = Array.from(document.querySelectorAll('.flavor-quantity'))
            .reduce((sum, el) => sum + (parseInt(el.dataset.quantity) || 0), 0);

        const totalElement = DOM.getElement('totalQuantity');
        if (totalElement) totalElement.textContent = total;

        return total;
    },

    generateWhatsAppMessage: () => {
        const totals = PriceCalculator.calculateCartTotals(state.cart);
        let message = `*FRUITSALLES - PEDIDO COMPLETO* %0A%0A`;

        state.cart.forEach((item, index) => {
            message += `*${index + 1}º PRODUTO:* ${item.productName}%0A`;
            message += `*Sabores e quantidades:*%0A`;
            item.flavors.forEach(f => message += `• ${f.flavor}: ${f.quantity} unidade(s)%0A`);
            message += `*Quantidade total:* ${item.totalQuantity} unidade(s)%0A`;
            message += `*${item.hasPromo ? 'Preço promocional' : 'Valor unitário'}:* R$ ${item.unitPrice.toFixed(2)}/un%0A`;
            message += `*Subtotal:* R$ ${item.total.toFixed(2)}%0A`;

            if (item.observation) message += `*Observações:* ${item.observation}%0A`;
            message += `%0A`;
        });

        message += `*RESUMO DO PEDIDO*%0A`;
        message += `*Total de itens:* ${totals.totalItems} unidade(s)%0A`;
        message += `*Total de produtos:* ${state.cart.length} produto(s)%0A`;
        if (totals.totalSavings > 0) message += `*Economia total:* R$ ${totals.totalSavings.toFixed(2)}%0A`;
        message += `*VALOR TOTAL: R$ ${totals.grandTotal.toFixed(2)}*%0A%0A`;
        message += `Olá! Gostaria de confirmar meu pedido.`;

        return message;
    }
};

const ExitAlert = {
    setup: () => {
        const whatsappURL = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=Olá!%20Gostaria%20de%20estar%20realizando%20um%20pedido`;

        const showExitAlert = () => {
            if (state.openAlert || !state.detectExit) return;

            state.openAlert = true;
            Swal.fire({
                title: "Antes de você ir... \u{1F49C}",
                html: `
                    <div class="exit-alert">
                        <div class="exit-icon">\u{1F4AC}</div>
                        <p class="exit-main">Visite nosso <strong>WhatsApp!</strong></p>
                        <p class="exit-text">Lá tiramos todas as suas dúvidas e ajudamos você com o que precisar.</p>
                        <span class="exit-tag">\u{1F49C} Estamos esperando por você!</span>
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
                state.openAlert = false;
                if (result.isConfirmed) window.open(whatsappURL, "_blank");
            });
        };

        history.pushState(null, "", location.href);
        window.addEventListener("popstate", () => {
            if (!state.openAlert) {
                history.pushState(null, "", location.href);
                showExitAlert();
            }
        });

        document.addEventListener("mouseout", (event) => {
            if (!event.relatedTarget && event.clientY <= 5) showExitAlert();
        });
    }
};

const OrderButton = {
    PRODUCT_MAPPING: {
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
    },

    setup: () => {
        document.querySelectorAll('.button--green, .button--pink, .button--purple, .button--yellow, .button--blue')
            .forEach(button => {
                if (!button.textContent.includes('PEDIR')) return;

                const productId = OrderButton.identifyProduct(button);
                if (!productId) return;

                OrderButton.configureButton(button, productId);
            });
    },

    identifyProduct: (button) => {
        const card = button.closest('.product-card, .flavors-card, .fruit-content');
        if (!card) return null;

        const title = card.querySelector('h2, h3');
        if (!title) return null;

        const productName = title.textContent.trim();
        return OrderButton.PRODUCT_MAPPING[productName] || OrderButton.fallbackIdentify(button);
    },

    fallbackIdentify: (button) => {
        const card = button.closest('.product-card, .flavors-card, .fruit-content');
        if (!card) return null;

        if (card.classList.contains('product-card--fruits')) return 'fruitPopsicle';
        if (card.classList.contains('product-card--crushed')) return 'specialMoreninha';
        if (card.classList.contains('flavors-card')) return 'flavoredIce';
        if (card.classList.contains('fruit-content')) return 'gourmetIce';

        if (card.classList.contains('product-card--item')) {
            const title = card.querySelector('h3');
            if (title) {
                const text = title.textContent.toLowerCase();
                if (text.includes('picolé') && text.includes('leite')) return 'milkPopsicle';
                if (text.includes('copo')) return 'cup300ml';
                if (text.includes('1.5')) return 'pot1_5kg';
                if (text.includes('5kg') || text.includes('5 kg')) return 'pot5kg';
                if (text.includes('10kg') || text.includes('10 kg')) return 'bucket10kg';
                if (text.includes('triturado') && text.includes('3')) return 'crushedIce3kg';
                if (text.includes('triturado') && text.includes('5')) return 'crushedIce5kg';
            }
        }

        return null;
    },

    configureButton: (button, productId) => {
        button.removeAttribute('href');
        button.style.cursor = 'pointer';
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            ModalManager.openProduct(productId);
        });
    }
};

const EventManager = {
    setupProductEvents: () => {
        EventManager.setupFlavorButtons();
        EventManager.setupObservationValidation();

        DOM.getElement('addToCartBtn')?.addEventListener('click', CartManager.addItem);
        DOM.getElement('viewCartBtn')?.addEventListener('click', CartManager.view);
    },

    setupCartEvents: () => {
        DOM.getElement('continueShoppingBtn')?.addEventListener('click', DOM.hideModal);
        DOM.getElement('finalizeOrderBtn')?.addEventListener('click', CartManager.finalize);

        document.querySelectorAll('.cart-edit-btn').forEach(btn =>
            btn.addEventListener('click', () => CartManager.editItem(parseInt(btn.dataset.index)))
        );

        document.querySelectorAll('.cart-remove-btn').forEach(btn =>
            btn.addEventListener('click', () => CartManager.removeItem(parseInt(btn.dataset.index)))
        );
    },

    setupFlavorButtons: () => {
        document.querySelectorAll('.flavor-plus-five').forEach(btn => {
            btn.addEventListener('click', () => CartManager.updateFlavorQuantity(btn.dataset.flavor, parseInt(btn.dataset.increment)));
        });//for * +5

        document.querySelectorAll('.flavor-plus').forEach(btn => {
            btn.addEventListener('click', () => CartManager.updateFlavorQuantity(btn.dataset.flavor, parseInt(btn.dataset.increment)));
        });//for + un

        document.querySelectorAll('.flavor-minus').forEach(btn => {
            btn.addEventListener('click', () => CartManager.updateFlavorQuantity(btn.dataset.flavor, -parseInt(btn.dataset.increment)));
        });//for - un

        document.querySelectorAll('.flavor-minus-five').forEach(btn => {
            btn.addEventListener('click', () => CartManager.updateFlavorQuantity(btn.dataset.flavor, -parseInt(btn.dataset.increment)));
        });
    },

    setupObservationValidation: () => {
        const observation = DOM.getElement('observation');
        if (!observation) return;

        const feedback = DOM.getElement('observationFeedback');
        const counter = DOM.getElement('charCounter');

        observation.addEventListener('input', () => {
            const length = observation.value.length;

            if (counter) {
                counter.textContent = `${length}/${CONFIG.MAX_OBSERVATION_LENGTH}`;
                counter.style.color = length > 180 ? '#e74c3c' : length > 150 ? '#f39c12' : '#806c85';
                counter.style.fontWeight = length > 180 ? 'bold' : 'normal';
            }

            if (length > CONFIG.MAX_OBSERVATION_LENGTH) {
                observation.value = observation.value.substring(0, CONFIG.MAX_OBSERVATION_LENGTH);
                EventManager.showObservationFeedback(observation, feedback, counter);
            }
        });
    },

    showObservationFeedback: (observation, feedback, counter) => {
        if (feedback) {
            feedback.style.display = 'block';
            feedback.style.animation = 'shake 0.3s ease';
        }

        observation.style.borderColor = '#e74c3c';
        observation.style.boxShadow = '0 0 0 4px rgba(231, 76, 60, 0.1)';

        clearTimeout(observation.timeout);
        observation.timeout = setTimeout(() => {
            if (feedback) feedback.style.display = 'none';
            observation.style.borderColor = '';
            observation.style.boxShadow = '';
        }, CONFIG.ANIMATION_DURATION);

        if (counter) counter.textContent = `${CONFIG.MAX_OBSERVATION_LENGTH}/${CONFIG.MAX_OBSERVATION_LENGTH}`;
    },
    setupEditEvents: (product, index) => {
        document.querySelectorAll('.flavor-plus-five').forEach(btn => {
            btn.addEventListener('click', () => CartManager.updateFlavorQuantity(btn.dataset.flavor, parseInt(btn.dataset.increment)));
        });
        document.querySelectorAll('.flavor-plus').forEach(btn => {
            btn.addEventListener('click', () => CartManager.updateFlavorQuantity(btn.dataset.flavor, parseInt(btn.dataset.increment)));
        });
        document.querySelectorAll('.flavor-minus').forEach(btn => {
            btn.addEventListener('click', () => CartManager.updateFlavorQuantity(btn.dataset.flavor, -parseInt(btn.dataset.increment)));
        });
        document.querySelectorAll('.flavor-minus-five').forEach(btn => {
            btn.addEventListener('click', () => CartManager.updateFlavorQuantity(btn.dataset.flavor, -parseInt(btn.dataset.increment)));
        });
        EventManager.setupObservationValidation();
        document.getElementById('cancelEditBtn')?.addEventListener('click', CartManager.view);
        document.getElementById('updateCartBtn')?.addEventListener('click', () => CartManager.updateItem(product, index));
    }
};


document.addEventListener("DOMContentLoaded", () => {
    ExitAlert.setup();
    ModalManager.create();
    OrderButton.setup();
    const headerCartLink = document.querySelector('.viewCartBtnHeader');
    if (headerCartLink) {
        headerCartLink.addEventListener('click', (e) => {
            e.preventDefault();
            CartManager.view();
        });
    }
    CartManager.updateHeaderBadge();
});