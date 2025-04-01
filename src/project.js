import './styles/project.css';

function showTab(tabName) {
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
  
    if (tabName === 'running') {
      buttons[0].classList.add('active');
    } else if (tabName === 'completed') {
      buttons[1].classList.add('active');
    }
  
  }
  