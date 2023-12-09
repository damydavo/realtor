import { icon, logo, avatar } from '../assets';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify';
import { logout } from '../slices/authSlice';


const TopBar = ({ handleOpen, sidebarOpen }) => {
    const [toggle, setToggle] = useState(false)

    const { userInfo } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/')
        }
        catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <div className="py-2 bg-brightRed fixed w-full z-[20]">
            <div className="flex justify-between items-center px-6">
                <div className="flex space-x-6 items-center">
                    <Link to='/'><img className="w-[100px] h-[50px]" src={logo} alt="logo" /></Link>
                    <img onClick={() => handleOpen(!sidebarOpen)} className="flex md:hidden w-[32px] h-[32px] cursor-pointer" src={icon} alt="menu" />
                </div>
                {userInfo
                    && <div><img onClick={() => setToggle(!toggle)} className='cursor-pointer relative w-10 h-10 object-contain rounded-full' src={avatar} alt="profile" />
                        <div className={`${toggle ? 'flex flex-col bg-brightRedSupLight items-center' : 'hidden'}`}>
                            <button onClick={logoutHandler} type="button" className="flex bg-[#ddd] py-2 px-3 font-semibold rounded-md border gap-1 items-center absolute top-[66px] right-1">Logout</button>
                        </div>
                    </div>
                }
            </div>

        </div>
    );
}

export default TopBar;