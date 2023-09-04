'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as Form from '@radix-ui/react-form';
import { v4 as uuidv4 } from 'uuid';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';

import { formItems } from '@/constants/index';
import { FormData } from '@/typings';
import SelectOption from '../SelectOption';
import SelectInput from '../SelectCountryInput';
import Toast from '../reusable/Toast';

const initialFormData: FormData = {
  car_title: null,
  price: null,
  fuel_capacity: null,
  short_description: null,
  car_type: null,
  transmission: null,
  capacity: null,
};

const AddCarForm = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCarType, setSelectedCarType] = useState<string>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

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
    const { name, value } = e.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadImagesToSupabase = async () => {
    if (selectedFiles) {
      const supabase = createClientComponentClient();

      const imageUrls = [];

      for (const file of selectedFiles) {
        const { data, error } = await supabase.storage
          .from('images')
          .upload(user?.id + '/' + uuidv4(), file, {
            cacheControl: '3600',
          });

        if (error) {
          console.log(error);
        } else {
          const {
            data: { publicUrl },
          } = supabase.storage.from('images').getPublicUrl(data.path);

          imageUrls.push(publicUrl); // Collect public URLs in an array
        }
      }

      return imageUrls;
    }
  };

  const handleRegisterCar = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    try {
      const uploadedImageUrls = await uploadImagesToSupabase();
      const location = selectedLocation;
      const carType = selectedCarType;
      const capacity = selectedCapacity;
      const transmission = selectedTransmission;

      const { data, error } = await supabase.from('cars').insert({
        ...formData,
        owner_id: user?.id,
        location,
        car_type: carType,
        capacity,
        transmission,
        images: uploadedImageUrls,
      });
      if (error) {
        Toast({
          type: 'error',
          message: 'An error occurred during submission.',
        });
        console.error('[ERROR] An Error Occured: ', error);
      } else {
        Toast({ type: 'success', message: 'Submission successful!' });
        setTimeout(() => {
          router.push('/');
        }, 2000);
        console.log(data);
      }
    } catch (uploadError) {
      Toast({ type: 'error', message: 'An error occurred during submission.' });
      console.error('[ERROR] An Error Occured: ', uploadError);
    }
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]); // Append the new file
      setPreviewUrl(imageUrl);
    }
  };

  return (
    <Form.Root className='w-full'>
      <section className='grid w-full gap-8 md:grid-cols-2'>
        {formItems.map((item) => (
          <Form.Field key={item.title} className='grid gap-4' name={item.title}>
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
              <Form.Message
                className='px-2 text-sm font-normal text-red-500'
                match='typeMismatch'
              >
                Invalid Type
              </Form.Message>
            </div>
            <Form.Control asChild>
              {item.title === 'Location' ? (
                <SelectInput
                  selected={selectedLocation}
                  setSelected={setSelectedLocation}
                />
              ) : item.title === 'Car Type' ? (
                <SelectOption
                  selected={selectedCarType}
                  setSelected={setSelectedCarType}
                  title={item.title}
                  placeholder={item.placeholder}
                  options={item.options}
                />
              ) : item.title === 'Transmission' ? (
                <SelectOption
                  selected={selectedTransmission}
                  setSelected={setSelectedTransmission}
                  title={item.title}
                  placeholder={item.placeholder}
                  options={item.options}
                />
              ) : item.title === 'Capacity' ? (
                <SelectOption
                  selected={selectedCapacity}
                  setSelected={setSelectedCapacity}
                  title={item.title}
                  placeholder={item.placeholder}
                  options={item.options}
                />
              ) : (
                <input
                  className='inline-flex h-14 w-full resize-none appearance-none items-center justify-center rounded-md bg-white-200 px-[18px] py-[14px]  text-sm leading-7 text-gray-900 outline-none selection:bg-white-200 placeholder:text-gray-400 hover:shadow-[0_0_0_1px] focus:shadow-[0_0_0_1px] dark:bg-gray-800 dark:text-white-200 dark:placeholder:text-white-200'
                  name={item.name}
                  placeholder={item.placeholder}
                  value={formData[item.name as keyof FormData] ?? ''}
                  onChange={handleInputChange}
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
                className='mb-2'
                width={200}
                height={200}
                priority
              />
            ) : (
              <>
                <Image
                  src='/img/outline.svg'
                  alt='Upload'
                  height={28}
                  width={29}
                  priority
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
