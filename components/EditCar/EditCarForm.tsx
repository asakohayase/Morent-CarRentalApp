'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as Form from '@radix-ui/react-form';
import { v4 as uuidv4 } from 'uuid';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';

import { formItems, FormData, carType } from '@/constants/index';
import SelectCountryInput from '../SelectCountryInput';
import fetchCars from '@/utils/fetchCars';

const initialFormData: FormData = {
  car_title: null,
  price: null,
  fuel_capacity: null,
  short_description: null,
  car_type: null,
  transmission: null,
  capacity: null,
};

interface Props {
  carId: number;
}

const EditCarForm = ({ carId }: Props) => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const [carData, setCarData] = useState<carType>({});
  const [selectedLocation, setSelectedLocation] = useState('');
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

  useEffect(() => {
    async function fetchInitialCarData() {
      const carsData = await fetchCars();
      const car = carsData.find((car) => car.car_id === carId);
      if (car) {
        setCarData(car);
        setFormData({
          car_title: car.car_title,
          price: car.price,
          fuel_capacity: car.fuel_capacity,
          short_description: car.short_description,
          car_type: car.car_type,
          transmission: car.transmission,
          capacity: car.capacity,
        });
        setSelectedLocation(car.location);
        setSelectedFiles(car.images);
      }
    }

    fetchInitialCarData();
  }, [carId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    console.log('Input change:', name, value);
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

          imageUrls.push(publicUrl);
        }
      }

      return imageUrls;
    }
  };

  const handleRegisterCar = async () => {
    const uploadedImageUrls = await uploadImagesToSupabase();

    const { data, error } = await supabase
      .from('cars')
      .update([
        {
          ...formData,
          location: selectedLocation,
          images: uploadedImageUrls,
        },
      ])
      .eq('car_id', carId);

    if (error) {
      console.error('[ERROR] An Error Occured: ', error);
    } else {
      console.log(data);
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

  const handleDeleteCar = async () => {
    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('car_id', carId);

      if (error) {
        console.error('[ERROR] An Error Occurred:', error);
      }
      // No navigation on success
    } catch (error) {
      console.error('An error occurred while deleting the car:', error);
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
                      name={item.name}
                      value={
                        formData[item.name as keyof FormData] ??
                        carData[item.name as keyof carType]
                      }
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
                  name={item.name}
                  placeholder={item.placeholder}
                  value={
                    formData[item.name as keyof FormData] ?? carData[item.name]
                  }
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
      <section className='flex flex-col gap-4 md:relative md:flex-row-reverse md:items-center'>
        <Form.Submit
          className='mt-7 flex h-[55px] w-full md:ml-auto md:mt-[34.47px] md:h-14 md:w-[148px]'
          asChild
        >
          <button className='btn-register' onClick={handleRegisterCar}>
            Edit Car
          </button>
        </Form.Submit>
        <Form.Submit
          className='flex h-[55px] w-full md:absolute md:mr-[168px] md:mt-[34.47px] md:h-14 md:w-[148px]'
          asChild
        >
          <Link
            className='btn-remove'
            onClick={handleDeleteCar}
            href={`/profile/${user?.id}`}
          >
            <Image
              src='/img/mdi_delete.svg'
              alt='Remove'
              height={20}
              width={20}
            />
            Remove Car
          </Link>
        </Form.Submit>
      </section>
    </Form.Root>
  );
};

export default EditCarForm;
