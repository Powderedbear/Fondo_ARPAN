document.querySelector('.container').addEventListener('mousemove', (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Calcula la posición del fondo en porcentaje
    const backgroundPositionX = (x / width) * 100;
    const backgroundPositionY = (y / height) * 100;

    document.querySelectorAll('.text::before, .textInvisible::before').forEach(el => {
        el.style.backgroundPosition = `${backgroundPositionX}% ${backgroundPositionY}%`;
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa los spans para ambos tipos de texto
    const texts = document.querySelectorAll('.text, .textInvisible');
    texts.forEach(textElement => {
        const text = textElement.innerText;
        textElement.innerHTML = '';
        for (let char of text) {
            const span = document.createElement('span');
            span.innerText = char === ' ' ? '\u00A0' : char; 
            textElement.appendChild(span);
        }
    });

    document.addEventListener('mousemove', (e) => {
        // Maneja el efecto para ambos tipos de texto
        const textInvisible = document.querySelector('.textInvisible');
        if (textInvisible) {
            const rect = textInvisible.getBoundingClientRect(); 
            const isInside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom; 
            textInvisible.style.opacity = isInside ? '1' : '0'; 

            const spansInvisible = textInvisible.querySelectorAll('span');
            spansInvisible.forEach(span => {
                span.classList.remove('hovered');
            });

            if (isInside) {
                const hoveredSpan = document.elementFromPoint(e.clientX, e.clientY);
                if (hoveredSpan && hoveredSpan.tagName === 'SPAN') {
                    hoveredSpan.classList.add('hovered'); 
                    const prevSpan = hoveredSpan.previousElementSibling; 
                    const nextSpan = hoveredSpan.nextElementSibling; 
                    if (prevSpan) {
                        prevSpan.classList.add('hovered');
                    }
                    if (nextSpan) {
                        nextSpan.classList.add('hovered');
                    }
                }
            }
        }

        // * Efecto para el texto con la clase .text
        const spansText = document.querySelectorAll('.text span');
        spansText.forEach(span => {
            span.classList.remove('hovered');
        });

        const hoveredSpan = document.elementFromPoint(e.clientX, e.clientY); 
        if (hoveredSpan && hoveredSpan.tagName === 'SPAN') {
            const x = (e.clientX - hoveredSpan.getBoundingClientRect().left) / hoveredSpan.offsetWidth * 100;
            const y = (e.clientY - hoveredSpan.getBoundingClientRect().top) / hoveredSpan.offsetHeight * 100;
            hoveredSpan.style.setProperty('--x', `${x}%`); 
            hoveredSpan.style.setProperty('--y', `${y}%`); 
            hoveredSpan.classList.add('hovered'); 
            const prevSpan = hoveredSpan.previousElementSibling;
            const nextSpan = hoveredSpan.nextElementSibling;
            if (prevSpan) {
                prevSpan.classList.add('hovered');
                prevSpan.style.setProperty('--x', `${x}%`);
                prevSpan.style.setProperty('--y', `${y}%`);
            }
            if (nextSpan) {
                nextSpan.classList.add('hovered');
                nextSpan.style.setProperty('--x', `${x}%`);
                nextSpan.style.setProperty('--y', `${y}%`);
            }
        }
    });
});
