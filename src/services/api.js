const API_BASE_URL = 'http://localhost:3000';

export const apiService = {
  async registerUser(userData) {
    try {
      const payload = {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        dateBirth: userData.dateBirth, 
        phone: userData.phone,
        note: userData.note
      };

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      

      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data };
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      return { success: false, error: { message: 'Erro de conexão com a API.' } };
    }
  }
};
