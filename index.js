'use strict'

require('event-added-listener')

function ReachedBottom(element)
{
    this.element = element
    this._setStyle()
    this._bindEvents()
}

// TODO - this should be user responsibility?
ReachedBottom.prototype._setStyle = function ()
{
    this.element.style.overflow = 'auto'
}

ReachedBottom.prototype._bindEvents = function ()
{
    this.element.addEventListener('scroll', this._calcPosition.bind(this))
}

ReachedBottom.prototype._calcPosition = function ()
{
    let bottom = this.element.scrollTop
    let max = this.element.scrollHeight - this.element.clientHeight
    if(bottom === max)
        this._dispatchEvent()
}

ReachedBottom.prototype._dispatchEvent = function ()
{
    this.element.dispatchEvent(new Event('reachedbottom'))
}

exports = ReachedBottom
