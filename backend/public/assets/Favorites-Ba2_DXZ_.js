import{r as n,I as m,n as e,p as l,H as x}from"./index-SajGUMu6.js";import{R as g}from"./RecipeCard-Dh3G-5HS.js";import{S as d}from"./SkeletonCard-Bbb7ylaP.js";import{B as h}from"./bookmark-C-adv9fv.js";import"./recipeService-DFNdNRzf.js";import"./eye-WFSbSeAT.js";const N=()=>{const[a,c]=n.useState([]),[t,i]=n.useState(!0);n.useEffect(()=>{o()},[]);const o=async()=>{i(!0);try{const r=await m.getFavorites();c(r.data||[])}catch(r){console.error("Error fetching favorites:",r)}finally{i(!1)}};return t&&a.length===0?e.jsx("div",{className:"min-h-screen bg-slate-50 dark:bg-slate-950",children:e.jsxs("div",{className:"container mx-auto px-4 py-8",children:[e.jsx("div",{className:`\r
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
          `}),e.jsxs("div",{className:`\r
            rounded-[32px]\r
            border\r
            border-slate-200\r
            dark:border-slate-800\r
            bg-white\r
            dark:bg-slate-900\r
            p-8\r
          `,children:[e.jsxs("div",{className:"flex items-center justify-between mb-8",children:[e.jsxs("div",{children:[e.jsx("div",{className:"h-8 w-52 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse mb-3"}),e.jsx("div",{className:"h-4 w-72 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse"})]}),e.jsx("div",{className:"h-10 w-32 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse"})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:[...Array(6)].map((r,s)=>e.jsx(d,{},s))})]})]})}):e.jsx("div",{className:"min-h-screen bg-slate-50 dark:bg-slate-950",children:e.jsxs("div",{className:"container mx-auto px-4 py-8",children:[e.jsxs(l.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"relative overflow-hidden rounded-[40px] mb-10",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500"}),e.jsx("div",{className:"absolute inset-0 bg-black/10"}),e.jsxs("div",{className:"relative z-10 px-8 py-14 md:px-12 text-white",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-4",children:[e.jsx("div",{className:"flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md",children:e.jsx(x,{className:"h-7 w-7 text-white"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-4xl md:text-6xl font-black",children:"My Favorites"}),e.jsx("p",{className:"mt-2 text-white/90",children:"Your personal collection of saved recipes"})]})]}),!t&&e.jsxs("div",{className:`\r
                  inline-flex\r
                  items-center\r
                  rounded-full\r
                  bg-white/20\r
                  px-4\r
                  py-2\r
                  text-sm\r
                  font-medium\r
                  backdrop-blur-md\r
                `,children:["❤️ ",a.length," Saved Recipes"]})]})]}),e.jsx("div",{className:`\r
            rounded-[32px]\r
            border\r
            border-slate-200\r
            dark:border-slate-800\r
            bg-white\r
            dark:bg-slate-900\r
            p-6\r
            md:p-8\r
          `,children:t?e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:[...Array(6)].map((r,s)=>e.jsx(l.div,{initial:{opacity:0},animate:{opacity:1},transition:{delay:s*.05},children:e.jsx(d,{})},s))}):a.length===0?e.jsxs("div",{className:"py-24 text-center",children:[e.jsx("div",{className:`\r
                  mx-auto\r
                  mb-6\r
                  flex\r
                  h-24\r
                  w-24\r
                  items-center\r
                  justify-center\r
                  rounded-3xl\r
                  bg-orange-100\r
                  dark:bg-orange-500/10\r
                `,children:e.jsx(h,{className:"h-10 w-10 text-orange-500"})}),e.jsx("h3",{className:"text-3xl font-black text-slate-900 dark:text-white mb-3",children:"No Favorites Yet"}),e.jsx("p",{className:"max-w-md mx-auto text-slate-500 dark:text-slate-400 leading-relaxed",children:"Start building your recipe collection by bookmarking dishes you love. Your saved recipes will appear here."})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center justify-between mb-8",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-3xl font-black text-slate-900 dark:text-white",children:"Saved Recipes"}),e.jsx("p",{className:"mt-2 text-slate-500 dark:text-slate-400",children:"All your favorite recipes in one place"})]}),e.jsxs("div",{className:`\r
                    hidden\r
                    md:inline-flex\r
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
                  `,children:[a.length," Recipes"]})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:a.map((r,s)=>e.jsx(g,{recipe:r,index:s},r._id))})]})})]})})};export{N as default};
