import { useState } from 'react';
import TopBar from './topbar';
import SideBar from './siderbar';


const Shared = ({ children }) => {
    const [sidebarOpen, setsidebarOpen] = useState(false)

    const handleOpen = () => {
        setsidebarOpen(!sidebarOpen)
    }

    return (
        <>
            <TopBar sidebarOpen={sidebarOpen} handleOpen={handleOpen} />
            <div className='flex'>
                <div className={`flex-[2] ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
                    <SideBar />
                </div>

                <div className="flex-[10] py-20 px-10 md:px-0">
                    {children}
                </div>
            </div>
        </>

    );
}

export default Shared;