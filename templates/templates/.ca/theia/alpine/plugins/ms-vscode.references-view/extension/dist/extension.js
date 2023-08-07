var de=Object.create,O=Object.defineProperty,le=Object.getPrototypeOf,me=Object.prototype.hasOwnProperty,ue=Object.getOwnPropertyNames,ve=Object.getOwnPropertyDescriptor;var J=i=>O(i,"__esModule",{value:!0});var he=(i,e)=>{J(i);for(var t in e)O(i,t,{get:e[t],enumerable:!0})},pe=(i,e,t)=>{if(J(i),e&&typeof e=="object"||typeof e=="function")for(let o of ue(e))!me.call(i,o)&&o!=="default"&&O(i,o,{get:()=>e[o],enumerable:!(t=ve(e,o))||t.enumerable});return i},T=i=>i&&i.__esModule?i:pe(O(i!=null?de(le(i)):{},"default",{value:i,enumerable:!0}),i);he(exports,{activate:()=>Te});var y=T(require("vscode"));var h=T(require("vscode"));function R(i,e){let t=i.indexOf(e);t>=0&&i.splice(t,1)}function E(i){return i[i.length-1]}function A(i,e){return i.with({fragment:`L${1+e.start.line},${1+e.start.character}-${1+e.end.line},${1+e.end.character}`})}async function X(i,e){let t=await h.workspace.openTextDocument(i),o=t.getWordRangeAtPosition(e);return o||(o=t.getWordRangeAtPosition(e,/[^\s]+/)),Boolean(o)}function W(i,e,t=8,o=!0){let n=e.start.with({character:Math.max(0,e.start.character-t)}),s=i.getWordRangeAtPosition(n),r=i.getText(new h.Range(s?s.start:n,e.start)),a=i.getText(e),m=e.end.translate(0,331),S=i.getText(new h.Range(e.end,m));return o&&(r=r.replace(/^\s*/g,""),S=S.replace(/\s*$/g,"")),{before:r,inside:a,after:S}}var g=class{constructor(e){this.name=e}async set(e){await h.commands.executeCommand("setContext",this.name,e)}async reset(){await h.commands.executeCommand("setContext",this.name,void 0)}},B=class{constructor(e,t){this._doc=e;this._position=t;this._version=e.version,this._word=this._getAnchorWord(e,t)}_getAnchorWord(e,t){let o=e.getWordRangeAtPosition(t)||e.getWordRangeAtPosition(t,/[^\s]+/);return o&&e.getText(o)}guessedTrackedPosition(){if(!this._word)return this._position;if(this._version===this._doc.version)return this._position;let e=this._getAnchorWord(this._doc,this._position);if(this._word===e)return this._position;let t=this._position.line,o=0,n,s;do{if(s=!1,n=t+o,n<this._doc.lineCount){s=!0;let r=this._doc.lineAt(n).text.indexOf(this._word);if(r>=0)return new h.Position(n,r)}if(o+=1,n=t-o,n>=0){s=!0;let r=this._doc.lineAt(n).text.indexOf(this._word);if(r>=0)return new h.Position(n,r)}}while(o<100&&s);return this._position}},fe=["symbol-file","symbol-module","symbol-namespace","symbol-package","symbol-class","symbol-method","symbol-property","symbol-field","symbol-constructor","symbol-enum","symbol-interface","symbol-function","symbol-variable","symbol-constant","symbol-string","symbol-number","symbol-boolean","symbol-array","symbol-object","symbol-key","symbol-null","symbol-enum-member","symbol-struct","symbol-event","symbol-operator","symbol-type-parameter"];function M(i){let e=fe[i];return e?new h.ThemeIcon(e):void 0}var v=T(require("vscode"));var k=class{constructor(e,t){this.location=e;this.direction=t;this.contextValue="callHierarchy";this.title=t===C.Incoming?"Callers Of":"Calls From"}async resolve(){let e=await Promise.resolve(v.commands.executeCommand("vscode.prepareCallHierarchy",this.location.uri,this.location.range.start)),t=new Y(this.direction,e!=null?e:[]),o=new Z(t);if(t.roots.length!==0)return{provider:o,get message(){return t.roots.length===0?"No results.":void 0},navigation:t,highlights:t,dnd:t,dispose(){o.dispose()}}}with(e){return new k(e,this.direction)}},C;(function(i){i[i.Incoming=0]="Incoming",i[i.Outgoing=1]="Outgoing"})(C||(C={}));var P=class{constructor(e,t,o,n){this.model=e;this.item=t;this.parent=o;this.locations=n}remove(){this.model.remove(this)}},Y=class{constructor(e,t){this.direction=e;this.roots=[];this._onDidChange=new v.EventEmitter;this.onDidChange=this._onDidChange.event;this.roots=t.map(o=>new P(this,o,void 0,void 0))}async _resolveCalls(e){if(this.direction===0){let t=await v.commands.executeCommand("vscode.provideIncomingCalls",e.item);return t?t.map(o=>new P(this,o.from,e,o.fromRanges.map(n=>new v.Location(o.from.uri,n)))):[]}else{let t=await v.commands.executeCommand("vscode.provideOutgoingCalls",e.item);return t?t.map(o=>new P(this,o.to,e,o.fromRanges.map(n=>new v.Location(e.item.uri,n)))):[]}}async getCallChildren(e){return e.children||(e.children=await this._resolveCalls(e)),e.children}location(e){return new v.Location(e.item.uri,e.item.range)}nearest(e,t){var o;return(o=this.roots.find(n=>n.item.uri.toString()===e.toString()))!=null?o:this.roots[0]}next(e){var t;return(t=this._move(e,!0))!=null?t:e}previous(e){var t;return(t=this._move(e,!1))!=null?t:e}_move(e,t){var n,s;if((n=e.children)==null?void 0:n.length)return t?e.children[0]:E(e.children);let o=this.roots.includes(e)?this.roots:(s=e.parent)==null?void 0:s.children;if(o==null?void 0:o.length){let r=o.indexOf(e);return o[r+(t?1:-1)+o.length%o.length]}}getDragUri(e){return A(e.item.uri,e.item.range)}getEditorHighlights(e,t){return e.locations?e.locations.filter(o=>o.uri.toString()===t.toString()).map(o=>o.range):e.item.uri.toString()===t.toString()?[e.item.selectionRange]:void 0}remove(e){var n;let o=this.roots.includes(e)?this.roots:(n=e.parent)==null?void 0:n.children;o&&(R(o,e),this._onDidChange.fire(this))}},Z=class{constructor(e){this._model=e;this._emitter=new v.EventEmitter;this.onDidChangeTreeData=this._emitter.event;this._modelListener=e.onDidChange(t=>this._emitter.fire(t instanceof P?t:void 0))}dispose(){this._emitter.dispose(),this._modelListener.dispose()}getTreeItem(e){let t=new v.TreeItem(e.item.name);return t.description=e.item.detail,t.tooltip=t.label?`${t.label} - ${e.item.detail}`:e.item.detail,t.contextValue="call-item",t.iconPath=M(e.item.kind),t.command={command:"vscode.open",title:"Open Call",arguments:[e.item.uri,{selection:e.item.selectionRange.with({end:e.item.selectionRange.start})}]},t.collapsibleState=v.TreeItemCollapsibleState.Collapsed,t}getChildren(e){return e?this._model.getCallChildren(e):this._model.roots}getParent(e){return e.parent}};function ee(i,e){let t=new K(e.workspaceState,C.Incoming);function o(){if(y.window.activeTextEditor){let s=new k(new y.Location(y.window.activeTextEditor.document.uri,y.window.activeTextEditor.selection.active),t.value);i.setInput(s)}}function n(s,r){t.value=s;let a,m=i.getInput();r instanceof P?a=new k(new y.Location(r.item.uri,r.item.selectionRange.start),t.value):m instanceof k&&(a=new k(m.location,t.value)),a&&i.setInput(a)}e.subscriptions.push(y.commands.registerCommand("references-view.showCallHierarchy",o),y.commands.registerCommand("references-view.showOutgoingCalls",s=>n(C.Outgoing,s)),y.commands.registerCommand("references-view.showIncomingCalls",s=>n(C.Incoming,s)),y.commands.registerCommand("references-view.removeCallItem",ge))}function ge(i){i instanceof P&&i.remove()}var N=class{constructor(e,t=C.Outgoing){this._mem=e;this._value=t;this._ctxMode=new g("references-view.callHierarchyMode");let o=e.get(N._key);typeof o=="number"&&o>=0&&o<=1?this.value=o:this.value=t}get value(){return this._value}set value(e){this._value=e,this._ctxMode.set(this._value===C.Incoming?"showIncoming":"showOutgoing"),this._mem.update(N._key,e)}},K=N;K._key="references-view.callHierarchyMode";var l=T(require("vscode"));var d=T(require("vscode"));var F=class{constructor(e,t,o,n){this.title=e;this.location=t;this._command=o;this._result=n;this.contextValue=o}async resolve(){let e;if(this._result)e=new b(this._result);else{let o=await Promise.resolve(d.commands.executeCommand(this._command,this.location.uri,this.location.range.start));e=new b(o!=null?o:[])}if(e.items.length===0)return;let t=new te(e);return{provider:t,get message(){return e.message},navigation:e,highlights:e,dnd:e,dispose(){t.dispose()}}}with(e){return new F(this.title,e,this._command)}},b=class{constructor(e){this._onDidChange=new d.EventEmitter;this.onDidChangeTreeData=this._onDidChange.event;this.items=[];let t;for(let o of e.sort(b._compareLocations)){let n=o instanceof d.Location?o:new d.Location(o.targetUri,o.targetRange);(!t||b._compareUriIgnoreFragment(t.uri,n.uri)!==0)&&(t=new p(n.uri.with({fragment:""}),[],this),this.items.push(t)),t.references.push(new _(n,t))}}static _compareUriIgnoreFragment(e,t){let o=e.with({fragment:""}).toString(),n=t.with({fragment:""}).toString();return o<n?-1:o>n?1:0}static _compareLocations(e,t){let o=e instanceof d.Location?e.uri:e.targetUri,n=t instanceof d.Location?t.uri:t.targetUri;if(o.toString()<n.toString())return-1;if(o.toString()>n.toString())return 1;let s=e instanceof d.Location?e.range:e.targetRange,r=t instanceof d.Location?t.range:t.targetRange;return s.start.isBefore(r.start)?-1:s.start.isAfter(r.start)?1:0}get message(){if(this.items.length===0)return"No results.";let e=this.items.reduce((o,n)=>o+n.references.length,0),t=this.items.length;return e===1&&t===1?`${e} result in ${t} file`:e===1?`${e} result in ${t} files`:t===1?`${e} results in ${t} file`:`${e} results in ${t} files`}location(e){return e instanceof _?e.location:void 0}nearest(e,t){if(this.items.length===0)return;for(let s of this.items)if(s.uri.toString()===e.toString()){for(let a of s.references)if(a.location.range.contains(t))return a;let r;for(let a of s.references){if(a.location.range.end.isAfter(t))return a;r=a}if(r)return r;break}let o=0,n=b._prefixLen(this.items[o].toString(),e.toString());for(let s=1;s<this.items.length;s++)b._prefixLen(this.items[s].uri.toString(),e.toString())>n&&(o=s);return this.items[o].references[0]}static _prefixLen(e,t){let o=0;for(;o<e.length&&o<t.length&&e.charCodeAt(o)===t.charCodeAt(o);)o+=1;return o}next(e){var t;return(t=this._move(e,!0))!=null?t:e}previous(e){var t;return(t=this._move(e,!1))!=null?t:e}_move(e,t){let o=t?1:-1,n=s=>{let r=(this.items.indexOf(s)+o+this.items.length)%this.items.length;return this.items[r]};if(e instanceof p)return t?n(e).references[0]:E(n(e).references);if(e instanceof _){let s=e.file.references.indexOf(e)+o;return s<0?E(n(e.file).references):s>=e.file.references.length?n(e.file).references[0]:e.file.references[s]}}getEditorHighlights(e,t){let o=this.items.find(n=>n.uri.toString()===t.toString());return o==null?void 0:o.references.map(n=>n.location.range)}remove(e){e instanceof p?(R(this.items,e),this._onDidChange.fire(void 0)):(R(e.file.references,e),e.file.references.length===0?(R(this.items,e.file),this._onDidChange.fire(void 0)):this._onDidChange.fire(e.file))}async asCopyText(){let e="";for(let t of this.items)e+=`${await t.asCopyText()}
`;return e}getDragUri(e){return e instanceof p?e.uri:A(e.file.uri,e.location.range)}},te=class{constructor(e){this._model=e;this._onDidChange=new d.EventEmitter;this.onDidChangeTreeData=this._onDidChange.event;this._listener=e.onDidChangeTreeData(t=>this._onDidChange.fire(void 0))}dispose(){this._onDidChange.dispose(),this._listener.dispose()}async getTreeItem(e){if(e instanceof p){let t=new d.TreeItem(e.uri);return t.contextValue="file-item",t.description=!0,t.iconPath=d.ThemeIcon.File,t.collapsibleState=d.TreeItemCollapsibleState.Collapsed,t}else{let{range:t}=e.location,o=await e.getDocument(!0),{before:n,inside:s,after:r}=W(o,t),a={label:n+s+r,highlights:[[n.length,n.length+s.length]]},m=new d.TreeItem(a);return m.collapsibleState=d.TreeItemCollapsibleState.None,m.contextValue="reference-item",m.command={command:"vscode.open",title:"Open Reference",arguments:[e.location.uri,{selection:t.with({end:t.start})}]},m}}async getChildren(e){if(!e)return this._model.items;if(e instanceof p)return e.references}getParent(e){return e instanceof _?e.file:void 0}},p=class{constructor(e,t,o){this.uri=e;this.references=t;this.model=o}remove(){this.model.remove(this)}async asCopyText(){let e=`${d.workspace.asRelativePath(this.uri)}
`;for(let t of this.references)e+=`  ${await t.asCopyText()}
`;return e}},_=class{constructor(e,t){this.location=e;this.file=t}async getDocument(e){if(this._document||(this._document=d.workspace.openTextDocument(this.location.uri)),e){let t=this.file.model.next(this.file);t instanceof p&&t!==this.file?d.workspace.openTextDocument(t.uri):t instanceof _&&d.workspace.openTextDocument(t.location.uri)}return this._document}remove(){this.file.model.remove(this)}async asCopyText(){let e=await this.getDocument(),t=W(e,this.location.range,21,!1);return`${this.location.range.start.line+1}, ${this.location.range.start.character+1}: ${t.before+t.inside+t.after}`}};function oe(i,e){function t(r,a){if(l.window.activeTextEditor){let m=new F(r,new l.Location(l.window.activeTextEditor.document.uri,l.window.activeTextEditor.selection.active),a);i.setInput(m)}}e.subscriptions.push(l.commands.registerCommand("references-view.findReferences",()=>t("References","vscode.executeReferenceProvider")),l.commands.registerCommand("references-view.findImplementations",()=>t("Implementations","vscode.executeImplementationProvider")),l.commands.registerCommand("references-view.find",(...r)=>l.commands.executeCommand("references-view.findReferences",...r)),l.commands.registerCommand("references-view.removeReferenceItem",we),l.commands.registerCommand("references-view.copy",j),l.commands.registerCommand("references-view.copyAll",ye),l.commands.registerCommand("references-view.copyPath",Ie));let o,n="references.preferredLocation";function s(r){if(r&&!r.affectsConfiguration(n))return;let a=l.workspace.getConfiguration().get(n);o==null||o.dispose(),o=void 0,a==="view"&&(o=l.commands.registerCommand("editor.action.showReferences",async(m,S,x)=>{let U=new F("References",new l.Location(m,S),"vscode.executeReferenceProvider",x);i.setInput(U)}))}e.subscriptions.push(l.workspace.onDidChangeConfiguration(s)),e.subscriptions.push({dispose:()=>o==null?void 0:o.dispose()}),s()}var ye=async i=>{i instanceof _?j(i.file.model):i instanceof p&&j(i.model)};function we(i){(i instanceof p||i instanceof _)&&i.remove()}async function j(i){let e;i instanceof b?e=await i.asCopyText():i instanceof _?e=await i.asCopyText():i instanceof p&&(e=await i.asCopyText()),e&&await l.env.clipboard.writeText(e)}async function Ie(i){i instanceof p&&(i.uri.scheme==="file"?l.env.clipboard.writeText(i.uri.fsPath):l.env.clipboard.writeText(i.uri.toString(!0)))}var c=T(require("vscode"));var u=T(require("vscode")),q=class{constructor(e,t){this._view=e;this._delegate=t;this._decorationType=u.window.createTextEditorDecorationType({backgroundColor:new u.ThemeColor("editor.findMatchHighlightBackground"),rangeBehavior:u.DecorationRangeBehavior.ClosedClosed,overviewRulerLane:u.OverviewRulerLane.Center,overviewRulerColor:new u.ThemeColor("editor.findMatchHighlightBackground")});this.disposables=[];this._ignore=new Set;this.disposables.push(u.workspace.onDidChangeTextDocument(o=>this._ignore.add(o.document.uri.toString())),u.window.onDidChangeActiveTextEditor(()=>e.visible&&this.update()),e.onDidChangeVisibility(o=>o.visible?this._show():this._hide()),e.onDidChangeSelection(()=>e.visible&&this.update())),this._show()}dispose(){u.Disposable.from(...this.disposables).dispose();for(let e of u.window.visibleTextEditors)e.setDecorations(this._decorationType,[])}_show(){let{activeTextEditor:e}=u.window;if(!e||!e.viewColumn||this._ignore.has(e.document.uri.toString()))return;let[t]=this._view.selection;if(!t)return;let o=this._delegate.getEditorHighlights(t,e.document.uri);o&&e.setDecorations(this._decorationType,o)}_hide(){for(let e of u.window.visibleTextEditors)e.setDecorations(this._decorationType,[])}update(){this._hide(),this._show()}};var w=T(require("vscode"));var z=class{constructor(e){this._view=e;this._disposables=[];this._ctxCanNavigate=new g("references-view.canNavigate");this._disposables.push(w.commands.registerCommand("references-view.next",()=>this.next(!1)),w.commands.registerCommand("references-view.prev",()=>this.previous(!1)))}dispose(){w.Disposable.from(...this._disposables).dispose()}update(e){this._delegate=e,this._ctxCanNavigate.set(Boolean(this._delegate))}_anchor(){if(!this._delegate)return;let[e]=this._view.selection;if(e)return e;if(!!w.window.activeTextEditor)return this._delegate.nearest(w.window.activeTextEditor.document.uri,w.window.activeTextEditor.selection.active)}_open(e,t){w.commands.executeCommand("vscode.open",e.uri,{selection:new w.Selection(e.range.start,e.range.start),preserveFocus:t})}previous(e){if(!this._delegate)return;let t=this._anchor();if(!t)return;let o=this._delegate.previous(t),n=this._delegate.location(o);n&&(this._view.reveal(o,{select:!0,focus:!0}),this._open(n,e))}next(e){if(!this._delegate)return;let t=this._anchor();if(!t)return;let o=this._delegate.next(t),n=this._delegate.location(o);n&&(this._view.reveal(o,{select:!0,focus:!0}),this._open(n,e))}};var Q=class{constructor(){this.viewId="references-view.tree";this._ctxIsActive=new g("reference-list.isActive");this._ctxHasResult=new g("reference-list.hasResult");this._ctxInputSource=new g("reference-list.source");this._history=new se(this);this._provider=new ie;this._dnd=new ne;this._tree=c.window.createTreeView(this.viewId,{treeDataProvider:this._provider,showCollapseAll:!0,dragAndDropController:this._dnd}),this._navigation=new z(this._tree)}dispose(){var e;this._history.dispose(),this._tree.dispose(),(e=this._sessionDisposable)==null||e.dispose()}getInput(){return this._input}async setInput(e){var m,S;if(!await X(e.location.uri,e.location.range.start)){this.clearInput();return}this._ctxInputSource.set(e.contextValue),this._ctxIsActive.set(!0),this._ctxHasResult.set(!0),c.commands.executeCommand(`${this.viewId}.focus`);let t=!this._input||Object.getPrototypeOf(this._input)!==Object.getPrototypeOf(e);this._input=e,(m=this._sessionDisposable)==null||m.dispose(),this._tree.title=e.title,this._tree.message=t?void 0:this._tree.message;let o=Promise.resolve(e.resolve());this._provider.update(o.then(x=>{var U;return(U=x==null?void 0:x.provider)!=null?U:this._history})),this._dnd.update(o.then(x=>x==null?void 0:x.dnd));let n=await o;if(this._input!==e)return;if(!n){this.clearInput();return}this._history.add(e),this._tree.message=n.message,this._navigation.update(n.navigation);let s=(S=n.navigation)==null?void 0:S.nearest(e.location.uri,e.location.range.start);s&&this._tree.visible&&await this._tree.reveal(s,{select:!0,focus:!0,expand:!0});let r=[],a;n.highlights&&(a=new q(this._tree,n.highlights),r.push(a)),n.provider.onDidChangeTreeData&&r.push(n.provider.onDidChangeTreeData(()=>{this._tree.title=e.title,this._tree.message=n.message,a==null||a.update()})),typeof n.dispose=="function"&&r.push(new c.Disposable(()=>n.dispose())),this._sessionDisposable=c.Disposable.from(...r)}clearInput(){var e;(e=this._sessionDisposable)==null||e.dispose(),this._input=void 0,this._ctxHasResult.set(!1),this._ctxInputSource.reset(),this._tree.title="References",this._tree.message=this._history.size===0?"No results.":"No results. Try running a previous search again:",this._provider.update(Promise.resolve(this._history))}},ie=class{constructor(){this._onDidChange=new c.EventEmitter;this.onDidChangeTreeData=this._onDidChange.event}update(e){var t;(t=this._sessionDispoables)==null||t.dispose(),this._sessionDispoables=void 0,this._onDidChange.fire(void 0),this.provider=e,e.then(o=>{this.provider===e&&o.onDidChangeTreeData&&(this._sessionDispoables=o.onDidChangeTreeData(this._onDidChange.fire,this._onDidChange))}).catch(o=>{this.provider=void 0,console.error(o)})}async getTreeItem(e){return this._assertProvider(),(await this.provider).getTreeItem(e)}async getChildren(e){return this._assertProvider(),(await this.provider).getChildren(e)}async getParent(e){this._assertProvider();let t=await this.provider;return t.getParent?t.getParent(e):void 0}_assertProvider(){if(!this.provider)throw new Error("MISSING provider")}},ne=class{constructor(){this.dropMimeTypes=[];this.dragMimeTypes=["text/uri-list"]}update(e){this._delegate=void 0,e.then(t=>this._delegate=t)}handleDrag(e,t){if(this._delegate){let o=[];for(let n of e){let s=this._delegate.getDragUri(n);s&&o.push(s.toString())}o.length>0&&t.set("text/uri-list",new c.DataTransferItem(o.join(`
`)))}}handleDrop(){throw new Error("Method not implemented.")}},$=class{constructor(e,t,o,n){this.key=e;this.word=t;this.anchor=o;this.input=n;this.description=`${c.workspace.asRelativePath(n.location.uri)} \u2022 ${n.title.toLocaleLowerCase()}`}},se=class{constructor(e){this._tree=e;this._onDidChangeTreeData=new c.EventEmitter;this.onDidChangeTreeData=this._onDidChangeTreeData.event;this._disposables=[];this._ctxHasHistory=new g("reference-list.hasHistory");this._inputs=new Map;this._disposables.push(c.commands.registerCommand("references-view.clear",()=>e.clearInput()),c.commands.registerCommand("references-view.clearHistory",()=>{this.clear(),e.clearInput()}),c.commands.registerCommand("references-view.refind",t=>{t instanceof $&&this._reRunHistoryItem(t)}),c.commands.registerCommand("references-view.refresh",()=>{let t=Array.from(this._inputs.values()).pop();t&&this._reRunHistoryItem(t)}),c.commands.registerCommand("_references-view.showHistoryItem",t=>{var o;if(t instanceof $){let n=(o=t.anchor.guessedTrackedPosition())!=null?o:t.input.location.range.start;return c.commands.executeCommand("vscode.open",t.input.location.uri,{selection:new c.Range(n,n)})}}),c.commands.registerCommand("references-view.pickFromHistory",async()=>{let o=(await this.getChildren()).map(s=>({label:s.word,description:s.description,item:s})),n=await c.window.showQuickPick(o,{placeHolder:"Select previous reference search"});n&&this._reRunHistoryItem(n.item)}))}dispose(){c.Disposable.from(...this._disposables).dispose(),this._onDidChangeTreeData.dispose()}_reRunHistoryItem(e){this._inputs.delete(e.key);let t=e.anchor.guessedTrackedPosition(),o=e.input;t&&!e.input.location.range.start.isEqual(t)&&(o=e.input.with(new c.Location(e.input.location.uri,t))),this._tree.setInput(o)}async add(e){var a,m;let t=await c.workspace.openTextDocument(e.location.uri),o=new B(t,e.location.range.start),n=(a=t.getWordRangeAtPosition(e.location.range.start))!=null?a:t.getWordRangeAtPosition(e.location.range.start,/[^\s]+/),s=n?t.getText(n):"???",r=new $(JSON.stringify([(m=n==null?void 0:n.start)!=null?m:e.location.range.start,e.location.uri,e.title]),s,o,e);this._inputs.delete(r.key),this._inputs.set(r.key,r),this._ctxHasHistory.set(!0)}clear(){this._inputs.clear(),this._ctxHasHistory.set(!1),this._onDidChangeTreeData.fire(void 0)}get size(){return this._inputs.size}getTreeItem(e){let t=new c.TreeItem(e.word);return t.description=e.description,t.command={command:"_references-view.showHistoryItem",arguments:[e],title:"Rerun"},t.collapsibleState=c.TreeItemCollapsibleState.None,t.contextValue="history-item",t}getChildren(){return Promise.all([...this._inputs.values()].reverse())}getParent(){}};var I=T(require("vscode"));var f=T(require("vscode"));var H=class{constructor(e,t){this.location=e;this.direction=t;this.contextValue="typeHierarchy";this.title=t===D.Supertypes?"Supertypes Of":"Subtypes Of"}async resolve(){let e=await Promise.resolve(f.commands.executeCommand("vscode.prepareTypeHierarchy",this.location.uri,this.location.range.start)),t=new re(this.direction,e!=null?e:[]),o=new ae(t);if(t.roots.length!==0)return{provider:o,get message(){return t.roots.length===0?"No results.":void 0},navigation:t,highlights:t,dnd:t,dispose(){o.dispose()}}}with(e){return new H(e,this.direction)}},D;(function(i){i.Subtypes="subtypes",i.Supertypes="supertypes"})(D||(D={}));var L=class{constructor(e,t,o){this.model=e;this.item=t;this.parent=o}remove(){this.model.remove(this)}},re=class{constructor(e,t){this.direction=e;this.roots=[];this._onDidChange=new f.EventEmitter;this.onDidChange=this._onDidChange.event;this.roots=t.map(o=>new L(this,o,void 0))}async _resolveTypes(e){if(this.direction===D.Supertypes){let t=await f.commands.executeCommand("vscode.provideSupertypes",e.item);return t?t.map(o=>new L(this,o,e)):[]}else{let t=await f.commands.executeCommand("vscode.provideSubtypes",e.item);return t?t.map(o=>new L(this,o,e)):[]}}async getTypeChildren(e){return e.children||(e.children=await this._resolveTypes(e)),e.children}getDragUri(e){return A(e.item.uri,e.item.range)}location(e){return new f.Location(e.item.uri,e.item.range)}nearest(e,t){var o;return(o=this.roots.find(n=>n.item.uri.toString()===e.toString()))!=null?o:this.roots[0]}next(e){var t;return(t=this._move(e,!0))!=null?t:e}previous(e){var t;return(t=this._move(e,!1))!=null?t:e}_move(e,t){var n,s;if((n=e.children)==null?void 0:n.length)return t?e.children[0]:E(e.children);let o=this.roots.includes(e)?this.roots:(s=e.parent)==null?void 0:s.children;if(o==null?void 0:o.length){let r=o.indexOf(e);return o[r+(t?1:-1)+o.length%o.length]}}getEditorHighlights(e,t){return e.item.uri.toString()===t.toString()?[e.item.selectionRange]:void 0}remove(e){var n;let o=this.roots.includes(e)?this.roots:(n=e.parent)==null?void 0:n.children;o&&(R(o,e),this._onDidChange.fire(this))}},ae=class{constructor(e){this._model=e;this._emitter=new f.EventEmitter;this.onDidChangeTreeData=this._emitter.event;this._modelListener=e.onDidChange(t=>this._emitter.fire(t instanceof L?t:void 0))}dispose(){this._emitter.dispose(),this._modelListener.dispose()}getTreeItem(e){let t=new f.TreeItem(e.item.name);return t.description=e.item.detail,t.contextValue="type-item",t.iconPath=M(e.item.kind),t.command={command:"vscode.open",title:"Open Type",arguments:[e.item.uri,{selection:e.item.selectionRange.with({end:e.item.selectionRange.start})}]},t.collapsibleState=f.TreeItemCollapsibleState.Collapsed,t}getChildren(e){return e?this._model.getTypeChildren(e):this._model.roots}getParent(e){return e.parent}};function ce(i,e){let t=new G(e.workspaceState,D.Subtypes);function o(){if(I.window.activeTextEditor){let s=new H(new I.Location(I.window.activeTextEditor.document.uri,I.window.activeTextEditor.selection.active),t.value);i.setInput(s)}}function n(s,r){t.value=s;let a,m=i.getInput();r instanceof L?a=new H(new I.Location(r.item.uri,r.item.selectionRange.start),t.value):m instanceof H&&(a=new H(m.location,t.value)),a&&i.setInput(a)}e.subscriptions.push(I.commands.registerCommand("references-view.showTypeHierarchy",o),I.commands.registerCommand("references-view.showSupertypes",s=>n(D.Supertypes,s)),I.commands.registerCommand("references-view.showSubtypes",s=>n(D.Subtypes,s)),I.commands.registerCommand("references-view.removeTypeItem",_e))}function _e(i){i instanceof L&&i.remove()}var V=class{constructor(e,t=D.Subtypes){this._mem=e;this._value=t;this._ctxMode=new g("references-view.typeHierarchyMode");let o=e.get(V._key);typeof o=="string"?this.value=o:this.value=t}get value(){return this._value}set value(e){this._value=e,this._ctxMode.set(e),this._mem.update(V._key,e)}},G=V;G._key="references-view.typeHierarchyMode";function Te(i){let e=new Q;oe(e,i),ee(e,i),ce(e,i);function t(o){e.setInput(o)}return{setInput:t}}
//# sourceMappingURL=extension.js.map
