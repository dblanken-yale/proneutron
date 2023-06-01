const template = document.createElement("template");
template.innerHTML = `
  <style>
    .divider[data-divider-width='100'] {
      --width-divider: var(--layout-width-100);
    }
    .divider[data-divider-width='75'] {
      --width-divider: var(--layout-width-75);
    }
    .divider[data-divider-width='50'] {
      --width-divider: var(--layout-width-50);
    }
    .divider[data-divider-width='25'] {
      --width-divider: var(--layout-width-25);
    }
    .divider__inner[data-divider-position='left'] {
      --position-divider: var(--layout-flex-position-left);
    }
    .divider__inner[data-divider-position='center'] {
      --position-divider: var(--layout-flex-position-center);
    }
    .divider__wrapper {
      margin-block: var(--spacing-page-section);
    }
    .divider__inner {
      display: flex;
      justify-content: var(--position-divider);
    }
    .divider {
      background: var(--color-divider);
      width: var(--width-divider);
      height: var(--thickness-divider);
    }
  </style>
  <div class="divider__wrapper">
    <div class="divider__inner">
      <div class="divider"></div>
    </div>
  </div>
`;

class YsDivider extends HTMLElement {
  constructor() {
    super();
    this._thickness = '8';
    this._position = 'center';
    this._width = '100';
    this._component_width = 'site';

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._divider = this.shadowRoot.querySelector(".divider__wrapper .divider__inner div");
    this._divider_inner = this.shadowRoot.querySelector("div.divider__wrapper div.divider__inner");
    this._divider_wrapper = this.shadowRoot.querySelector("div.divider__wrapper");
  }

  static observedAttributes = ["thickness", "position", "width", "component-width"];

  attributeChangedCallback(name, oldValue, newValue) {
    // name will always be "country" due to observedAttributes
    if (name === "thickness") {
      this._thickness = newValue;
    } else if (name === "position") {
      this._position = newValue;
    } else if (name === "width") {
      this._width = newValue;
    } else if (name === "component-width") {
      this._component_width = newValue;
    }

    this._updateRendering();
  }

  connectedCallback() {
    this._updateRendering();
  }

  get thickness() {
    return this._thickness;
  }

  set thickness(v) {
    this.setAttribute("thickness", v);
  }

  get position() {
    return this._position;
  }

  set position(v) {
    this.setAttribute("position", v);
  }

  get width() {
    return this._width;
  }

  set width(v) {
    this.setAttribute("width", v);
  }

  get component_width() {
    return this._component_width;
  }

  set component_width(v) {
    this.setAttribute("component-width", v);
  }

  _updateRendering() {
    // check if we have been inserted into a document with a browsing context
    if (this.ownerDocument.defaultView) {
      this._divider_wrapper.setAttribute("data-divider-width", this._component_width);
      this._divider_inner.setAttribute("data-divider-position", this._position);
      this._divider.setAttribute("data-divider-width", this._width);
    }
  }
}

customElements.define("ys-divider", YsDivider);
