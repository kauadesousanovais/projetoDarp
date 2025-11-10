import { useState } from 'react';
import { apiService } from '../services/api';
import { useFormValidation } from '../hooks/useFormValidation';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    dateBirth: '',
    phone: '',
    note:''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const { errors, loading, setLoading, validateForm, clearErrors, setError } = useFormValidation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      clearErrors();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([field, message]) => {
        setError(field, message);
      });
      return;
    }

    setLoading(true);

    const result = await apiService.registerUser({
      name: formData.name,
      username: formData.username,
      email: formData.email,
      dateBirth: formData.dateBirth,
      phone: formData.phone,
      note: formData.note,
    });

    setLoading(false);

    if (result.success) {
      setShowSuccess(true);
      setFormData({
        name: '',
        username: '',
        email: '',
        dateBirth: '',
        phone: '',
        note: ''
      });
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } else {
      handleApiError(result.error);
    }
  };

  const handleApiError = (errorData) => {
    if (errorData.message) {
      if (errorData.message.includes('já existe')) {
        setError('email', 'Este e-mail já está cadastrado');
      } else if (errorData.message.includes('email inválido')) {
        setError('email', 'Por favor, insira um e-mail válido');
      } else {
        alert(`Erro: ${errorData.message}`);
      }
    } else {
      alert('Erro desconhecido ao criar conta. Tente novamente.');
    }
  };

  return (
    <div className="w-full p-8 lg:p-12 flex flex-col justify-center lg:min-h-[600px]">
      <div className="w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-orange-600 font-bold text-xl mr-3">
            RC
          </div>
          <div className="text-2xl font-bold text-gray-200">ReelsCommunity</div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-200 mb-2">Criar uma conta</h1>
        <p className="text-gray-200 mb-6">Preencha os dados abaixo para se registrar</p>
        
        {/* Mensagem de Sucesso */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            <i className="fas fa-check-circle mr-2"></i>
            Cadastro realizado com sucesso!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
              Nome completo
            </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Seu nome completo" 
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition duration-200"
            />
            {errors.name && (
              <div className="text-black text-sm mt-1">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.name}
              </div>
            )}
          </div>

          {/* Nome de usuário */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-1">
              Nome de usuário
            </label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Seu nome de usuário" 
              required
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition duration-200"
            />
            {errors.username && (
              <div className="text-black text-sm mt-1">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.username}
              </div>
            )}
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
              E-mail
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="seu@email.com" 
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition duration-200"
            />
            {errors.email && (
              <div className="text-black text-sm mt-1">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.email}
              </div>
            )}
          </div>

          {/* Data de Nascimento */}
          <div>
            <label htmlFor="dateBirth" className="block text-sm font-medium text-gray-200 mb-1">
              Data de Nascimento
            </label>
            <input 
              type="date" 
              id="dateBirth" 
              name="dateBirth" 
              required
              value={formData.dateBirth}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition duration-200"
            />
            {errors.dateBirth && (
              <div className="text-black text-sm mt-1">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.dateBirth}
              </div>
            )}
          </div>

          {/* Telefone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-1">
              Telefone
            </label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              placeholder="(00) 00000-0000"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition duration-200"
            />
            {errors.phone && (
              <div className="text-black text-sm mt-1">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.phone}
              </div>
            )}
          </div>
          
          {/* Localidade */}
          <div className="relative">
            <label htmlFor="note" className="block text-sm font-medium text-gray-200 mb-1">
              Localidade
            </label>
            <input 
              type="text"
              id="note" 
              name="note" 
              placeholder="Sua localidaede" 
              required
              value={formData.note}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition duration-200 pr-12"
            />
          </div>
          
          {/* Botão de Envio */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-purple-900 hover:bg-purple-950 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            <span>{loading ? 'Processando...' : 'Criar conta'}</span>
            {loading && <span className="loading ml-2"></span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;