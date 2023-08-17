"use client"

import React from 'react'
import * as Form from '@radix-ui/react-form';
import { formItems } from '@/constants/index';
import Image from '@/node_modules/next/image';

export const AddCarForm = () => (
     <Form.Root className="w-full">
        <section className="grid w-full gap-8 md:grid-cols-2">
            {formItems.map((item, index) => ( 
                <Form.Field key={index} className="grid gap-4" name={item.title}>
                    <div className="flex items-baseline">
                        <Form.Label className="text-sm font-semibold text-gray-900">
                            {item.title}
                        </Form.Label>
                        <Form.Message className="px-2 text-sm font-normal text-red-500" match="valueMissing">
                            Required
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <p className="flex items-center">
                            <textarea
                            className="inline-flex h-14 w-full resize-none appearance-none items-center justify-center rounded-md bg-white-200 p-[10px] text-sm leading-7 text-gray-900 outline-none selection:bg-white-200 hover:shadow-[0_0_0_1px] focus:shadow-[0_0_0_1px]"
                            placeholder={item.placeholder}
                            required
                            />
                        </p>
                    </Form.Control>
                </Form.Field>
            ))}
        </section>

        <h2 className="mt-6 text-sm font-semibold text-gray-900 md:mt-11">
            Upload Images
        </h2>

        <div className="mt-6 flex w-full items-center justify-center md:mt-5">
            <label for="dropzone-file" className="flex h-[184px] w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-400 bg-white hover:bg-blue-50 md:rounded-[7px]">
                <div className="flex flex-col items-center justify-center pt-5">
                    <Image 
                        src="/img/outline.svg"
                        alt="Upload"
                        height={28}
                        width={29}/>
                    <p className="mt-2.5 text-sm font-medium leading-7 text-blue-500 md:text-[14.91px] md:leading-[29.81px]"><span className="text-gray-700">Drag and drop images, or </span> Browse</p>
                    <p className="text-[12.82px] font-normal leading-relaxed text-gray-400 md:text-sm md:leading-7">High resolution images (png, jpg, gif)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
            </label>
        </div> 


        <Form.Submit className="mt-7 w-full md:ml-auto md:w-[148px]" asChild>
            <button className="btn-register">
                Register Car
            </button>
        </Form.Submit>

    </Form.Root>
    
);