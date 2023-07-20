const accordionItemTemplate = document.createElement('template');
accordionItemTemplate.innerHTML = `
  <style>
  </style>
  <h3></h3>
  <div class="panel">
    <slot></slot>
  </div>
`;

class YsAccordionItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(accordionItemTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.addEventListener('click', this.toggleAccordion);
    this._updateRendering();
  }

  toggleAccordion() {
    this.titleElement.classList.toggle('active');
  };

  // Watch for changes to the attributes 'title'
  static observedAttributes = ['title'];

  // When the attribute changes, update the component
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'title') {
      this.titleElement.textContent = newValue;
    }

    this._updateRendering();
  }

  get panelElement() {
    return this.firstChildElement;
  }

  get titleElement() {
    return this.shadowRoot.querySelector('h3');
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(v) {
    this.setAttribute('title', v);
  }

  _updateRendering() {
    this.titleElement.textContent = this.title;
  }
};

const accordionTemplate = document.createElement('template');
accordionTemplate.innerHTML = `
  <style>
    .accordion {
    }

    .accordion h3 {
      cursor: pointer;
    }

    .panel {
      display: none;
    }

    .active {

    }
  </style>
  <div class="accordion">
    <slot></slot>
  </div>
`;

class YsAccordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(accordionTemplate.content.cloneNode(true));
  }
};

customElements.define('ys-accordion-item', YsAccordionItem);
customElements.define('ys-accordion', YsAccordion);
