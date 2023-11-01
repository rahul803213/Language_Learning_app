import { BASE_URL } from "@/client-helper/config";

export const fetchLessonApi= async(language) => {
    try {
        const response = await fetch(`${BASE_URL}/lessons/${language}`);
        const data= await response.json();
        return data;
        
    } catch (error) {
        
    }
}