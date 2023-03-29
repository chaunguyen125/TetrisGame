/*!
 * @pixi/text-html - v1.0.1
 * Compiled Mon, 30 Nov 2020 06:54:37 UTC
 *
 * @pixi/text-html is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var _pixi_htmltext=function(t,e,i,o,s,n,r){"use strict";var h=function(t){function e(e,n,r){void 0===e&&(e=""),void 0===n&&(n={}),(r=r||document.createElement("canvas")).width=3,r.height=3;var h=o.Texture.from(r,{scaleMode:i.settings.SCALE_MODE});h.orig=new s.Rectangle,h.trim=new s.Rectangle,t.call(this,h),this._parser=new DOMParser,this._image=new Image,this.canvas=r,this.context=this.canvas.getContext("2d"),this._resolution=i.settings.RESOLUTION,this._autoResolution=!0,this._text=null,this._style=null,this._loading=!1,this.text=e,this.style=n,this.localStyleID=-1}t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e;var h={width:{configurable:!0},height:{configurable:!0},style:{configurable:!0},text:{configurable:!0},resolution:{configurable:!0}};return e.prototype.updateText=function(t){var e=this,i=this.style,o=this.canvas,s=this.context,r=this.resolution;if(this.localStyleID!==i.styleID&&(this.dirty=!0,this.localStyleID=i.styleID),this.dirty||!t){var h="\n            display:inline-block;\n            color:"+i.fill+";\n            font-size: "+i.fontSize+"px;\n            font-family:"+i.fontFamily+";\n            font-weight:"+i.fontWeight+";\n            font-style:"+i.fontStyle+";\n            font-variant:"+i.fontVariant+";\n            letter-spacing:"+i.letterSpacing+"px;\n            text-align:"+i.align+";\n            padding:"+i.padding+"px;\n        ";if(i.lineHeight&&(h+="line-height:"+i.lineHeight+"px;"),i.wordWrap&&(h+="word-wrap:"+(i.breakWords?"break-all":"break-word")+";",h+="width:"+i.wordWrapWidth+"px;"),i.strokeThickness){var a=i.stroke;"number"==typeof color&&(a=n.hex2string(a)),h+="-webkit-text-stroke-width: "+i.strokeThickness+"px;",h+="-webkit-text-stroke-color: "+a+";",h+="text-stroke-width: "+i.strokeThickness+"px;",h+="text-stroke-color: "+a+";",h+="paint-order: stroke;"}if(i.dropShadow){var l=i.dropShadowAngle,d=i.dropShadowDistance,u=i.dropShadowBlur,c=i.dropShadowColor,g=i.dropShadowAlpha,p=Math.round(Math.cos(l)*d),x=Math.round(Math.sin(l)*d),y=c;if("number"==typeof y&&(y=n.hex2string(y)),"#"===y.charAt(0)&&g<1){var _=n.hex2rgb(parseInt(y.replace("#",""),16));y="rgba("+(255*_[0]|0)+", "+(255*_[1]|0)+", "+(255*_[2]|0)+", "+g+")"}h+="text-shadow: "+p+"px "+x+"px "+u+"px "+y+";"}var f='\n            <svg xmlns="http://www.w3.org/2000/svg" width="2048" height="2048">\n                <foreignObject width="100%" height="100%">\n                    <div xmlns="http://www.w3.org/1999/xhtml" style="'+h+'">'+this._text+"</div>\n                </foreignObject>\n            </svg>\n       ",w=this._parser.parseFromString(f,"text/xml").firstChild.querySelector("div");document.body.appendChild(w);var m=w.getBoundingClientRect(),v=m.width,b=m.height;if(document.body.removeChild(w),o.width=Math.ceil((Math.max(1,v)+2*i.padding)*r),o.height=Math.ceil((Math.max(1,b)+2*i.padding)*r),s.scale(r,r),s.clearRect(0,0,o.width,o.height),!this._loading){var I=this._image;this._loading=!0,I.src="data:image/svg+xml,"+encodeURIComponent(f),I.onload=function(){s.drawImage(I,0,0,v,b,0,0,v,b),I.onload=void 0,I.src="",e._loading=!1,e.updateTexture()},this.updateTexture()}}},e.prototype.updateTexture=function(){var t=this.canvas,e=this.context,i=this.style,o=this.texture,s=this.resolution;if(i.trim){var r=n.trimCanvas(t),h=r.width,a=r.height,l=r.data;l&&(t.width=h,t.height=a,e.putImageData(l,0,0))}var d=i.trim?0:i.padding,u=o.baseTexture;o.trim.width=o._frame.width=Math.ceil(t.width/s),o.trim.height=o._frame.height=Math.ceil(t.height/s),o.trim.x=-d,o.trim.y=-d,o.orig.width=o._frame.width-2*d,o.orig.height=o._frame.height-2*d,this._onTextureUpdate(),u.setRealSize(t.width,t.height,s),this.dirty=!1},e.prototype._render=function(e){this._autoResolution&&this._resolution!==e.resolution&&(this._resolution=e.resolution,this.dirty=!0),this.updateText(!0),t.prototype._render.call(this,e)},e.prototype._renderCanvas=function(e){this._autoResolution&&this._resolution!==e.resolution&&(this._resolution=e.resolution,this.dirty=!0),this.updateText(!0),t.prototype._renderCanvas.call(this,e)},e.prototype.getLocalBounds=function(e){return this.updateText(!0),t.prototype.getLocalBounds.call(this,e)},e.prototype._calculateBounds=function(){this.updateText(!0),this.calculateVertices(),this._bounds.addQuad(this.vertexData)},e.prototype._onStyleChange=function(){this.dirty=!0},e.prototype.destroy=function(e){void 0===e&&(e=!0),t.prototype.destroy.call(this,e),this.context=null,this.canvas.width=this.canvas.height=0,this.canvas=null,this._style=null,this._parser=null,this._image.onload=null,this._image.src="",this._image=null},h.width.get=function(){return this.updateText(!0),Math.abs(this.scale.x)*this._texture.orig.width},h.width.set=function(t){this.updateText(!0);var e=n.sign(this.scale.x)||1;this.scale.x=e*t/this._texture.orig.width,this._width=t},h.height.get=function(){return this.updateText(!0),Math.abs(this.scale.y)*this._texture.orig.height},h.height.set=function(t){this.updateText(!0);var e=n.sign(this.scale.y)||1;this.scale.y=e*t/this._texture.orig.height,this._height=t},h.style.get=function(){return this._style},h.style.set=function(t){(t=t||{})instanceof r.TextStyle?this._style=t:this._style=new r.TextStyle(t),this.localStyleID=-1,this.dirty=!0},h.text.get=function(){return this._text},h.text.set=function(t){t=String(""===t||null==t?" ":t),this._text!==t&&(this._text=t,this.dirty=!0)},h.resolution.get=function(){return this._resolution},h.resolution.set=function(t){this._autoResolution=!1,this._resolution!==t&&(this._resolution=t,this.dirty=!0)},Object.defineProperties(e.prototype,h),e}(e.Sprite);return t.HTMLText=h,t}({},PIXI,PIXI,PIXI,PIXI,PIXI.utils,PIXI);Object.assign(PIXI,_pixi_htmltext);
//# sourceMappingURL=html-text.js.map
