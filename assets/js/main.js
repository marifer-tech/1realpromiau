// Dados do projeto
const projectData = {
    totalRaised: 0,
    totalSpent: 0,
    catsFed: 0,
    contributors: [ ],
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
document.addEventListener('DOMContentLoaded', function() {
    // Atualiza os valores na página
    updateStats();
    
    // Preenche a lista de contribuidores
    renderContributors();
    
    // Configura o gráfico
    setupChart();
    
    // Configura o botão de copiar
    setupCopyButton();
    
    // Simula atualização de dados em tempo real (para demonstração)
    if (window.location.href.includes('debug')) {
        setInterval(simulateRealTimeUpdates, 5000);
    }
});

function updateStats() {
    document.getElementById('total-raised').textContent = `R$ ${projectData.totalRaised.toFixed(2)}`;
    document.getElementById('total-spent').textContent = `R$ ${projectData.totalSpent.toFixed(2)}`;
    document.getElementById('cats-fed').textContent = projectData.catsFed;
    document.getElementById('contributors-count').textContent = projectData.contributors.length;
}

function renderContributors() {
    const contributorsList = document.getElementById('contributors-list');
    contributorsList.innerHTML = ''; // Limpa a lista
    
    projectData.contributors.forEach(contributor => {
        const element = document.createElement('div');
        element.className = 'contributor';
        element.textContent = contributor;
        contributorsList.appendChild(element);
    });
}

function setupChart() {
    const donationsCtx = document.getElementById('donationsChart').getContext('2d');
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
    copyButton.addEventListener('click', copyPixKey);
}

async function copyPixKey() {
    const pixKey = document.getElementById('pix-key').textContent;
    try {
        await navigator.clipboard.writeText(pixKey);
        const button = document.getElementById('copy-button');
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
    // Aumenta os valores aleatoriamente para demonstração
    const randomDonation = Math.random() * 5;
    projectData.totalRaised += randomDonation;
    projectData.catsFed += Math.floor(Math.random() * 3);
    
    // Atualiza o gráfico de doações
    const currentMonth = new Date().getMonth();
    projectData.monthlyDonations.data[currentMonth] += randomDonation;
    
    // Adiciona um novo contribuidor ocasionalmente
    if (Math.random() > 0.8 && projectData.contributors.length < 30) {
        const newContributor = `@contribuidor${projectData.contributors.length + 1}`;
        projectData.contributors.push(newContributor);
    }
    
    // Atualiza a UI
    updateStats();
    renderContributors();
}