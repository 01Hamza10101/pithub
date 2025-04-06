import Header from '@/app/components/Header/Header';

export default function layout({children}:any) {
    return(
        <div>
            <Header/>
            {children}
        </div>
    )
}