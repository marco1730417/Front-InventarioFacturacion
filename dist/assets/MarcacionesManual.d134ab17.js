import{_ as N,u as T,r as o,o as D,a as F,F as j,b as f,c as H,d as L,e as a,f as t,g as x,m as n,v as d,p as R,i as O}from"./index.510abe7e.js";import{u as z}from"./crud.87c3148d.js";const l=i=>(R("data-v-bf0c4b13"),i=i(),O(),i),J={class:"grid"},K={class:"col-12 lg:col-12"},P={class:"card"},Q=l(()=>a("h5",null,"Ingreso Manual para Hora de Ingreso",-1)),W={class:"p-fluid grid"},X={class:"col-9 md:col-3"},Y={class:"field"},Z=l(()=>a("label",{for:"inputtext"},"Elija el Usuario",-1)),$={class:"col-9 md:col-3"},aa={class:"field"},oa=l(()=>a("label",{for:"inputmask"},"Selecione una fecha",-1)),sa={class:"col-9 md:col-3"},ea={class:"field"},la=l(()=>a("label",{for:"inputmask"},"Escriba una hora",-1)),ta={class:"col-9 md:col-3"},ia={class:"field"},na=l(()=>a("label",{for:"inputmask"},"Acciones",-1)),da={class:"card"},ca=l(()=>a("h5",null,"Ingreso Manual para Hora de Salida",-1)),ua={class:"p-fluid grid"},ra={class:"col-9 md:col-3"},_a={class:"field"},pa=l(()=>a("label",{for:"inputtext"},"Elija el Usuario",-1)),ma={class:"col-9 md:col-3"},va={class:"field"},ha=l(()=>a("label",{for:"inputmask"},"Selecione una fecha",-1)),fa={class:"col-9 md:col-3"},ba={class:"field"},Ma=l(()=>a("label",{for:"inputmask"},"Escriba una hora",-1)),ga={class:"col-9 md:col-3"},Va={class:"field"},xa=l(()=>a("label",{for:"inputmask"},"Acciones",-1)),Sa={__name:"MarcacionesManual",setup(i){const S=T(),{GuardarMarcacionSalida:U,datos:b,GuardarMarcacion:k,obtenerRegistros:I}=z(),M=o("marcaciones"),w=o("usuarios"),c=o(),u=o(),r=o(),_=o(),p=o(),m=o(),E=o({});o(null),o(null),o(null);const y=o({});o(!1);const B=o(S.user.id),v=o({usuario_id:p});v.value.fecha=u,v.value.hora=c;const h=o({usuario_id:m});h.value.fechasalida=_,h.value.hora_salida=r,E.value.usuario_id=B.value,D(()=>{A()}),F(()=>{I(w.value)});const G=()=>{k(M.value,v.value)},q=()=>{U(M.value,h.value)},A=()=>{y.value={global:{value:null,matchMode:j.CONTAINS}}};return(Ua,s)=>{const C=f("Toast"),g=f("Dropdown"),V=f("Button");return H(),L("div",J,[a("div",K,[t(C),a("div",P,[Q,a("div",W,[a("div",X,[a("div",Y,[Z,t(g,{modelValue:p.value,"onUpdate:modelValue":s[0]||(s[0]=e=>p.value=e),options:x(b),optionLabel:"name",placeholder:"Eliga un usuario",class:"w-full md:w-14rem"},null,8,["modelValue","options"])])]),a("div",$,[a("div",aa,[oa,n(a("input",{type:"date","onUpdate:modelValue":s[1]||(s[1]=e=>u.value=e),id:"appt",name:"appt",min:"09:00",max:"18:00",required:""},null,512),[[d,u.value]])])]),a("div",sa,[a("div",ea,[la,n(a("input",{type:"time","onUpdate:modelValue":s[2]||(s[2]=e=>c.value=e),id:"appt",name:"appt",min:"09:00",max:"18:00",required:""},null,512),[[d,c.value]])])]),a("div",ta,[a("div",ia,[na,t(V,{label:"Guardar",icon:"pi pi-save",class:"p-button-success",onClick:G})])])])]),a("div",da,[ca,a("div",ua,[a("div",ra,[a("div",_a,[pa,t(g,{modelValue:m.value,"onUpdate:modelValue":s[3]||(s[3]=e=>m.value=e),options:x(b),optionLabel:"name",placeholder:"Eliga un usuario",class:"w-full md:w-14rem"},null,8,["modelValue","options"])])]),a("div",ma,[a("div",va,[ha,n(a("input",{type:"date","onUpdate:modelValue":s[4]||(s[4]=e=>_.value=e),id:"appt",name:"appt",min:"09:00",max:"18:00",required:""},null,512),[[d,_.value]])])]),a("div",fa,[a("div",ba,[Ma,n(a("input",{type:"time","onUpdate:modelValue":s[5]||(s[5]=e=>r.value=e),id:"appt",name:"appt",min:"09:00",max:"18:00",required:""},null,512),[[d,r.value]])])]),a("div",ga,[a("div",Va,[xa,t(V,{label:"Guardar",icon:"pi pi-save",class:"p-button-success",onClick:q})])])])])])])}}},wa=N(Sa,[["__scopeId","data-v-bf0c4b13"]]);export{wa as default};