import { MdAdminPanelSettings, MdCreate, MdHome, MdList, MdLogout, MdManageAccounts, MdSettings } from 'react-icons/md'
import { Link } from 'react-router-dom';


const SideBar = () => {
    return (
        <div className="h-screen bg-[#eee] px-4 py-6 fixed z-0 top-14">
            <Link to='/' className="flex bg-gray-300 justify-center px-4 py-1 font-semibold rounded-sm border w-[200px] items-center"><MdHome className='flex items-center mx-4' size='26' />Home</Link>
            <ul className='flex flex-col space-y-6 items-start mt-6 font-poppins'>
                <li>
                    <Link to='/profile' className='flex gap-3 items-center hover:text-brightRed'>
                        <MdSettings size='26' /><div>Profile</div>
                    </Link>
                </li>
                <li>
                    <Link to='/listing' className='flex gap-3 items-center hover:text-brightRed'>
                        <MdList size='26' /><div>Listing</div>
                    </Link>
                </li>
                <li>
                    <Link to='/create' className='flex gap-3 items-center hover:text-brightRed'>
                        <MdCreate size='26' /><div>Create Listing</div>
                    </Link>
                </li>
                <li>
                    <Link to='/manage' className='flex gap-3 items-center hover:text-brightRed'>
                        <MdManageAccounts size='26' /><div>Manage Listings</div>
                    </Link>
                </li>
                <li>
                    <Link to='/users' className='flex gap-3 items-center hover:text-brightRed'>
                        <MdAdminPanelSettings size='26' /><div>Manage users</div>
                    </Link>
                </li>
                <div className='w-full border h-[3px] bg-slate-500'></div>
                <button type="button" className='flex gap-3 items-center pt-2 hover:text-brightRed'><MdLogout size='26' /> Logout</button>
            </ul>
        </div>

    );
}

export default SideBar;