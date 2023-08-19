'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  href: string | { pathname: string; query: { query: string } };
  title?: String;
  style: string;
  icon?: string;
  handleClick?: () => {};
};

const Button = ({ title, style, href, icon, handleClick }: Props) => {
  return (
    <Link href={href} scroll={false} className={style} onClick={handleClick}>
      {icon && <Image src={icon} alt='icon' width={18} height={18} priority />}
      <span>{title}</span>
    </Link>
  );
};

export default Button;
