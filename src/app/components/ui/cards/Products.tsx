import { fetchProductsTags } from '@/redux/slices/getProductsTags';
import { RootState } from '@/redux/store';
import { ProductInterface } from '@/types/products';
import React, { useEffect, Suspense, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Step5Props {
  selectedInterests: string[];
  handleInterestToggle: (interest: string) => void;
}

const Loader: React.FC = () => (
  <div className="animate-pulse">Loading products...</div>
);

const SkeletonLoader: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="animate-pulse p-4 h-12 bg-gray-300 rounded-md"></div>
      <div className="animate-pulse p-4 h-12 bg-gray-300 rounded-md"></div>
      <div className="animate-pulse p-4 h-12 bg-gray-300 rounded-md"></div>
    </div>
  );
};

const Products: React.FC<Step5Props> = ({ selectedInterests, handleInterestToggle }) => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const { products, success, error } = useSelector(
    (state: RootState) => state.productsTags
  ) as ProductInterface;

  useEffect(() => {
    dispatch(fetchProductsTags());
  }, [dispatch]);

  if (error) return <div>Error: {error}</div>;

  const displayedProducts = showAll ? products : products.slice(0, 17);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-center">What are your product interests?</h2>
      <p className="text-gray-600 mb-7 text-center">Choose three or more.</p>
      <Suspense fallback={<Loader />}>
        <div className={`flex flex-wrap gap-2 mb-4 justify-center ${showAll ? 'max-h-96 overflow-y-auto' : ''}`}>
          {!success ? (
            <SkeletonLoader />
          ) : (
            <>
              {displayedProducts.length > 0 ? (
                displayedProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleInterestToggle(product.name)}
                    className={`px-3 py-1 rounded-full border ${
                      selectedInterests.includes(product.name)
                        ? 'bg-purple-100 border-purple-300 text-purple-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {product.name}
                  </button>
                ))
              ) : (
                <p>No products found</p>
              )}
            </>
          )}
        </div>
      </Suspense>
      {products.length > 17 && (
        <div className="flex justify-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-purple-500 hover:underline"
          >
            {showAll ? 'Show less' : 'Show more'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
