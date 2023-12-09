import { facebook, instagram, linkedin, twitter } from "../assets";
import { MdPhone } from 'react-icons/md'

const TopMenu = () => {
    return (
        <div className="flex justify-between py-6 px-4 items-center">
            <ul className="flex gap-4 md:gap-8 items-center">
                <li><img className="w-4 h-4" src={facebook} alt="fb" /></li>
                <li><img className="w-4 h-4" src={instagram} alt="insta" /></li>
                <li><img className="w-4 h-4" src={linkedin} alt="link" /></li>
                <li><img className="w-4 h-4" src={twitter} alt="twitt" /></li>
            </ul>
            <div className="flex items-center">
                <MdPhone className="text-[#E90808]" size='16' />
                <p className="text-sm font-semibold font-poppins ml-2">+234-81060-483-79</p>
            </div>
        </div>
    );
}

export default TopMenu;