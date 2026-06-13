import axios from "axios"

export const recommendRecipeTool = async (difficulty:string)=>{
    const res = await axios.post(`https://makeyourrecipe.onrender.com/api/recipes/recommend`,{
        difficulty
    });
    return res.data;
}