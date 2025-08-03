import Link from "next/link";
import { 
    useEffect, 
    useState 
} from "react";
import { 
    LogOut,
    Menu, 
    X 
} from 'lucide-react';
import Image from "next/image";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export function Header() {

    const pathname = usePathname();

    const [nav, setNav] = useState(false);
    const [shadow, setShadow] = useState(false);
    const [linkColor] = useState('#1f2937');

    const { auth } = useAuth()
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        setIsAdmin(auth.user_role === "admin");
    }, [auth.user_role]);

    const handleNav = () => {
        setNav(!nav);
      };
    
    
    useEffect(() => {
        const handleShadow = () => {
            if (window.scrollY >= 90) {
                setShadow(true);
            } 
            else {
                setShadow(false);
            }
        };
        window.addEventListener('scroll', handleShadow);
    }, []);

    
    return (
        <div
            className={
                shadow
                ? 'fixed w-full h-[60px] shadow-xl z-[100] ease-in-out duration-300 border-b border-black'
                : 'fixed w-full h-[60px] z-[100] border-b border-black'
            }
        >
            <div className='flex justify-between items-center w-full h-full px-2 2xl:px-16'>

                <div className='flex items-center'> 
                    
                    <Link 
                        href='/home'
                    >
                        <Image
                            src="/images/mwfeeds-logo-login.svg"
                            alt='logo'
                            width='70'
                            height='45'
                            className='cursor-pointer rounded-full'
                        />   
                    </Link>

                    <h1 className='ml-4 text-xl font-bold text-black'>
                        Meltwater Feeds
                    </h1>  

                </div>

                <div>

                    <ul 
                        style={{ color: `${linkColor}` }} 
                        className='hidden md:flex'
                    >
                        
                        <li 
                            className={`ml-7 text-sm px-2 py-2 rounded ${ 
                                pathname === "/home"
                                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:ease-in-out hover:duration-200"
                                : "hover:border-b"
                                }`
                            }
                        >
                            <Link 
                                href='/home'
                            >
                                Home
                            </Link>
                        </li>

                        <li 
                            className={`ml-7 text-sm px-2 py-2 rounded ${ 
                                pathname.startsWith("/html-to-rss")
                                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:ease-in-out hover:duration-200"
                                : "hover:border-b"
                                }`
                            }
                        >
                            <Link 
                                href='/html-to-rss/create-feed'
                            >
                                Create Feed
                            </Link>
                        </li>

                        <li
                            className={`ml-7 text-sm px-2 py-2 rounded ${ 
                                pathname.startsWith("/rss-playground")
                                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:ease-in-out hover:duration-200"
                                : "hover:border-b"
                                }`
                            }
                        >
                            <Link 
                                href='/rss-playground/create'
                            >
                                RSS Playground
                            </Link>
                        </li>

                        {   isAdmin && (
                                <li
                                    className={`ml-7 text-sm px-2 py-2 rounded ${ 
                                        pathname.startsWith("/admin")
                                        ? "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:ease-in-out hover:duration-200"
                                        : "hover:border-b"
                                        }`
                                    }
                                >
                                    <Link 
                                        href='/admin/view-users'
                                    >
                                        Admin
                                    </Link>
                                </li>
                            )
                        }

                        <li 
                            className="relative group ml-7 text-md p-2 rounded-full 
                                hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 
                                hover:text-white transition-colors duration-300 cursor-pointer"
                        >
                            <LogOut 
                                size={20}
                            />
                        </li>

                    </ul>

                    {/* Hamburger Icon */}
                    <div 
                        style={{ color: `${linkColor}` }} 
                        onClick={handleNav} 
                        className='md:hidden'
                    >
                        <Menu 
                            size={25} 
                        />
                    </div>

                </div>

            </div>

            {/* Mobile Menu */}
            {/* Overlay */}

            <div
                className={
                    nav ? 
                    'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70' : 
                    ''
                }
            >

            {/* Side Drawer Menu */}
                <div
                    className={
                        nav
                        ? 'fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-white p-10 ease-in duration-500'
                        : 'fixed left-[-100%] top-0 p-10 ease-in duration-500'
                    }
                >

                    <div>
        
                        <div className='flex w-full items-center justify-between'>

                            <div className='flex items-center'> 
                                
                                <Link 
                                    href='/home'
                                >
                                    <Image
                                        src="/images/mwfeeds-logo-login.svg"
                                        alt="mwfeeds logo"
                                        width='90'
                                        height='90'
                                        className='rounded-full'
                                    />
                                </Link>
                                
                                <h1 className='ml-4 text-xl font-bold text-black'>
                                    Meltwater Feeds
                                </h1>  

                            </div>

                            <div 
                                onClick={handleNav} 
                                className='rounded-full p-3 mt-1 cursor-pointer'
                            >
                                <X 
                                    size={25}
                                />
                            </div>

                        </div>

                        <div className='border-b border-gray-300 my-4'>
                            <p className='w-[85%] md:w-[90%] py-4 text-[18px] font-mono'>
                                Time Runs Out
                            </p>
                        </div>

                    </div>

                <div className='py-4 flex flex-col'>

                    <ul className='uppercase'>

                        <Link 
                            href='/home'
                        >
                            <li 
                                onClick={() => setNav(false)} 
                                className='py-4 text-sm font-bold'
                            >
                                HOME
                            </li>
                        </Link>

                        <Link 
                            href='/html-to-rss/create-feed'
                        >
                            <li 
                                onClick={() => setNav(false)} 
                                className='py-4 text-sm font-bold'
                            >
                                CREATE FEED
                            </li>
                        </Link>

                        <Link 
                            href='/rss-playground/create'
                        >
                            <li 
                                onClick={() => setNav(false)} 
                                className='py-4 text-sm font-bold'
                            >
                                RSS PLAYGROUND
                            </li>
                        </Link>

                       { 
                            isAdmin && (
                                <Link 
                                    href='/admin/view-users'
                                >
                                    <li 
                                        onClick={() => setNav(false)} 
                                        className='py-4 text-sm font-bold'
                                    >
                                        ADMIN
                                    </li>
                                </Link>
                            )
                        }

                    </ul>
        
                </div>

            </div>

        </div>

    </div>
        
    )
}