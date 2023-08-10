'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  href: string | { pathname: string; query: { query: string } };
  title?: String;
  style: string;
  icon?: string;
};

const Button = ({ title, style, href, icon }: Props) => {
  return (
    <Link href={href} scroll={false} className={style}>
      {icon && <Image src={icon} alt="icon" width={18} height={18} priority />}
      <span>{title}</span>
    </Link>
  );
};

export default Button;
