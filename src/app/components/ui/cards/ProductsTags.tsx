import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { fetchProducts } from '@/redux/slices/getProducts';
import { Product } from '@/types/products';
import { RootState } from '@/redux/store';
import { AppDispatch } from '@/redux/store';
import { getProductIcon } from '@/db';

interface ProductManageProps {
  selectedProducts: Product[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductManage: React.FC<ProductManageProps> = ({ 
  selectedProducts, 
  setSelectedProducts 
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState('');
  
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleProduct = (product: Product) => {
    setSelectedProducts(prev =>
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  const removeProduct = (product: Product) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== product.id));
  };

  if (loading) return <div className="text-center">Loading products...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Select 3+ products that you use</h2>
        <p className="text-sm text-gray-600">Build your tech stack from the get go.</p>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search products"
          className="w-full pl-10 pr-4 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          size={20} 
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {selectedProducts.map(product => (
              <div 
                key={product.id} 
                className="flex items-center px-3 py-1.5 rounded-full bg-purple-100 text-sm border border-purple-200 animate-fadeIn"
              >
                <span className="mr-2 text-lg" role="img" aria-label="product icon">
                  {getProductIcon(product.id)}
                </span>
                <span className="text-purple-900">{product.name}</span>
                <button
                  className="ml-2 text-purple-400 hover:text-purple-600 focus:outline-none"
                  onClick={() => removeProduct(product)}
                  aria-label={`Remove ${product.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {filteredProducts.map(product => {
          const isSelected = selectedProducts.some(p => p.id === product.id);
          return (
            <div
              key={product.id}
              className={`flex items-center justify-between p-3 border rounded-md cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'bg-purple-50 border-purple-200' 
                  : 'hover:bg-gray-50 hover:border-gray-300'
              }`}
              onClick={() => toggleProduct(product)}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
            >
              <div className="flex items-center flex-1">
                <span 
                  className="mr-3 text-xl transition-transform duration-200 hover:scale-110" 
                  role="img" 
                  aria-label="product icon"
                >
                  {getProductIcon(product.id)}
                </span>
                <span className={`font-medium ${isSelected ? 'text-purple-900' : 'text-gray-800'}`}>
                  {product.name}
                </span>
              </div>
              {!isSelected && (
                <CiCirclePlus 
                  className="h-6 w-6 text-gray-400 hover:text-purple-500 transition-colors duration-200"
                  aria-label="Select product"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductManage;