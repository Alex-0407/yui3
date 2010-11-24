YUI.add("frame",function(B){var A=function(){A.superclass.constructor.apply(this,arguments);};B.extend(A,B.Base,{_ready:null,_rendered:null,_iframe:null,_instance:null,_create:function(C){var I,H,E,G;this._iframe=B.Node.create(A.HTML);this._iframe.setStyle("visibility","hidden");this._iframe.set("src",this.get("src"));this.get("container").append(this._iframe);this._iframe.set("height","99%");var D="",F=((this.get("extracss"))?'<style id="extra_css">'+this.get("extracss")+"</style>":"");D=B.substitute(A.PAGE_HTML,{DIR:this.get("dir"),LANG:this.get("lang"),TITLE:this.get("title"),META:A.META,LINKED_CSS:this.get("linkedcss"),CONTENT:this.get("content"),BASE_HREF:this.get("basehref"),DEFAULT_CSS:A.DEFAULT_CSS,EXTRA_CSS:F});if(B.config.doc.compatMode!="BackCompat"){D=A.DOC_TYPE+"\n"+D;}else{}E=this._resolveWinDoc();E.doc.open();E.doc.write(D);E.doc.close();if(this.get("designMode")){E.doc.designMode="on";}if(!E.doc.documentElement){var J=B.later(1,this,function(){if(E.doc&&E.doc.documentElement){C(E);J.cancel();}},null,true);}else{C(E);}},_resolveWinDoc:function(D){var C=(D)?D:{};C.win=B.Node.getDOMNode(this._iframe.get("contentWindow"));C.doc=B.Node.getDOMNode(this._iframe.get("contentWindow.document"));if(!C.doc){C.doc=B.config.doc;}if(!C.win){C.win=B.config.win;}return C;},_onDomEvent:function(E){var D,C;E.frameX=E.frameY=0;if(E.pageX>0||E.pageY>0){if(E.type.substring(0,3)!=="key"){C=this._instance.one("win");D=this._iframe.getXY();E.frameX=D[0]+E.pageX-C.get("scrollLeft");E.frameY=D[1]+E.pageY-C.get("scrollTop");}}E.frameTarget=E.target;E.frameCurrentTarget=E.currentTarget;E.frameEvent=E;this.fire("dom:"+E.type,E);},initializer:function(){this.publish("ready",{emitFacade:true,defaultFn:this._defReadyFn});},destructor:function(){var C=this.getInstance();C.one("doc").detachAll();C=null;this._iframe.remove();},_DOMPaste:function(F){var D=this.getInstance(),C="",E=D.config.win;if(F._event.originalTarget){C=F._event.originalTarget;}if(F._event.clipboardData){C=F._event.clipboardData.getData("Text");}if(E.clipboardData){C=E.clipboardData.getData("Text");if(C===""){if(!E.clipboardData.setData("Text",C)){C=null;}}}F.frameTarget=F.target;F.frameCurrentTarget=F.currentTarget;F.frameEvent=F;if(C){F.clipboardData={data:C,getData:function(){return C;}};}else{F.clipboardData=null;}this.fire("dom:paste",F);},_defReadyFn:function(){var E=this.getInstance(),C=B.bind(this._onDomEvent,this),D=((B.UA.ie)?B.throttle(C,200):C);E.Node.DOM_EVENTS.activate=1;E.Node.DOM_EVENTS.focusin=1;E.Node.DOM_EVENTS.deactivate=1;E.Node.DOM_EVENTS.focusout=1;B.each(A.DOM_EVENTS,function(G,F){if(G===1){if(F!=="focus"&&F!=="blur"&&F!=="paste"){if(F.substring(0,3)==="key"){E.on(F,D,E.config.doc);}else{E.on(F,C,E.config.doc);}}}},this);E.Node.DOM_EVENTS.paste=1;E.on("paste",B.bind(this._DOMPaste,this),E.one("body"));E.on("focus",C,E.config.win);E.on("blur",C,E.config.win);E._use=E.use;E.use=B.bind(this.use,this);this._iframe.setStyles({visibility:"inherit"});E.one("body").setStyle("display","block");if(B.UA.ie){this._fixIECursors();}},_fixIECursors:function(){var F=this.getInstance(),D=F.all("table"),E=F.all("br"),C;if(D.size()&&E.size()){C=D.item(0).get("sourceIndex");E.each(function(J){var H=J.get("parentNode"),I=H.get("children"),G=H.all(">br");if(H.test("div")){if(I.size()>2){J.replace(F.Node.create("<wbr>"));}else{if(J.get("sourceIndex")>C){if(G.size()){J.replace(F.Node.create("<wbr>"));}}else{if(G.size()>1){J.replace(F.Node.create("<wbr>"));}}}}});}},_onContentReady:function(E){if(!this._ready){this._ready=true;var D=this.getInstance(),C=B.clone(this.get("use"));this.fire("contentready");if(E){D.config.doc=B.Node.getDOMNode(E.target);}C.push(B.bind(function(){if(D.Selection){D.Selection.DEFAULT_BLOCK_TAG=this.get("defaultblock");}this.fire("ready");},this));D.use.apply(D,C);D.one("doc").get("documentElement").addClass("yui-js-enabled");}},_resolveBaseHref:function(C){if(!C||C===""){C=B.config.doc.location.href;if(C.indexOf("?")!==-1){C=C.substring(0,C.indexOf("?"));}C=C.substring(0,C.lastIndexOf("/"))+"/";}return C;},_getHTML:function(C){if(this._ready){var D=this.getInstance();C=D.one("body").get("innerHTML");}return C;},_setHTML:function(C){if(this._ready){var D=this.getInstance();D.one("body").set("innerHTML",C);}else{this.on("contentready",B.bind(function(E,G){var F=this.getInstance();F.one("body").set("innerHTML",E);},this,C));}return C;},_getLinkedCSS:function(C){if(!B.Lang.isArray(C)){C=[C];}var D="";if(!this._ready){B.each(C,function(E){if(E!==""){D+='<link rel="stylesheet" href="'+E+'" type="text/css">';}});}else{D=C;}return D;},_setLinkedCSS:function(C){if(this._ready){var D=this.getInstance();D.Get.css(C);}return C;},_setExtraCSS:function(C){if(this._ready){var E=this.getInstance(),D=E.get("#extra_css");D.remove();E.one("head").append('<style id="extra_css">'+C+"</style>");}return C;},_instanceLoaded:function(D){this._instance=D;this._onContentReady();var E=this._instance.config.doc;if(this.get("designMode")){if(!B.UA.ie){try{E.execCommand("styleWithCSS",false,false);E.execCommand("insertbronreturn",false,false);}catch(C){}}}},use:function(){var E=this.getInstance(),D=B.Array(arguments),C=false;if(B.Lang.isFunction(D[D.length-1])){C=D.pop();}if(C){D.push(function(){C.apply(E,arguments);});}E._use.apply(E,D);},delegate:function(E,D,C,G){var F=this.getInstance();if(!F){return false;}if(!G){G=C;C="body";}return F.delegate(E,D,C,G);},getInstance:function(){return this._instance;},render:function(C){if(this._rendered){return this;}this._rendered=true;if(C){this.set("container",C);}this._create(B.bind(function(G){var I,J,D=B.bind(function(K){this._instanceLoaded(K);},this),F=B.clone(this.get("use")),E={debug:false,win:G.win,doc:G.doc},H=B.bind(function(){E=this._resolveWinDoc(E);I=YUI(E);try{I.use("node-base",D);if(J){clearInterval(J);}}catch(K){J=setInterval(function(){H();},350);}},this);F.push(H);B.use.apply(B,F);},this));return this;},_handleFocus:function(){var D=this.getInstance(),C=new D.Selection();if(C.anchorNode){var F=C.anchorNode,E=F.get("childNodes");
if(E.size()==1){if(E.item(0).test("br")){C.selectNode(F,true,false);}}}},focus:function(C){if(B.UA.ie){try{B.one("win").focus();this.getInstance().one("win").focus();}catch(E){}if(C===true){this._handleFocus();}if(B.Lang.isFunction(C)){C();}}else{try{B.one("win").focus();B.later(100,this,function(){this.getInstance().one("win").focus();if(C===true){this._handleFocus();}if(B.Lang.isFunction(C)){C();}});}catch(D){}}return this;},show:function(){this._iframe.setStyles({position:"static",left:""});if(B.UA.gecko){try{this._instance.config.doc.designMode="on";}catch(C){}this.focus();}return this;},hide:function(){this._iframe.setStyles({position:"absolute",left:"-999999px"});return this;}},{DOM_EVENTS:{dblclick:1,click:1,paste:1,mouseup:1,mousedown:1,keyup:1,keydown:1,keypress:1,activate:1,deactivate:1,focusin:1,focusout:1},DEFAULT_CSS:"body { background-color: #fff; font: 13px/1.22 arial,helvetica,clean,sans-serif;*font-size:small;*font:x-small; } a, a:visited, a:hover { color: blue !important; text-decoration: underline !important; cursor: text !important; } img { cursor: pointer !important; border: none; }",HTML:'<iframe border="0" frameBorder="0" marginWidth="0" marginHeight="0" leftMargin="0" topMargin="0" allowTransparency="true" width="100%" height="99%"></iframe>',PAGE_HTML:'<html dir="{DIR}" lang="{LANG}"><head><title>{TITLE}</title>{META}<base href="{BASE_HREF}"/>{LINKED_CSS}<style id="editor_css">{DEFAULT_CSS}</style>{EXTRA_CSS}</head><body>{CONTENT}</body></html>',DOC_TYPE:'<!DOCTYPE HTML PUBLIC "-/'+"/W3C/"+"/DTD HTML 4.01/"+'/EN" "http:/'+'/www.w3.org/TR/html4/strict.dtd">',META:'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>',NAME:"frame",ATTRS:{title:{value:"Blank Page"},dir:{value:"ltr"},lang:{value:"en-US"},src:{value:"javascript"+((B.UA.ie)?":false":":")+";"},designMode:{writeOnce:true,value:false},content:{value:"<br>",setter:"_setHTML",getter:"_getHTML"},basehref:{value:false,getter:"_resolveBaseHref"},use:{writeOnce:true,value:["substitute","node","node-style","selector-css3"]},container:{value:"body",setter:function(C){return B.one(C);}},node:{readOnly:true,value:null,getter:function(){return this._iframe;}},id:{writeOnce:true,getter:function(C){if(!C){C="iframe-"+B.guid();}return C;}},linkedcss:{value:"",getter:"_getLinkedCSS",setter:"_setLinkedCSS"},extracss:{value:"",setter:"_setExtraCSS"},host:{value:false},defaultblock:{value:"p"}}});B.Frame=A;},"@VERSION@",{requires:["base","node","selector-css3","substitute"],skinnable:false});