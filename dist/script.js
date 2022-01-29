(()=>{"use strict";var t={894:function(t,e,i){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=o(i(802)),r=function(){function t(t){var e=this;this.gameState="developing",this.zoom=1,this.studio=t,this.inputDetector=new n.default({canvas:t.canvas,onDrag:function(t){var i=t.position;"developing"==e.gameState&&"handTool"==e.studio.tool&&(null!=e.studio.data.handToolData.position&&(e.studio.handToolPosition.x+=i.x-e.studio.data.handToolData.position.x,e.studio.handToolPosition.y+=i.y-e.studio.data.handToolData.position.y),e.studio.data.handToolData.position=i)},onDragEnd:function(){"developing"==e.gameState&&"handTool"==e.studio.tool&&(e.studio.data.handToolData.position=void 0)},onLeave:function(){"developing"==e.gameState&&"handTool"==t.tool&&(e.studio.data.handToolData.position=void 0)}})}return Object.defineProperty(t.prototype,"drawingBoard",{set:function(t){this._drawingBoard=t},enumerable:!1,configurable:!0}),t.prototype.render=function(t){if(null!=this._drawingBoard||null!=this._drawingBoard){var e=this._drawingBoard,i=e.position,o=e.size,n=e.color,r=o.height,a=o.width,s=i.x,h=i.y;t.save();var u=void 0;"developing"==this.gameState?(s=s-a*this.zoom/2+this.studio.handToolPosition.x,h=h-r*this.zoom/2+this.studio.handToolPosition.y,u=this.zoom):(s=s-1*a/2+0,h=h-1*r/2+0,u=1),t.translate(s,h),t.rotate(0*Math.PI/180),t.scale(u,u),t.translate(-s,-h),t.fillStyle=n,t.fillRect(s,h,a,r),t.restore()}},t.prototype.update=function(t){},t}();e.default=r},31:function(t,e,i){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.Game=void 0;var n=o(i(894));e.Game=n.default},802:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0});var o=i(858),n=function(){function t(t){var e=this,i=t.canvas,o=t.onDrag,n=t.onPress,r=t.onRelease,a=t.onMove,s=t.onRightPress,h=t.onRightRelease,u=t.onDragEnd,d=t.onLeave;this.isPointerPressed=!1,this.isDragging=!1,this.onDrag=void 0,this.onPress=void 0,this.onRelease=void 0,this.onMove=void 0,this.onRightPress=void 0,this.onRightRelease=void 0,this.onDragEnd=void 0,this.canvas=i,this.onDragEnd=u,this.onDrag=o,this.onMove=a,this.onPress=n,this.onRelease=r,this.onRightPress=s,this.onRightRelease=h,this.canvas.ondragstart=function(){return!1},i.style.touchAction="none",i.addEventListener("pointerdown",(function(t){return e.inputHandler(t)})),i.addEventListener("pointermove",(function(t){return e.inputHandler(t)})),i.addEventListener("pointerover",(function(t){return e.inputHandler(t)})),i.addEventListener("pointerup",(function(t){return e.inputHandler(t)})),i.addEventListener("pointerleave",(function(){e.isPointerPressed=!1,e.isDragging=!1,d&&d()}))}return t.prototype.inputHandler=function(t){var e=parseFloat(getComputedStyle(this.canvas).left),i=parseFloat(getComputedStyle(this.canvas).top),n=1e3*t.timeStamp,r="move",a={x:t.clientX-e,y:t.clientY-i};"pointerdown"==t.type&&(r="press",this.isPointerPressed=!0,2==t.button&&(r="right press",this.isPointerPressed=!1)),"pointermove"!=t.type&&"pointerover"!=t.type||(this.isPointerPressed?(r="drag",this.isDragging=!0):this.isPointerPressed||(r="move")),"pointerup"==t.type&&(this.isDragging?r="drag end":(r="release",2==t.button&&(r="right release")),this.isPointerPressed=!1,this.isDragging=!1),this.onDetect({type:r,time:n,position:new o.Vector2(a.x,a.y)})},t.prototype.onDetect=function(t){var e=t.type,i=t.time,o=t.position;"press"==e&&this.onPress?this.onPress({type:e,time:i,position:o}):"drag"==e&&this.onDrag?this.onDrag({time:i,type:e,position:o}):"move"==e&&this.onMove?this.onMove({time:i,type:e,position:o}):"release"==e&&this.onRelease?this.onRelease({time:i,type:e,position:o}):"right press"==e&&this.onRightPress?this.onRightPress({time:i,type:e,position:o}):"right release"==e&&this.onRightRelease?this.onRightRelease({time:i,type:e,position:o}):"drag end"==e&&this.onDragEnd&&this.onDragEnd({time:i,type:e,position:o})},t}();e.default=n},146:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0});var o=i(31),n=i(858),r=function(){function t(t){var e=this,i=t.canvas,r=t.size,a=void 0===r?new n.Size(600,400):r;this.oldTime=0,this.tool="pickTool",this.handToolPosition=new n.Vector2(0,0),this.data={handToolData:{position:void 0}};var s=a.height,h=a.width;this._canvas=i,this._size=a,this._canvas.style.height="".concat(s,"px"),this._canvas.style.width="".concat(h,"px"),this._gameCharacter=new o.Game(this),this.graphic=this._canvas.getContext("2d"),this._gameCharacter.drawingBoard={size:new n.Size(h,s).div(1.15),color:"#ffffff",position:new n.Vector2(h,s).multiply(.5)};var u=function(t){var o=(t-e.oldTime)/1e3;e.oldTime=t,e.graphic=e.sharpenCanvas(i),e.update(o),e.graphic.clearRect(0,0,h,s),e.render(e.graphic),requestAnimationFrame(u)};requestAnimationFrame(u)}return Object.defineProperty(t.prototype,"gameCharacter",{get:function(){return this._gameCharacter},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"canvas",{get:function(){return this._canvas},enumerable:!1,configurable:!0}),t.prototype.start=function(){var t=this.size,e=t.height,i=t.width;this._gameCharacter.drawingBoard={size:new n.Size(i,e),color:"#ffffff",position:new n.Vector2(i,e).multiply(.5)},this._gameCharacter.gameState="running"},t.prototype.stop=function(){var t=this.size,e=t.height,i=t.width;this._gameCharacter.drawingBoard={size:new n.Size(i,e).div(1.15),color:"#ffffff",position:new n.Vector2(i,e).multiply(.5)},this._gameCharacter.gameState="developing"},t.prototype.zoom=function(t){this._gameCharacter.zoom=t<=10?.1:t>=1200?12:t/100},t.prototype.sharpenCanvas=function(t){var e=window.devicePixelRatio||1,i=t.getBoundingClientRect();t.width=i.width*e,t.height=i.height*e;var o=t.getContext("2d");return o.constructor.prototype.devicePixelRatio=e,o.scale(e,e),o},t.prototype.update=function(t){this._gameCharacter.update(t)},t.prototype.render=function(t){this._gameCharacter.render(t)},t}();e.default=r},122:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e,i,o){this.x=t,this.y=e,this.width=o,this.height=i}return t.prototype.fromVectorSize=function(e,i){return new t(e.x,e.y,i.width,i.height)},t.prototype.isVectorInPath=function(t){var e=t.x,i=t.y;return this.isPointInPath(e,i)},t.prototype.isPointInPath=function(t,e){return t>=this.x&&t<=this.width+this.x&&e>=this.y&&e<=this.height+this.y},t.prototype.copy=function(e){return new t(e.x,e.y,e.width,e.height)},t.prototype.toObject=function(){return{x:this.x,y:this.y,width:this.width,height:this.height}},t.prototype.toString=function(){return"Rect {".concat("\n\tx: ".concat(this.x)).concat("\n\ty: ".concat(this.y)).concat("\n\twidth: ".concat(this.width,"}")).concat("\n\theight: ".concat(this.height,"}")).concat("\n}")},t}();e.default=i},477:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){void 0===t&&(t=0),void 0===e&&(e=0),this._height=e,this._width=t}return Object.defineProperty(t.prototype,"height",{get:function(){return this._height},set:function(t){this._height=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"width",{get:function(){return this._width},set:function(t){this._width=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"aspectRatio",{get:function(){return 0!=this.height?this.width/this.height:this.width>0?1/0:this.width<0?-1/0:0},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"flipped",{get:function(){return new t(this.height,this.width)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"isFinite",{get:function(){return isFinite(this.height)&&isFinite(this.width)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"longestSide",{get:function(){return Math.max(this.height,this.width)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"shortestSide",{get:function(){return Math.min(this.height,this.width)},enumerable:!1,configurable:!0}),t.prototype.copy=function(e){return new t(e.width,e.height)},t.prototype.fromRadius=function(e){return new t(2*e,2*e)},t.prototype.fromHeight=function(e){return new t(1/0,e)},t.prototype.fromWidth=function(e){return new t(e,1/0)},t.prototype.square=function(e){return new t(e,e)},t.prototype.toArray=function(){return[this.width,this.height]},t.prototype.toObject=function(){return{width:this.width,height:this.height}},t.prototype.div=function(e){return"number"==typeof e?new t(this._width/e,this._height/e):new t(this._width/e.width,this._height/e.height)},t.prototype.subtr=function(e){return new t(this._width*e.width,this._height*e.height)},t.prototype.add=function(e){return new t(this._width*e.width,this._height*e.height)},t.prototype.multiply=function(e){return"number"==typeof e?new t(this._width*e,this._height*e):new t(this._width*e.width,this._height*e.height)},t.prototype.toString=function(){return"Size(".concat(this.width,", ").concat(this.height,")")},t}();e.default=i},104:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){void 0===t&&(t=0),void 0===e&&(e=0),this.x=t,this.y=e}return t.prototype.add=function(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];var o=this;if(1==e.length){var n=e[0];o=new t(o.x+n.x,o.y+n.y)}else e.length>1&&e.forEach((function(t){o=o.add(t)}));return o},t.prototype.subtr=function(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];var o=this;if(1==e.length){var n=e[0];o=new t(o.x-n.x,o.y-n.y)}else e.length>1&&e.forEach((function(t){o=o.subtr(t)}));return o},t.prototype.dot=function(t){return this.x*t.x+this.y*t.y},t.prototype.div=function(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];var o=this;if(1==e.length){var n=e[0];o=new t(o.x/n.x,o.y/n.y)}else e.length>1&&e.forEach((function(t){o=o.div(t)}));return o},t.prototype.multiply=function(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];var o=this;if(1==e.length){var n=e[0];o="number"==typeof n?new t(o.x*n,o.y*n):new t(o.x*n.x,o.y*n.y)}else e.length>1&&e.forEach((function(t){o=o.multiply(t)}));return o},t.prototype.toArray=function(){return[this.x,this.y]},t.prototype.toString=function(){return"Vector2(".concat(this.x,", ").concat(this.y,")")},t.prototype.toObject=function(){return{x:this.x,y:this.y}},t.prototype.angle=function(){return Math.tan(this.y/this.x)},t.prototype.magnitude=function(){return Math.sqrt(Math.pow(Math.abs(this.x),2)+Math.pow(Math.abs(this.y),2))},t.prototype.normalize=function(){var e=this.magnitude(),i=new t(0,0);return e>1e-5&&(i.x=this.x/e,i.y=this.y/e),i},t}();e.default=i},858:function(t,e,i){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.Rect=e.Vector2=e.Size=void 0;var n=o(i(122));e.Rect=n.default;var r=o(i(477));e.Size=r.default;var a=o(i(104));e.Vector2=a.default},294:function(t,e,i){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=o(i(146)),r=i(858),a=document.querySelector("canvas.drawing-board"),s=parseFloat(getComputedStyle(a).height),h=parseFloat(getComputedStyle(a).width);new n.default({canvas:a,size:new r.Size(h,s)})}},e={};!function i(o){var n=e[o];if(void 0!==n)return n.exports;var r=e[o]={exports:{}};return t[o].call(r.exports,r,r.exports,i),r.exports}(294)})();
//# sourceMappingURL=script.js.map