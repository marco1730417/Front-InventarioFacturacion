import{u as n,b as o,c as i,d as r,e,f as s,w as l,h as t,t as d,g as m,y as _,z as u,A as g}from"./index.7fc31b22.js";const x="/sakai-vue/demo/images/access/logo-orange.svg",f="/sakai-vue/demo/images/access/asset-access.svg",p={class:"surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"},h={class:"flex flex-column align-items-center justify-content-center"},b=e("img",{src:x,alt:"Sakai logo",class:"mb-5 w-6rem flex-shrink-0"},null,-1),v={style:{"border-radius":"56px",padding:"0.3rem",background:"linear-gradient(180deg, rgba(247, 149, 48, 0.4) 10%, rgba(247, 149, 48, 0) 30%)"}},w={class:"w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center",style:{"border-radius":"53px"}},y={class:"grid flex flex-column align-items-center"},k=u('<div class="flex justify-content-center align-items-center bg-orange-500 border-circle" style="width:3.2rem;height:3.2rem;"><i class="text-50 pi pi-fw pi-lock text-2xl"></i></div><h1 class="text-900 font-bold text-4xl lg:text-5xl mb-2">Access Denied</h1><span class="text-600 mb-5">You do not have the necessary permisions. Please contact admins.</span><img src="'+f+'" alt="Access denied" class="mb-5" width="80%">',4),S={class:"col-12 mt-5 text-center"},A=e("i",{class:"pi pi-fw pi-arrow-left text-blue-500 mr-2",style:{"vertical-align":"center"}},null,-1),D={__name:"Access",setup(N){const a=n();return(V,j)=>{const c=o("router-link");return i(),r(_,null,[e("div",p,[e("div",h,[b,e("div",v,[e("div",w,[e("div",y,[k,e("div",S,[A,s(c,{to:"/",class:"text-blue-500"},{default:l(()=>[t("Go to Dashboard")]),_:1})]),t(" "+d(m(a).user),1)])])])])]),s(g,{simple:""})],64)}}};export{D as default};