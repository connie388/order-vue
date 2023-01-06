"use strict";(self["webpackChunkorder_vue"]=self["webpackChunkorder_vue"]||[]).push([[307],{3348:function(e,t,s){s.r(t),s.d(t,{default:function(){return K}});var l=s(6252);const o={class:"flex flex-wrap -mx-3 mb-2"},r={class:"w-full md:w-1/3 px-3 mb-6 md:mb-0"},a={class:"w-full md:w-1/3 px-3 mb-6 md:mb-0"},i={class:"w-full md:w-1/3 px-3 mb-6 md:mb-0"},m={class:"overflow-auto"},n=(0,l._)("h1",{class:"text-xl font-bold text-center"},"New Customer",-1),d=(0,l._)("h1",{class:"text-xl font-bold text-center"}," Customer Information ",-1);function u(e,t,s,u,c,p){const h=(0,l.up)("BaseInput"),f=(0,l.up)("BaseButton"),b=(0,l.up)("BaseViewTable"),w=(0,l.up)("CustomerFormEdit"),y=(0,l.up)("BaseModal"),x=(0,l.up)("NotificationModal");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l._)("div",o,[(0,l._)("div",r,[(0,l.Wm)(h,{id:"customerNameLike",modelValue:c.searchCustomerName,"onUpdate:modelValue":t[0]||(t[0]=e=>c.searchCustomerName=e),placeholder:"Customer Name Like"},null,8,["modelValue"])]),(0,l._)("div",a,[(0,l.Wm)(f,{onClick:p.retrieveCustomersByName,label:"Search Customers"},null,8,["onClick"])]),(0,l._)("div",i,[(0,l.Wm)(f,{className:"btn-green",onClick:t[1]||(t[1]=e=>this.visibleCustomerAdd=!0),label:"+Add Customer"})])]),(0,l._)("div",m,[(0,l.Wm)(b,{fields:u.customerFields,dataList:c.customers,viewEnable:!1,onEditItem:p.editCustomer,onDeleteItem:p.deleteCustomer},null,8,["fields","dataList","onEditItem","onDeleteItem"])]),(0,l.Wm)(y,{showing:c.visibleCustomerAdd,onClose:t[3]||(t[3]=e=>this.visibleCustomerAdd=!1)},{header:(0,l.w5)((()=>[n])),body:(0,l.w5)((()=>[(0,l.Wm)(w,{onOnsubmit:p.addCustomerData,onOnClose:t[2]||(t[2]=e=>this.visibleCustomerAdd=!1)},null,8,["onOnsubmit"])])),_:1},8,["showing"]),(0,l.Wm)(y,{showing:c.visibleCustomerView,onClose:t[5]||(t[5]=e=>this.visibleCustomerView=!1)},{header:(0,l.w5)((()=>[d])),body:(0,l.w5)((()=>[(0,l.Wm)(w,{customer:c.selectedCustomer,onOnsubmit:p.updateCustomerData,onOnClose:t[4]||(t[4]=e=>this.visibleCustomerView=!1)},null,8,["customer","onOnsubmit"])])),_:1},8,["showing"]),(0,l.Wm)(x,{show:c.visibleMsgView,msg:c.msg,onClose:t[6]||(t[6]=e=>this.visibleMsgView=!1)},null,8,["show","msg"])],64)}var c=s(1619),p=s(4661),h=s(4535),f=s(2484),b=s(3478),w=s(9963);const y={class:"flex flex-wrap -mx-3 mb-6"},x={class:"w-full px-3"},C={class:"flex flex-wrap -mx-3 mb-6"},g={class:"w-full md:w-1/2 px-3 mb-6 md:mb-0"},v={class:"w-full md:w-1/2 px-3"},N={class:"flex flex-wrap -mx-3 mb-6"},k={class:"w-full px-3"},V={class:"flex flex-wrap -mx-3 mb-6"},L={class:"w-full px-3"},_={class:"flex flex-wrap -mx-3 mb-6"},D={class:"w-full px-3"},E={class:"flex flex-wrap -mx-3 mb-2"},S={class:"w-full md:w-1/3 px-3 mb-6 md:mb-0"},B={class:"w-full md:w-1/3 px-3 mb-6 md:mb-0"},I={class:"w-full md:w-1/3 px-3 mb-6 md:mb-0"},W={class:"flex flex-wrap -mx-3 mb-2"},q={class:"w-full md:w-1/3 px-3 mb-6 md:mb-0"},U={class:"w-full md:w-1/3 px-3 mb-6 md:mb-0"},A={class:"w-full md:w-1/3 px-3 mb-6 md:mb-0"};function F(e,t,s,o,r,a){const i=(0,l.up)("BaseErrors"),m=(0,l.up)("BaseInput"),n=(0,l.up)("BaseTextArea"),d=(0,l.up)("BaseButton");return(0,l.wg)(),(0,l.iD)("form",{onSubmit:t[13]||(t[13]=(0,w.iM)((()=>{}),["prevent"])),class:"w-full max-w-lg"},[(0,l.Wm)(i,{errors:r.errors},null,8,["errors"]),(0,l._)("div",y,[(0,l.Wm)(m,{type:"hidden",id:"customerNumber",modelValue:r.form.customerNumber,"onUpdate:modelValue":t[0]||(t[0]=e=>r.form.customerNumber=e)},null,8,["modelValue"]),(0,l._)("div",x,[(0,l.Wm)(m,{id:"customerName",label:"Customer Name",modelValue:r.form.customerName,"onUpdate:modelValue":t[1]||(t[1]=e=>r.form.customerName=e)},null,8,["modelValue"])])]),(0,l._)("div",C,[(0,l._)("div",g,[(0,l.Wm)(m,{id:"contactLastName",label:"Contact Last Name",modelValue:r.form.contactLastName,"onUpdate:modelValue":t[2]||(t[2]=e=>r.form.contactLastName=e)},null,8,["modelValue"])]),(0,l._)("div",v,[(0,l.Wm)(m,{id:"contactFirstName",label:"Contact First Name",modelValue:r.form.contactFirstName,"onUpdate:modelValue":t[3]||(t[3]=e=>r.form.contactFirstName=e)},null,8,["modelValue"])])]),(0,l._)("div",N,[(0,l._)("div",k,[(0,l.Wm)(m,{id:"phone",label:"Phone",modelValue:r.form.phone,"onUpdate:modelValue":t[4]||(t[4]=e=>r.form.phone=e)},null,8,["modelValue"])])]),(0,l._)("div",V,[(0,l._)("div",L,[(0,l.Wm)(n,{id:"addressLine1",label:"Address",modelValue:r.form.addressLine1,"onUpdate:modelValue":t[5]||(t[5]=e=>r.form.addressLine1=e)},null,8,["modelValue"])])]),(0,l._)("div",_,[(0,l._)("div",D,[(0,l.Wm)(n,{id:"addressLine2",label:"Address",modelValue:r.form.addressLine2,"onUpdate:modelValue":t[6]||(t[6]=e=>r.form.addressLine2=e)},null,8,["modelValue"])])]),(0,l._)("div",E,[(0,l._)("div",S,[(0,l.Wm)(m,{id:"city",label:"City",modelValue:r.form.city,"onUpdate:modelValue":t[7]||(t[7]=e=>r.form.city=e)},null,8,["modelValue"])]),(0,l._)("div",B,[(0,l.Wm)(m,{id:"state",label:"State",modelValue:r.form.state,"onUpdate:modelValue":t[8]||(t[8]=e=>r.form.state=e)},null,8,["modelValue"])]),(0,l._)("div",I,[(0,l.Wm)(m,{id:"country",label:"Country",modelValue:r.form.country,"onUpdate:modelValue":t[9]||(t[9]=e=>r.form.country=e)},null,8,["modelValue"])])]),(0,l._)("div",W,[(0,l._)("div",q,[(0,l.Wm)(m,{id:"postalCode",label:"Postal Code",modelValue:r.form.postalCode,"onUpdate:modelValue":t[10]||(t[10]=e=>r.form.postalCode=e)},null,8,["modelValue"])]),(0,l._)("div",U,[(0,l.Wm)(m,{id:"salesRepEmployeeNumber",label:"Sales Rep.",modelValue:r.form.salesRepEmployeeNumber,"onUpdate:modelValue":t[11]||(t[11]=e=>r.form.salesRepEmployeeNumber=e)},null,8,["modelValue"])]),(0,l._)("div",A,[(0,l.Wm)(m,{id:"creditLimit",label:"Credit Limit",modelValue:r.form.creditLimit,"onUpdate:modelValue":t[12]||(t[12]=e=>r.form.creditLimit=e)},null,8,["modelValue"])])]),(0,l.Wm)(d,{onClick:a.onsubmit,label:"Submit",class:"mr-2"},null,8,["onClick"]),(0,l.Wm)(d,{onClick:a.onclose,label:"Close"},null,8,["onClick"])],32)}s(7658);var M=s(974),Z=s(5605),R={emits:["onsubmit","onClose"],components:{BaseInput:p.Z,BaseButton:c.Z,BaseTextArea:M.Z,BaseErrors:Z.Z},props:{customer:{type:Object,default:null},edit:{type:String}},data(){return{form:{customerNumber:null,customerName:"",contactLastName:"",contactFirstName:"",phone:"",addressLine1:"",addressLine2:"",city:"",state:"",country:"",postalCode:"",salesRepEmployeeNumber:null,creditLimit:null},errors:[]}},created(){this.$watch((()=>this.customer),(()=>{this.customer&&(this.form.customerNumber=this.customer.customerNumber,this.form.customerName=this.customer.customerName,this.form.contactLastName=this.customer.contactLastName,this.form.contactFirstName=this.customer.contactFirstName,this.form.phone=this.customer.phone,this.form.addressLine1=this.customer.addressLine1,this.form.addressLine2=this.customer.addressLine2,this.form.city=this.customer.city,this.form.state=this.customer.state,this.form.country=this.customer.country,this.form.postalCode=this.customer.postalCode,this.form.salesRepEmployeeNumber=this.customer.salesRepEmployeeNumber,this.form.creditLimit=this.customer.creditLimit)}),{immediate:!0})},methods:{onclose(){this.$emit("onClose")},onsubmit(e){this.errors=[],this.form.customerName||this.errors.push("Customer Name required."),this.form.contactLastName||this.errors.push("Contact Last Name required."),this.form.contactLastName||this.errors.push("Contact Last Name required."),this.form.phone||this.errors.push("Phone required."),this.form.addressLine1||this.errors.push("Address required."),this.form.city||this.errors.push("City required."),this.form.country||this.errors.push("Country required."),this.form.postalCode?.length>15&&this.errors.push("Postal Code should be less than or equal to 15 characters"),this.errors.length||(e.preventDefault(),this.$emit("onsubmit",this.form))}}},O=s(3744);const T=(0,O.Z)(R,[["render",F]]);var $=T,H=s(9488),P={components:{BaseButton:c.Z,BaseInput:p.Z,BaseViewTable:b.Z,BaseModal:h.Z,NotificationModal:f.Z,CustomerFormEdit:$},data(){return{visibleCustomerView:!1,visibleCustomerAdd:!1,visibleMsgView:!1,selectedCustomer:null,searchCustomerName:"",customers:[],msg:"Please click on a Customer to view, update or delete"}},setup(){const e=[{column:"customerNumber",header:"Customer Number",type:"number"},{column:"customerName",header:"Customer Name",type:"text"},{column:"contactFirstName",header:"Contact First Name",type:"text"},{column:"contactLastName",header:"Contact Last Name",type:"text"},{column:"phone",header:"Phone",type:"text"},{column:"creditLimit",header:"Credit Limit",type:"number"}];return{customerFields:e}},methods:{editCustomer(e){this.selectedCustomer=e,this.visibleCustomerView=!0},retrieveCustomersByName(){this.customers=[],(0,H.d)(H.b.CUSTOMER).fetchByName(this.searchCustomerName).then((e=>{this.customers=e.data,0===e.data.length&&(this.msg="No customers found.",this.visibleMsgView=!0)})).catch((e=>{console.log(e),this.msg="Something wrong happened",this.visibleMsgView=!0}))},deleteCustomer(e){(0,H.d)(H.b.CUSTOMER).delete(e.customerNumber).then((t=>{console.log(t.data),this.msg="Customer is deleted successfully!",this.customers=this.customers.filter((function(t){return t.customerNumber!==e.customerNumber}))})).catch((e=>{console.log(e),this.msg="Something wrong happened"})),this.visibleMsgView=!0},updateCustomerData(e){var t={customerNumber:e.customerNumber,customerName:e.customerName,contactLastName:e.contactLastName,contactFirstName:e.contactFirstName,phone:e.phone,addressLine1:e.addressLine1,addressLine2:e.addressLine2,city:e.city,state:e.state,country:e.country,postalCode:e.postalCode,salesRepEmployeeNumber:e.salesRepEmployeeNumber,creditLimit:e.creditLimit};(0,H.d)(H.b.CUSTOMER).update(e.customerNumber,t).then((e=>{console.log(e.data),this.msg="Customer is updated successfully!",this.retrieveCustomersByName()})).catch((e=>{console.log(e),this.msg="Something wrong happened"})),this.visibleMsgView=!0},addCustomerData(e){var t={customerNumber:e.customerNumber,customerName:e.customerName,contactLastName:e.contactLastName,contactFirstName:e.contactFirstName,phone:e.phone,addressLine1:e.addressLine1,addressLine2:e.addressLine2,city:e.city,state:e.state,country:e.country,postalCode:e.postalCode,salesRepEmployeeNumber:e.salesRepEmployeeNumber,creditLimit:e.creditLimit};(0,H.d)(H.b.CUSTOMER).create(t).then((e=>{console.log(e.data.customerNumber),this.msg="Customer is added successfully!",this.retrieveCustomersByName()})).catch((e=>{console.log(e),this.msg="Something wrong happened"})),this.visibleMsgView=!0}}};const Y=(0,O.Z)(P,[["render",u]]);var K=Y},5605:function(e,t,s){s.d(t,{Z:function(){return c}});var l=s(6252),o=s(3577);const r={key:0},a=(0,l._)("b",null,"Please correct the following error(s):",-1),i={class:"text-red-500"};function m(e,t,s,m,n,d){return s.errors.length?((0,l.wg)(),(0,l.iD)("p",r,[a,(0,l._)("ul",i,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(s.errors,(e=>((0,l.wg)(),(0,l.iD)("li",{key:e},(0,o.zw)(e),1)))),128))])])):(0,l.kq)("",!0)}var n={name:"BaseErrors",props:{errors:{type:Array,default:null}}},d=s(3744);const u=(0,d.Z)(n,[["render",m]]);var c=u},974:function(e,t,s){s.d(t,{Z:function(){return u}});var l=s(6252),o=s(3577);const r=["for"],a=["id","value","rows"];function i(e,t,s,i,m,n){return(0,l.wg)(),(0,l.iD)(l.HY,null,[s.label?((0,l.wg)(),(0,l.iD)("label",{key:0,for:s.id,class:(0,o.C_)(s.labelClass)},(0,o.zw)(s.label),11,r)):(0,l.kq)("",!0),(0,l._)("textarea",{id:s.id,value:s.modelValue,onInput:t[0]||(t[0]=(...e)=>n.updateInput&&n.updateInput(...e)),class:(0,o.C_)(s.className),rows:s.row},null,42,a)],64)}var m={name:"BaseTextArea",props:{id:{type:String,default:""},label:{type:String,default:""},labelClass:{type:String,default:"field-label"},modelValue:{type:[String,Number],default:""},className:{type:String,default:"field-input"},row:{type:Number,default:4}},methods:{updateInput(e){this.$emit("update:modelValue",e.target.value)}}},n=s(3744);const d=(0,n.Z)(m,[["render",i]]);var u=d},3478:function(e,t,s){s.d(t,{Z:function(){return $}});var l=s(6252),o=s(9963),r=s(3577);const a={key:0},i={key:0},m={key:1},n={key:0},d=(0,l.uE)('<div class="flex items-center space-x-2"><div class="relative"><span class="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 rounded-md sm:py-2"><div><i class="fa-solid fa-filter fa-lg"></i></div><div class="hidden sm:block">Filters:</div></span></div></div>',1),u={class:"flex flex-wrap justify-between py-3 pl-2"},c=["onUpdate:modelValue","placeholder"],p=(0,l._)("div",{class:"absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"},[(0,l._)("i",{class:"fa-solid fa-magnifying-glass fa-2xs text-gray-500"})],-1),h={id:"tableComponent",class:"min-w-full divide-y divide-gray-200"},f={class:"bg-gray-50"},b={key:0},w=(0,l._)("th",{scope:"col",class:"py-3 pl-4"},[(0,l._)("div",{class:"flex items-center h-5"},[(0,l._)("input",{id:"checkbox-all",type:"checkbox",class:"text-blue-600 border-gray-200 rounded focus:ring-blue-500"}),(0,l._)("label",{for:"checkbox",class:"sr-only"}," Checkbox ")])],-1),y=[w],x=["onClick"],C={key:0,class:"fa-solid fa-arrow-down"},g={key:1,class:"fa-solid fa-arrow-up"},v={key:1,scope:"col",class:"px-6 py-3 text-sm font-bold text-right text-gray-500"},N={key:2,scope:"col",class:"px-6 py-3 text-sm font-bold text-right text-gray-500"},k={key:3,scope:"col",class:"px-6 py-3 text-sm font-bold text-right text-gray-500"},V={class:"divide-y divide-gray-200"},L={key:0},_=(0,l._)("td",{class:"border py-3 pl-4"},[(0,l._)("div",{class:"flex items-center h-5"},[(0,l._)("input",{type:"checkbox",class:"text-blue-600 border-gray-200 rounded focus:ring-blue-500"}),(0,l._)("label",{for:"checkbox",class:"sr-only"}," Checkbox ")])],-1),D=[_],E=["onClick"],S=["onClick"],B=(0,l._)("a",{class:"text-blue-500 hover:text-blue-700",href:"#"},[(0,l._)("i",{class:"fa-solid fa-eye"})],-1),I=[B],W=["onClick"],q=(0,l._)("a",{class:"text-green-500 hover:text-green-700",href:"#"},[(0,l._)("i",{class:"fa-solid fa-pen-to-square"})],-1),U=[q],A=["onClick"],F=(0,l._)("a",{class:"text-red-500 hover:text-red-700",href:"#"},[(0,l._)("i",{class:"fa-solid fa-trash-can"})],-1),M=[F];function Z(e,t,s,w,_,B){return(0,l.wg)(),(0,l.iD)("div",null,[0===s.dataList?.length?((0,l.wg)(),(0,l.iD)("div",a,[s.showmsg?((0,l.wg)(),(0,l.iD)("div",i,"No data available")):(0,l.kq)("",!0)])):((0,l.wg)(),(0,l.iD)("div",m,[s.filterEnable?((0,l.wg)(),(0,l.iD)("div",n,[d,(0,l._)("div",u,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(s.fields,(e=>((0,l.wg)(),(0,l.iD)("div",{class:"relative min-w-xs",key:e.column},[(0,l.wy)((0,l._)("input",{"onUpdate:modelValue":t=>_.searchString[e.column]=t,placeholder:e.header,class:"px-6 py-4 text-xs font-medium text-right whitespace-nowrap"},null,8,c),[[o.nr,_.searchString[e.column]]]),p])))),128))])])):(0,l.kq)("",!0),(0,l._)("table",h,[(0,l._)("thead",f,[(0,l._)("tr",null,[s.checkboxEnable?((0,l.wg)(),(0,l.iD)("div",b,y)):(0,l.kq)("",!0),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(s.fields,(e=>((0,l.wg)(),(0,l.iD)("th",{scope:"col",class:(0,r.C_)([["number"==e.type?"text-right":"text-left"],"px-6 py-3 text-xs font-bold uppercase"]),key:e.column,onClick:t=>B.setSortColumn(e.column)},[(0,l.Uk)((0,r.zw)(e.header)+" ",1),e.column==_.sortColumn&&"DESC"==_.order?((0,l.wg)(),(0,l.iD)("i",C)):(0,l.kq)("",!0),e.column==_.sortColumn&&"ASC"==_.order?((0,l.wg)(),(0,l.iD)("i",g)):(0,l.kq)("",!0)],10,x)))),128)),s.viewEnable?((0,l.wg)(),(0,l.iD)("th",v," View ")):(0,l.kq)("",!0),s.editEnable?((0,l.wg)(),(0,l.iD)("th",N," Edit ")):(0,l.kq)("",!0),s.deleteEnable?((0,l.wg)(),(0,l.iD)("th",k," Delete ")):(0,l.kq)("",!0)])]),(0,l._)("tbody",V,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(B.filteredList,((e,t)=>((0,l.wg)(),(0,l.iD)("tr",{key:t},[s.checkboxEnable?((0,l.wg)(),(0,l.iD)("div",L,D)):(0,l.kq)("",!0),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(s.fields,(s=>((0,l.wg)(),(0,l.iD)("td",{class:(0,r.C_)(["px-6 py-4 text-xs font-medium text-gray-800 whitespace-nowrap",["number"==s.type?"text-right":"text-left"]]),key:s.column,onClick:s=>B.onclick(e,t)},(0,r.zw)(e[s.column]),11,E)))),128)),s.viewEnable?((0,l.wg)(),(0,l.iD)("td",{key:1,class:"px-6 py-4 text-xs font-medium text-right whitespace-nowrap",onClick:s=>B.viewItem(e,t)},I,8,S)):(0,l.kq)("",!0),s.editEnable?((0,l.wg)(),(0,l.iD)("td",{key:2,class:"px-6 py-4 text-xs font-medium text-right whitespace-nowrap",onClick:s=>B.editItem(e,t)},U,8,W)):(0,l.kq)("",!0),s.deleteEnable?((0,l.wg)(),(0,l.iD)("td",{key:3,class:"px-6 py-4 text-xs font-medium text-right whitespace-nowrap",onClick:s=>B.deleteItem(e,t)},M,8,A)):(0,l.kq)("",!0)])))),128))])])]))])}var R={name:"TableComponent",emits:["onclick","viewItem","editItem","deleteItem"],props:{viewEnable:{type:Boolean,default:!0},editEnable:{type:Boolean,default:!0},deleteEnable:{type:Boolean,default:!0},dataList:{type:Array},fields:{type:Array},showmsg:{type:Boolean,default:!1},reset:{type:Boolean,default:!0},filterEnable:{type:Boolean,default:!1},checkboxEnable:{type:Boolean,default:!1}},data(){return{sortColumn:"",order:"ASC",searchString:[],currentIndex:-1}},created(){this.$watch((()=>this.reset),(()=>{this.currentIndex=-1}),{immediate:!0})},methods:{setSortColumn(e){this.sortColumn===e?this.order="ASC"===this.order?"DESC":"ASC":(this.order="ASC",this.sortColumn=e)},onclick(e,t){this.currentIndex=t,this.$emit("onclick",e)},viewItem(e,t){this.currentIndex=t,this.$emit("viewItem",e)},editItem(e,t){this.currentIndex=t,this.$emit("editItem",e)},deleteItem(e,t){this.currentIndex=t,this.$emit("deleteItem",e)}},computed:{filteredList(){var e=this.dataList;for(let l=0;l<this.fields?.length;l++)e=this.searchString[this.fields[l]["column"]]?e.filter((e=>{let t=""+e[this.fields[l]["column"]];return t.includes(this.searchString[this.fields[l]["column"]])})):e;const t=this.sortColumn,s=this.order;return e.sort((function(e,l){var o=e[t]+"".toUpperCase(),r=l[t]+"".toUpperCase();return"DESC"===s&&o>r?-1:"DESC"===s&&o<r?1:o<r?-1:o>r?1:0})),e}}},O=s(3744);const T=(0,O.Z)(R,[["render",Z]]);var $=T}}]);
//# sourceMappingURL=307.2440830a.js.map