import React, { useState } from 'react';
import { Tab, TabList, SelectTabData, SelectTabEvent } from '@fluentui/react-components';
import { useForm, Controller, useFieldArray, UseFormSetValue } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormValues } from '../utils/validationSchema';
import { Input, Dropdown, Button, Label } from '@fluentui/react-components';
import Section from './Section';

const PageLayoutBuilder: React.FC = () => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: '',
      viewType: 'Create',
      sections: [],
    },
  });

  const { fields: sectionFields, append: addSection, remove: removeSection } = useFieldArray({
    control,
    name: 'sections',
  });

  const [selectedTab, setSelectedTab] = useState<string>('Design');

  const handleTabSelect = (event: SelectTabEvent<HTMLElement>, data: SelectTabData) => {
    setSelectedTab(data.value as string);
  };

  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="flex flex-col p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Page Layout Builder</h2>

      <TabList selectedValue={selectedTab} onTabSelect={handleTabSelect}>
        <Tab id="design" value="Design">Design</Tab>
        <Tab id="related-objects" value="Related Objects">Related Objects</Tab>
      </TabList>

      {selectedTab === 'Design' && (
        <div className="flex gap-8 mt-6">
          <div className="w-1/4 bg-white p-4 shadow-md rounded-lg">
            <Button
              onClick={() =>
                addSection({
                  label: '',
                  rows: [{ fields: [{ label: '', size: 'small' }] }],
                })
              }
            >
              + Add Section
            </Button>
            {sectionFields.map((section, index) => (
              <div key={section.id} className="mt-4 p-2 bg-blue-700 text-white rounded flex justify-between items-center">
                <span>New Section</span>
                <Button onClick={() => removeSection(index)} className="ml-2 text-white">
                  🗑️
                </Button>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4 bg-white shadow-md rounded-lg flex-1">
            <div className="flex gap-6 mb-4">
              <Controller
                name="label"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col w-1/2">
                    <Label htmlFor={field.name}>Label</Label>
                    <Input {...field} id={field.name} placeholder="Enter layout name" />
                    {errors.label && <p className="text-red-500 text-sm mt-1">{errors.label.message}</p>}
                  </div>
                )}
              />
              <Controller
                name="viewType"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col w-1/2">
                    <Label htmlFor={field.name}>View Type</Label>
                    <Dropdown {...field} id={field.name} placeholder="Select type">
                      <option value="Create">Create</option>
                      <option value="Edit">Edit</option>
                      <option value="View">View</option>
                    </Dropdown>
                    {errors.viewType && <p className="text-red-500 text-sm mt-1">{errors.viewType.message}</p>}
                  </div>
                )}
              />
            </div>

            {sectionFields.map((section, index) => (
              <Section
                key={section.id}
                sectionIndex={index}
                control={control}
                setValue={setValue} // Pass setValue with proper type
                removeSection={() => removeSection(index)}
              />
            ))}
            <Button type="submit" className="mt-4 bg-blue-500 text-white">
              Save Layout
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PageLayoutBuilder;
