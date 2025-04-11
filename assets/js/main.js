// Dados do projeto
const projectData = {
    totalRaised: 25,
    totalSpent: 20,
    catsFed: 5,
    contributors: 5,
    monthlyDonations: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        data: [50, 75, 120, 90, 150, 200, 180, 210, 240, 190, 160, 220]
    },
    expensesByCategory: {
        labels: ["Ração", "Sachês", "Veterinário", "Outros"],
        data: [650, 200, 100, 30.50]
    }
};

// Inicializa a página
document.addEventListener('DOMContentLoaded', function () {
    updateStats();
    setupCopyButton();
    setupChart();

    if (window.location.href.includes('debug')) {
        setInterval(simulateRealTimeUpdates, 5000);
    }
});

function updateStats() {
    document.getElementById('total-raised').textContent = `R$ ${projectData.totalRaised.toFixed(2)}`;
    document.getElementById('total-spent').textContent = `R$ ${projectData.totalSpent.toFixed(2)}`;
    document.getElementById('cats-fed').textContent = projectData.catsFed;
    document.getElementById('contributors-count').textContent = projectData.contributors;
}

function setupChart() {
    const canvas = document.getElementById('donationsChart');
    if (!canvas) return;

    const donationsCtx = canvas.getContext('2d');
    new Chart(donationsCtx, {
        type: 'bar',
        data: {
            labels: projectData.monthlyDonations.labels,
            datasets: [{
                label: 'Doações por mês (R$)',
                data: projectData.monthlyDonations.data,
                backgroundColor: '#FF6B6B',
                borderColor: '#FF6B6B',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function setupCopyButton() {
    const copyButton = document.getElementById('copy-button');
    if (!copyButton) return;

    copyButton.addEventListener('click', copyPixKey);
}

async function copyPixKey() {
    const pixKeyElement = document.getElementById('pix-key');
    const button = document.getElementById('copy-button');
    
    if (!pixKeyElement || !button) {
        alert('Erro ao copiar: elemento não encontrado.');
        return;
    }

    const pixKey = pixKeyElement.textContent.trim();

    try {
        await navigator.clipboard.writeText(pixKey);
        const originalText = button.textContent;
        button.textContent = 'Copiado!';
        button.style.backgroundColor = '#4CAF50';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '#4ECDC4';
        }, 2000);
    } catch (err) {
        console.error('Falha ao copiar texto: ', err);
        alert('Não foi possível copiar a chave PIX. Por favor, copie manualmente.');
    }
}

function simulateRealTimeUpdates() {
    const randomDonation = Math.random() * 5;
    projectData.totalRaised += randomDonation;
    projectData.catsFed += Math.floor(Math.random() * 3);

    const currentMonth = new Date().getMonth();
    projectData.monthlyDonations.data[currentMonth] += randomDonation;

    // Simula mais contribuidores (caso fosse array de nomes)
    if (typeof projectData.contributors === 'number' && projectData.contributors < 30) {
        projectData.contributors += 1;
    }

    updateStats();
}
