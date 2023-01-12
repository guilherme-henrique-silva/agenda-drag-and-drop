document.addEventListener('DOMContentLoaded', (event) => {

    alert('Esta é uma versão demonstrativa adaptada de um sistema de escritório de advocacia que desenvolvi utilizando Javascript puro.\n\nVersão 0.1 alpha\n(Algumas funcionalidades podem apresentar alguma falha leve).');

    // Navbar icons
    const searchIcon = document.querySelector('.nav-search');
    const chatIcon = document.querySelector('.nav-chat');
    const notifIcon = document.querySelector('.nav-bell');
    const userIcon = document.querySelector('.nav-user');


    // Dropdowns
    const searchDropdown = document.getElementById('dropdown-search');
    const chatDropdown = document.getElementById('dropdown-chat');
    const notifDropdown = document.getElementById('dropdown-notif');
    const userDropdown = document.getElementById('dropdown-user');

    // Search dropdown button
    const searchBtn = document.getElementById('search-btn');


    // Account options
    const logoutBtn = document.getElementById('logout');


    // Theme selector
    const themeToggle = document.querySelector('.nav-theme-toggle');
    const themeCheckbox = document.getElementById('theme');

    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');


    // Elementos de tarefas
    const containerEvents = document.querySelector('.container-events');
    const containerTarefas = document.querySelector('.container');
    const tarefasDialog = document.querySelector('.tarefas-dlg');
    const tarefaIconsDialog = document.querySelector('.tarefa-icons-dlg');

    const containerConsulta = document.querySelector('.container-consulta');
    const containerCrud = document.querySelector('.container-crud');
    const processoDialog = document.querySelector('.proc-dlg');

    const todoContainer = document.querySelector('.todo-container');
    const todoList = document.querySelectorAll('.todo-list');

    const scrollContainer = document.querySelector('.scroll-container');
    const scrollXIcon = document.querySelector('.scroll-x')


    // Navbar dropdown style
    searchIcon.addEventListener('mouseenter', (e) => {
        searchDropdown.classList.remove('hide');
        chatDropdown.classList.add('hide');
        notifDropdown.classList.add('hide');
        userDropdown.classList.add('hide');
    });
    searchDropdown.addEventListener('mouseleave', (e) => {
        searchDropdown.classList.add('hide');
    });

    chatIcon.addEventListener('mouseenter', (e) => {
        chatDropdown.classList.remove('hide');
        searchDropdown.classList.add('hide');
        notifDropdown.classList.add('hide');
        userDropdown.classList.add('hide');
    });
    chatDropdown.addEventListener('mouseleave', (e) => {
        chatDropdown.classList.add('hide');
    });

    notifIcon.addEventListener('mouseenter', (e) => {
        notifDropdown.classList.remove('hide');
        searchDropdown.classList.add('hide');
        chatDropdown.classList.add('hide');
        userDropdown.classList.add('hide');
    });
    notifDropdown.addEventListener('mouseleave', (e) => {
        notifDropdown.classList.add('hide');
    });

    userIcon.addEventListener('mouseenter', (e) => {
        userDropdown.classList.remove('hide');
        searchDropdown.classList.add('hide');
        chatDropdown.classList.add('hide');
        notifDropdown.classList.add('hide');
    });
    userDropdown.addEventListener('mouseleave', (e) => {
        userDropdown.classList.add('hide');
    });


    // Navbar search
    searchBtn.addEventListener('click', (e) => {
        alert('Animações utilizando CSS e Javascript puro.');
    });


    themeToggle.addEventListener('click', (anim) => {

        if (themeCheckbox.checked) {

            themeCheckbox.checked = false;
            localStorage.setItem('mode', 'light');

        } else {
            
            themeCheckbox.checked = true;
            localStorage.setItem('mode', 'dark');
        }

        themeChange();
    });

    themeChange();

    function themeChange() {

        let theme = localStorage.getItem('mode');
        
        if (theme && theme === 'dark') {
            
            themeCheckbox.checked = true;

            nav.style['background-color'] = 'var(--dark)';
            main.style['background-color'] = 'var(--dark-second-color)';
            footer.style['background-color'] = 'var(--dark)';

            containerEvents.classList.remove('light');
            containerEvents.classList.add('dark');

            containerTarefas.classList.remove('light');
            containerTarefas.classList.add('dark');
            
            tarefasDialog.classList.remove('light');
            tarefasDialog.classList.add('dark-dialog');
            
            tarefaIconsDialog.classList.remove('light');
            tarefaIconsDialog.classList.add('dark-dialog');

            todoContainer.classList.remove('light');
            todoContainer.classList.add('dark');

            todoList.forEach(container => {
                container.classList.remove('light');
                container.classList.add('dark');
            });

            scrollXIcon.classList.remove('light');
            scrollXIcon.classList.add('dark-dialog');

        } else {

            themeCheckbox.checked = false;

            nav.style['background-color'] = 'var(--second-color)';
            main.style['background-color'] = 'var(--gray)';
            footer.style['background-color'] = 'var(--second-color)';

            containerEvents.classList.remove('dark');
            containerEvents.classList.add('light');

            containerTarefas.classList.remove('dark');
            containerTarefas.classList.add('light');
            
            tarefasDialog.classList.remove('dark-dialog');
            tarefasDialog.classList.add('light');
            
            tarefaIconsDialog.classList.remove('dark-dialog');
            tarefaIconsDialog.classList.add('light');

            todoContainer.classList.remove('dark');
            todoContainer.classList.add('light');

            todoList.forEach(container => {
                container.classList.remove('dark');
                container.classList.add('light');
            });

            scrollXIcon.classList.remove('dark-dialog');
            scrollXIcon.classList.add('light');
        }
    }

    logoutBtn.addEventListener('click', (e) => {
        alert('Log Out realizado com sucesso!');
    });

});
