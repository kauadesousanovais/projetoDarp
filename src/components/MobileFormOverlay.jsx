import { useState } from 'react';
import { apiService } from '../services/api';
import { useFormValidation } from '../hooks/useFormValidation';

const MobileFormOverlay = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    dateBirth: '',
    phone: '',
    note:'',
  });
  
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
      alert('Cadastro realizado com sucesso!');
      onClose();
      setFormData({
        name: '',
        username: '',
        email: '',
        dateBirth: '',
        phone: '',
        note: '',
      });
    } else {
      handleApiError(result.error);
    }
  };

  const handleApiError = (errorData) => {
    if (errorData.message) {
      if (errorData.message.includes('Email already exists') || 
          errorData.message.includes('already exists') ||
          errorData.message.includes('já existe')) {
        setError('email', 'Este e-mail já está cadastrado');
      } else if (errorData.message.includes('Invalid email') ||
                 errorData.message.includes('email inválido')) {
        setError('email', 'Por favor, insira um e-mail válido');
      } else {
        alert(`Erro: ${errorData.message}`);
      }
    } else {
      alert('Erro desconhecido ao criar conta. Tente novamente.');
    }
  };

  
  if (!isOpen) return null;

  return (
    <div 
      id="mobileFormOverlay"
      className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 bg-gray-800 rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto mobile-form-container">
        {/* Header do overlay */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-600">
          <h3 className="text-xl font-bold text-white">Criar Conta</h3>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-purple-300 p-2"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        {/* Formulário Mobile */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="mobileName" className="block text-sm font-medium text-white mb-2">
              Nome completo
            </label>
            <input 
              type="text" 
              id="mobileName" 
              name="name" 
              placeholder="Seu nome completo" 
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition duration-200 text-black"
            />
            {errors.name && (
              <div className="text-red-500 text-sm mt-1">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.name}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="mobileUsername" className="block text-sm font-medium text-white mb-2">
              Nome de usuário
            </label>
            <input 
              type="text"
              id="mobileUsername"
              name="username"
              placeholder="Seu nome de usuário"
              required
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition duration-200 text-black"
            />
            {errors.username && (
              <div className="text-red-500 text-sm mt-1">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.username}
              </div>
            )}
          </div>  
          
          <div>
            <label htmlFor="mobileEmail" className="block text-sm font-medium text-white mb-2">
              E-mail
            </label>
            <input 
              type="email" 
              id="mobileEmail" 
              name="email" 
              placeholder="seu@email.com" 
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition duration-200 text-black"
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.email}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="mobiledateBirth" className="block text-sm font-medium text-white mb-2">
              Data de Nascimento
            </label>
            <input 
              type="date" 
              id="dateBirth" 
              name="dateBirth" 
              required
              value={formData.dateBirth}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition duration-200 text-black"
            />
            {errors.dateBirth && (
              <div className="text-red-500 text-sm mt-1">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.dateBirth}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="mobilePhone" className="block text-sm font-medium text-white mb-2">
              Telefone
            </label>  
            <input 
              type="text"
              id="mobilePhone"
              name="phone"
              placeholder="(99) 99999-9999"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition duration-200 text-black"
            />
            {errors.phone && (
              <div className="text-red-500 text-sm mt-1">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.phone}
              </div>
            )}
          </div>
          
          <div className="relative">
            <label htmlFor="mobilenote" className="block text-sm font-medium text-white mb-2">
              Localidade
            </label>
            <input 
              type="text"
              id="mobilenote" 
              name="note" 
              placeholder="Sua localidade" 
              required
              value={formData.note}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition duration-200 text-black pr-12"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold py-4 px-4 rounded-xl transition duration-200 mt-4 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            <span>{loading ? 'Processando...' : 'Criar conta'}</span>
            {loading && <span className="loading ml-2"></span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MobileFormOverlay;