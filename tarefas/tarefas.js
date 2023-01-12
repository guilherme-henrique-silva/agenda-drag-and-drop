document.addEventListener('DOMContentLoaded', (event) => {
    
    /* draggable element */
    const events = document.querySelectorAll('.event');

    const eventAudienciaInstr = document.getElementById('event_audiencia_instr');
    const eventAudienciaConc = document.getElementById('event_audiencia_conc');
    const eventPagamento = document.getElementById('event_pagamento');
    const eventPericia = document.getElementById('event_pericia');
    const eventPrazo = document.getElementById('event_prazo');
    const eventReuniao = document.getElementById('event_reuniao');

    const btnNewEvent = document.getElementById('new-event-btn');

    var items = document.querySelectorAll('.item');
    var eventTargetItem; // Get the event target item for DOM


    /* drop targets */
    const days = document.querySelectorAll('.day-box');
    const boxes = document.querySelectorAll('.box');
    const boxDates = document.querySelectorAll('.box-date');

    // Item dialog elements
    const dialogItem = document.querySelector('.tarefas-dlg');
    const dialogTitle = document.getElementById('dlg-title');
    const dlgTarefaId = document.getElementById('tarefa-id')
    const dlgTarefaTitle = document.getElementById('tarefa-title');
    const dlgTarefaTime = document.getElementById('tarefa-time');
    const dlgTarefaIcon = document.querySelector('.tarefa-selected-icon');
    const dlgTarefaDescr = document.getElementById('tarefa-descr');
    const btnItemDelete = document.getElementById('item-delete');
    const btnItemSave = document.getElementById('tarefas-btn-save');
    const btnItemClose = document.getElementById('tarefas-btn-close');

    // Icon dialog elements
    const btnIconOpen = document.getElementById('tarefa-icons-btn');
    const iconsDialog = document.querySelector('.tarefa-icons-dlg');
    const icons = document.getElementsByName('tarefa-icon');
    const btnIconCancel = document.getElementById('icons-cancel-btn');

    // Bottom scroll buttons
    const section = document.getElementsByTagName('section');
    const scrollXLeft = document.getElementById('scroll-left');
    const scrollXRight = document.getElementById('scroll-right');

    events.forEach(event => {
        if (event.id == 'event_audiencia_instr') {
            event.style['background-color'] = 'var(--instrucao)';
        } else if (event.id == 'event_audiencia_conc') {
            event.style['background-color'] = 'var(--conciliacao)';
        } else if (event.id == 'event_pagamento') {
            event.style['background-color'] = 'var(--pagamento)';
        } else if (event.id == 'event_pericia') {
            event.style['background-color'] = 'var(--pericia)';
        } else if (event.id == 'event_prazo') {
            event.style['background-color'] = 'var(--prazo)';
        } else if (event.id == 'event_reuniao') {
            event.style['background-color'] = 'var(--reuniao)';
        }
    })

    boxes.forEach(box => {
        box.addEventListener('dragenter', dragEnterBox);
        box.addEventListener('dragover', dragOver);
        box.addEventListener('dragleave', dragLeaveBox);
        box.addEventListener('drop', drop);
    });
    
    function eventsEListener () {
        events.forEach(event => {
            event.addEventListener('dragstart', dragStartEvent);
            event.addEventListener('dragenter', dragEnterEvent);
            event.addEventListener('dragleave', dragLeaveEvent);
            event.addEventListener('dragend', dragEnd);
        });
    }
    
    eventsEListener ();


    function tasksDate() {

        const date = new Date();
        const dia = date.getDate();
        const hojeInt = date.getDay();
        var mes = date.getMonth() + 1;
        var startDay = dia - hojeInt;

        for (var i = 0; i < 7; i++) {

            if (startDay > 0 && startDay <= 31) {

                // A parte do código que está funcionando para agora
                if (startDay >= 10 && mes >= 10) {
                    boxDates[i].innerHTML = startDay + '/' + mes;
    
                } else if (startDay >= 10 && mes < 10) {
                    boxDates[i].innerHTML = startDay + '/' + '0' + mes;
                
                } else if (startDay < 10 && mes >= 10) {
                    boxDates[i].innerHTML = '0' + startDay + '/' + mes;

                } else {
                    boxDates[i].innerHTML = '0' + startDay + '/' + '0' + mes;
                }
                
                startDay++;

            } else if (startDay <= 0) {

                if (mes > 1 && mes < 10) {
                    boxDates[i].innerHTML = (startDay + 31) + '/' + '0' + (mes - 1);
                
                } else if (mes <= 1) {
                    boxDates[i].innerHTML = (startDay + 31) + '/' + (mes + 11);

                } else {
                    boxDates[i].innerHTML = (startDay + 31) + '/' + (mes - 1);
                }
                
                startDay++;

            } else {

                if (mes < 12) {
                    boxDates[i].innerHTML = '0' + (startDay - 31) + '/' + (mes + 1);
                    
                } else {
                    boxDates[i].innerHTML = '0' + (startDay - 31) + '/' + '0' + (mes - 11);
                }

                startDay++;
            }
            
            
        }
    }

    tasksDate();


    function itemsEListener () {
        items.forEach(item => {
            item.addEventListener('dragstart', dragStartItem);
            item.addEventListener('dragenter', dragEnterItem);
            item.addEventListener('dragleave', dragLeaveItem);
            item.addEventListener('dragend', dragEndItem);
            item.addEventListener('click', openDialog);

            item.addEventListener('mouseenter', (e) => {
                var itemTitle = item.firstElementChild.nextElementSibling.nextElementSibling;
                var itemDescr = itemTitle.nextElementSibling;

                item.setAttribute('data-toggle', 'tooltip');
                item.setAttribute('data-placement', 'top');
                item.setAttribute('title', itemTitle.innerHTML + ': ' + itemDescr.innerHTML);
            });

        });
    }

    itemsEListener ();


    function dragStartEvent(e) {
        e.dataTransfer.clearData();
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.effectAllowed = 'copyMove';
    }

    function dragStartItem(e) {
        e.dataTransfer.clearData();
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            e.target.classList.add('hide');
        }, 0);
    }

    function dragEnterBox(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }

    function dragEnterItem(e) {
        e.preventDefault();
        e.target.classList.add('drag-over-item');
    }

    function dragEnterEvent(e) {
        e.preventDefault();
        e.target.classList.add('drag-over-item');
    }

    function dragOver(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }

    function dragLeaveBox(e) {
        e.target.classList.remove('drag-over');
    }

    function dragLeaveItem(e) {
        e.target.classList.remove('drag-over-item');
    }

    function dragLeaveEvent(e) {
        e.target.classList.remove('drag-over-item');
    }

    function drop(e) {
        e.target.classList.remove('drag-over');
        e.target.classList.remove('drag-over-item'); 

        e.preventDefault();

        // get the draggable element
        var id = e.dataTransfer.getData('text/plain');
        var draggable = document.getElementById(id);
        var draggableGrandpaNode = draggable.parentNode.parentNode;
        
        var draggableBgColor, draggableColor, draggableSvgColor;
        
        // Draggable style
        if (draggable == eventAudienciaInstr) {

            draggableBgColor = 'var(--instrucao)';
            draggableColor = 'var(--text-color)';
            draggableSvgColor = 'var(--svg-white)';

        } else if (draggable == eventAudienciaConc) {

            draggableBgColor = 'var(--conciliacao)';
            draggableColor = 'var(--text-color)';
            draggableSvgColor = 'var(--svg-white)';

        } else if (draggable == eventPagamento) {

            draggableBgColor = 'var(--pagamento)';
            draggableColor = 'var(--text-color)';
            draggableSvgColor = 'var(--svg-white)';

        } else if (draggable == eventPericia) {

            draggableBgColor = 'var(--pericia)';
            draggableColor = 'var(--text-color)';
            draggableSvgColor = 'var(--svg-white)';

        } else if (draggable == eventPrazo) {

            draggableBgColor = 'var(--prazo)';
            draggableColor = 'var(--text-color)';
            draggableSvgColor = 'var(--svg-white)';

        } else if (draggable == eventReuniao) {

            draggableBgColor = 'var(--reuniao)';
            draggableColor = 'var(--text-color)';
            draggableSvgColor = 'var(--svg-white)';

        }

        // Drop target events
        if (e.target.classList.contains('box') && !draggableGrandpaNode.classList.contains('drag-events')) { // OK
            
            // add it to the drop target
            e.target.appendChild(draggable);

            // display the draggable element
            draggable.classList.remove('hide');

            // remove background change from draggable element
            draggable.classList.remove('drag-over'); 
            draggable.classList.remove('drag-over-item');  

        } else if (e.target.classList.contains('box') && draggableGrandpaNode.classList.contains('drag-events')) { // OK

            var nodeCopy = draggable.cloneNode(true);

            if (nodeCopy.id == 'event_prazo') {
                nodeCopy.setAttribute('name','prazo');
            }
            
            nodeCopy.classList.replace('event', 'item');

            nodeCopy.style['background-color'] = draggableBgColor;
            nodeCopy.style['color'] = draggableColor;
            nodeCopy.firstElementChild.style['filter'] = draggableSvgColor;

            // Adds new children elements
            var time = document.createElement('time');
            var p = document.createElement('p');

            // Sets new attributes
            time.setAttribute('class', 'item-time');
            time.setAttribute('name', 'item-child');
            nodeCopy.firstElementChild.setAttribute('class', 'item-img');
            nodeCopy.firstElementChild.setAttribute('name', 'item-child');
            nodeCopy.firstElementChild.nextElementSibling.setAttribute('class', 'item-title');
            nodeCopy.firstElementChild.nextElementSibling.setAttribute('name', 'item-child');
            p.setAttribute('class', 'item-descr');
            p.setAttribute('name', 'item-child');

            // Insert new child elements
            nodeCopy.prepend(time);
            nodeCopy.appendChild(p);

            e.target.appendChild(nodeCopy);

            nodeCopy.id = Date.now();
            
            // Update items query selector
            items = document.querySelectorAll('.item');
            itemsEListener ();

            // remove background change from draggable element
            draggable.classList.remove('drag-over');
            draggable.classList.remove('drag-over-item');

        } else {

            // display the draggable element
            draggable.classList.remove('hide');

            // remove background change from draggable element
            draggable.classList.remove('drag-over');
            draggable.classList.remove('drag-over-item');   
        }
    }

    function dragEnd(e) {
        e.target.classList.remove('drag-over');
        e.target.classList.remove('drag-over-item');   
        e.target.classList.remove('hide');
    }

    function dragEndItem(e) {
        e.target.classList.remove('drag-over');
        e.target.classList.remove('drag-over-item');   
        e.target.classList.remove('hide');
    }

    function openDialog(e) {

        dialogItem.showModal();
        
        /* 
            Usuário poderia clicar no texto ou no card
            Isso causava diferença no DOM do texto do modal
            Corrigido com operador ternário
        */
        var item = e.target.parentNode.classList.contains('box') ? e.target : e.target.parentNode;

        var time = item.firstElementChild;
        var icon = time.nextElementSibling;
        var title = icon.nextElementSibling;
        var descr = title.nextElementSibling;


        dialogTitle.innerHTML = title.innerText;
        
        dlgTarefaId.innerHTML = 'id #' + item.id;
        dlgTarefaTitle.value = title.innerText;
        dlgTarefaTime.value = time.innerText;
        dlgTarefaIcon.src = icon.src;
        dlgTarefaDescr.value = descr.innerText;

        eventTargetItem = item;
        
    }

    btnNewEvent.addEventListener('click', (e) => {
        alert('Função indisponível no momento');
    })

    icons.forEach(icon => {

        icon.addEventListener('click', (e) => {

            if (!e.target.classList.contains('selected-icon')) {

                icons.forEach(others => {
                    others.classList.remove('selected-icon');
                });

                dlgTarefaIcon.src = e.target.src;
                e.target.classList.add('selected-icon');
            }

            iconsDialog.close();
        });
    });

    btnIconOpen.addEventListener('click', (e) => {
        iconsDialog.showModal();
    });

    btnIconCancel.addEventListener('click', (e) => {
        iconsDialog.close();
    });

    btnItemSave.addEventListener('click', (e) => {

        // Target item properties
        var date, time, icon, title, descr, notif;

        date = eventTargetItem.parentNode.firstElementChild.innerHTML;
        time = eventTargetItem.firstElementChild;
        icon = time.nextElementSibling;
        title = icon.nextElementSibling;
        descr = title.nextElementSibling;
        
        // Set new values to item
        title.innerText = dlgTarefaTitle.value;
        time.innerText = dlgTarefaTime.value;
        icon.src = dlgTarefaIcon.src;
        descr.innerText = dlgTarefaDescr.value;

        const noIcon = document.getElementById('no-icon');

        if (icon.src == noIcon.src) {
            icon.style.display = 'none';
        } else {
            icon.style.display = 'block';
        }

        dialogItem.close();
    });

    btnItemDelete.addEventListener('click', (e) => {
        eventTargetItem.remove();
        dialogItem.close();
    });

    btnItemClose.addEventListener('click', (e) => {
        dialogItem.close();
    });

    
    // -------------------------- Bottom scroll buttons event listeners -----------------------------
    scrollXLeft.addEventListener('click', (e) => {
        section[0].classList.remove('section-to-right-0');
        section[1].classList.remove('section-to-right-1');

        section[0].classList.add('section-to-left-0');
        section[1].classList.add('section-to-left-1');
    });

    scrollXRight.addEventListener('click', (e) => {
        section[0].classList.remove('section-to-left-0');
        section[1].classList.remove('section-to-left-1');

        section[0].classList.add('section-to-right-0');
        section[1].classList.add('section-to-right-1');
    });

});