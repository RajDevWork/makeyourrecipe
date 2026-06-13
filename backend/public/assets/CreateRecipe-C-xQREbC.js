import{D as o,n as e,p as i,C as d,J as n}from"./index-SajGUMu6.js";import{P as m,R as x}from"./RecipeForm-DpvnTRLn.js";import{r as p}from"./recipeService-DFNdNRzf.js";import"./categoryService-CRoJXlj2.js";const v=()=>{const l=o(),c=async s=>{var a,t;try{console.log("formData = ",s);const r=await p.createRecipe(s);n.success("Recipe created successfully!"),l(`/recipe/${r.data._id}`)}catch(r){n.error(((t=(a=r.response)==null?void 0:a.data)==null?void 0:t.message)||"Failed to create recipe")}};return e.jsx("div",{className:"min-h-screen bg-slate-50 dark:bg-slate-950",children:e.jsxs("div",{className:"container mx-auto px-4 py-8 max-w-7xl",children:[e.jsxs(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"relative overflow-hidden rounded-[40px] mb-10",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500"}),e.jsx("div",{className:"absolute inset-0 bg-black/10"}),e.jsxs("div",{className:"relative z-10 px-8 py-14 md:px-12 text-white",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-4",children:[e.jsx("div",{className:`\r
                  flex\r
                  h-14\r
                  w-14\r
                  items-center\r
                  justify-center\r
                  rounded-2xl\r
                  bg-white/20\r
                  backdrop-blur-md\r
                `,children:e.jsx(m,{className:"h-7 w-7 text-white"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-4xl md:text-6xl font-black",children:"Create Recipe"}),e.jsx("p",{className:"mt-2 text-white/90",children:"Share your culinary creation with food lovers around the world."})]})]}),e.jsxs("div",{className:`\r
                inline-flex\r
                items-center\r
                gap-2\r
                rounded-full\r
                bg-white/20\r
                px-4\r
                py-2\r
                text-sm\r
                font-medium\r
                backdrop-blur-md\r
              `,children:[e.jsx(d,{className:"h-4 w-4"}),"Publish Your Signature Dish"]})]})]}),e.jsxs(i.div,{initial:{opacity:0,y:15},animate:{opacity:1,y:0},transition:{delay:.1},className:`\r
            rounded-[32px]\r
            border\r
            border-slate-200\r
            dark:border-slate-800\r
            bg-white\r
            dark:bg-slate-900\r
            p-6\r
            md:p-10\r
            shadow-sm\r
          `,children:[e.jsxs("div",{className:"mb-8",children:[e.jsx("h2",{className:"text-3xl font-black text-slate-900 dark:text-white",children:"Recipe Details"}),e.jsx("p",{className:"mt-2 text-slate-500 dark:text-slate-400",children:"Fill in the information below to create and publish your recipe."})]}),e.jsx(x,{onSubmit:c})]})]})})};export{v as default};
