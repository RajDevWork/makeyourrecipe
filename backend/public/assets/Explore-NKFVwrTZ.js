import{j as y,n as e,F as v,r as c,X as w,p as S}from"./index-BO43ITrN.js";import{R as C}from"./RecipeCard-bybBsQRc.js";import{c as A}from"./categoryService-DFZDrImI.js";import{S as f}from"./SkeletonCard-DW_nf5OL.js";import{r as F}from"./recipeService-rlqG3h8S.js";import"./bookmark-CDyrMyZL.js";import"./eye-CxdXcIvh.js";/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],R=y("funnel",E),x=({label:t,options:n,error:m,className:i="",...d})=>e.jsxs("div",{className:"space-y-2",children:[t&&e.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:t}),e.jsx("select",{className:`w-full
rounded-2xl
border
border-slate-200
dark:border-slate-700
bg-white
dark:bg-slate-800
px-4
py-3
text-slate-900
dark:text-white
outline-none
focus:border-orange-500
focus:ring-4
focus:ring-orange-500/10
transition-all focus:ring-orange-500/20 focus:border-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${m?"border-red-500":"border-gray-200 dark:border-gray-700"} ${i}`,...d,children:n.map(l=>e.jsx("option",{value:l.value,children:l.label},l.value))}),m&&e.jsx("p",{className:"text-red-500 text-xs",children:m})]}),T=[{value:"easy",label:"Easy",color:"bg-green-100 text-green-700"},{value:"medium",label:"Medium",color:"bg-yellow-100 text-yellow-700"},{value:"hard",label:"Hard",color:"bg-red-100 text-red-700"}],_=[{value:"0-15",label:"Under 15 mins"},{value:"15-30",label:"15-30 mins"},{value:"30-60",label:"30-60 mins"},{value:"60-120",label:"1-2 hours"},{value:"120+",label:"2+ hours"}],O=[{value:"-createdAt",label:"Newest First"},{value:"createdAt",label:"Oldest First"},{value:"-stats.views",label:"Most Viewed"},{value:"-stats.likes",label:"Most Liked"},{value:"-stats.saves",label:"Most Saved"}],L=()=>{const[t,n]=v(),[m,i]=c.useState([]),[d,l]=c.useState(!1),[o,g]=c.useState({category:t.get("category")||"",difficulty:t.get("difficulty")||"",cookingTime:t.get("cookingTime")||"",sort:t.get("sort")||"-createdAt"});c.useEffect(()=>{s()},[]);const s=async()=>{try{const r=await A.getAllCategories();i(r.data||[])}catch(r){console.error("Error fetching categories:",r)}},a=(r,k)=>{const b={...o,[r]:k};g(b);const h=new URLSearchParams;Object.entries(b).forEach(([N,p])=>{p&&h.set(N,p)}),n(h)},j=()=>{g({category:"",difficulty:"",cookingTime:"",sort:"-createdAt"}),n({})},u=Object.values(o).some(r=>r);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"lg:hidden mb-4",children:e.jsxs("button",{onClick:()=>l(!0),className:`\r
            w-full\r
            flex\r
            items-center\r
            justify-center\r
            gap-2\r
            rounded-2xl\r
            border\r
            border-orange-200\r
            dark:border-orange-500/20\r
            bg-white\r
            dark:bg-slate-900\r
            px-4\r
            py-3\r
            font-medium\r
            text-slate-700\r
            dark:text-slate-300\r
            shadow-sm\r
          `,children:[e.jsx(R,{className:"w-4 h-4"}),"Filters ",u&&"(Active)"]})}),e.jsxs("div",{className:`${d?"fixed inset-0 z-50":"hidden lg:block"} lg:relative lg:z-auto`,children:[d&&e.jsx("div",{className:"absolute inset-0 bg-black/50",onClick:()=>l(!1)}),e.jsxs("div",{className:`
            relative
            bg-white
            dark:bg-slate-900
            rounded-[32px]
            border
            border-slate-200
            dark:border-slate-800
            overflow-y-auto
            p-6
            shadow-sm
            ${d?"fixed right-0 top-0 h-full w-full max-w-sm":"lg:static"}
          `,children:[e.jsxs("div",{className:"mb-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h3",{className:"text-2xl font-black text-slate-900 dark:text-white",children:"Filters"}),e.jsx("button",{onClick:()=>l(!1),className:"p-2 lg:hidden",children:e.jsx(w,{className:"w-5 h-5"})})]}),e.jsx("div",{className:`\r
      mt-3\r
      inline-flex\r
      items-center\r
      rounded-full\r
      bg-orange-100\r
      dark:bg-orange-500/10\r
      px-3\r
      py-1\r
      text-xs\r
      font-medium\r
      text-orange-600\r
      dark:text-orange-400\r
    `,children:"🔍 Refine Your Search"})]}),e.jsxs("div",{className:"space-y-5",children:[e.jsx(x,{label:"Category",value:o.category,onChange:r=>a("category",r.target.value),options:[{value:"",label:"All Categories"},...m.map(r=>({value:r._id,label:r.name}))]}),e.jsx(x,{label:"Difficulty",value:o.difficulty,onChange:r=>a("difficulty",r.target.value),options:[{value:"",label:"All Difficulties"},...T]}),e.jsx(x,{label:"Cooking Time",value:o.cookingTime,onChange:r=>a("cookingTime",r.target.value),options:[{value:"",label:"Any Time"},..._]}),e.jsx(x,{label:"Sort By",value:o.sort,onChange:r=>a("sort",r.target.value),options:O}),u&&e.jsx("button",{onClick:j,className:`\r
                  w-full\r
                  rounded-2xl\r
                  border\r
                  border-orange-200\r
                  dark:border-orange-500/20\r
                  bg-orange-50\r
                  dark:bg-orange-500/10\r
                  py-3\r
                  text-sm\r
                  font-semibold\r
                  text-orange-600\r
                  dark:text-orange-400\r
                  transition-all\r
                  hover:scale-[1.02]\r
                `,children:"Clear all filters"})]})]})]})]})},B=()=>{const[t]=v(),[n,m]=c.useState([]),[i,d]=c.useState(!0),[l,o]=c.useState({page:1,total:0,pages:0});c.useEffect(()=>{g()},[t]);const g=async()=>{d(!0);try{const s=Object.fromEntries(t),a=await F.getAllRecipes(s);m(a.data),o(a.pagination)}catch(s){console.error("Error fetching recipes:",s)}finally{d(!1)}};return i&&n.length===0?e.jsx("div",{className:"min-h-screen bg-slate-50 dark:bg-slate-950",children:e.jsxs("div",{className:"container mx-auto px-4 py-8",children:[e.jsx("div",{className:`\r
            h-[220px]\r
            rounded-[40px]\r
            mb-10\r
            animate-pulse\r
            bg-slate-200\r
            dark:bg-slate-900\r
          `}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8",children:[e.jsx("div",{className:`\r
              rounded-[32px]\r
              border\r
              border-slate-200\r
              dark:border-slate-800\r
              bg-white\r
              dark:bg-slate-900\r
              p-6\r
            `,children:e.jsxs("div",{className:"space-y-5",children:[e.jsx("div",{className:"h-6 w-32 rounded bg-slate-200 dark:bg-slate-800 animate-pulse"}),[...Array(4)].map((s,a)=>e.jsxs("div",{children:[e.jsx("div",{className:"h-4 w-20 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-3"}),e.jsx("div",{className:"h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"})]},a))]})}),e.jsxs("div",{className:`\r
              rounded-[32px]\r
              border\r
              border-slate-200\r
              dark:border-slate-800\r
              bg-white\r
              dark:bg-slate-900\r
              p-6\r
            `,children:[e.jsxs("div",{className:"flex justify-between mb-8",children:[e.jsxs("div",{children:[e.jsx("div",{className:"h-8 w-48 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-3"}),e.jsx("div",{className:"h-4 w-64 rounded bg-slate-200 dark:bg-slate-800 animate-pulse"})]}),e.jsx("div",{className:"h-10 w-36 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse"})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:[...Array(9)].map((s,a)=>e.jsx(f,{},a))})]})]})]})}):e.jsx("div",{className:"min-h-screen bg-slate-50 dark:bg-slate-950",children:e.jsxs("div",{className:"container mx-auto px-4 py-8",children:[e.jsxs(S.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"relative overflow-hidden rounded-[40px] mb-10",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500"}),e.jsx("div",{className:"absolute inset-0 bg-black/10"}),e.jsxs("div",{className:"relative z-10 px-8 py-14 md:px-12 md:py-16 text-white",children:[e.jsx("h1",{className:"text-4xl md:text-6xl font-black",children:"Explore Recipes"}),i?e.jsx("div",{className:"mt-4 h-6 w-80 rounded-full bg-white/20 animate-pulse"}):e.jsxs("p",{className:"mt-4 text-lg text-white/90 max-w-2xl",children:["Discover ",l.total," delicious recipes from talented chefs and food lovers around the world."]})]})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8",children:[e.jsx("div",{children:e.jsx("div",{className:`\r
              sticky\r
              top-24\r
              rounded-[32px]\r
              border\r
              border-slate-200\r
              dark:border-slate-800\r
              bg-white\r
              dark:bg-slate-900\r
              p-6\r
              shadow-sm\r
            `,children:e.jsx(L,{})})}),e.jsxs("div",{className:`\r
            rounded-[32px]\r
            border\r
            border-slate-200\r
            dark:border-slate-800\r
            bg-white\r
            dark:bg-slate-900\r
            p-6\r
            md:p-8\r
          `,children:[e.jsxs("div",{className:"flex flex-col md:flex-row md:items-center md:justify-between mb-8",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-3xl font-black text-slate-900 dark:text-white",children:"All Recipes"}),e.jsx("p",{className:"mt-2 text-slate-500 dark:text-slate-400",children:"Browse our growing collection of recipes"})]}),i?e.jsx("div",{className:"mt-4 md:mt-0 h-10 w-40 rounded-full bg-orange-100 dark:bg-orange-500/10 animate-pulse"}):e.jsxs("div",{className:`\r
                  mt-4\r
                  md:mt-0\r
                  inline-flex\r
                  items-center\r
                  rounded-full\r
                  bg-orange-100\r
                  dark:bg-orange-500/10\r
                  px-4\r
                  py-2\r
                  text-sm\r
                  font-medium\r
                  text-orange-600\r
                  dark:text-orange-400\r
                `,children:[l.total," Recipes Found"]})]}),i?e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:[...Array(6)].map((s,a)=>e.jsx(f,{},a))}):n.length===0?e.jsxs("div",{className:"py-24 text-center",children:[e.jsx("div",{className:`\r
                  mx-auto\r
                  mb-6\r
                  flex\r
                  h-20\r
                  w-20\r
                  items-center\r
                  justify-center\r
                  rounded-3xl\r
                  bg-orange-100\r
                  dark:bg-orange-500/10\r
                  text-3xl\r
                `,children:"🍽️"}),e.jsx("h3",{className:"text-2xl font-bold text-slate-900 dark:text-white",children:"No Recipes Found"}),e.jsx("p",{className:"mt-3 text-slate-500 dark:text-slate-400",children:"Try adjusting your filters or search criteria."})]}):e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:n.map((s,a)=>e.jsx(C,{recipe:s,index:a},s._id))})]})]})]})})};export{B as default};
