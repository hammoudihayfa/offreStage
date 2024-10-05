import axios from 'axios';

async function testUpdate() {
  try {
    const response = await axios.post('http://localhost:3000/api/user/update', {
      name: "hayfa",
      email: "hammoudi.hayfa@esprit.tn",
      
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

testUpdate();
