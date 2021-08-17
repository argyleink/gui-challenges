import {getStyle, getPseudoStyle} from './style-utils.js'

class Switch extends HTMLInputElement
{
    #isDragging = false;
    #recentlyDragged = false;
    #thumbsize = 0;
    #padding = 0;
    #bounds = {
        lower: 0,
        middle: 0,
        upper: 0,
    };
  
    connectedCallback()
    {
        // There is some racing condition, no clue as to what, this delay seems to circumvent it for now
          const thumbsize = getPseudoStyle(this, 'width');
          const padding = getStyle(this, 'padding-left') + getStyle(this, 'padding-right');

          this.#thumbsize = thumbsize;
          this.#padding = padding;
          this.#bounds = {
              lower: 0,
              middle: (this.clientWidth - padding) / 4,
              upper: this.clientWidth - thumbsize - padding,
          };

          this.addEventListener('pointerdown', this.dragInit.bind(this));
          this.addEventListener('pointerup', this.dragEnd.bind(this));
          this.addEventListener('click', this.preventBlubbling.bind(this));

          window.addEventListener('pointerup', this.dragEnd.bind(this));
    }
  
    disconnectedCallback()
    {
        this.removeEventListener('pointerdown', this.dragInit.bind(this));
        this.removeEventListener('pointerup', this.dragEnd.bind(this));
        this.removeEventListener('click', this.preventBlubbling.bind(this));

        window.removeEventListener('pointerup', this.dragEnd.bind(this));
    }

    dragInit()
    {
        if (this.disabled)
        {
            return;
        }

        this.#isDragging = true;

        this.addEventListener('pointermove', this.dragging.bind(this));
        this.style.setProperty('--thumb-transition-duration', '0s');
    }
  
    dragEnd()
    {
        if(this.#isDragging !== true)
        {
            return;
        }

        this.checked = this.determineChecked();

        if (this.indeterminate);
        {
            this.indeterminate = false;
        }

        this.style.removeProperty('--thumb-transition-duration');
        this.style.removeProperty('--thumb-position');
        this.removeEventListener('pointermove', this.dragging.bind(this));

        this.#isDragging = false;

        this.padRelease();
    }
  
    dragging(event)
    {
        if(this.#isDragging !== true)
        {
            return;
        }

        const directionality = getStyle(this, '--isLTR');
        const track = (directionality === -1)
            ? (this.clientWidth * -1) + this.#thumbsize + this.#padding
            : 0;

        let pos = Math.round(event.offsetX - this.#thumbsize / 2);

        if(pos < this.#bounds.lower)
        {
            pos = 0;
        }

        if(pos > this.#bounds.upper)
        {
            pos = this.#bounds.upper;
        }

        this.style.setProperty('--thumb-position', `${track + pos}px`);
    }
  
    determineChecked()
    {
        let curpos = Math.abs(
            Number.parseInt(
                this.style.getPropertyValue('--thumb-position')
            )
        );

        if (!curpos)
        {
            curpos = this.checked
                ? this.#bounds.lower
                : this.#bounds.upper;
        }

        return curpos >= this.#bounds.middle;
    }
  
    padRelease()
    {
        this.#recentlyDragged = true;

        setTimeout(_ => this.#recentlyDragged = false, 300);
    }
  
    preventBlubbling()
    {
        if(this.#recentlyDragged)
        {
            event.preventDefault() && event.stopPropagation();
        }
    }
}

customElements.define('gui-switch', Switch, { extends: 'input' });
