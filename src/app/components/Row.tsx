import React from 'react';
import { useFieldArray, Controller, Control, UseFormSetValue } from 'react-hook-form';
import { Button, Input, Label } from '@fluentui/react-components';
import Field from './Field';
import { FormValues } from '../utils/validationSchema';

interface RowProps {
  sectionIndex: number;
  rowIndex: number;
  control: Control<FormValues>; // Use the correct type
  setValue: UseFormSetValue<FormValues>; // Ensure setValue matches the expected signature
}

const Row: React.FC<RowProps> = ({ sectionIndex, rowIndex, control, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.rows.${rowIndex}.fields`,
  });

  return (
    <div className="p-4 border rounded mb-2">
      {fields.map((field, fieldIndex) => (
        <Field
          key={field.id}
          sectionIndex={sectionIndex}
          rowIndex={rowIndex}
          fieldIndex={fieldIndex}
          control={control}
          setValue={setValue}
          onDeleteField={() => remove(fieldIndex)} // Pass the remove function correctly
        />
      ))}
      <Button onClick={() => append({ label: '', size: 'small' })}>+ Add Field</Button>
    </div>
  );
};

export default Row;
