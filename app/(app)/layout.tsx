"use client"
import { useState } from 'react';
import Header from '@/app/components/Header/Header';
import ReduxProvider from '@/app/ReduxToolkit/ReduxProvider';
import AuthWrapper from '@/app/components/comp/AuthWrapper';

export default function layout({ children }: any) {
    const [loadeduser, setLoadeduser] = useState(false);

    return (
        <div className='min-h-screen scrollable scrollbar-hide'>
            <ReduxProvider>
                <AuthWrapper>
                    <Header />
                    {children}
                </AuthWrapper>
            </ReduxProvider>
        </div>
    )
}