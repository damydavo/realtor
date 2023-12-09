import { useState } from "react";
import { logo, close, menu } from "../assets";
import { navLink } from "../constant";
import { Link } from "react-router-dom";


const Header = () => {

    const [toggle, setToggle] = useState('')
    const [active, setActive] = useState('')
    // const [scrolled, setScrolled] = useState('')

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollTop = window.scrollY;
    //         if (scrollTop > 100) {
    //             setScrolled(true);
    //         } else {
    //             setScrolled(false);
    //         }
    //     };

    //     window.addEventListener("scroll", handleScroll);

    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    return (
        <div className="flex justify-between items-center py-1 px-4">
            <Link to='/'><img className="w-[100px] h-[50px]" src={logo} alt="logo" /></Link>
            <ul className="hidden md:flex space-x-24 font-poppins items-center font-semibold">
                {navLink.map(nav => {
                    return <Link to={nav.to} key={nav.id} className="">{nav.title}</Link>
                })}

                <Link to='/login' className="p-2 px-4 text-sm text-white bg-brightRed rounded-md baseline hover:bg-brightRedLight">Log in</Link>

            </ul>

            <div className="md:hidden sm:flex items-center justify-end">
                <img onClick={() => setToggle(!toggle)} className="w-[28px] h-[28px] object-contain" src={toggle ? close : menu} alt="menu" />
                <div className={`${!toggle ? "hidden" : "flex"} bg-black-gradient p-6 justify-end absolute top-30 right-0 min-w-[160px] mx-4 my-6 z-20 rounded-lg sidebar`}>
                    <ul className="flex-col justify-end space-y-6 items-center font-semibold">
                        {navLink.map(nav => {
                            return <li onClick={() => { setToggle(!toggle); setActive(nav.title); }} className={`${active === nav.title ? "text-white" : "text-[#F6866A]"} cursor-pointer hover:text-secondary font-[18px]`} key={nav.id}><Link to={nav.to} href={`#${nav.id}`}>{nav.title}</Link></li>
                        })}

                        <Link to='/login' className="flex space-y-2 p-2 px-4 text-sm text-white bg-brightRed rounded-md baseline hover:bg-brightRedLight">Log in</Link>

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;