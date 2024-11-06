import React from 'react';
import { Control, useWatch } from 'react-hook-form';
import { Dropdown, Option } from '@fluentui/react-components';

interface FieldProps {
  sectionIndex: number;
  rowIndex: number;
  fieldIndex: number;
  control: Control;
  setValue: (name: string, value: any) => void; // Updated type for setValue
  onDeleteField: () => void;
}

const sizeOptions = [
  { label: 'Small', value: 'small', width: '25%' },
  { label: 'Medium', value: 'medium', width: '50%' },
  { label: 'Large', value: 'large', width: '75%' },
  { label: 'Extra Large', value: 'extra-large', width: '100%' },
];

const Field: React.FC<FieldProps> = ({ sectionIndex, rowIndex, fieldIndex, control, setValue, onDeleteField }) => {
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

  return (
    <div
      className="flex items-center gap-4 p-2 bg-white border border-gray-300 rounded-md"
      style={widthStyle}
    >
      <Dropdown
        placeholder="Select Size"
        onOptionSelect={(_, data) => {
          setValue(`sections.${sectionIndex}.rows.${rowIndex}.fields.${fieldIndex}.size`, data.optionValue);
        }}
        className="min-w-[120px] relative z-10"
      >
        {sizeOptions.map(size => (
          <Option key={size.value} value={size.value}>{size.label}</Option>
        ))}
      </Dropdown>

      {/* Delete Button Example */}
      <button onClick={onDeleteField} className="text-red-500">Delete Field</button>
    </div>
  );
};

export default Field;
