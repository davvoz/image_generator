export class Spinner {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            size: options.size || '50px',
            color: options.color || '#0ea5e9',
            className: options.className || 'spinner-overlay'
        };
        this.create();
    }

    create() {
        // Remove existing spinner if any
        const existing = this.container.querySelector(`.${this.options.className}`);
        if (existing) {
            existing.remove();
        }

        this.overlay = document.createElement('div');
        this.overlay.className = this.options.className;
        this.overlay.style.display = 'none';
        
        this.spinner = document.createElement('div');
        this.spinner.className = 'spinner';
        this.spinner.style.width = this.options.size;
        this.spinner.style.height = this.options.size;
        this.spinner.style.borderTopColor = this.options.color;
        
        this.overlay.appendChild(this.spinner);
        this.container.appendChild(this.overlay);
    }

    show() {
        if (this.overlay) {
            this.overlay.style.display = 'flex';
        }
    }

    hide() {
        if (this.overlay) {
            this.overlay.style.display = 'none';
        }
    }
}