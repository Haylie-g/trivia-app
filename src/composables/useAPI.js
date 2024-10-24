import axios from "axios";
import { ref } from 'vue'

const instance = axios.create({
    baseURL: 'https://opentdb.com/', // Correct URL
})

const categories = ref([])

// Shuffle function
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // swap
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array; // Added return statement
}

export default function useAPI() {
    const getCategories = async () => {
        if (categories.value.length === 0) {
            const response = await instance.get('api_category.php')
            categories.value = response.data.trivia_categories
        }
    }
    
    const getQuestion = async (categoryID) => {
        const response = await instance.get('api.php', {
            params: {
                amount: 1,
                category: categoryID,
            }
        })
        
        return response.data.results[0]; // Uncommented line
    }
    
    return { instance, categories, getCategories, getQuestion } // Added getQuestion
}
