import{_ as I,r as o,o as N,a as D,F,b as n,c as B,d as U,e,f as a,g as v,w as c,h as f,t as p,p as O,i as j}from"./index.651f78da.js";import{u as H}from"./crud.3528b29e.js";const t=i=>(O("data-v-2791c003"),i=i(),j(),i),J={class:"grid"},z={class:"col-12"},K={class:"card"},q={class:"grid p-fluid"},G={class:"col"},Q={class:"card"},W=t(()=>e("h5",null,"Control de Asistencia",-1)),X={class:"p-fluid grid"},Y={class:"col-9 md:col-3"},Z={class:"field"},$=t(()=>e("label",{for:"inputtext"},"Elija el A\xF1o",-1)),ee={class:"col-9 md:col-3"},oe={class:"field"},se=t(()=>e("label",{for:"inputmask"},"Elija el Mes",-1)),te={class:"col-9 md:col-3"},ae={class:"field"},le=t(()=>e("label",{for:"inputmask"},"Elija el Usuario",-1)),ne={class:"col-9 md:col-3"},ie={class:"field"},de=t(()=>e("label",{for:"inputmask"},"Acciones",-1)),ce={class:"flex flex-column md:flex-row md:justify-content-between md:align-items-center"},re=t(()=>e("h5",{class:"m-0"},"Control de Asistencia",-1)),ue={class:"block mt-2 md:mt-0 p-input-icon-left"},_e=t(()=>e("i",{class:"pi pi-search"},null,-1)),me=t(()=>e("span",{class:"p-column-title"},"FECHA",-1)),pe=t(()=>e("br",null,null,-1)),he=t(()=>e("span",{class:"p-column-title"},"MARCACIONES",-1)),ve={__name:"Asistencia",setup(i){const{cargarAgendamiento:fe,datosAgendamiento:ge,calcularMarcaciones:g,datosReporteMarcaciones:b,obtenerRegistros:w,datos:A}=H(),C=o("reportes"),V=o("usuarios"),r=o(),u=o(),M=o([{name:"2024",code:"2024"},{name:"2025",code:"2025"}]),_=o(),k=o([{name:"Enero",code:"01"},{name:"Febrero",code:"02"},{name:"Marzo",code:"03"},{name:"Abril",code:"04"},{name:"Mayo",code:"05"},{name:"Junio",code:"06"},{name:"Julio",code:"07"},{name:"Agosto",code:"08"},{name:"Septiembre",code:"09"},{name:"Octubre",code:"10"},{name:"Noviembre",code:"11"},{name:"Diciembre",code:"12"}]);o(!1),o(!1),o({});const x=o(null),d=o({}),y=o({mes:_,anio:u,usuario_id:r});o(!1),N(()=>{P()}),D(()=>{w(V.value)});const E=()=>{g(C.value,y.value)},P=()=>{d.value={global:{value:null,matchMode:F.CONTAINS}}};return(be,l)=>{const S=n("Toast"),m=n("Dropdown"),L=n("Button"),R=n("InputText"),h=n("Column"),T=n("DataTable");return B(),U("div",J,[e("div",z,[e("div",K,[a(S),e("div",q,[e("div",G,[e("div",Q,[W,e("div",X,[e("div",Y,[e("div",Z,[$,a(m,{modelValue:u.value,"onUpdate:modelValue":l[0]||(l[0]=s=>u.value=s),options:M.value,optionLabel:"name",placeholder:"Eliga un a\xF1o",class:"w-full md:w-14rem"},null,8,["modelValue","options"])])]),e("div",ee,[e("div",oe,[se,a(m,{modelValue:_.value,"onUpdate:modelValue":l[1]||(l[1]=s=>_.value=s),options:k.value,optionLabel:"name",placeholder:"Eliga un mes",class:"w-full md:w-14rem"},null,8,["modelValue","options"])])]),e("div",te,[e("div",ae,[le,a(m,{modelValue:r.value,"onUpdate:modelValue":l[2]||(l[2]=s=>r.value=s),options:v(A),optionLabel:"name",placeholder:"Eliga un usuario",class:"w-full md:w-14rem"},null,8,["modelValue","options"])])]),e("div",ne,[e("div",ie,[de,a(L,{label:"Consultar",icon:"pi pi-search",class:"p-button-success",onClick:E})])])])])])]),a(T,{ref_key:"dt",ref:x,value:v(b),dataKey:"id",paginator:!0,rows:10,filters:d.value,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:"Mostrando {first} hasta {last} de {totalRecords} registros",responsiveLayout:"scroll"},{header:c(()=>[e("div",ce,[re,e("span",ue,[_e,a(R,{modelValue:d.value.global.value,"onUpdate:modelValue":l[3]||(l[3]=s=>d.value.global.value=s),placeholder:"Search..."},null,8,["modelValue"])])])]),default:c(()=>[a(h,{field:"nombre",header:"FECHA",sortable:!0,headerStyle:"width:5%; min-width:10rem;"},{body:c(s=>[me,f(" "+p(s.data.fecha)+" ",1),pe]),_:1}),a(h,{field:"ruc",header:"MARCACIONES",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:c(s=>[he,f(" "+p(s.data.hora_entrada)+" - "+p(s.data.hora_salida),1)]),_:1})]),_:1},8,["value","filters"])])])])}}},Ce=I(ve,[["__scopeId","data-v-2791c003"]]);export{Ce as default};
