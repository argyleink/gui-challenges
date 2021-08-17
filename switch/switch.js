import {getStyle, getPseudoStyle} from './style-utils.js'

class Switch extends HTMLInputElement
{
    _isDragging = false;
    _recentlyDragged = false;
    _thumbsize = 0;
    _padding = 0;
    _bounds = {
        lower: 0,
        middle: 0,
        upper: 0,
    };
  
    connectedCallback()
    {
        // There is some racing condition, no clue as to what, this delay seems to circumvent it for now
        setTimeout(_ => {
            const thumbsize = getPseudoStyle(this, 'width');
            const padding = getStyle(this, 'padding-left') + getStyle(this, 'padding-right');

            this._thumbsize = thumbsize;
            this._padding = padding;
            this._bounds = {
                lower: 0,
                middle: (this.clientWidth - padding) / 4,
                upper: this.clientWidth - thumbsize - padding,
            };

            this.addEventListener('pointerdown', this.dragInit.bind(this));
            this.addEventListener('pointerup', this.dragEnd.bind(this));
            this.addEventListener('click', this.preventBlubbling.bind(this));

            window.addEventListener('pointerup', this.dragEnd.bind(this));
        }, 1000);
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

        this._isDragging = true;

        this.addEventListener('pointermove', this.dragging.bind(this));
        this.style.setProperty('--thumb-transition-duration', '0s');
    }
  
    dragEnd()
    {
        if(this._isDragging !== true)
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

        this._isDragging = false;

        this.padRelease();
    }
  
    dragging(event)
    {
        if(this._isDragging !== true)
        {
            return;
        }

        const directionality = getStyle(this, '--isLTR');
        const track = (directionality === -1)
            ? (this.clientWidth * -1) + this._thumbsize + this._padding
            : 0;

        let pos = Math.round(event.offsetX - this._thumbsize / 2);

        if(pos < this._bounds.lower)
        {
            pos = 0;
        }

        if(pos > this._bounds.upper)
        {
            pos = this._bounds.upper;
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
                ? this._bounds.lower
                : this._bounds.upper;
        }

        return curpos >= this._bounds.middle;
    }
  
    padRelease()
    {
        this._recentlyDragged = true;

        setTimeout(_ => this._recentlyDragged = false, 300);
    }
  
    preventBlubbling()
    {
        if(this._recentlyDragged)
        {
            event.preventDefault() && event.stopPropagation();
        }
    }
}

customElements.define('gui-switch', Switch, { extends: 'input' });
