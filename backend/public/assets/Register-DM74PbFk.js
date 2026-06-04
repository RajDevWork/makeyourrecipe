import{r as o,A as j,D as y,G as N,n as e,p as i,C as v,U as P,M as k,L as S,s as C}from"./index-BO43ITrN.js";import{L as x}from"./lock-DBwQPb4_.js";import{E}from"./eye-off-D03DKRLq.js";import{E as A}from"./eye-CxdXcIvh.js";import{A as D}from"./arrow-right-_UXaXQCC.js";const H=()=>{const[a,h]=o.useState(!1),[t,u]=o.useState({name:"",email:"",password:"",confirmPassword:""}),[s,d]=o.useState({}),g=j(),p=y(),{loading:c}=N(r=>r.auth),n=r=>{u({...t,[r.target.name]:r.target.value}),s[r.target.name]&&d({...s,[r.target.name]:""})},f=()=>{const r={};return t.password.length<6&&(r.password="Password must be at least 6 characters"),t.password!==t.confirmPassword&&(r.confirmPassword="Passwords do not match"),d(r),Object.keys(r).length===0},w=async r=>{var m;if(r.preventDefault(),!f())return;const{confirmPassword:F,...b}=t;(m=(await g(C(b))).payload)!=null&&m.success&&p("/dashboard")},l=t.password.length<6?{text:"Weak",width:"w-1/3",color:"bg-red-500"}:t.password.length<10?{text:"Medium",width:"w-2/3",color:"bg-yellow-500"}:{text:"Strong",width:"w-full",color:"bg-green-500"};return e.jsxs("div",{className:"relative min-h-screen overflow-hidden bg-black",children:[e.jsxs("div",{className:"absolute inset-0",children:[e.jsx("div",{className:"absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-orange-500/20 blur-[140px]"}),e.jsx("div",{className:"absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-pink-500/20 blur-[140px]"}),e.jsx("div",{className:"absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px]"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-900"})]}),e.jsx("div",{className:"absolute inset-0 opacity-[0.03]",style:{backgroundImage:"linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)",backgroundSize:"50px 50px"}}),e.jsx("div",{className:"relative z-10 flex min-h-screen items-center justify-center px-4 py-10",children:e.jsxs(i.div,{initial:{opacity:0,y:40,scale:.95},animate:{opacity:1,y:0,scale:1},transition:{duration:.6},className:`\r
            w-full\r
            max-w-md\r
            rounded-3xl\r
            border\r
            border-white/10\r
            bg-white/5\r
            backdrop-blur-2xl\r
            shadow-[0_20px_80px_rgba(0,0,0,0.5)]\r
            p-8\r
          `,children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx(i.div,{initial:{scale:0},animate:{scale:1},transition:{delay:.2},className:`\r
                mx-auto\r
                mb-5\r
                flex\r
                h-20\r
                w-20\r
                items-center\r
                justify-center\r
                rounded-3xl\r
                bg-gradient-to-r\r
                from-orange-500\r
        via-amber-500\r
        to-rose-500\r
                shadow-lg\r
                shadow-orange-500/30\r
              `,children:e.jsx(v,{className:"h-10 w-10 text-white"})}),e.jsx("h1",{className:"text-4xl font-extrabold text-white",children:"Create Account"}),e.jsx("p",{className:"mt-3 text-gray-400",children:"Join our community and start sharing recipes"})]}),e.jsxs("form",{onSubmit:w,className:"space-y-5",children:[e.jsxs("div",{children:[e.jsx("label",{className:"mb-2 block text-sm font-medium text-gray-300",children:"Full Name"}),e.jsxs("div",{className:"relative",children:[e.jsx(P,{className:"absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"}),e.jsx("input",{type:"text",name:"name",value:t.name,onChange:n,required:!0,placeholder:"John Doe",className:"w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"mb-2 block text-sm font-medium text-gray-300",children:"Email Address"}),e.jsxs("div",{className:"relative",children:[e.jsx(k,{className:"absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"}),e.jsx("input",{type:"email",name:"email",value:t.email,onChange:n,required:!0,placeholder:"you@example.com",className:"w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"mb-2 block text-sm font-medium text-gray-300",children:"Password"}),e.jsxs("div",{className:"relative",children:[e.jsx(x,{className:"absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"}),e.jsx("input",{type:a?"text":"password",name:"password",value:t.password,onChange:n,required:!0,placeholder:"••••••••",className:"w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-12 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20"}),e.jsx("button",{type:"button",onClick:()=>h(!a),className:"absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white",children:a?e.jsx(E,{className:"h-5 w-5"}):e.jsx(A,{className:"h-5 w-5"})})]}),s.password&&e.jsx("p",{className:"mt-2 text-sm text-red-400",children:s.password}),e.jsxs("div",{className:"mt-3",children:[e.jsxs("div",{className:"mb-2 flex justify-between text-xs",children:[e.jsx("span",{className:"text-gray-400",children:"Password Strength"}),e.jsx("span",{className:"text-orange-400",children:l.text})]}),e.jsx("div",{className:"h-2 overflow-hidden rounded-full bg-white/10",children:e.jsx("div",{className:`h-full transition-all duration-500 ${l.width} ${l.color}`})})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"mb-2 block text-sm font-medium text-gray-300",children:"Confirm Password"}),e.jsxs("div",{className:"relative",children:[e.jsx(x,{className:"absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"}),e.jsx("input",{type:a?"text":"password",name:"confirmPassword",value:t.confirmPassword,onChange:n,required:!0,placeholder:"••••••••",className:"w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20"})]}),s.confirmPassword&&e.jsx("p",{className:"mt-2 text-sm text-red-400",children:s.confirmPassword})]}),e.jsxs("label",{className:"flex items-start gap-3 text-sm text-gray-400",children:[e.jsx("input",{type:"checkbox",required:!0,className:"mt-1 rounded border-gray-600"}),e.jsx("span",{children:"I agree to the Terms of Service and Privacy Policy"})]}),e.jsx(i.button,{whileHover:{scale:1.02},whileTap:{scale:.98},type:"submit",disabled:c,className:`\r
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
                py-4\r
                font-semibold\r
                text-white\r
                shadow-lg\r
                shadow-orange-500/30\r
              `,children:c?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"}),"Creating Account..."]}):e.jsxs(e.Fragment,{children:["Create Account",e.jsx(D,{className:"h-5 w-5"})]})})]}),e.jsxs("p",{className:"mt-8 text-center text-gray-400",children:["Already have an account?"," ",e.jsx(S,{to:"/login",className:"font-semibold text-orange-400 hover:text-orange-300",children:"Sign In"})]})]})})]})};export{H as default};
