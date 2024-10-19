import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResponsabilities } from '@/redux/slices/getResponsabilities';
import { RootState } from '@/redux/store';
import { ResponsabilitiesInterface } from '@/types/responsabilities';
import { Step3Props } from '@/types/responsabilities';


const SkeletonButton = () => (
  <div className="animate-pulse p-4 h-12 w-20 bg-gray-300 rounded-md"></div>
);

const MainResponsabilities: React.FC<Step3Props> = ({ selectedResponsibility, setSelectedResponsibility }) => {
  const dispatch = useDispatch();
  const { responsabilities, success, error } = useSelector(
    (state: RootState) => state.responsabilities
  ) as ResponsabilitiesInterface;

  useEffect(() => {
    dispatch(fetchResponsabilities());
  }, [dispatch]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">What is your main work responsibility?</h2>
      <div className="grid grid-cols-2 gap-4">
        {!success ? (
          <SkeletonLoader/>
        ) : (
          responsabilities.length > 0 ? (
            responsabilities.map((res) => (
              <button
                key={res.id}
                className={`text-left p-4 rounded-md transition-colors ${
                  selectedResponsibility === res.name
                    ? 'bg-purple-100 border-2 border-purple-500'
                    : 'border border-gray-300 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedResponsibility(res.name)}
              >
                {res.name}
              </button>

            ))
          ) : (
            <p>No responsibilities found</p>
          )
        )}
      </div>
    </div>
  );
};
const SkeletonLoader: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <SkeletonButton />
      <SkeletonButton />
      <SkeletonButton />
      <SkeletonButton />
      <SkeletonButton />
      <SkeletonButton />
    </div>
  );
};

export default MainResponsabilities;
