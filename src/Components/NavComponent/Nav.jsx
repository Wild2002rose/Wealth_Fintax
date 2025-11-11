import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons/faAlignJustify";
import { faRefresh, faSignIn } from "@fortawesome/free-solid-svg-icons";
import logo from "../../Assets/Logos/WFSLogo.png";
function Nav() {
    return (
        <nav className="h-[70px] border flex bg-gray-100 text-gray-600 space-x-40 justify-between shadow-lg">
            <div className="flex w-[40%]">
                <img src={logo} alt="WFP Logo" className="h-10 w-40 mt-4 px-5" />
                <p className="py-4 font-bold text-md leading-tight">
                    WealthGrow <br /> FinTax Services
                </p>
                <FontAwesomeIcon
                    icon={faRefresh}
                    className="h-4 w-4 py-7 px-8 cursor-pointer hover:text-blue-600"
                />
            </div>

            <div className="flex space-x-16 font-bold text-md mt-5 w-[50%] ">
                <h1 className="cursor-pointer hover:text-blue-600">Home</h1>
                <h1 className="cursor-pointer hover:text-blue-600">Services</h1>
                <h1 className="cursor-pointer hover:text-blue-600">Industries</h1>
                <h1 className="cursor-pointer hover:text-blue-600">Careers</h1>
                <h1 className="cursor-pointer hover:text-blue-600">About Us</h1>
                <FontAwesomeIcon
                    icon={faSignIn}
                    className="h-6 w-8 py-1 cursor-pointer hover:text-orange-600"
                />
            </div>
        </nav>
    );
}
export default Nav;
