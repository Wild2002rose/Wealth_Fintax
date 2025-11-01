import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAlignJustify } from "@fortawesome/free-regular-svg-icons/faHome";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons/faAlignJustify";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import logo from "../../Assets/Logos/WFSLogo.png";
function Nav() {
    return (
        <nav className="h-[70px] border flex px-6 bg-c15-bg text-c7-text">
            <div className="flex">
                <FontAwesomeIcon
                    icon={faAlignJustify}
                    className="h-6 w-8 py-6 cursor-pointer"
                />
                <img src={logo} alt="WFP Logo" className="h-10 w-40 mt-4 px-5" />
                <p className="py-4 font-bold text-md leading-tight">
                    WealthGrow <br /> FinTax Services
                </p>
                <FontAwesomeIcon
                    icon={faRefresh}
                    className="h-4 w-4 py-7 px-10 cursor-pointer"
                />
            </div>
        </nav>
    );
}
export default Nav;
