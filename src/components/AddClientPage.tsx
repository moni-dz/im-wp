'use client';

import { addClient } from '@/app/lib/actions';

interface AddClientPageProps {
  onBackClick: () => void;
}

const AddClientPage = ({ onBackClick }: AddClientPageProps) => {

  return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form action={addClient}>
          <div className="bg-blue-950 p-6 rounded-lg">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block font-geoformHeavy text-sm text-white mb-1">name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                
                <label htmlFor="gender" className="block font-geoformHeavy text-sm text-white mt-4 mb-1">gender</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  className="w-full px-3 py-2 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block font-geoformHeavy text-sm text-white mb-1">e-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="contactNumber" className="block font-geoformHeavy text-sm text-white mb-1">contact number</label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  className="w-full px-3 py-2 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="street" className="block font-geoformHeavy text-sm text-white mb-1">street</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  className="w-full px-3 py-2 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="barangay" className="block font-geoformHeavy text-sm text-white mb-1">barangay</label>
                <input
                  type="text"
                  id="barangay"
                  name="barangay"
                  className="w-full px-3 py-2 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="city" className="block font-geoformHeavy text-sm text-white mb-1">city</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full px-3 py-2 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="province" className="block font-geoformHeavy text-sm text-white mb-1">province</label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  className="w-full px-3 py-2 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={onBackClick}
              className="px-6 py-2 bg-gray-200 font-geoformHeavy rounded-md shadow-sm text-md font-medium text-gray-700 hover:bg-gray-300"
            >
              BACK
            </button>
            
            <button
              type="submit"
              className="px-6 py-2 bg-white font-geoformHeavy rounded-md shadow-sm text-md font-medium border text-gray-700 hover:bg-blue-950 hover:text-white border-blue-950"            >
              ADD CLIENT
            </button>
          </div>
        </form>
      </div>
  );
};

export default AddClientPage;