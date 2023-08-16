import React from 'react'
import Button from '../reusable/Button'
import Image from 'next/image';

const ProfileCard = () => {
  return (
    <section className="relative flex h-[301px] w-full rounded-[10px] bg-white">
        <div className="profileBanner h-[150px] w-full rounded-t-[10px] md:h-[182px]">
        </div>
        <div className="absolute left-[13px] top-[115px] h-[70px] w-[70px] md:left-[31px] md:top-[119px] md:h-40 md:w-40">
            <Image
            src={"/img/profile.jpg"}
            alt='Profile Image'
            fill
            priority
            className='rounded-full object-cover'
            />
        </div>

        <div className="absolute right-[10px] top-[114px] md:right-[57px] md:top-[119px]">
            <div className="flex h-[26px] w-[68px] items-center justify-center rounded-[5px] bg-white bg-opacity-40 md:h-10 md:w-[105px]">
                <span className="text-[10px] font-normal text-white md:text-sm md:font-medium">Edit Cover</span>
            </div>
        </div>
        <div className="absolute left-[13px] top-[195px] h-[50px] w-[108px] md:left-[223px] md:top-[213px]">
            <div className="absolute left-0 top-0 text-xl font-bold text-gray-900">Jane Daniel</div>
            <div className="absolute left-0 top-[32px] text-sm font-normal text-gray-900 opacity-50">Agent</div>
        </div>
        <div className="absolute left-[207px] top-[245px] inline-flex">
            <Button href="/" title="Edit Profile" style="btn-edit-profile" />
        </div>
    </section>
  )
}

export default ProfileCard