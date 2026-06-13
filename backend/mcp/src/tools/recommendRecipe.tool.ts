import axios from "axios"

export const recommendRecipeTool = async (difficulty:string)=>{

    console.log("recommendRecipeTool called");
    console.log("difficulty =", difficulty);
    const res = await axios.post(`https://makeyourrecipe.onrender.com/api/recipes/recommend`,{
        difficulty
    });

     console.log("API Response Status =", res.status);
    return res.data;
}