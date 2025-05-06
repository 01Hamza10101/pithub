"use client"
import { useState } from 'react';
import Header from '@/app/components/Header/Header';
import ReduxProvider from '@/app/ReduxToolkit/ReduxProvider';
import AuthWrapper from '@/app/components/comp/AuthWrapper';

export default function layout({ children }: any) {
    return (
        <div className='min-h-screen bg-gray-900 scrollable scrollbar-hide'>
            <ReduxProvider>
                <AuthWrapper>
                    <Header />
                    {children}
                </AuthWrapper>
            </ReduxProvider>
        </div>
    )
}