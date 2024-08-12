"use client"

import { sidebarLinks } from '@/app/(home)/dashboardContent'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className='fixed left-0 top-[64px] bottom-0 w-[300px] overflow-y-auto p-6 text-black max-sm:hidden bg-gradient-to-br from-blue-100 to-purple-100 border-r'>
            <div className='flex flex-col gap-2'>
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
                    const Icon = link.icon;

                    return (
                        <Link
                        href={link.route}
                        key={link.label}
                        className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                            'glassmorphism' : isActive,
                        })}
                        >
                            <Icon size={24} />
                            <p className='text-sm font-medium max-lg:hidden'>
                                {link.label}
                            </p>
                        </Link>
                    )
                })} 
            </div>
        </aside>
    )
}

export default Sidebar