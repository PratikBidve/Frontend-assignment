import React, { useState } from 'react';
import { Control, useWatch } from 'react-hook-form';
import { Dropdown, Option } from '@fluentui/react-components';
import { FormValues } from '../utils/validationSchema';

interface FieldProps {
  sectionIndex: number;
  rowIndex: number;
  fieldIndex: number;
  control: Control<FormValues>;
  setValue: (name: `sections.${number}.rows.${number}.fields.${number}.size`, value: any) => void;
  onDeleteField: () => void;
}

const sizeOptions = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
  { label: 'Extra Large', value: 'extra-large' },
];

const Field: React.FC<FieldProps> = ({ sectionIndex, rowIndex, fieldIndex, control, setValue, onDeleteField }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedSize = useWatch({
    control,
    name: `sections.${sectionIndex}.rows.${rowIndex}.fields.${fieldIndex}.size`,
  });

  const widthStyle = {
    width: selectedSize === 'small' ? '25%' :
           selectedSize === 'medium' ? '50%' :
           selectedSize === 'large' ? '75%' : '100%',
    transition: 'width 0.3s ease',
  };

  const handleOptionSelect = (data: any) => {
    setValue(`sections.${sectionIndex}.rows.${rowIndex}.fields.${fieldIndex}.size`, data.optionValue);
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={`flex items-center gap-4 p-2 border border-gray-300 rounded-md ${isDropdownOpen ? 'bg-blue-100' : 'bg-white'}`}
      style={widthStyle}
    >
      <div className="relative w-full"> {/* Container for dropdown */}
        <Dropdown
          placeholder="Select Size"
          onOptionSelect={(_, data) => handleOptionSelect(data)}
          onOpenChange={(event, data) => setIsDropdownOpen(data.open)}
          className={`min-w-[120px] z-20 transition-colors duration-200 ease-in-out ${isDropdownOpen ? 'bg-blue-200' : 'bg-white'} hover:bg-blue-300 focus:bg-blue-300`}
          style={{
            boxShadow: isDropdownOpen ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
            width: '200px', // Set a fixed width for the dropdown
          }} 
        >
          {sizeOptions.map(size => (
            <Option 
              key={size.value} 
              value={size.value} 
              className={`py-2 px-3 ${size.value === selectedSize ? 'bg-blue-300 text-white' : 'text-black'}`} // Highlight selected option
            >
              {size.label}
            </Option>
          ))}
        </Dropdown>
      </div>

      <button 
        onClick={onDeleteField} 
        className="text-red-500 ml-5" // Added margin-left for separation
      >
        Delete Field
      </button>
    </div>
  );
};

export default Field;
