import React from 'react';
import { useFieldArray, Controller, Control, UseFormSetValue } from 'react-hook-form';
import { Button, Input, Label } from '@fluentui/react-components';
import Row from './Row';
import { FormValues } from '../utils/validationSchema';

interface SectionProps {
  sectionIndex: number;
  control: Control<FormValues>;
  setValue: UseFormSetValue<FormValues>; // Update setValue type
  removeSection: () => void;
}

const Section: React.FC<SectionProps> = ({ sectionIndex, control, setValue, removeSection }) => {
  const { fields: rowFields, append: addRow } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.rows`,
  });

  return (
    <div className="p-4 border rounded mb-2">
      <Controller
        name={`sections.${sectionIndex}.label`}
        control={control}
        render={({ field, fieldState }) => (
          <div className="flex flex-col mb-2">
            <Label htmlFor={field.name}>Section Name</Label>
            <Input {...field} id={field.name} placeholder="Enter section name" />
            {fieldState.error && <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>}
          </div>
        )}
      />
      {rowFields.map((row, rowIndex) => (
        <Row
          key={row.id}
          sectionIndex={sectionIndex}
          rowIndex={rowIndex}
          control={control}
          setValue={setValue} // Pass setValue to Row
        />
      ))}
      <Button onClick={() => addRow({ fields: [{ label: '', size: 'small' }] })}>+ Add Row</Button>
      <Button onClick={removeSection} className="text-red-500">Delete Section</Button>
    </div>
  );
};

export default Section;
