const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        amount: 0,
        get totalsum() {
            return this.price * this.amount;
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        amount: 0,
        get totalsum() {
            return this.price * this.amount;
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        amount: 0,
        get totalsum() {
            return this.price * this.amount;
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        amount: 0,
        get totalsum() {
            return this.price * this.amount;
        }
    }
};

const productBtn = document.querySelectorAll('.wrapper__list-btn'),
      basketBtn = document.querySelector('.wrapper__navbar-btn'),
      basketBtnCount = document.querySelector('.warapper__navbar-count'),
      cartModal = document.querySelector('.wrapper__navbar-basket'),
      basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
      closecheck = document.querySelector('.wrapper__navbar-close'),
      basketTotalPrice = document.querySelector('.wrapper__navbar-totalprice');

productBtn.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(this);
        updateBasket();
    });
});
closecheck.addEventListener('click', function () {
    cartModal.classList.remove('active');
})

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id');
    product[parentId].amount++;
    basket();
}

function basket() {
    const productArray = [];
    let totalCount = 0;

    for (const key in product) {
        const po = product[key];
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`);
        const productIndecator = productCard.querySelector(".wrapper__list-count");

        if (po.amount) {
            productArray.push(po);
            productIndecator.classList.add('active');
            basketBtnCount.classList.add('active');
            productIndecator.textContent = po.amount;
            totalCount += po.amount;
        } else {
            productIndecator.classList.remove('active');
            productIndecator.textContent = 0;
        }
    }

    basketBtnCount.textContent = totalCount;
    updateBasket();
}

basketBtn.addEventListener('click', function () {
    cartModal.classList.toggle('active');
});

function updateBasket() {
    const productArray = Object.values(product);

    const selectedProducts = productArray.filter(po => po.amount > 0);
    
    const totalPrice = selectedProducts.reduce((total, po) => total + po.totalsum, 0);

    basketChecklist.innerHTML = '';
    selectedProducts.forEach(po => {
        basketChecklist.innerHTML += `
            <div class="wrapper__navbar-checklist-item">
                <span>${po.name}</span>
                <span>${po.amount} x ${po.price} сум</span>
            </div>
        `;
    });

    basketTotalPrice.textContent = totalPrice;
}
