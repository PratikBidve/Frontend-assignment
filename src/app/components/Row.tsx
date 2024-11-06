import React from 'react';
import { useFieldArray, Controller, Control, UseFormSetValue, useWatch } from 'react-hook-form';
import { Input, Label, Dropdown, Button, Option } from '@fluentui/react-components';
import { FormValues } from '../utils/validationSchema';

interface RowProps {
  sectionIndex: number;
  rowIndex: number;
  control: Control<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}

const Row: React.FC<RowProps> = ({ sectionIndex, rowIndex, control, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.rows.${rowIndex}.fields`,
  });

  return (
    <div className="p-4 border rounded mb-2">
      {fields.map((field, fieldIndex) => {
        // Watch the size field to trigger re-renders immediately on change
        const selectedSize = useWatch({
          control,
          name: `sections.${sectionIndex}.rows.${rowIndex}.fields.${fieldIndex}.size`,
          defaultValue: 'small', // Set a default value for initial rendering
        });

        // Inline style for width based on selected size
        const widthStyle = {
          width: selectedSize === 'small' ? '25%' :
                 selectedSize === 'medium' ? '50%' :
                 selectedSize === 'large' ? '75%' : '100%',
          transition: 'width 0.3s ease',
        };

        return (
          <div key={field.id} className="flex gap-4 mb-2 items-center" style={widthStyle}>
            <Controller
              name={`sections.${sectionIndex}.rows.${rowIndex}.fields.${fieldIndex}.label`}
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col flex-grow">
                  <Label htmlFor={field.name}>Field Label</Label>
                  <Input {...field} id={field.name} placeholder="Enter field label" />
                  {fieldState.error && <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>}
                </div>
              )}
            />

            {/* Field Size Dropdown */}
            <Controller
              name={`sections.${sectionIndex}.rows.${rowIndex}.fields.${fieldIndex}.size`}
              control={control}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  placeholder="Field Size"
                  onOptionSelect={(_, data) => {
                    if (data.optionValue) {
                      setValue(
                        `sections.${sectionIndex}.rows.${rowIndex}.fields.${fieldIndex}.size`,
                        data.optionValue as "small" | "medium" | "large" | "extra-large"
                      );
                    }
                  }}
                  className="min-w-[120px] relative z-20" // High z-index to avoid overlap
                >
                  {["small", "medium", "large", "extra-large"].map(size => (
                    <Option key={size} value={size}>{size}</Option>
                  ))}
                </Dropdown>
              )}
            />

            <Button onClick={() => remove(fieldIndex)} className="text-red-500">Delete Field</Button>
          </div>
        );
      })}
      <Button onClick={() => append({ label: '', size: 'small' })}>+ Add Field</Button>
    </div>
  );
};

export default Row;
