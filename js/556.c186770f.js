"use strict";(self["webpackChunkorder_vue"]=self["webpackChunkorder_vue"]||[]).push([[556],{1185:function(e,t,i){i.r(t),i.d(t,{default:function(){return N}});var r=i(6252);const l={class:"flex flex-row"},n={class:"w-1/4"},o={class:"w-3/4"},s={key:0},a={key:1,class:"flex flex-row"},c={class:"w-11/12"},d={class:"w-1/12"};function u(e,t,i,u,m,p){const h=(0,r.up)("BaseHeader"),f=(0,r.up)("BaseList"),g=(0,r.up)("BaseButton"),b=(0,r.up)("NotificationModal"),L=(0,r.up)("ProductLineForm");return(0,r.wg)(),(0,r.iD)("div",l,[(0,r._)("div",n,[(0,r.Wm)(h,{label:"Product Line List",class:"font-bold block text-sm text-start"}),(0,r.Wm)(f,{options:m.productlines,onOnclick:p.setActiveProductLine},null,8,["options","onOnclick"]),(0,r.Wm)(g,{className:"btn-green",onClick:p.setNewRecord,label:"+Add Product Line"},null,8,["onClick"])]),(0,r._)("div",o,[(0,r.Wm)(b,{show:m.visibleMsgView,msg:m.msg,onClose:t[0]||(t[0]=e=>this.visibleMsgView=!1)},null,8,["show","msg"]),m.newRecord?((0,r.wg)(),(0,r.iD)("div",s,[(0,r.Wm)(h,{label:"New Product Line"}),(0,r.Wm)(L,{onOnsubmit:p.addProductLineData},null,8,["onOnsubmit"])])):m.currentProductLine?((0,r.wg)(),(0,r.iD)("div",a,[(0,r._)("div",c,[(0,r.Wm)(h,{label:"Update Product Line"}),(0,r.Wm)(L,{disabled:!0,pline:m.currentProductLine,onOnsubmit:p.updateProductLineData},null,8,["pline","onOnsubmit"])]),(0,r._)("div",d,[(0,r._)("i",{class:"fa-solid fa-trash-can text-xs text-blue-500 hover:text-blue-700 sm:text-3xl md:text-6xl",onClick:t[1]||(t[1]=(...e)=>p.deleteProductLine&&p.deleteProductLine(...e))})])])):(0,r.kq)("",!0)])])}i(7658);var m=i(4090),p=i(1619),h=i(9963),f=i(3577);const g={key:0},b=(0,r._)("b",null,"Please correct the following error(s):",-1),L=["src"];function w(e,t,i,l,n,o){const s=(0,r.up)("BaseInput"),a=(0,r.up)("BaseTextArea"),c=(0,r.up)("BaseButton");return(0,r.wg)(),(0,r.iD)("form",{onSubmit:t[4]||(t[4]=(0,h.iM)((()=>{}),["prevent"]))},[n.errors.length?((0,r.wg)(),(0,r.iD)("p",g,[b,(0,r._)("ul",null,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(n.errors,(e=>((0,r.wg)(),(0,r.iD)("li",{key:e},(0,f.zw)(e),1)))),128))])])):(0,r.kq)("",!0),(0,r.Wm)(s,{id:"productLine",label:"Product Line",disabled:i.disabled,modelValue:n.form.productLine,"onUpdate:modelValue":t[0]||(t[0]=e=>n.form.productLine=e)},null,8,["disabled","modelValue"]),(0,r.Wm)(a,{id:"textDescription",label:"Text Description",modelValue:n.form.textDescription,"onUpdate:modelValue":t[1]||(t[1]=e=>n.form.textDescription=e)},null,8,["modelValue"]),(0,r.Wm)(a,{id:"htmlDescription",label:"HTML Description",modelValue:n.form.htmlDescription,"onUpdate:modelValue":t[2]||(t[2]=e=>n.form.htmlDescription=e)},null,8,["modelValue"]),(0,r.Wm)(s,{id:"image",label:"Image URL",modelValue:n.form.imageUrl,"onUpdate:modelValue":t[3]||(t[3]=e=>n.form.imageUrl=e)},null,8,["modelValue"]),(0,r._)("img",{class:"object-cover h-48 w-96",src:n.form.imageUrl,alt:"Product Line img"},null,8,L),(0,r.Wm)(c,{onClick:o.onsubmit,label:"Submit"},null,8,["onClick"])],32)}var v=i(9488),D=i(4661),P=i(974),x={emits:["onsubmit"],components:{BaseInput:D.Z,BaseButton:p.Z,BaseTextArea:P.Z},props:["pline","disabled"],data(){return{form:{productLine:null,textDescription:"",htmlDescription:"",imageUrl:""},errors:[]}},created(){this.$watch((()=>this.pline),(()=>{this.pline&&this.getProductLine()}),{immediate:!0})},methods:{onsubmit(e){this.errors=[],this.form.productLine||this.errors.push("Product Line required."),this.errors.length||(e.preventDefault(),this.$emit("onsubmit",this.form))},getProductLine(){(0,v.d)(v.b.PRODUCTLINE).fetchById(this.pline).then((e=>{this.form.productLine=e.data.productLine,this.form.textDescription=e.data.textDescription,this.form.htmlDescription=e.data.htmlDescription,this.form.imageUrl=e.data.imageUrl})).catch((e=>console.log(e)))}}},k=i(3744);const y=(0,k.Z)(x,[["render",w]]);var V=y,B=i(3305),C=i(2484),U={components:{BaseHeader:m.Z,BaseButton:p.Z,BaseList:B.Z,NotificationModal:C.Z,ProductLineForm:V},data(){return{productlines:[],currentProductLine:null,newRecord:!1,visibleMsgView:!1,msg:"Please click on a Product Line to view, update or delete"}},mounted(){this.retrieveProductLines()},methods:{setActiveProductLine(e){this.currentProductLine=e.key,this.msg="",this.visibleMsgView=!1,this.newRecord=!1},setNewRecord(){this.newRecord=!0,this.msg="",this.visibleMsgView=!1,this.currentProductLine=null},retrieveProductLines(){this.productlines=[],(0,v.d)(v.b.PRODUCTLINE).fetchAll().then((e=>{for(let i in e.data){var t={key:e.data[i].productLine,text:e.data[i].productLine};this.productlines.push(t)}})).catch((e=>console.log(e)))},deleteProductLine(){(0,v.d)(v.b.PRODUCTLINE).delete(this.currentProductLine).then((e=>{console.log(e.data),this.msg="Record deleted successfully!",this.visibleMsgView=!0,this.currentProductLine=null,this.retrieveProductLines()})).catch((e=>console.log(e)))},updateProductLineData(e){var t={productLine:e.productLine,textDescription:e.textDescription,htmlDescription:e.htmlDescription,imageUrl:e.imageUrl};(0,v.d)(v.b.PRODUCTLINE).update(e.productLine,t).then((e=>{console.log(e.data),this.msg="Record updated successfully!",this.visibleMsgView=!0})).catch((e=>console.log(e)))},addProductLineData(e){var t={productLine:e.productLine,textDescription:e.textDescription,htmlDescription:e.htmlDescription,imageUrl:e.imageUrl};(0,v.d)(v.b.PRODUCTLINE).create(t).then((e=>{console.log(e.data),this.retrieveProductLines(),this.msg="Record added successfully!",this.visibleMsgView=!0,this.newRecord=!1})).catch((e=>console.log(e)))}}};const I=(0,k.Z)(U,[["render",u]]);var N=I},4090:function(e,t,i){i.d(t,{Z:function(){return c}});var r=i(6252),l=i(3577);function n(e,t,i,n,o,s){return(0,r.wg)(),(0,r.iD)("h4",null,(0,l.zw)(i.label),1)}var o={name:"BaseHeader",props:{label:{type:String,default:""},className:{type:String,default:"field-label"}}},s=i(3744);const a=(0,s.Z)(o,[["render",n]]);var c=a},3305:function(e,t,i){i.d(t,{Z:function(){return d}});var r=i(6252),l=i(3577);const n=["onClick"];function o(e,t,i,o,s,a){return(0,r.wg)(),(0,r.iD)("ul",null,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(i.options||[],((e,t)=>((0,r.wg)(),(0,r.iD)("li",{class:(0,l.C_)({active:t==this.currentIndex}),key:t,onClick:i=>a.onclick(e,t)},[(0,r._)("p",{class:(0,l.C_)(i.className)},(0,l.zw)(e.text),3)],10,n)))),128))])}var s={name:"BaseList",emits:["onclick"],props:{options:{type:Array,required:!0},className:{type:String,default:"field text-left"},resetIndex:{type:Boolean,default:!0}},data(){return{currentIndex:-1}},methods:{onclick(e,t){this.currentIndex=t,this.$emit("onclick",e)}},created(){this.$watch((()=>this.resetIndex),(()=>{this.currentIndex=-1}),{immediate:!0})}},a=i(3744);const c=(0,a.Z)(s,[["render",o]]);var d=c},974:function(e,t,i){i.d(t,{Z:function(){return u}});var r=i(6252),l=i(3577);const n=["for"],o=["id","value","rows"];function s(e,t,i,s,a,c){return(0,r.wg)(),(0,r.iD)(r.HY,null,[i.label?((0,r.wg)(),(0,r.iD)("label",{key:0,for:i.id,class:(0,l.C_)(i.labelClass)},(0,l.zw)(i.label),11,n)):(0,r.kq)("",!0),(0,r._)("textarea",{id:i.id,value:i.modelValue,onInput:t[0]||(t[0]=(...e)=>c.updateInput&&c.updateInput(...e)),class:(0,l.C_)(i.className),rows:i.row},null,42,o)],64)}var a={name:"BaseTextArea",props:{id:{type:String,default:""},label:{type:String,default:""},labelClass:{type:String,default:"field-label"},modelValue:{type:[String,Number],default:""},className:{type:String,default:"field-input"},row:{type:Number,default:4}},methods:{updateInput(e){this.$emit("update:modelValue",e.target.value)}}},c=i(3744);const d=(0,c.Z)(a,[["render",s]]);var u=d}}]);
//# sourceMappingURL=556.c186770f.js.map