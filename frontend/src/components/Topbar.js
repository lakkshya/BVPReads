import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext";
import { useBagBooksContext } from "../hooks/useBagBooksContext";
import SigninPopup from "../components/SigninPopup";
import SignupPopup from "../components/SignupPopup";
import OtpPopup from "../components/OtpPopup";
import SignupSuccessPopup from "../components/SignupSuccessPopup";
import SigninSuccessPopup from "../components/SigninSuccessPopup";
import NotificationPopup from "../components/NotificationPopup";
import AccountPopup from "./AccountPopup";

const Topbar = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [resendEnabled, setResendEnabled] = useState(false);
    const [validationMessage, setValidationMessage] = useState("");
    const [showSigninPopup, setShowSigninPopup] = useState(false);
    const [showSignupPopup, setShowSignupPopup] = useState(false);
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    const [showSignupSuccessPopup, setShowSignupSuccessPopup] = useState(false);
    const [showSigninSuccessPopup, setShowSigninSuccessPopup] = useState(false);
    const [showAccountPopup, setShowAccountPopup] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const { dispatch, user } = useAuthContext();
    const { dispatch: bagbooksDispatch } = useBagBooksContext();

    useEffect(() => {
        const handleScrollOutside = () => {
            if (showAccountPopup) {
                setShowAccountPopup(false);
            }
            if (showNotification) {
                setShowNotification(false);
            }
        };

        const handleClickOutside = (event) => {
            const screenbg1 = document.querySelector('.screen-bg-1');
            const screenbg2 = document.querySelector('.screen-bg-2');
            const screenbg3 = document.querySelector('.screen-bg-3');
            const screenbg4 = document.querySelector('.screen-bg-4');
            const screenbg5 = document.querySelector('.screen-bg-5');

            if (event.target === screenbg1) {
                setName('');
                setEmail('');
                setPassword('');
                setOtp('');
                setShowSigninPopup(false);
            }
            if (event.target === screenbg2) {
                setName('');
                setEmail('');
                setPassword('');
                setOtp('');
                setShowOtpPopup(false);
            }
            if (event.target === screenbg3) {
                setName('');
                setEmail('');
                setPassword('');
                setOtp('');
                setShowSignupPopup(false);
            }
            if (event.target === screenbg4) {
                setName('');
                setEmail('');
                setPassword('');
                setOtp('');
                setShowSignupSuccessPopup(false);
            }
            if (event.target === screenbg5) {
                setName('');
                setEmail('');
                setPassword('');
                setOtp('');
                setShowSigninSuccessPopup(false);
            }
            if (event.target.closest('.notification-container') === null) {
                setShowNotification(false);
            }
            if (event.target.closest('.account-container') === null) {
                setShowAccountPopup(false);
            }
        };

        const timer = setTimeout(() => {
            setResendEnabled(true);
        }, 180000);

        document.addEventListener("click", handleClickOutside);
        document.addEventListener('scroll', handleScrollOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("scroll", handleScrollOutside);
            clearTimeout(timer);
        };
    }, [showNotification, showAccountPopup, resendEnabled]);

    const displayNotificationPopup = () => {
        setShowNotification(true);
    };

    const displayAccountPopup = (event) => {
        event.preventDefault();
        setShowAccountPopup(true);
    };

    const displaySigninPopup = () => {
        setShowSigninPopup(true);
    };

    const closeSigninPopup = () => {
        setName('');
        setEmail('');
        setPassword('');
        setOtp('');
        setShowSigninPopup(false);
    };

    const closeSignup = () => {
        setName('');
        setEmail('');
        setPassword('');
        setOtp('');
        setShowSignupPopup(false);
    };

    const handleSignup = async () => {

        if (name === "" || email === "" || password === "") {
            setValidationMessage('Empty Input Fields');
            return;
        } else if (!/^[a-zA-z ]*$/.test(name)) {
            setValidationMessage('Invalid Name entered');
            return;
        } else if (!/^[a-zA-Z0-9._%+-]+@(bvicam\.in)$/.test(email)) {
            setValidationMessage('Please enter a valid BVICAM email address.');
            return;
        } else if (password.length < 8) {
            setValidationMessage('Password too short');
            return;
        } else {
            try {
                const response = await fetch('/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('user', JSON.stringify(data));
                    dispatch({ type: 'LOGIN', payload: data });

                    setValidationMessage('');
                    setName('');
                    setEmail('');
                    setPassword('');
                    setOtp('');
                    setShowOtpPopup(true);
                    setShowSignupPopup(false);
                } else {
                    setValidationMessage(data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleSignin = async () => {
        if (email === "" || password === "") {
            setValidationMessage('Empty Input Fields');
            return;
        } else {
            try {
                const response = await fetch('/api/users/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('user', JSON.stringify(data));
                    dispatch({ type: 'LOGIN', payload: data });

                    setValidationMessage('');
                    setName('');
                    setEmail('');
                    setPassword('');
                    setOtp('');
                    setShowSigninPopup(false);
                    setShowSigninSuccessPopup(true);
                } else {
                    setValidationMessage(data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleResend = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/users/resendOtpVerification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                setResendEnabled(false);
                setOtp('');
            } else {
                const data = await response.json();
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleVerifyOTP = async () => {
        if (otp === '') {
            setValidationMessage('Empty Input Field');
            return;
        } else if (otp.length < 6) {
            setValidationMessage('Enter the 6 digit OTP');
        } else {
            try {
                const storedData = localStorage.getItem('user');
                const userData = JSON.parse(storedData);
                const token = userData.token;
                if (!token) {
                    console.log('JWT token not found');
                    return;
                }

                const response = await fetch('/api/users/verifyOtp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ otp })
                });

                if (response.ok) {
                    setValidationMessage('');
                    setName('');
                    setEmail('');
                    setPassword('');
                    setOtp('');
                    setShowOtpPopup(false);
                    setShowSignupSuccessPopup(true);
                } else {
                    const data = await response.json();
                    if (data.message === '1') {
                        setValidationMessage('Code has expired. Please request again.');
                    } else if (data.message === '2') {
                        setValidationMessage('Invalid OTP entered. Check your inbox.');
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleSignout = async () => {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        bagbooksDispatch({ type: 'SET_BAGBOOKS', payload: null});
    };

    const toggleSignup = () => {
        setShowSigninPopup(false);
        setShowSignupPopup(true);
    };

    const toggleSignin = () => {
        setShowSignupPopup(false);
        setShowSigninPopup(true);
    };


    const closeOtpPopup = () => {
        setName('');
        setEmail('');
        setPassword('');
        setOtp('');
        setShowOtpPopup(false);
    };

    const closeSignupSuccessPopup = () => {
        setName('');
        setEmail('');
        setPassword('');
        setOtp('');
        setShowSignupSuccessPopup(false);
    };

    const closeSigninSuccessPopup = () => {
        setName('');
        setEmail('');
        setPassword('');
        setOtp('');
        setShowSigninSuccessPopup(false);
    };

    return (
        <div className="row justify-content-between" id="topBar">
            <div className="col-12 col-md-6 my-margin my-sm-3 order-md-2 d-flex align-items-center justify-content-end">
                <div className=" col-12 d-flex align-items-center justify-content-end">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center me-2">
                            <Link to="/bag" className="btn my-btn">
                                <i className="bi bi-handbag-fill fs-5"></i>
                            </Link>
                            <div className="notification-container">
                                <button type="button" className="btn my-btn" onClick={displayNotificationPopup} id="notificationButton">
                                    <i className="bi bi-bell-fill fs-5"></i>
                                </button>
                                {showNotification && (
                                    <NotificationPopup />
                                )}
                            </div>
                        </div>

                        {!user && (
                            <button className="btn btn-primary mt-1 ms-4" onClick={displaySigninPopup} id="signInButton" type="button">Sign In</button>
                        )}

                        {user && (
                            <div className="account-container">
                                <button type="button" className="btn my-btn account-btn d-flex align-items-center" onClick={displayAccountPopup}>
                                    <i className="bi bi-person-circle fs-4 me-2"></i>
                                    <span>{user.name.split(' ')[0]}</span>
                                </button>
                                {showAccountPopup && (
                                    <AccountPopup handleSignout={handleSignout} />
                                )}
                            </div>
                        )}

                        {/* signin popup */}
                        {showSigninPopup && (
                            <SigninPopup
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                validationMessage={validationMessage}
                                handleSignin={handleSignin}
                                closeSigninPopup={closeSigninPopup}
                                toggleSignup={toggleSignup}
                            />
                        )}

                        {/* signup popup */}
                        {showSignupPopup && (
                            <SignupPopup
                                name={name}
                                email={email}
                                password={password}
                                setName={setName}
                                setEmail={setEmail}
                                setPassword={setPassword}
                                validationMessage={validationMessage}
                                handleSignup={handleSignup}
                                closeSignup={closeSignup}
                                toggleSignin={toggleSignin}
                            />
                        )}

                        {/* otp popup */}
                        {showOtpPopup && (
                            <OtpPopup
                                closeOtpPopup={closeOtpPopup}
                                otp={otp}
                                setOtp={setOtp}
                                resendEnabled={resendEnabled}
                                validationMessage={validationMessage}
                                handleResend={handleResend}
                                handleVerifyOTP={handleVerifyOTP}
                            />
                        )}

                        {/* signupsuccesspopup */}
                        {showSignupSuccessPopup && (
                            <SignupSuccessPopup
                                closeSignupSuccessPopup={closeSignupSuccessPopup}
                            />
                        )}

                        {/* signinsuccesspopup */}
                        {showSigninSuccessPopup && (
                            <SigninSuccessPopup
                                closeSigninSuccessPopup={closeSigninSuccessPopup}
                            />
                        )}

                    </div>
                </div>
            </div>
            <div className="col-12 col-md-6 my-3 order-md-1">
                <div className="d-flex align-items-center px-3" id="myTopBar">
                    <div className="col-12">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search Books" aria-label="Search Books" />
                            <button className="btn btn-outline-primary" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;