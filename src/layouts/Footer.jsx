const Footer = () => {
    return (
        <div className="bottom-0">
            <hr className="my-3 border-gray-200 sm:mx-auto lg:my-8 " />
            <div className=" w-full max-w-screen-xl mx-auto md:py-2">
                <div className="sm:flex sm:items-center sm:justify-between">

                    <div className="self-center text-2xl font-semibold whitespace-nowrap text-gray-400 leading-none">2JMU<br />
                        <span className="text-xs leading-none">Incheon University<br />Computer science, 2JMU</span>
                    </div>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="/" className="hover:underline me-4 md:me-6  ">About</a>
                        </li>
                        <li>
                            <a href="/" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/License" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="/" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>

                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="/" className="hover:underline">2JMU™</a></span>
            </div>
        </div>
    )
}

export default Footer;