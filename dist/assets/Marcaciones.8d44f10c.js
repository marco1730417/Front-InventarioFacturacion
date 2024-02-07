import{_ as F,u as L,r as t,o as D,a as N,F as E,b as d,c as U,d as j,e,f as o,w as l,g as H,h as g,t as b,p as O,i as G}from"./index.ef38dd94.js";import{u as K}from"./crud.981d1c5b.js";const s=r=>(O("data-v-21c4058b"),r=r(),G(),r),q={class:"grid"},z={class:"col-12 lg:col-6"},J={class:"card p-fluid"},Q=s(()=>e("h5",null,"INGRESO",-1)),W={class:"col-12 lg:col-6"},X={class:"card p-fluid"},Y=s(()=>e("h5",null,"SALIDA",-1)),Z={class:"col-12 lg:col-12"},$={class:"card"},ee={class:"my-2"},ae={class:"card flex justify-content-center"},te=s(()=>e("h5",null,"Fecha Inicio",-1)),oe=s(()=>e("div",{class:"my-1"},[e("div",{class:""})],-1)),se={class:"my-2"},le={class:"card flex justify-content-center"},ne=s(()=>e("h5",null,"Fecha Final",-1)),ie={class:"flex flex-column md:flex-row md:justify-content-between md:align-items-center"},ce=s(()=>e("h5",{class:"m-0"},"Historial de Marcaciones",-1)),de={class:"block mt-2 md:mt-0 p-input-icon-left"},re=s(()=>e("i",{class:"pi pi-search"},null,-1)),ue=s(()=>e("span",{class:"p-column-title"},"FECHA",-1)),_e=s(()=>e("span",{class:"p-column-title"},"ENTRADA",-1)),he=s(()=>e("span",{class:"p-column-title"},"SALIDA",-1)),pe={__name:"Marcaciones",setup(r){const S=L(),{datosMarcaciones:I,guardarRegistroEntrada:x,guardarRegistroSalida:A,obtenerRegistrosMarcaciones:u}=K(),n=t("marcaciones");t(!1),t(!1);const h=t({}),p=t(null),m=t(null),R=t(null),_=t({});t(!1);const w=t(S.user.id),i=t({usuario_id:w.value});i.value.fechaInicio=p,i.value.fechaFinal=m,h.value.usuario_id=w.value,D(()=>{k()}),N(()=>{u(n.value,i.value)});const T=()=>{x(n.value,h.value),u(n.value,i.value)},C=()=>{u(n.value,i.value)},M=()=>{A(n.value,h.value),u(n.value,i.value)},k=()=>{_.value={global:{value:null,matchMode:E.CONTAINS}}};return(me,c)=>{const v=d("Button"),y=d("Calendar"),P=d("Toolbar"),V=d("InputText"),f=d("Column"),B=d("DataTable");return U(),j("div",q,[e("div",z,[e("div",J,[Q,o(v,{label:"Timbrar",icon:"pi pi-sign-in",style:{width:"auto"},onClick:T})])]),e("div",W,[e("div",X,[Y,o(v,{label:"Timbrar",icon:"pi pi-sign-out",class:"p-button-danger",style:{width:"auto"},onClick:M})])]),e("div",Z,[e("div",$,[o(P,{class:"mb-4"},{start:l(()=>[e("div",ee,[e("div",ae,[te,o(y,{showIcon:!0,showButtonBar:!0,modelValue:p.value,"onUpdate:modelValue":c[0]||(c[0]=a=>p.value=a)},null,8,["modelValue"])])]),oe,e("div",se,[e("div",le,[ne,o(y,{showIcon:!0,showButtonBar:!0,modelValue:m.value,"onUpdate:modelValue":c[1]||(c[1]=a=>m.value=a)},null,8,["modelValue"])])])]),end:l(()=>[o(v,{label:"Buscar",icon:"pi pi-search",class:"p-button-info",onClick:C})]),_:1}),o(B,{ref_key:"dt",ref:R,value:H(I),dataKey:"id",paginator:!0,rows:10,filters:_.value,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:"Mostrando {first} hasta {last} de {totalRecords} registros",responsiveLayout:"scroll"},{header:l(()=>[e("div",ie,[ce,e("span",de,[re,o(V,{modelValue:_.value.global.value,"onUpdate:modelValue":c[2]||(c[2]=a=>_.value.global.value=a),placeholder:"Search..."},null,8,["modelValue"])])])]),default:l(()=>[o(f,{field:"nombre",header:"FECHA",headerStyle:"width:25%; min-width:10rem;"},{body:l(a=>[ue,g(" "+b(a.data.fecha),1)]),_:1}),o(f,{field:"identificacion",header:"ENTRADA",headerStyle:"width:25%; min-width:10rem;"},{body:l(a=>[_e,g(" "+b(a.data.hora_entrada),1)]),_:1}),o(f,{field:"identificacion",header:"SALIDA",headerStyle:"width:25%; min-width:10rem;"},{body:l(a=>[he,g(" "+b(a.data.hora_salida),1)]),_:1})]),_:1},8,["value","filters"])])])])}}},ge=F(pe,[["__scopeId","data-v-21c4058b"]]);export{ge as default};