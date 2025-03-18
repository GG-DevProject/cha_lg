const items = [
  // Para o chá de panela ou casa nova, substitua pelos itens específicos de cada evento
  "Panelas (de diferentes tamanhos)",
  "Jogo de facas",
  "Conjunto de talheres",
  "Frigideira",
  "Tábua de corte",
  "Jogo de pratos (sobremesa, jantar, fundo)"
  // ... Continue com os itens do JSON
];

let selectedItem = null;
let selectedCount = 0;

const itemList = document.getElementById('itemList');
const sorteioForm = document.getElementById('sorteioForm');
const sorteioModal = new bootstrap.Modal(document.getElementById('sorteioModal'));

// Preenche a lista de itens
items.forEach(item => {
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  li.textContent = item;
  li.onclick = () => selectItem(item, li);
  itemList.appendChild(li);
});

// Função para selecionar o item
function selectItem(item, element) {
  if (selectedItem) return; // Se já tiver item selecionado, não permite selecionar outro
  selectedItem = item;
  selectedCount++;

  element.classList.add('active');
  document.querySelector('.card-body p:nth-child(4)').textContent = `Itens Selecionados: ${selectedCount}`;

  // Exibe o modal para preenchimento dos dados
  sorteioModal.show();
}

// Função para enviar a mensagem no WhatsApp
sorteioForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const whatsapp = document.getElementById('whatsapp').value;

  const message = `Olá, meu nome é ${nome} e eu escolhi o item: ${selectedItem}.`;
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, '_blank');
  
  // Remove o item da lista
  const itemsList = Array.from(itemList.getElementsByTagName('li'));
  const selectedItemElement = itemsList.find(li => li.textContent === selectedItem);
  selectedItemElement.remove();

  // Reseta o estado
  sorteioModal.hide();
  selectedItem = null;
});
