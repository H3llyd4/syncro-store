// ========== INTERSECTION OBSERVER (Animações no Scroll) ==========
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll')
    .forEach(el => observer.observe(el));


// ========== RELOAD NO LOGO ==========
const logo = document.getElementById('logo');
logo.addEventListener('click', function(e) {
    if (window.location.pathname.endsWith('produtos.html')) {
        e.preventDefault();
        window.location.href = 'index.html';
    }
});


// ========== SISTEMA DE FILTROS ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {

        // Remove active de todos os botões
        filterBtns.forEach(b => b.classList.remove('active'));

        // Adiciona active no botão clicado
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        productCards.forEach(card => {
            const category = card.getAttribute('data-category');

            card.classList.remove('animate');
            card.style.display = 'none';

            setTimeout(() => {
                if (filter === 'all' || category === filter) {

                    card.style.display = 'flex';

                    setTimeout(() => {
                        card.classList.add('animate');
                    }, 50);

                }
            }, 100);
        });
    });
});