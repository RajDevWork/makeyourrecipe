import{j as b,G as v,A as j,r as l,n as e,p as c,U as m,M as N,z as w,J as x}from"./index-BO43ITrN.js";import{S as y}from"./save-CTu2Cpiy.js";/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],S=b("camera",k);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],z=b("file-text",M),P=()=>{const{user:a}=v(r=>r.auth),h=j(),[s,i]=l.useState({name:(a==null?void 0:a.name)||"",bio:(a==null?void 0:a.bio)||"",avatar:null}),[u,g]=l.useState(a==null?void 0:a.avatar),[t,d]=l.useState(!1),o=r=>{i({...s,[r.target.name]:r.target.value})},p=r=>{const n=r.target.files[0];n&&(i({...s,avatar:n}),g(URL.createObjectURL(n)))},f=async r=>{r.preventDefault(),d(!0);try{await h(w(s)),x.success("Profile updated successfully")}catch{x.error("Failed to update profile")}finally{d(!1)}};return t?e.jsx("div",{className:"min-h-screen bg-slate-50 dark:bg-slate-950",children:e.jsxs("div",{className:"container mx-auto px-4 py-8 max-w-5xl",children:[e.jsx("div",{className:`\r
            h-[220px]\r
            rounded-[40px]\r
            bg-slate-200\r
            dark:bg-slate-900\r
            animate-pulse\r
            mb-10\r
          `}),e.jsxs("div",{className:`\r
            rounded-[32px]\r
            border\r
            border-slate-200\r
            dark:border-slate-800\r
            bg-white\r
            dark:bg-slate-900\r
            p-8\r
          `,children:[e.jsx("div",{className:"flex justify-center mb-10",children:e.jsx("div",{className:`\r
                h-36\r
                w-36\r
                rounded-full\r
                bg-slate-200\r
                dark:bg-slate-800\r
                animate-pulse\r
              `})}),e.jsxs("div",{className:"mb-6",children:[e.jsx("div",{className:"h-4 w-24 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-3"}),e.jsx("div",{className:"h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("div",{className:"h-4 w-24 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-3"}),e.jsx("div",{className:"h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("div",{className:"h-4 w-16 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-3"}),e.jsx("div",{className:"h-32 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"})]}),e.jsx("div",{className:"h-14 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"})]})]})}):e.jsx("div",{className:"min-h-screen bg-slate-50 dark:bg-slate-950",children:e.jsxs("div",{className:"container mx-auto px-4 py-8 max-w-5xl",children:[e.jsxs(c.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"relative overflow-hidden rounded-[40px] mb-10",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500"}),e.jsx("div",{className:"absolute inset-0 bg-black/10"}),e.jsx("div",{className:"relative z-10 px-8 py-14 md:px-12 text-white",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:`\r
                  flex\r
                  h-14\r
                  w-14\r
                  items-center\r
                  justify-center\r
                  rounded-2xl\r
                  bg-white/20\r
                  backdrop-blur-md\r
                `,children:e.jsx(m,{className:"h-7 w-7"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-4xl md:text-6xl font-black",children:"Profile Settings"}),e.jsx("p",{className:"mt-2 text-white/90",children:"Manage your personal information and account details."})]})]})})]}),e.jsxs(c.div,{initial:{opacity:0,y:15},animate:{opacity:1,y:0},className:`\r
            rounded-[32px]\r
            border\r
            border-slate-200\r
            dark:border-slate-800\r
            bg-white\r
            dark:bg-slate-900\r
            p-6\r
            md:p-10\r
            shadow-sm\r
          `,children:[e.jsx("div",{className:"flex justify-center mb-10",children:e.jsxs("div",{className:"relative",children:[e.jsx("img",{src:u||`https://ui-avatars.com/api/?name=${a==null?void 0:a.name}&background=f97316&color=fff`,alt:"Profile",className:`\r
                  h-36\r
                  w-36\r
                  rounded-full\r
                  object-cover\r
                  border-4\r
                  border-white\r
                  shadow-xl\r
                `}),e.jsxs("label",{className:`\r
                  absolute\r
                  bottom-2\r
                  right-2\r
                  flex\r
                  h-12\r
                  w-12\r
                  cursor-pointer\r
                  items-center\r
                  justify-center\r
                  rounded-full\r
                  bg-gradient-to-r\r
                  from-orange-500\r
                  via-amber-500\r
                  to-rose-500\r
                  text-white\r
                  shadow-lg\r
                  hover:scale-105\r
                  transition-all\r
                `,children:[e.jsx(S,{className:"h-5 w-5"}),e.jsx("input",{type:"file",accept:"image/*",onChange:p,className:"hidden"})]})]})}),e.jsxs("form",{onSubmit:f,className:"space-y-6",children:[e.jsxs("div",{children:[e.jsxs("label",{className:"mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300",children:[e.jsx(m,{className:"h-4 w-4"}),"Full Name"]}),e.jsx("input",{type:"text",name:"name",value:s.name,onChange:o,required:!0,className:`\r
                  w-full\r
                  rounded-2xl\r
                  border\r
                  border-slate-200\r
                  dark:border-slate-700\r
                  bg-white\r
                  dark:bg-slate-800\r
                  px-4\r
                  py-3\r
                  outline-none\r
                  focus:border-orange-500\r
                  focus:ring-4\r
                  focus:ring-orange-500/10\r
                   text-white\r
                `})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300",children:[e.jsx(N,{className:"h-4 w-4"}),"Email Address"]}),e.jsx("input",{type:"email",value:a==null?void 0:a.email,disabled:!0,className:`\r
                  w-full\r
                  rounded-2xl\r
                  border\r
                  border-slate-200\r
                  dark:border-slate-700\r
                  bg-slate-100\r
                  dark:bg-slate-800\r
                  text-white\r
                  px-4\r
                  py-3\r
                  cursor-not-allowed\r
                `})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"mb-2 flex items-center  text-white gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300",children:[e.jsx(z,{className:"h-4 w-4"}),"Bio"]}),e.jsx("textarea",{name:"bio",rows:"5",value:s.bio,onChange:o,placeholder:"Tell us about yourself...",className:`\r
                  w-full\r
                  resize-none\r
                  rounded-2xl\r
                  border\r
                  border-slate-200\r
                  dark:border-slate-700\r
                  bg-white\r
                  dark:bg-slate-800\r
                  px-4\r
                  py-3\r
                  outline-none\r
                  focus:border-orange-500\r
                  focus:ring-4\r
                  focus:ring-orange-500/10\r
                `})]}),e.jsxs("button",{type:"submit",disabled:t,className:`\r
                flex\r
                w-full\r
                items-center\r
                justify-center\r
                gap-2\r
                rounded-2xl\r
                bg-gradient-to-r\r
                from-orange-500\r
                via-amber-500\r
                to-rose-500\r
                px-6\r
                py-4\r
                font-semibold\r
                text-white\r
                shadow-lg\r
                shadow-orange-500/20\r
                hover:scale-[1.01]\r
                transition-all\r
              `,children:[e.jsx(y,{className:"h-4 w-4"}),t?"Saving Changes...":"Save Changes"]})]})]})]})})};export{P as default};
