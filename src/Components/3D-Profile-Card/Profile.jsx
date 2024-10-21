import { FiArrowDownCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ProfileV1 from './3D-Profile';
import style from '../Front/Intro.module.css';

const Profile = () => {
	// const [activeTheme] = useThemeSwitcher();

	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
			className="flex flex-col sm:justify-between items-center sm:flex-row mt-12 md:mt-2"
		>
			{/* Left section with text and buttons */}
			<div className="w-full md:w-1/3 text-left">
				<motion.h1
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						ease: 'easeInOut',
						duration: 0.9,
						delay: 0.1,
					}}
					className="font-general-semibold transition text-2xl lg:text-3xl xl:text-4xl text-center sm:text-left text-ternary-dark dark:text-primary-light uppercase"
				>
					Hi, I am Ayush
				</motion.h1>

				{/* Loader animation with titles */}
			
						<div className={style["loader"]}>
							<div className="text-wrap">A</div>
							<div className={style["words"]}>
								<span className={style["word"]}>Developer</span>
								<span className={style["word"]}>Programmer</span>
								<span className={style["word"]}>Problem Solver</span>
								<span className={style["word"]}>Software Engineer</span>
								<span className={style["word"]}>Developer</span>
							</div>
						</div>
				

				{/* Resume download button */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						ease: 'easeInOut',
						duration: 0.9,
						delay: 0.3,
					}}
					className="flex justify-center sm:block"
				>
					<a
						download="Ayush-Resume.pdf"
						href="/files/Ayush-Resume.pdf"
						className="font-general-medium flex justify-center items-center w-36 sm:w-48 mt-12 mb-6 sm:mb-0 text-lg border border-indigo-200 dark:border-ternary-dark py-2.5 sm:py-3 shadow-lg rounded-lg bg-indigo-50 focus:ring-1 focus:ring-indigo-900 hover:bg-indigo-500 text-gray-500 hover:text-white duration-500"
						aria-label="Download Resume"
					>
						<FiArrowDownCircle className="mr-2 sm:mr-3 h-5 w-5 sm:w-6 sm:h-6 duration-100" />
						<span className="text-sm sm:text-lg font-general-medium duration-100">
							Download CV
						</span>
					</a>
				</motion.div>
			</div>

			{/* Right section with 3D Profile */}
			<motion.div
				initial={{ opacity: 0, y: -180 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
				className="w-full h-1/2 sm:2/3 sm:w-2/3 text-right float-right mt-8 sm:mt-0"
			>
				<ProfileV1 />
			</motion.div>
		</motion.section>
	);
};

export default Profile;
