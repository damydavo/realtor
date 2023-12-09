import Shared from './../component/shared';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteProfileMutation, useUpdateProfileMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const { userInfo } = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        username: userInfo.username,
        email: userInfo.email,
        password: '',
        confirmPassword: ''
    })

    const { username, email, password, confirmPassword } = formData


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [deleteuser] = useDeleteProfileMutation()
    const [updateProfile] = useUpdateProfileMutation()

    const handleDelete = () => {
        dispatch(deleteuser)
        navigate('/')
        toast.success("User Deleted Successfully!")
    }

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error('Password do not match')
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    username,
                    email,
                    password
                }).unwrap()

                dispatch(setCredentials({ ...res }))
                toast.success('Profile Updated')
            }
            catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    return (
        <Shared>
            <div className='container w-[500px] mx-auto mt-24 font-poppins text-center'>
                <form onSubmit={handleSubmit} className="w-full space-y-4 px-10">
                    <h4 className="text-2xl font-semibold">Profile</h4>
                    <input type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-3 text-sm font-semibold  bg-[#eee] rounded-lg focus:outline-none" />

                    <input type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-3 text-sm font-semibold  bg-[#eee] rounded-lg focus:outline-none" />

                    <input type="password"
                        name="password"
                        placeholder='password'
                        value={password}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-3 text-sm bg-[#eee] rounded-lg focus:outline-none" />

                    <input type="password"
                        name="confirmPassword"
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-3 text-sm bg-[#eee] rounded-lg focus:outline-none" />

                    <div className='flex flex-col gap-2 py-4 '>
                        <button className="w-full px-4 py-3 text-sm font-semibold rounded-lg border bg-[#689F38] focus:outline-none focus:ring-2 focus:ring-offset-2">Update</button>
                    </div>
                    <div className='flex justify-between text-brightRed items-center'>
                        <h2 onClick={handleDelete} className='text-sm font-poppins cursor-pointer'>Delete Account</h2>
                        <h2 className='text-sm font-poppins cursor-pointer'>Sign out</h2>
                    </div>
                </form>
            </div>
        </Shared>
    );
}

export default Profile;