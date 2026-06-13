import axios from "axios"

export const recommendRecipeTool = async (difficulty:string)=>{
    const res = await axios.post(`http://localhost:5000/api/recipes/recommend`,{
        difficulty
    });
    return res.data;
}