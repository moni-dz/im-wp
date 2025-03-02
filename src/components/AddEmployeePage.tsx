import React from 'react';

interface AddEmployeeProps {
  onBack: () => void;
  onAddEmployee: (employeeData: any) => void;
}

const AddEmployeePage: React.FC<AddEmployeeProps> = ({ onBack, onAddEmployee }) => {
  return (
    <div className="bg-gray-100 text-white min-h-screen">
      <div className="container mx-auto py-8 px-4">

        {/* Main content */}
        <div className="flex flex-col">
          {/* Page title */}
          <h1 className="text-3xl text-blue-950 font-bold mb-8">add employee</h1>

          {/* Form container */}
          <div className="bg-blue-950 rounded-lg p-8 mb-8">
            <div className="bg-gray-100 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column */}
                <div className="space-y-6">
                  <div>
                  <label className="block text-blue-950 text-sm mb-2">name</label>
                    <select className="w-full px-3 py-2 bg-white text-gray-500 rounded-md">
                      <option>Select employee</option>
                      {/* options from the database later */}
                    </select>
                  </div>
                  
                  <div>
                  <label className="block text-blue-950 text-sm mb-2">skills</label>
                  <input type="text" className="w-full px-3 py-2 bg-white text-blue-950 rounded-md" placeholder="Auto-filled" readOnly />
                  </div>
                  
                  <div>
                  <label className="block text-blue-950 text-sm mb-2">status</label>
                  <input type="text" className="w-full px-3 py-2 bg-white text-blue-950 rounded-md" placeholder="Auto-filled" readOnly />
                  </div>
                  

                  
                  <div>
                    <label className="block text-blue-950 text-sm mb-2">date contracted</label>
                    <input type="text" className="w-full px-3 py-2 bg-white text-blue-950 rounded-md" />
                  </div>
                </div>
                
                {/* Right column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-blue-950 text-sm mb-2">remarks</label>
                    <textarea className="w-full px-3 py-2 bg-white text-blue-950 rounded-md h-32" />
                  </div>
                  
                  <div>
                    <label className="block text-blue-950 text-sm mb-2">role</label>
                    <textarea className="w-full px-3 py-2 bg-white text-blue-950 rounded-md h-32" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center space-x-8">
            <button onClick={onBack} className="px-12 py-3 bg-blue-950 text-white rounded-md font-medium">
              BACK
            </button>
            
            <button onClick={() => onAddEmployee({})} className="px-12 py-3 bg-blue-950 text-white rounded-md font-medium">
              ADD EMPLOYEE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeePage;
