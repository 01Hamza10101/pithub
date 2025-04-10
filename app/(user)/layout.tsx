
export default function layout({children}:any) {
    
    return(
        <div className='min-h-screen scrollable scrollbar-hide'>
            {children}
        </div>
    )
}