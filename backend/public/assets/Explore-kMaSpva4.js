import{j as A,n as e,F as w,r as l,X as S,p as y,L as R}from"./index-SajGUMu6.js";import{R as C}from"./RecipeCard-Dh3G-5HS.js";import{c as F}from"./categoryService-CRoJXlj2.js";import{S as N}from"./SkeletonCard-Bbb7ylaP.js";import{r as k}from"./recipeService-DFNdNRzf.js";import"./bookmark-C-adv9fv.js";import"./eye-WFSbSeAT.js";/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],_=A("funnel",E),f=({label:t,options:d,error:x,className:o="",...c})=>e.jsxs("div",{className:"space-y-2",children:[t&&e.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:t}),e.jsx("select",{className:`w-full
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
transition-all focus:ring-orange-500/20 focus:border-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${x?"border-red-500":"border-gray-200 dark:border-gray-700"} ${o}`,...c,children:d.map(i=>e.jsx("option",{value:i.value,children:i.label},i.value))}),x&&e.jsx("p",{className:"text-red-500 text-xs",children:x})]}),L=[{value:"easy",label:"Easy",color:"bg-green-100 text-green-700"},{value:"medium",label:"Medium",color:"bg-yellow-100 text-yellow-700"},{value:"hard",label:"Hard",color:"bg-red-100 text-red-700"}],T=[{value:"0-15",label:"Under 15 mins"},{value:"15-30",label:"15-30 mins"},{value:"30-60",label:"30-60 mins"},{value:"60-120",label:"1-2 hours"},{value:"120+",label:"2+ hours"}],I=[{value:"-createdAt",label:"Newest First"},{value:"createdAt",label:"Oldest First"},{value:"-stats.views",label:"Most Viewed"},{value:"-stats.likes",label:"Most Liked"},{value:"-stats.saves",label:"Most Saved"}],O=()=>{const[t,d]=w(),[x,o]=l.useState([]),[c,i]=l.useState(!1),[m,n]=l.useState({category:t.get("category")||"",difficulty:t.get("difficulty")||"",cookingTime:t.get("cookingTime")||"",sort:t.get("sort")||"-createdAt"});l.useEffect(()=>{v()},[]);const v=async()=>{try{const r=await F.getAllCategories();o(r.data||[])}catch(r){console.error("Error fetching categories:",r)}},g=(r,j)=>{const h={...m,[r]:j};n(h);const s=new URLSearchParams;Object.entries(h).forEach(([a,b])=>{b&&s.set(a,b)}),d(s)},p=()=>{n({category:"",difficulty:"",cookingTime:"",sort:"-createdAt"}),d({})},u=Object.values(m).some(r=>r);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"lg:hidden mb-4",children:e.jsxs("button",{onClick:()=>i(!0),className:`\r
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
          `,children:[e.jsx(_,{className:"w-4 h-4"}),"Filters ",u&&"(Active)"]})}),e.jsxs("div",{className:`${c?"fixed inset-0 z-50":"hidden lg:block"} lg:relative lg:z-auto`,children:[c&&e.jsx("div",{className:"absolute inset-0 bg-black/50",onClick:()=>i(!1)}),e.jsxs("div",{className:`
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
            ${c?"fixed right-0 top-0 h-full w-full max-w-sm":"lg:static"}
          `,children:[e.jsxs("div",{className:"mb-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h3",{className:"text-2xl font-black text-slate-900 dark:text-white",children:"Filters"}),e.jsx("button",{onClick:()=>i(!1),className:"p-2 lg:hidden",children:e.jsx(S,{className:"w-5 h-5"})})]}),e.jsx("div",{className:`\r
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
    `,children:"🔍 Refine Your Search"})]}),e.jsxs("div",{className:"space-y-5",children:[e.jsx(f,{label:"Category",value:m.category,onChange:r=>g("category",r.target.value),options:[{value:"",label:"All Categories"},...x.map(r=>({value:r._id,label:r.name}))]}),e.jsx(f,{label:"Difficulty",value:m.difficulty,onChange:r=>g("difficulty",r.target.value),options:[{value:"",label:"All Difficulties"},...L]}),e.jsx(f,{label:"Cooking Time",value:m.cookingTime,onChange:r=>g("cookingTime",r.target.value),options:[{value:"",label:"Any Time"},...T]}),e.jsx(f,{label:"Sort By",value:m.sort,onChange:r=>g("sort",r.target.value),options:I}),u&&e.jsx("button",{onClick:p,className:`\r
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
                `,children:"Clear all filters"})]})]})]})]})},V=()=>{const[t]=w(),[d,x]=l.useState([]),[o,c]=l.useState(!0),[i,m]=l.useState({page:1,total:0,pages:0}),[n,v]=l.useState(null),[g,p]=l.useState(!1),[u,r]=l.useState(!1),j=async()=>{var s;try{p(!0);const a=t.get("difficulty")||"easy",b=await k.getAIRecommendation(a);v((s=b.data.recommendation)==null?void 0:s.recommendedRecipe),r(b.data.isAiGenerated)}catch(a){console.error(a)}finally{p(!1)}};l.useEffect(()=>{h(),j()},[t]);const h=async()=>{c(!0);try{const s=Object.fromEntries(t),a=await k.getAllRecipes(s);x(a.data),m(a.pagination)}catch(s){console.error("Error fetching recipes:",s)}finally{c(!1)}};return o&&d.length===0?e.jsx("div",{className:"min-h-screen bg-slate-50 dark:bg-slate-950",children:e.jsxs("div",{className:"container mx-auto px-4 py-8",children:[e.jsx("div",{className:`\r
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
            `,children:[e.jsxs("div",{className:"flex justify-between mb-8",children:[e.jsxs("div",{children:[e.jsx("div",{className:"h-8 w-48 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-3"}),e.jsx("div",{className:"h-4 w-64 rounded bg-slate-200 dark:bg-slate-800 animate-pulse"})]}),e.jsx("div",{className:"h-10 w-36 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse"})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:[...Array(9)].map((s,a)=>e.jsx(N,{},a))})]})]})]})}):e.jsx("div",{className:"min-h-screen bg-slate-50 dark:bg-slate-950",children:e.jsxs("div",{className:"container mx-auto px-4 py-8",children:[e.jsxs(y.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"relative overflow-hidden rounded-[40px] mb-10",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500"}),e.jsx("div",{className:"absolute inset-0 bg-black/10"}),e.jsxs("div",{className:"relative z-10 px-8 py-14 md:px-12 md:py-16 text-white",children:[e.jsx("h1",{className:"text-4xl md:text-6xl font-black",children:"Explore Recipes"}),o?e.jsx("div",{className:"mt-4 h-6 w-80 rounded-full bg-white/20 animate-pulse"}):e.jsxs("p",{className:"mt-4 text-lg text-white/90 max-w-2xl",children:["Discover ",i.total," delicious recipes from talented chefs and food lovers around the world."]})]})]}),e.jsx(y.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:`\r
          mb-8\r
          overflow-hidden\r
          rounded-[32px]\r
          border\r
          border-purple-500/20\r
          bg-gradient-to-r\r
          from-purple-900/30\r
          via-indigo-900/30\r
          to-pink-900/30\r
          backdrop-blur-xl\r
          p-6\r
        `,children:g?e.jsx("div",{className:"h-32 animate-pulse rounded-3xl bg-white/5"}):n?e.jsxs("div",{className:"flex flex-col md:flex-row items-start md:items-center justify-between gap-6",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("div",{className:`
                  inline-flex items-center gap-2 rounded-full
                  px-4 py-2 text-sm font-semibold
                  ${u?"bg-purple-500/20 text-purple-300":"bg-amber-500/20 text-amber-300"}
                `,children:u?"✨ AI Recommended For You":"⭐ Community Favorite"}),e.jsx("h2",{className:"mt-4 text-3xl font-black text-white",children:n.title}),e.jsx("p",{className:"mt-3 max-w-2xl text-slate-300",children:n.reason}),!u&&e.jsx("div",{className:"mt-4 rounded-2xl bg-white/5 px-4 py-3",children:e.jsx("p",{className:"text-sm text-slate-300",children:"🤖 AI recommendations are temporarily unavailable. Showing a recipe loved by our community instead."})}),e.jsxs("div",{className:"mt-4 flex flex-wrap gap-3",children:[n.difficulty&&e.jsx("span",{className:"rounded-full bg-white/10 px-3 py-1 text-sm text-white capitalize",children:n.difficulty}),n.recommendationScore&&e.jsxs("span",{className:"rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-300",children:["Score ",n.recommendationScore,"/100"]})]})]}),e.jsx(R,{to:`/recipe/${n._id}`,className:`\r
                shrink-0\r
                rounded-2xl\r
                bg-gradient-to-r\r
                from-orange-500\r
                to-pink-500\r
                px-6\r
                py-3\r
                font-semibold\r
                text-white\r
                transition-all\r
                hover:scale-105\r
              `,children:"View Recipe →"})]}):e.jsxs("div",{className:"text-center py-6",children:[e.jsx("div",{className:"text-4xl mb-3",children:"🍳"}),e.jsx("h3",{className:"text-xl font-bold text-white",children:"No Recommendation Available"}),e.jsx("p",{className:"mt-2 text-slate-400",children:"Explore recipes and apply filters to get personalized suggestions."})]})}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8",children:[e.jsx("div",{children:e.jsx("div",{className:`\r
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
            `,children:e.jsx(O,{})})}),e.jsxs("div",{className:`\r
            rounded-[32px]\r
            border\r
            border-slate-200\r
            dark:border-slate-800\r
            bg-white\r
            dark:bg-slate-900\r
            p-6\r
            md:p-8\r
          `,children:[e.jsxs("div",{className:"flex flex-col md:flex-row md:items-center md:justify-between mb-8",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-3xl font-black text-slate-900 dark:text-white",children:"All Recipes"}),e.jsx("p",{className:"mt-2 text-slate-500 dark:text-slate-400",children:"Browse our growing collection of recipes"})]}),o?e.jsx("div",{className:"mt-4 md:mt-0 h-10 w-40 rounded-full bg-orange-100 dark:bg-orange-500/10 animate-pulse"}):e.jsxs("div",{className:`\r
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
                `,children:[i.total," Recipes Found"]})]}),o?e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:[...Array(6)].map((s,a)=>e.jsx(N,{},a))}):d.length===0?e.jsxs("div",{className:"py-24 text-center",children:[e.jsx("div",{className:`\r
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
                `,children:"🍽️"}),e.jsx("h3",{className:"text-2xl font-bold text-slate-900 dark:text-white",children:"No Recipes Found"}),e.jsx("p",{className:"mt-3 text-slate-500 dark:text-slate-400",children:"Try adjusting your filters or search criteria."})]}):e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:d.map((s,a)=>e.jsx(C,{recipe:s,index:a},s._id))})]})]})]})})};export{V as default};
