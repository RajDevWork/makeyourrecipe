import{A as u,G as c,r as g,n as e,p as h,a as p,S as f,y as w,B as j,J as t,c as k}from"./index-CIU3cpb5.js";import{L as N}from"./lock-CPIa96pg.js";import{S as v}from"./save-Bh4mCy2x.js";const D=()=>{const m=u(),{darkMode:l}=c(r=>r.theme),{user:y}=c(r=>r.auth),[a,n]=g.useState({currentPassword:"",newPassword:"",confirmPassword:""}),[d,o]=g.useState(!1),x=async r=>{var s,i;if(r.preventDefault(),a.newPassword!==a.confirmPassword){t.error("New passwords do not match");return}if(a.newPassword.length<6){t.error("Password must be at least 6 characters");return}o(!0);try{await k.changePassword(a.currentPassword,a.newPassword),t.success("Password changed successfully"),n({currentPassword:"",newPassword:"",confirmPassword:""})}catch(b){t.error(((i=(s=b.response)==null?void 0:s.data)==null?void 0:i.message)||"Failed to change password")}finally{o(!1)}};return d?e.jsx("div",{className:"min-h-screen bg-slate-50 dark:bg-slate-950",children:e.jsxs("div",{className:"container mx-auto px-4 py-8 max-w-6xl",children:[e.jsx("div",{className:`\r
            h-[220px]\r
            rounded-[40px]\r
            mb-10\r
            animate-pulse\r
            bg-gradient-to-r\r
            from-slate-200\r
            via-orange-100\r
            to-slate-200\r
            dark:from-slate-800\r
            dark:via-slate-700\r
            dark:to-slate-800\r
          `}),e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:`\r
              rounded-[32px]\r
              border\r
              border-slate-200\r
              dark:border-slate-800\r
              bg-white\r
              dark:bg-slate-900\r
              p-6\r
            `,children:[e.jsxs("div",{className:"flex items-center gap-4 mb-8",children:[e.jsx("div",{className:"h-12 w-12 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"}),e.jsxs("div",{children:[e.jsx("div",{className:"h-6 w-40 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-2"}),e.jsx("div",{className:"h-4 w-64 rounded bg-slate-200 dark:bg-slate-800 animate-pulse"})]})]}),[...Array(3)].map((r,s)=>e.jsxs("div",{className:`\r
                  flex\r
                  items-center\r
                  justify-between\r
                  rounded-2xl\r
                  bg-slate-100\r
                  dark:bg-slate-800\r
                  p-4\r
                  mb-4\r
                `,children:[e.jsxs("div",{children:[e.jsx("div",{className:"h-5 w-40 rounded bg-slate-200 dark:bg-slate-700 animate-pulse mb-2"}),e.jsx("div",{className:"h-4 w-56 rounded bg-slate-200 dark:bg-slate-700 animate-pulse"})]}),e.jsx("div",{className:"h-7 w-14 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"})]},s))]}),e.jsxs("div",{className:`\r
              rounded-[32px]\r
              border\r
              border-slate-200\r
              dark:border-slate-800\r
              bg-white\r
              dark:bg-slate-900\r
              p-6\r
            `,children:[e.jsx("div",{className:"h-6 w-44 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-6"}),[...Array(2)].map((r,s)=>e.jsxs("div",{className:"mb-6",children:[e.jsx("div",{className:"h-4 w-32 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-3"}),e.jsx("div",{className:"h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"})]},s)),e.jsx("div",{className:"h-12 w-40 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"})]}),e.jsxs("div",{className:`\r
              rounded-[32px]\r
              border\r
              border-slate-200\r
              dark:border-slate-800\r
              bg-white\r
              dark:bg-slate-900\r
              p-6\r
            `,children:[e.jsx("div",{className:"h-6 w-52 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-6"}),[...Array(4)].map((r,s)=>e.jsxs("div",{className:`\r
                  flex\r
                  items-center\r
                  justify-between\r
                  rounded-2xl\r
                  bg-slate-100\r
                  dark:bg-slate-800\r
                  p-4\r
                  mb-4\r
                `,children:[e.jsx("div",{className:"h-5 w-48 rounded bg-slate-200 dark:bg-slate-700 animate-pulse"}),e.jsx("div",{className:"h-7 w-14 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"})]},s))]})]})]})}):e.jsx("div",{className:"min-h-screen bg-slate-50 dark:bg-slate-950",children:e.jsxs("div",{className:"container mx-auto px-4 py-8 max-w-6xl",children:[e.jsxs(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"relative overflow-hidden rounded-[40px] mb-10",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500"}),e.jsx("div",{className:"absolute inset-0 bg-black/10"}),e.jsxs("div",{className:"relative z-10 px-8 py-14 md:px-12 text-white",children:[e.jsx("h1",{className:"text-4xl md:text-6xl font-black",children:"Settings"}),e.jsx("p",{className:"mt-3 text-white/90",children:"Manage your preferences, notifications and security."})]})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[e.jsxs("div",{className:`rounded-[32px]\r
border\r
border-slate-200\r
dark:border-slate-800\r
bg-white\r
dark:bg-slate-900\r
p-6`,children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("div",{className:`p-2 rounded-lg bg-gradient-to-br\r
from-orange-500\r
via-amber-500\r
to-rose-500`,children:l?e.jsx(p,{className:"w-5 h-5 text-white"}):e.jsx(f,{className:"w-5 h-5 text-white"})}),e.jsx("h2",{className:"text-2xl font-black text-gray-900 dark:text-white",children:"Appearance"})]}),e.jsx("div",{className:"space-y-4",children:e.jsxs("div",{className:"rounded-2xl bg-slate-50 dark:bg-slate-800 p-4 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-gray-900 dark:text-white",children:"Dark Mode"}),e.jsx("p",{className:"text-sm text-gray-500",children:"Switch between light and dark theme"})]}),e.jsx("button",{onClick:()=>m(w()),className:`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${l?"bg-orange-500":"bg-gray-300"}`,children:e.jsx("span",{className:`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${l?"translate-x-6":"translate-x-1"}`})})]})})]}),e.jsxs("div",{className:`rounded-[32px]\r
border\r
border-slate-200\r
dark:border-slate-800\r
bg-white\r
dark:bg-slate-900\r
p-6`,children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("div",{className:`p-2 rounded-lg bg-gradient-to-br\r
from-orange-500\r
via-amber-500\r
to-rose-500`,children:e.jsx(j,{className:"w-5 h-5 text-white"})}),e.jsx("h2",{className:"text-2xl font-black text-gray-900 dark:text-white",children:"Notifications"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"rounded-2xl bg-slate-50 dark:bg-slate-800 p-4 flex items-center justify-between",children:[e.jsx("span",{className:"text-gray-700 dark:text-gray-300",children:"Email Notifications"}),e.jsxs("label",{className:"relative inline-flex items-center cursor-pointer",children:[e.jsx("input",{type:"checkbox",className:"sr-only peer",defaultChecked:!0}),e.jsx("div",{className:"w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"})]})]}),e.jsxs("div",{className:"rounded-2xl bg-slate-50 dark:bg-slate-800 p-4 flex items-center justify-between",children:[e.jsx("span",{className:"text-gray-700 dark:text-gray-300",children:"Recipe Updates"}),e.jsxs("label",{className:"relative inline-flex items-center cursor-pointer",children:[e.jsx("input",{type:"checkbox",className:"sr-only peer",defaultChecked:!0}),e.jsx("div",{className:"w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"})]})]})]})]}),e.jsxs("div",{className:`rounded-[32px]\r
border\r
border-slate-200\r
dark:border-slate-800\r
bg-white\r
dark:bg-slate-900\r
p-6 lg:col-span-2`,children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("div",{className:`p-2 rounded-lg bg-gradient-to-br\r
from-orange-500\r
via-amber-500\r
to-rose-500`,children:e.jsx(N,{className:"w-5 h-5 text-white"})}),e.jsx("h2",{className:"text-2xl font-black text-gray-900 dark:text-white",children:"Change Password"})]}),e.jsxs("form",{onSubmit:x,className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",children:"Current Password"}),e.jsx("input",{type:"password",value:a.currentPassword,onChange:r=>n({...a,currentPassword:r.target.value}),required:!0,className:`\r
w-full\r
rounded-2xl\r
border\r
border-slate-200\r
dark:border-slate-700\r
bg-white\r
dark:bg-slate-800\r
px-4\r
py-3\r
placeholder-gray-500\r
dark:placeholder-gray-400\r
outline-none\r
focus:border-orange-500\r
focus:ring-4\r
focus:ring-orange-500/10\r
`,placeholder:"Enter current password"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",children:"New Password"}),e.jsx("input",{type:"password",value:a.newPassword,onChange:r=>n({...a,newPassword:r.target.value}),required:!0,className:`\r
w-full\r
rounded-2xl\r
border\r
border-slate-200\r
dark:border-slate-700\r
bg-white\r
dark:bg-slate-800\r
placeholder-gray-500\r
dark:placeholder-gray-400\r
outline-none\r
px-4\r
py-3\r
outline-none\r
focus:border-orange-500\r
focus:ring-4\r
focus:ring-orange-500/10\r
`,placeholder:"Enter new password"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",children:"Confirm New Password"}),e.jsx("input",{type:"password",value:a.confirmPassword,onChange:r=>n({...a,confirmPassword:r.target.value}),required:!0,className:`\r
w-full\r
rounded-2xl\r
border\r
border-slate-200\r
dark:border-slate-700\r
bg-white\r
dark:bg-slate-800\r
placeholder-gray-500\r
dark:placeholder-gray-400\r
outline-none\r
px-4\r
py-3\r
outline-none\r
focus:border-orange-500\r
focus:ring-4\r
focus:ring-orange-500/10\r
`,placeholder:"Confirm new password"})]}),e.jsxs("button",{type:"submit",disabled:d,className:`\r
flex\r
items-center\r
gap-2\r
rounded-2xl\r
bg-gradient-to-r\r
from-orange-500\r
via-amber-500\r
to-rose-500\r
px-6\r
py-3\r
font-semibold\r
text-white\r
shadow-lg\r
shadow-orange-500/20\r
hover:scale-[1.02]\r
transition-all\r
`,children:[e.jsx(v,{className:"w-4 h-4"}),d?"Changing...":"Change Password"]})]})]})]})]})})};export{D as default};
