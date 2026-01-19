console.log('Script carregado');

let config;
try {
    const stored = localStorage.getItem('gatundoConfig');
    console.log('Stored:', stored);
    config = stored ? JSON.parse(stored) : null;
} catch (e) {
    console.error('Erro localStorage:', e);
    localStorage.removeItem('gatundoConfig');
    config = null;
}

if (!config || !config.panels || config.panels.length === 0) {
    config = {
        panels: [
            { id: 'livros', title: 'Livros', text: 'Explore a saga épica de Gatundo.', img: 'https://via.placeholder.com/400x300/4a0e4a/fff?text=Livros', link: 'pages/livros.html' },
            { id: 'mundo', title: 'Mundo de Gatundo', text: 'Descubra o lore e geografia.', img: 'https://via.placeholder.com/400x300/2e1b3a/fff?text=Mundo', link: 'pages/mundo.html' },
            { id: 'jogos', title: 'Jogos', text: 'Jogue board games e RPG digital.', img: 'https://via.placeholder.com/400x300/1a0a2e/fff?text=Jogos', link: 'pages/jogos.html' },
            { id: 'personagens', title: 'Personagens', text: 'Heróis e vilões inesquecíveis.', img: 'https://via.placeholder.com/400x300/5b2d5a/fff?text=Personagens', link: 'pages/personagens.html' },
            { id: 'clans', title: 'Clãs', text: 'Escolha seu clã e lute.', img: 'https://via.placeholder.com/400x300/3a1a3a/fff?text=Clãs', link: 'pages/clans.html' },
            { id: 'loja', title: 'Loja', text: 'Compre merch e edições na Nuvemshop.', img: 'https://via.placeholder.com/400x300/ffd700/000?text=Loja', link: 'pages/loja.html' }
        ]
    };
    localStorage.setItem('gatundoConfig', JSON.stringify(config));
}
console.log('Config final:', config);

setTimeout(() => {
    const intro = document.getElementById('video-intro');
    if (intro) intro.style.display = 'none';
}, 5000);
document.addEventListener('DOMContentLoaded', () => {
    const skip = document.querySelector('.skip-btn');
    if (skip) skip.addEventListener('click', () => document.getElementById('video-intro')?.style.display = 'none');
});

function renderPanels() {
    const container = document.getElementById('panels');
    console.log('Container panels:', container);
    if (!container) {
        console.error('ERRO: #panels não encontrado!');
        return;
    }
    container.innerHTML = config.panels.map(panel => `
        <div class="panel">
            <img src="${panel.img}" alt="${panel.title}" onclick="window.location.href='${panel.link}'">
            <h3>${panel.title}</h3>
            <p>${panel.text}</p>
            <a href="${panel.link}">Ver mais</a>
        </div>
    `).join('');
    console.log('Painéis renderizados:', config.panels.length);
}
window.addEventListener('DOMContentLoaded', renderPanels);

window.saveConfig = function(newConfig) {
    config = newConfig;
    localStorage.setItem('gatundoConfig', JSON.stringify(config));
    renderPanels();
};
