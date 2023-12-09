import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { visibility } from "../assets"
import { Header, Topmenu } from "../component/main"
import styles from "../style"
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate('/profile')
        }
    }, [navigate, userInfo])


    const { email, password } = formData

    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate('/profile')
        }
        catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <>
            <div className="w-full">
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Topmenu />
                        <Header />

                    </div>
                </div>
            </div>
            <div className="block p-8 md:p-0 md:flex items-center justify-center my-18 md:my-28 space-x-0 md:space-x-12">
                <div className="block space-y-3 w-80 md:w-96 my-8">
                    <p className="text-xl md:text-lg">Welcome to Realtor. To get started, please sign in</p>
                </div>

                <section className="flex justify-center items-center mt-4 md:p-6 bg-[#f2f2f2] rounded-md">
                    <form onSubmit={handleSubmit} className="w-80 space-y-4 p-8 md:p-0">
                        <input type="email"
                            placeholder="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-3 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 " />
                        <div className='flex relative items-center'>
                            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={handleChange} name="password" className="mt-1 w-full px-3 py-3 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 " />
                            <img onClick={() => setShowPassword((prevState) => !prevState)} className='flex absolute right-2 cursor-pointer' src={visibility} alt="visibility" />
                        </div>

                        <button className="px-3 py-3 w-full text-sm text-primary font-semibold rounded-lg border border-purple-200 bg-[#FFDB00] hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2">Log In</button>

                        <Link to='/signup' className="flex items-center justify-center mx-7 md:mx-14 px-3 py-3 w-52 text-sm text-dark font-semibold rounded-lg border border-purple-200 bg-[#182214] text-white  hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2">Create an Account</Link>


                    </form>
                </section>
            </div>
        </>
    );
}

export default Login;