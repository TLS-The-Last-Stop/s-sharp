import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/faq';

export const faqService ={

  getAllFaq: async ()=>{
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  },
  getFaqById: async (id)=>{
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data;
  }

}