# **Agenda de tarefas (Drag and Drop) em Javascript puro**

>Guilherme Henrique da Silva
>---
>(Desenvolvedor e Advogado)


## Introdução

---

Este projeto é uma demonstração da funcionalidade de _Drag and Drop_ dentro de um contexto profissional, neste caso, uma agenda de tarefas dentro de um sistema de escritório de advocacia. Ainda está na sua forma mais básica e primária, com apenas algumas funcionalidades implementadas e voltada apenas para o front-end. Será apresentada uma explicação suscinta do seu funcionamento.

## Metodologia

---

### **1. Ferramentas utilizadas**


O projeto foi desenvolvido na IDE VSCode, utilizando a linguagem de marcação é o HTML5 e a linguagem de estilo é o CSS3.

Por sua vez, a linguagem de programação utilizada é o Javascript na sua forma pura, sem o auxílio de frameworks ou bibliotecas externas, apenas para demonstrar as habilidades no desenvolvimento de algoritmos do autor.

- VSCode
- HTML5
- CSS3
- Javascript (ECMAScript 2022)

>**Nota: embora nas versões mais recentes do Javascript não seja mais obrigatória a utilização do caracter ";" ao final de cada comando, o autor, por preferência pessoal, optou por adicioná-lo nos comandos do código deste projeto.**

---

### **2. Resumo do desenvolvimento**

A agenda possui uma proposta de interação com o usuário utilizando-se da técnica de _Drag and Drop_, de modo que o mesmo consiga adicionar novos itens (ou eventos) à agenda ou alterar os já existentes de uma data para a outra apenas arrastando os elementos da página, tornando sua experiência mais facilitada e agradável.

Para tanto, foram definidos os objetos que podem ser arrastados, seja um novo evento a ser adicionado ou os já presentes na agenda, com o par atributo e valor `draggable="true"`.

Eventos arrastáveis:

```html
<div class="event-box">
    <div class="event" id="event_prazo" draggable="true">
        <img src="../svg/calendar-solid.svg" draggable="false">
        <p>Prazo</p>
    </div>
</div>
```

Itens arrastáveis:

```html
<div class="item" id="preset_1" draggable="true">
    <time>09:30</time>
    <img src="../svg/comment-dots-solid.svg">
    <p>Reunião com cliente</p>
    <p>Elis Regina</p>
</div>
```

Cada evento e item são armazenados dentro de um _NodeArray_ respectivo e, se for um novo item (evento) adicionado à agenda, pelos elementos possuirem estruturas HTML diferentes, recebe novas classes de estilo CSS e _ChildNodes_ para que tenha a mesma estrutura dos itens _presets_ da agenda.

```js
/* draggable element */
const events = document.querySelectorAll('.event');

var items = document.querySelectorAll('.item');
var eventTargetItem; // Get the event target item for DOM
```

Para cada novo evento, selecionados dentro de um _NodeArray_ chamado `events`, foram adicionados _Events Listeners_ através da função `addEventListener` com os parâmetros de estado `'dragenter', 'dragover', 'dragleave'` e `'drop'` e suas respectivas funções de parâmetro.

```js
/* draggable element */
const events = document.querySelectorAll('.event');

function eventsEListener () {
    events.forEach(event => {
        event.addEventListener('dragstart', dragStartEvent);
        event.addEventListener('dragenter', dragEnterEvent);
        event.addEventListener('dragleave', dragLeaveEvent);
        event.addEventListener('dragend', dragEnd);
    });
}
```

Para cada item, selecionados dentro de um _NodeArray_ chamado `items`, foram adicionados _Events Listeners_ através da função `addEventListener` com os parâmetros de estado `'dragenter', 'dragover', 'dragleave', 'dragend'` e `'click'` e suas respectivas funções de parâmetro. Além disso, existe uma variável chamada `eventTargetItem` que realiza a comunicação entre as funções das etapas do _Drag and Drop_ quando o usuário optar por realizar alguma alteração no item.

```js
var items = document.querySelectorAll('.item');
var eventTargetItem; // Get the event target item for DOM

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
```

A função `openDialog(e)`, em específico, permite com que seja aberta um _Modal Box_ através da tag `<dialog>` no HTML e altere os dados do elemento que contém o item em questão, sendo que o parâmetro `e` se comunica com a variável `eventTargetItem`, conforme já foi acima explicado.

Para cada container representando um dia na agenda, selecionados dentro de um NodeArray chamado `boxes`, de forma semelhante, foram adicionados Events Listeners através da função `addEventListener` com os parâmetros de estado `'dragenter', 'dragover', 'dragleave'` e `'dragend'` e suas respectivas funções de parâmetro.

```js
const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnterBox);
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeaveBox);
    box.addEventListener('drop', drop);
});
```
---

## **Considerações Finais**

Esta é uma apresentação suscinta de um projeto em desenvolvimento explicando o funcionamento da funcionalidade _Drag and Drop_ dentro de um contexto profissional. Para maiores detalhes, por favor, acesse a documentação.

Eventualmente, o projeto será atualizado, adicionando novas funcionalidades.

>**Atenção: por se tratar de uma versão preliminar, a aplicação pode apresentar alguns comportamentos inexperados ao usuário, o que, no entanto, não prejudica no funcionamento do projeto como um todo.**