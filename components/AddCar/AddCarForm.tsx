'use client';

import * as Form from '@radix-ui/react-form';
import { formItems } from '@/constants/index';
import Image from '@/node_modules/next/image';
import { v4 as uuidv4 } from 'uuid';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';
import SelectCountryInput from '../SelectCountryInput';

const AddCarForm = () => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    car_title: string | null;
    price: number | null;
    location: string | null;
    fuel_capacity: number | null;
    short_description: string | null;
    car_type: string | null;
    transmission: string | null;
    capacity: string | null;
  }>({
    car_title: null,
    price: null,
    location: null,
    fuel_capacity: null,
    short_description: null,
    car_type: null,
    transmission: null,
    capacity: null,
  });

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user ?? null);
    };
    getUser();
  }, [supabase]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadImageToSupabase = async () => {
    if (selectedFile) {
      const supabase = createClientComponentClient();

      const { data, error } = await supabase.storage
        .from('images')
        .upload(user?.id + '/' + uuidv4(), selectedFile, {
          cacheControl: '3600',
        });

      if (error) {
        console.log(error);
      }
      console.log(data);
    }
  };

  const handleRegisterCar = async () => {
    const carId = uuidv4();
    uploadImageToSupabase();

    const { data, error } = await supabase.from('cars').insert([
      {
        ...formData,
        car_id: carId,
        owner_id: user?.id,
        location: setSelectedLocation,
      },
    ]);

    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(file); // Update the selected file
      setPreviewUrl(imageUrl);
    }
  };

  return (
    <Form.Root className='w-full'>
      <section className='grid w-full gap-8 md:grid-cols-2'>
        {formItems.map((item, index) => (
          <Form.Field key={index} className='grid gap-4' name={item.title}>
            <div className='flex items-baseline'>
              <Form.Label className='text-sm font-semibold text-gray-900 dark:text-white-0'>
                {item.title}
              </Form.Label>
              <Form.Message
                className='px-2 text-sm font-normal text-red-500'
                match='valueMissing'
              >
                Required
              </Form.Message>
            </div>
            <Form.Control asChild>
              {item.title === 'Location' ? (
                <SelectCountryInput
                  selected={selectedLocation}
                  setSelected={setSelectedLocation}
                />
              ) : item.options ? (
                <div className='flex w-full'>
                  <div className='relative inline-flex h-14 w-full'>
                    <select
                      className='inline-flex h-14 w-full resize-none appearance-none items-center justify-center rounded-md bg-white-200 px-[18px] py-[14px] text-sm leading-7 text-gray-400 outline-none selection:bg-white-200 hover:shadow-[0_0_0_1px] focus:shadow-[0_0_0_1px] dark:bg-gray-800 dark:text-white-200'
                      required
                      defaultValue=''
                      name={item.name} // Add name attribute
                      value={formData[item.name]} // Use form data value
                      onChange={handleInputChange} // Use the common select change handler
                    >
                      <option value='' disabled>
                        {item.placeholder}
                      </option>
                      {item.options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <input
                  className='inline-flex h-14 w-full resize-none appearance-none items-center justify-center rounded-md bg-white-200 px-[18px] py-[14px]  text-sm leading-7 text-gray-900 outline-none selection:bg-white-200 placeholder:text-gray-400 hover:shadow-[0_0_0_1px] focus:shadow-[0_0_0_1px] dark:bg-gray-800 dark:text-white-200 dark:placeholder:text-white-200'
                  name={item.name} // Add name attribute
                  placeholder={item.placeholder}
                  value={formData[item.name]} // Use form data value
                  onChange={handleInputChange} // Use the common input change handler
                  required
                />
              )}
            </Form.Control>
          </Form.Field>
        ))}
      </section>

      <h2 className='mt-6 text-sm font-semibold text-gray-900 dark:text-white-0 md:mt-11'>
        Upload Images
      </h2>

      <div className='mt-6 flex w-full items-center justify-center md:mt-5'>
        <label
          htmlFor='dropzone-file'
          className='flex h-[184px] w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-400 bg-white hover:bg-blue-50 dark:bg-gray-850 md:rounded-[7px]'
        >
          <div className='flex flex-col items-center justify-center pt-5'>
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt='Preview'
                className='mb-2 w-full'
                width={200}
                height={200}
              />
            ) : (
              <>
                <Image
                  src='/img/outline.svg'
                  alt='Upload'
                  height={28}
                  width={29}
                />

                <p className='mt-2.5 text-sm font-medium leading-7 text-blue-500 md:text-[14.91px] md:leading-[29.81px]'>
                  <span className='text-gray-700'>
                    Drag and drop images, or{' '}
                  </span>{' '}
                  Browse
                </p>
                <p className='text-[12.82px] font-normal leading-relaxed text-gray-400 md:text-sm md:leading-7'>
                  High resolution images (png, jpg, gif)
                </p>
              </>
            )}
          </div>
          <input
            id='dropzone-file'
            type='file'
            className='hidden'
            onChange={uploadImage}
          />
          <Form.Field name='dropzone'>
            <Form.Control
              type='file'
              accept='image/png, image/jpeg, image/gif'
              className='hidden'
            />
          </Form.Field>
        </label>
      </div>

      <Form.Submit className='mt-7 w-full md:ml-auto md:w-[148px]' asChild>
        <button className='btn-register' onClick={handleRegisterCar}>
          Register Car
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

export default AddCarForm;
