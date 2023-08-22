"use client"
import * as Form from '@radix-ui/react-form';
import { formItems } from '@/constants/index';
import Image from '@/node_modules/next/image';
import { v4 as uuidv4 } from 'uuid';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useState } from 'react';


const AddCarForm = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); 
    const uploadImageToSupabase = async () => {
        if (selectedFile) {
            const supabase = createClientComponentClient();

            const { data, error } = await supabase
                .storage
                .from("images")
                .upload("user1" + "/" + uuidv4(), selectedFile, {
                    cacheControl: '3600',
                });

            if (error) {
                console.log(error);
            }
            console.log(data);
        }
    };

    const handleRegisterCar = () => {
        uploadImageToSupabase(); 
    };

    const uploadImage = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedFile(file); // Update the selected file
            setPreviewUrl(imageUrl);
        }
    };
    
    return(
        <Form.Root className="w-full">
            <section className="grid w-full gap-8 md:grid-cols-2"> 
                {formItems.map((item, index) => ( 
                    <Form.Field key={index} className="grid gap-4" name={item.title}>
                        <div className="flex items-baseline">
                            <Form.Label className="text-sm font-semibold text-gray-900 dark:text-white-0">
                                {item.title}
                            </Form.Label>
                            <Form.Message className="px-2 text-sm font-normal text-red-500" match="valueMissing">
                                Required
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            {item.options ? ( 
                                <select
                                className="inline-flex h-14 w-full resize-none appearance-none items-center justify-center rounded-md bg-white-200 p-[10px] text-sm leading-7 text-gray-400 outline-none selection:bg-white-200 hover:shadow-[0_0_0_1px] focus:shadow-[0_0_0_1px] dark:bg-gray-800 dark:text-white-200"
                                required
                                defaultValue=""
                                >
                                <option value="" disabled>
                                    {item.placeholder}
                                </option>
                                {item.options.map((option, index) => (
                                    <option key={index} value={option}>
                                    {option}
                                    </option>
                                ))}
                                </select>
                            ) : (
                                <input
                                className="inline-flex h-14 w-full resize-none appearance-none items-center justify-center rounded-md bg-white-200 p-[10px] text-sm leading-7 text-gray-900 outline-none selection:bg-white-200 hover:shadow-[0_0_0_1px] focus:text-red-400 focus:shadow-[0_0_0_1px] dark:bg-gray-800 dark:text-white-200"
                                placeholder={item.placeholder}
                                required
                                />
                            )}
                        </Form.Control>
                    </Form.Field>         
                ))}

            </section> 

            <h2 className="mt-6 text-sm font-semibold text-gray-900 dark:text-white-0 md:mt-11">
                Upload Images
            </h2>

            <div className="mt-6 flex w-full items-center justify-center md:mt-5">
                <label htmlFor="dropzone-file" className="flex h-[184px] w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-400 bg-white hover:bg-blue-50 dark:bg-gray-850 md:rounded-[7px]">
                    <div className="flex flex-col items-center justify-center pt-5">
                        {previewUrl ? (
                            <Image
                             src={previewUrl} 
                             alt="Preview" 
                             className="mb-2 w-full"
                             width={200}
                             height={200}
                            />
                        ) : (
                            <>
                                <Image 
                                    src="/img/outline.svg"
                                    alt="Upload"
                                    height={28}
                                    width={29}/>
                                
                                <p className="mt-2.5 text-sm font-medium leading-7 text-blue-500 md:text-[14.91px] md:leading-[29.81px]"><span className="text-gray-700">Drag and drop images, or </span> Browse</p>
                                <p className="text-[12.82px] font-normal leading-relaxed text-gray-400 md:text-sm md:leading-7">High resolution images (png, jpg, gif)</p>
                            </>
                        )}
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={uploadImage}/>
                    <Form.Field name="dropzone">
                        <Form.Control 
                            type="file" 
                            accept="image/png, image/jpeg, image/gif" 
                            className="hidden" 
                        />
                    </Form.Field>
                </label>
            </div> 


            <Form.Submit className="mt-7 w-full md:ml-auto md:w-[148px]" asChild>
                <button className="btn-register" onClick={handleRegisterCar}>
                    Register Car
                </button>
            </Form.Submit>

        </Form.Root>
    )
   
}

export default AddCarForm;