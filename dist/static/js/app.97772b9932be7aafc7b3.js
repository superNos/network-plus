webpackJsonp([1],{"+BTi":function(t,e){},AqDM:function(t,e){},Dte2:function(t,e){},GXEp:function(t,e){},Iun5:function(t,e){},JA48:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("d7TW"),a("+BTi");var n=a("ajQY"),r=a.n(n),s=(a("Iun5"),a("ttjG")),i=a.n(s),l=(a("X+ky"),a("HJMx")),o=a.n(l),c=(a("JA48"),a("OE6e")),u=a.n(c),d=(a("Dte2"),a("q4le")),p=a.n(d),f=(a("isE6"),a("LR6y")),h=a.n(f),v=(a("GXEp"),a("mtrD")),b=a.n(v),m=a("7+uW"),w={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var k=a("VU/8")({name:"App"},w,!1,function(t){a("s+FX")},null,null).exports,g=a("/ocq"),S=a("mvHQ"),M=a.n(S),y=a("Gu7T"),_=a.n(y),U={name:"index",channel:void 0,data:function(){return{tableData:[],interceptMap:{},drawerIsShow:!1,mockString:"",disabled:!0,currentUrl:"",filterUrl:""}},mounted:function(){this.setListener()},computed:{getTableList:function(){var t=this;return this.tableData.filter(function(e){return!t.filterUrl||~e.url.indexOf(t.filterUrl)})}},methods:{setListener:function(){var t=this;t.channel=chrome.runtime.connect({name:chrome.devtools.inspectedWindow.tabId.toString()}),t.channel.onMessage.addListener(function(e){var a=e.type,n=e.data;switch(a){case"clear":t.tableData=[];break;case"push":var r=n.url,s=n.method,i=void 0===s?"GET":s,l=n.status,o=void 0===l?"pending":l,c=n.requestId,u=n.isUseMock,d=void 0!==u&&u;if(t.tableData.find(function(t){return t.requestId===c}))return;t.tableData.push({url:r,method:i.toUpperCase(),status:o,requestId:c,isUseMock:d});break;case"update":var p=n.response,f=[].concat(_()(t.tableData));f.forEach(function(t){t.requestId===n.requestId&&(t.response="string"==typeof p&&200==n.status?JSON.parse(p):p,t.status=n.status,t.isUseMock=n.isUseMock)}),t.tableData=f}})},editMock:function(t){this.mockString=M()(t.response,null,2),this.currentUrl=t.url,this.drawerIsShow=!0,this.disabled=!1},handleClose:function(){this.drawerIsShow=!1},openDrawer:function(t){this.disabled=!0,this.mockString=M()(t.response,null,2),this.drawerIsShow=!0},saveMock:function(){var t={url:this.currentUrl.split("?")[0],data:M()(JSON.parse(this.mockString))};this.channel.postMessage({type:"saveMock",data:t}),this.drawerIsShow=!1},cancelMock:function(t){this.channel.postMessage({type:"cancelMock",data:{url:t.url.split("?")[0]}});var e=this.tableData;e.forEach(function(e){e.requestId===t.requestId&&(e.isUseMock=!1)}),this.tableData=e,this.drawerIsShow=!1},clear:function(){this.tableData=[]}}},x={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"index-page"},[a("div",{staticStyle:{margin:"5px 0",display:"flex"}},[a("el-input",{attrs:{placeholder:"根据url筛选",clearable:""},model:{value:t.filterUrl,callback:function(e){t.filterUrl=e},expression:"filterUrl"}}),t._v(" "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"danger"},on:{click:function(e){return t.clear()}}},[t._v("清空列表")])],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.getTableList,border:""},on:{"row-click":t.openDrawer}},[a("el-table-column",{attrs:{prop:"url",label:"地址"}}),t._v(" "),a("el-table-column",{attrs:{prop:"method",label:"类型",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",disabled:"pending"===e.row.status,size:"small"},on:{click:function(a){return a.stopPropagation(),t.editMock(e.row)}}},[t._v("编辑mock\n          ")]),t._v(" "),e.row.isUseMock?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return a.stopPropagation(),t.cancelMock(e.row)}}},[t._v("取消mock\n          ")]):t._e()]}}])})],1),t._v(" "),a("el-drawer",{attrs:{title:t.currentUrl,size:"70%",visible:t.drawerIsShow,"before-close":t.handleClose},on:{"update:visible":function(e){t.drawerIsShow=e}}},[a("el-input",{staticStyle:{width:"90%",height:"90%","margin-left":"5%"},attrs:{disabled:t.disabled,type:"textarea",placeholder:"请输入返回数据",resize:"none"},model:{value:t.mockString,callback:function(e){t.mockString=e},expression:"mockString"}}),t._v(" "),a("el-row",{staticStyle:{"margin-top":"10px","text-align":"right","padding-right":"5%"}},[a("el-button",{directives:[{name:"show",rawName:"v-show",value:!t.disabled,expression:"!disabled"}],attrs:{type:"primary"},on:{click:t.saveMock}},[t._v("保存mock数据")])],1)],1)],1)},staticRenderFns:[]};var I=a("VU/8")(U,x,!1,function(t){a("AqDM")},"data-v-051b0c68",null).exports;m.default.use(g.a);var D=new g.a({routes:[{path:"/",name:"main",component:I}]});m.default.use(b.a),m.default.use(h.a),m.default.use(p.a),m.default.use(u.a),m.default.use(o.a),m.default.use(i.a),m.default.use(r.a),m.default.config.productionTip=!1,new m.default({el:"#app",router:D,components:{App:k},template:"<App/>"})},"X+ky":function(t,e){},d7TW:function(t,e){},isE6:function(t,e){},"s+FX":function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.97772b9932be7aafc7b3.js.map