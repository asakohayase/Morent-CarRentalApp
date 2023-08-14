import { footerLinks } from '@/constants/index'
import Link from '@/node_modules/next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
	<footer className="px-6 py-12 md:px-16 md:pt-20">
    <section className="flex w-full flex-col md:flex-row md:justify-between md:pb-[60px]">
        {/* Company Name */}
      <article className="inline-flex w-[216px] flex-col items-start justify-start gap-4 md:w-[292px]">
        <h2 className="text-2xl font-bold leading-[28.80px] text-blue-500 md:text-[32px] md:leading-[38.40px]">MORENT</h2>
        <p className="text-xs font-medium leading-normal text-gray-400 md:text-base md:leading-loose">Our vision is to provide convenience and help increase your sales business.</p>
      </article>

          {/* About ~ Social */}
      <div className="flex flex-wrap gap-16 pt-12 md:flex-nowrap md:pt-0">
        {footerLinks.map((item) => (
          <div key={item.title} className="inline-flex flex-col items-start justify-start gap-[1.5rem]">
            <h3 className="text-xl font-semibold leading-normal text-gray-900">{item.title}</h3>
            <p className="flex flex-col gap-5">{item.links.map((link) => (
                <Link key={link.title} href={link.url} className="text-base font-medium leading-tight text-gray-400">
                {link.title}
                </Link>
            ))}</p>
          </section>
        ))}
      
      </div>
    </section> 

     {/* copyright */}
    <section className="mt-10 flex flex-col border-blue-50 py-10 text-xs font-semibold leading-normal text-gray-900 md:flex-row md:justify-between md:border-t md:text-base md:leading-loose">
      <p className="text-xs font-semibold leading-normal text-gray-900 md:text-base md:leading-loose">©2022 MORENT. All rights reserved</p>

      <p className="flex justify-between gap-10 max-sm:mt-4">
        <Link href="/">
          Privacy & Policy
        </Link>
        <Link href="/">
          Terms & Condition
        </Link>
      </p>
    </section>
  </footer>
  )
}

export default Footer