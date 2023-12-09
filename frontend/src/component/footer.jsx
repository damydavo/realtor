import styles from "../style";
import { facebook, instagram, linkedin, twitter } from "../assets";

const Footer = () => {
    return (
        <div className="container md:w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 my-8 md:my-8">
            <div className="flex flex-col space-y-6">
                <h2 className="font-poppins font-semibold">Real Esate Guru</h2>
                <p className={`${styles.paragraph}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur perspiciatis necessitatibus nulla?</p>

                <div className="flex space-x-6 items-center">
                    <img className="w-4 h-4" src={facebook} alt="facebook" />
                    <img className="w-4 h-4 text-[#1DA1F2]" src={instagram} alt="instagram" />
                    <img className="w-4 h-4 text-[#EC3397]" src={linkedin} alt="linkedin" />
                    <img className="w-4 h-4 text-[#0A66C2]" src={twitter} alt="twitter" />
                </div>
            </div>

            <div className="flex justify-around space-x-32 font-semibold">
                <div className="flex flex-col space-y-3 font-poppins">
                    <a href="/#" className="hover:text-brightRed">Features</a>
                    <a href="/#" className="hover:text-brightRed">Partners</a>
                    <a href="/#" className="hover:text-brightRed">Pricing</a>
                    <a href="/#" className="hover:text-brightRed">Product</a>
                    <a href="/#" className="hover:text-brightRed">Support</a>
                </div>
                <div className="flex flex-col space-y-3 font-poppins">
                    <a href="/#" className="hover:text-brightRed">About US</a>
                    <a href="/#" className="hover:text-brightRed">Agents</a>
                    <a href="/#" className="hover:text-brightRed">Blog</a>
                    <a href="/#" className="hover:text-brightRed">Media</a>
                    <a href="/#" className="hover:text-brightRed">Contact Us</a>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <p className={`${styles.paragraph} text-[#676767]`}>Subscribe to our newsletter to get our weekly updates about properties</p>
                <div className="flex relative">
                    <input type="text" placeholder='Email Address' className="w-full mt-1 border px-3 py-[10px] text-sm shadow-sm focus:outline-none" />
                    <p className="absolute right-0 mt-2 items-center py-[9px] text-center px-4 text-[14px]  text-white bg-brightRed baseline hover:bg-brightRedLight">Subscribe</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
