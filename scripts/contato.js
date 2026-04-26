(function () {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };

    const statusEl = document.getElementById('formStatus');

    function getErrorEl(fieldName) {
        return document.querySelector(`[data-error-for="${fieldName}"]`);
    }

    function setFieldError(field, message) {
        const errorEl = getErrorEl(field.name);
        field.classList.add('is-invalid');
        if (errorEl) errorEl.textContent = message;
    }

    function clearFieldError(field) {
        const errorEl = getErrorEl(field.name);
        field.classList.remove('is-invalid');
        if (errorEl) errorEl.textContent = '';
    }

    function validateEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function formatPhone(value) {
        const digits = value.replace(/\D/g, '').slice(0, 11);

        if (digits.length <= 2) return digits;
        if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }

    function validateForm() {
        let isValid = true;

        Object.values(fields).forEach((field) => {
            if (field) clearFieldError(field);
        });

        const name = fields.name.value.trim();
        const email = fields.email.value.trim();
        const phone = fields.phone.value.trim();
        const subject = fields.subject.value.trim();
        const message = fields.message.value.trim();

        if (name.length < 3) {
            setFieldError(fields.name, 'Informe um nome com pelo menos 3 caracteres.');
            isValid = false;
        }

        if (!validateEmail(email)) {
            setFieldError(fields.email, 'Informe um e-mail válido.');
            isValid = false;
        }

        if (phone) {
            const digits = phone.replace(/\D/g, '');
            if (digits.length < 10) {
                setFieldError(fields.phone, 'Telefone incompleto. Ex: (11) 99999-9999');
                isValid = false;
            }
        }

        if (subject.length < 4) {
            setFieldError(fields.subject, 'O assunto deve ter pelo menos 4 caracteres.');
            isValid = false;
        }

        if (message.length < 10) {
            setFieldError(fields.message, 'A mensagem deve ter pelo menos 10 caracteres.');
            isValid = false;
        }

        return isValid;
    }

    if (fields.phone) {
        fields.phone.addEventListener('input', (e) => {
            e.target.value = formatPhone(e.target.value);
        });
    }

    Object.values(fields).forEach((field) => {
        if (!field) return;
        field.addEventListener('input', () => clearFieldError(field));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        statusEl.textContent = '';
        statusEl.classList.remove('success', 'error');

        if (!validateForm()) {
            statusEl.textContent = 'Revise os campos destacados e tente novamente.';
            statusEl.classList.add('error');
            return;
        }

        const submitBtn = form.querySelector('.btn-submit');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
        }

        setTimeout(() => {
            form.reset();
            statusEl.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
            statusEl.classList.add('success');

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar mensagem';
            }
        }, 900);
    });
})();
