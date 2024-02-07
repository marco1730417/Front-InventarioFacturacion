import{_ as ae,u as te,r as m,q as le,s as h,v as S,b as u,c as k,d as L,e as l,f as a,g as t,i as c,t as s,n as p,j as C,p as ne,m as oe}from"./index.eced38de.js";import{P as se}from"./ProductService.1a433e0b.js";const N="/sakai-vue/demo/images/flag/flag_placeholder.png",T="/sakai-vue/";class ie{getCustomersSmall(){return fetch(T+"demo/data/customers-small.json").then(i=>i.json()).then(i=>i.data)}getCustomersMedium(){return fetch(T+"demo/data/customers-medium.json").then(i=>i.json()).then(i=>i.data)}getCustomersLarge(){return fetch(T+"demo/data/customers-large.json").then(i=>i.json()).then(i=>i.data)}getCustomersXLarge(){return fetch(T+"demo/data/customers-xlarge.json").then(i=>i.json()).then(i=>i.data)}getCustomers(i){const f=Object.keys(i).map(y=>encodeURIComponent(y)+"="+encodeURIComponent(i[y])).join("&");return fetch("https://www.primefaces.org//demo/data/customers?"+f).then(y=>y.json())}}const g=_=>(ne("data-v-5c2f8e4b"),_=_(),oe(),_),de={class:"grid"},re={class:"col-12"},ue={class:"card"},ce=g(()=>l("h5",null,"Filter Menu",-1)),me={class:"flex justify-content-between flex-column sm:flex-row"},pe={class:"p-input-icon-left mb-2"},he=g(()=>l("i",{class:"pi pi-search"},null,-1)),ve=["alt"],ye={style:{"margin-left":"0.5em","vertical-align":"middle"},class:"image-text"},ge=["alt","src"],_e={style:{"margin-left":"0.5em","vertical-align":"middle"},class:"image-text"},fe=g(()=>l("div",{class:"mb-3 text-bold"},"Agent Picker",-1)),be={class:"p-multiselect-representative-option"},we=["alt","src"],xe={style:{"margin-left":"0.5em","vertical-align":"middle"},class:"image-text"},Se={key:1},Ce={class:"flex align-items-center justify-content-between px-2"},Ve={class:"col-12"},Ue={class:"card"},Te=g(()=>l("h5",null,"Frozen Columns",-1)),Ae={style:{"margin-left":"0.5em","vertical-align":"middle"},class:"image-text"},Ie=["alt","src"],Fe={style:{"margin-left":"0.5em","vertical-align":"middle"},class:"image-text"},De={class:"text-bold"},ke={class:"col-12"},Le={class:"card"},Ne=g(()=>l("h5",null,"Row Expand",-1)),Be=["src","alt"],Re={class:"p-3"},je={class:"col-12"},Me={class:"card"},Ee=g(()=>l("h5",null,"Subheader Grouping",-1)),ze={class:"image-text ml-2"},Oe=["alt","src"],He={class:"image-text font-bold ml-2"},qe={style:{"text-align":"right"},class:"text-bold pr-6"},We={__name:"Table",setup(_){const{contextPath:i}=te(),f=m(null),y=m(null),V=m(null),b=m(null),B=m(null),R=m(null),A=m(!1),I=m(null),U=m([]),M=m(["unqualified","qualified","new","negotiation","renewal","proposal"]),E=m([{name:"Amy Elsner",image:"amyelsner.png"},{name:"Anna Fali",image:"annafali.png"},{name:"Asiya Javayant",image:"asiyajavayant.png"},{name:"Bernardo Dominic",image:"bernardodominic.png"},{name:"Elwin Sharvill",image:"elwinsharvill.png"},{name:"Ioni Bowcher",image:"ionibowcher.png"},{name:"Ivan Magalhaes",image:"ivanmagalhaes.png"},{name:"Onyama Limba",image:"onyamalimba.png"},{name:"Stephen Shaw",image:"stephenshaw.png"},{name:"XuXue Feng",image:"xuxuefeng.png"}]),F=new ie,z=new se;le(()=>{z.getProductsWithOrdersSmall().then(d=>I.value=d),F.getCustomersLarge().then(d=>{f.value=d,B.value=!1,f.value.forEach(r=>r.date=new Date(r.date))}),F.getCustomersLarge().then(d=>y.value=d),F.getCustomersMedium().then(d=>V.value=d),R.value=!1,j()});const j=()=>{b.value={global:{value:null,matchMode:h.CONTAINS},name:{operator:S.AND,constraints:[{value:null,matchMode:h.STARTS_WITH}]},"country.name":{operator:S.AND,constraints:[{value:null,matchMode:h.STARTS_WITH}]},representative:{value:null,matchMode:h.IN},date:{operator:S.AND,constraints:[{value:null,matchMode:h.DATE_IS}]},balance:{operator:S.AND,constraints:[{value:null,matchMode:h.EQUALS}]},status:{operator:S.OR,constraints:[{value:null,matchMode:h.EQUALS}]},activity:{value:[0,50],matchMode:h.BETWEEN},verified:{value:null,matchMode:h.EQUALS}}},O=()=>{j()},H=()=>{U.value=I.value.filter(d=>d.id)},q=()=>{U.value=null},w=d=>d.toLocaleString("en-US",{style:"currency",currency:"USD"}),W=d=>d.toLocaleDateString("en-US",{day:"2-digit",month:"2-digit",year:"numeric"}),K=d=>{let r=0;if(V.value)for(let v of V.value)v.representative.name===d&&r++;return r};return(d,r)=>{const v=u("Button"),D=u("InputText"),o=u("Column"),Q=u("MultiSelect"),X=u("Calendar"),$=u("InputNumber"),G=u("Dropdown"),J=u("ProgressBar"),Y=u("Slider"),Z=u("TriStateCheckbox"),x=u("DataTable"),P=u("ToggleButton"),ee=u("Rating");return k(),L("div",de,[l("div",re,[l("div",ue,[ce,a(x,{value:f.value,paginator:!0,class:"p-datatable-gridlines",rows:10,dataKey:"id",rowHover:!0,filters:b.value,"onUpdate:filters":r[2]||(r[2]=e=>b.value=e),filterDisplay:"menu",loading:B.value,responsiveLayout:"scroll",globalFilterFields:["name","country.name","representative.name","balance","status"]},{header:t(()=>[l("div",me,[a(v,{type:"button",icon:"pi pi-filter-slash",label:"Clear",class:"p-button-outlined mb-2",onClick:r[0]||(r[0]=e=>O())}),l("span",pe,[he,a(D,{modelValue:b.value.global.value,"onUpdate:modelValue":r[1]||(r[1]=e=>b.value.global.value=e),placeholder:"Keyword Search",style:{width:"100%"}},null,8,["modelValue"])])])]),empty:t(()=>[c(" No customers found. ")]),loading:t(()=>[c(" Loading customers data. Please wait. ")]),default:t(()=>[a(o,{field:"name",header:"Name",style:{"min-width":"12rem"}},{body:t(({data:e})=>[c(s(e.name),1)]),filter:t(({filterModel:e})=>[a(D,{type:"text",modelValue:e.value,"onUpdate:modelValue":n=>e.value=n,class:"p-column-filter",placeholder:"Search by name"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),a(o,{header:"Country",filterField:"country.name",style:{"min-width":"12rem"}},{body:t(({data:e})=>[l("img",{src:N,alt:e.country.name,class:p("flag flag-"+e.country.code),width:"30"},null,10,ve),l("span",ye,s(e.country.name),1)]),filter:t(({filterModel:e})=>[a(D,{type:"text",modelValue:e.value,"onUpdate:modelValue":n=>e.value=n,class:"p-column-filter",placeholder:"Search by country"},null,8,["modelValue","onUpdate:modelValue"])]),filterclear:t(({filterCallback:e})=>[a(v,{type:"button",icon:"pi pi-times",onClick:n=>e(),class:"p-button-secondary"},null,8,["onClick"])]),filterapply:t(({filterCallback:e})=>[a(v,{type:"button",icon:"pi pi-check",onClick:n=>e(),class:"p-button-success"},null,8,["onClick"])]),_:1}),a(o,{header:"Agent",filterField:"representative",showFilterMatchModes:!1,filterMenuStyle:{width:"14rem"},style:{"min-width":"14rem"}},{body:t(({data:e})=>[l("img",{alt:e.representative.name,src:C(i)+"demo/images/avatar/"+e.representative.image,width:"32",style:{"vertical-align":"middle"}},null,8,ge),l("span",_e,s(e.representative.name),1)]),filter:t(({filterModel:e})=>[fe,a(Q,{modelValue:e.value,"onUpdate:modelValue":n=>e.value=n,options:E.value,optionLabel:"name",placeholder:"Any",class:"p-column-filter"},{option:t(n=>[l("div",be,[l("img",{alt:n.option.name,src:C(i)+"demo/images/avatar/"+n.option.image,width:"32",style:{"vertical-align":"middle"}},null,8,we),l("span",xe,s(n.option.name),1)])]),_:2},1032,["modelValue","onUpdate:modelValue","options"])]),_:1}),a(o,{header:"Date",filterField:"date",dataType:"date",style:{"min-width":"10rem"}},{body:t(({data:e})=>[c(s(W(e.date)),1)]),filter:t(({filterModel:e})=>[a(X,{modelValue:e.value,"onUpdate:modelValue":n=>e.value=n,dateFormat:"mm/dd/yy",placeholder:"mm/dd/yyyy"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),a(o,{header:"Balance",filterField:"balance",dataType:"numeric",style:{"min-width":"10rem"}},{body:t(({data:e})=>[c(s(w(e.balance)),1)]),filter:t(({filterModel:e})=>[a($,{modelValue:e.value,"onUpdate:modelValue":n=>e.value=n,mode:"currency",currency:"USD",locale:"en-US"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),a(o,{field:"status",header:"Status",filterMenuStyle:{width:"14rem"},style:{"min-width":"12rem"}},{body:t(({data:e})=>[l("span",{class:p("customer-badge status-"+e.status)},s(e.status),3)]),filter:t(({filterModel:e})=>[a(G,{modelValue:e.value,"onUpdate:modelValue":n=>e.value=n,options:M.value,placeholder:"Any",class:"p-column-filter",showClear:!0},{value:t(n=>[n.value?(k(),L("span",{key:0,class:p("customer-badge status-"+n.value)},s(n.value),3)):(k(),L("span",Se,s(n.placeholder),1))]),option:t(n=>[l("span",{class:p("customer-badge status-"+n.option)},s(n.option),3)]),_:2},1032,["modelValue","onUpdate:modelValue","options"])]),_:1}),a(o,{field:"activity",header:"Activity",showFilterMatchModes:!1,style:{"min-width":"12rem"}},{body:t(({data:e})=>[a(J,{value:e.activity,showValue:!1,style:{height:"0.5rem"}},null,8,["value"])]),filter:t(({filterModel:e})=>[a(Y,{modelValue:e.value,"onUpdate:modelValue":n=>e.value=n,range:!0,class:"m-3"},null,8,["modelValue","onUpdate:modelValue"]),l("div",Ce,[l("span",null,s(e.value?e.value[0]:0),1),l("span",null,s(e.value?e.value[1]:100),1)])]),_:1}),a(o,{field:"verified",header:"Verified",dataType:"boolean",bodyClass:"text-center",style:{"min-width":"8rem"}},{body:t(({data:e})=>[l("i",{class:p(["pi",{"text-green-500 pi-check-circle":e.verified,"text-pink-500 pi-times-circle":!e.verified}])},null,2)]),filter:t(({filterModel:e})=>[a(Z,{modelValue:e.value,"onUpdate:modelValue":n=>e.value=n},null,8,["modelValue","onUpdate:modelValue"])]),_:1})]),_:1},8,["value","filters","loading","globalFilterFields"])])]),l("div",Ve,[l("div",Ue,[Te,a(P,{modelValue:A.value,"onUpdate:modelValue":r[3]||(r[3]=e=>A.value=e),onIcon:"pi pi-lock",offIcon:"pi pi-lock-open",onLabel:"Unfreeze Id",offLabel:"Freeze Id",style:{width:"10rem"}},null,8,["modelValue"]),a(x,{value:y.value,scrollable:!0,scrollHeight:"400px",loading:R.value,scrollDirection:"both",class:"mt-3"},{default:t(()=>[a(o,{field:"name",header:"Name",style:{width:"150px"},frozen:""}),a(o,{field:"id",header:"Id",style:{width:"100px"},frozen:A.value},null,8,["frozen"]),a(o,{field:"country.name",header:"Country",style:{width:"200px"}},{body:t(({data:e})=>[l("img",{src:N,class:p("flag flag-"+e.country.code),width:"30"},null,2),l("span",Ae,s(e.country.name),1)]),_:1}),a(o,{field:"date",header:"Date",style:{width:"200px"}}),a(o,{field:"company",header:"Company",style:{width:"200px"}}),a(o,{field:"status",header:"Status",style:{width:"200px"}},{body:t(({data:e})=>[l("span",{class:p("customer-badge status-"+e.status)},s(e.status),3)]),_:1}),a(o,{field:"activity",header:"Activity",style:{width:"200px"}}),a(o,{field:"representative.name",header:"Representative",style:{width:"200px"}},{body:t(({data:e})=>[l("img",{alt:e.representative.name,src:C(i)+"demo/images/avatar/"+e.representative.image,width:"32",style:{"vertical-align":"middle"}},null,8,Ie),l("span",Fe,s(e.representative.name),1)]),_:1}),a(o,{field:"balance",header:"Balance",style:{width:"150px"},frozen:"",alignFrozen:"right"},{body:t(({data:e})=>[l("span",De,s(w(e.balance)),1)]),_:1})]),_:1},8,["value","loading"])])]),l("div",ke,[l("div",Le,[Ne,a(x,{value:I.value,expandedRows:U.value,"onUpdate:expandedRows":r[4]||(r[4]=e=>U.value=e),dataKey:"id",responsiveLayout:"scroll"},{header:t(()=>[l("div",null,[a(v,{icon:"pi pi-plus",label:"Expand All",onClick:H,class:"mr-2 mb-2"}),a(v,{icon:"pi pi-minus",label:"Collapse All",onClick:q,class:"mb-2"})])]),expansion:t(e=>[l("div",Re,[l("h5",null,"Orders for "+s(e.data.name),1),a(x,{value:e.data.orders,responsiveLayout:"scroll"},{default:t(()=>[a(o,{field:"id",header:"Id",sortable:!0},{body:t(n=>[c(s(n.data.id),1)]),_:2},1024),a(o,{field:"customer",header:"Customer",sortable:!0},{body:t(n=>[c(s(n.data.customer),1)]),_:2},1024),a(o,{field:"date",header:"Date",sortable:!0},{body:t(n=>[c(s(n.data.date),1)]),_:2},1024),a(o,{field:"amount",header:"Amount",sortable:!0},{body:t(n=>[c(s(w(n.data.amount)),1)]),_:2},1024),a(o,{field:"status",header:"Status",sortable:!0},{body:t(n=>[l("span",{class:p("order-badge order-"+(n.data.status?n.data.status.toLowerCase():""))},s(n.data.status),3)]),_:2},1024),a(o,{headerStyle:"width:4rem"},{body:t(()=>[a(v,{icon:"pi pi-search"})]),_:1})]),_:2},1032,["value"])])]),default:t(()=>[a(o,{expander:!0,headerStyle:"width: 3rem"}),a(o,{field:"name",header:"Name",sortable:!0},{body:t(e=>[c(s(e.data.name),1)]),_:1}),a(o,{header:"Image"},{body:t(e=>[l("img",{src:C(i)+"demo/images/product/"+e.data.image,alt:e.data.image,class:"shadow-2",width:"100"},null,8,Be)]),_:1}),a(o,{field:"price",header:"Price",sortable:!0},{body:t(e=>[c(s(w(e.data.price)),1)]),_:1}),a(o,{field:"category",header:"Category",sortable:!0},{body:t(e=>[c(s(w(e.data.category)),1)]),_:1}),a(o,{field:"rating",header:"Reviews",sortable:!0},{body:t(e=>[a(ee,{modelValue:e.data.rating,readonly:!0,cancel:!1},null,8,["modelValue"])]),_:1}),a(o,{field:"inventoryStatus",header:"Status",sortable:!0},{body:t(e=>[l("span",{class:p("product-badge status-"+(e.data.inventoryStatus?e.data.inventoryStatus.toLowerCase():""))},s(e.data.inventoryStatus),3)]),_:1})]),_:1},8,["value","expandedRows"])])]),l("div",je,[l("div",Me,[Ee,a(x,{value:V.value,rowGroupMode:"subheader",groupRowsBy:"representative.name",sortMode:"single",sortField:"representative.name",sortOrder:1,scrollable:"",scrollHeight:"400px"},{groupheader:t(e=>[l("img",{alt:e.data.representative.name,src:C(i)+"demo/images/avatar/"+e.data.representative.image,width:"32",style:{"vertical-align":"middle"}},null,8,Oe),l("span",He,s(e.data.representative.name),1)]),groupfooter:t(e=>[l("td",qe,"Total Customers: "+s(K(e.data.representative.name)),1)]),default:t(()=>[a(o,{field:"representative.name",header:"Representative"}),a(o,{field:"name",header:"Name",style:{"min-width":"200px"}}),a(o,{field:"country",header:"Country",style:{"min-width":"200px"}},{body:t(e=>[l("img",{src:N,class:p("flag flag-"+e.data.country.code),width:"30"},null,2),l("span",ze,s(e.data.country.name),1)]),_:1}),a(o,{field:"company",header:"Company",style:{"min-width":"200px"}}),a(o,{field:"status",header:"Status",style:{"min-width":"200px"}},{body:t(e=>[l("span",{class:p("customer-badge status-"+e.data.status)},s(e.data.status),3)]),_:1}),a(o,{field:"date",header:"Date",style:{"min-width":"200px"}})]),_:1},8,["value"])])])])}}},Xe=ae(We,[["__scopeId","data-v-5c2f8e4b"]]);export{Xe as default};
