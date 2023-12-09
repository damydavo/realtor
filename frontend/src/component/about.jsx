import styles, { layout } from "../style";
import { about } from "../assets";
import { aboutLink } from "../constant";

const About = () => {
    return (
        <>
            <h2 className={`${styles.heading2} mx-auto md:w-[600px] text-center`}>Why you should choose us</h2>
            <div className={`${layout.sectionReverse} gap-12 mx-auto md:w-[1000px]`}>
                <img className="w-full md:w-[652px] md:h-[405px] object-cover" src={about} alt="about" />
                <div className="flex flex-col">
                    <p className={`${styles.paragraph}`}>Creating quality urban lifestyles, building stronger communities and creating a safe haven for the general populace is what we do,
                        we give affordabel house for sell, rent and also lease great propertities for any kind of usage.</p>
                    <p className={`${styles.paragraph} my-4`}>we give premium offers to all our client and our customer service is top notch.</p>
                    <div className="grid grid-cols-2 gap-x-10 md:gap-x-16 gap-y-3">
                        {aboutLink.map(about => {
                            return (
                                <div key={about.id} className="flex items-center space-x-4">
                                    <img className="w-4 h-4" src={about.img} alt="" />
                                    <p className={`${styles.paragraph} font-semibold`}>{about.title}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>

        </>

    );
}

export default About;