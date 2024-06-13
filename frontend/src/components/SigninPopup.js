const SigninPopup = ({ email, setEmail, password, setPassword, validationMessage, handleSignin, closeSigninPopup, toggleSignup }) => {

    return (
        <div className="screen-bg-1">
            <div className="container signin-popup" id="signinPopup">
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="close-btn-1" onClick={closeSigninPopup}><i className="bi bi-x fs-1"></i></button>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-12 px-4 px-lg-0 col-lg-8">
                        <div className="col-12 d-flex justify-content-center text-center">
                            <h3>BVICAM Library</h3>
                        </div>
                        <div className="col-12 mb-3 d-flex justify-content-center">
                            <h2>Sign in</h2>
                        </div>
                        <div className="col-12 text-center mb-3">
                            <span className="that-font">Only students and faculty of BVICAM can log in using their college mail
                                IDs</span>
                        </div>
                        <div className="col-12">
                            <form>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-12 col-form-label">Email</label>
                                    <div className="col-12">
                                        <input type="email" className="form-control" id="inputEmail3" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <label htmlFor="inputPassword" className="col-12 col-form-label">Password</label>
                                    <div className="col-12">
                                        <input type="password" className="form-control" id="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12 validation-message">{validationMessage}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-12 d-grid gap-2">
                                        <button className="btn btn-primary" type="button" onClick={handleSignin} id="otpButton">Sign in</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="row mb-2">
                            <div className="col-12 d-flex justify-content-center">
                                <span className="text-center">Don't have an account? <button onClick={toggleSignup}>Sign Up</button></span>
                            </div>
                        </div>
                        {/* <div className="col-12">
                            <div className="col-12 d-flex justify-content-center">
                                <span className="this-font">OR</span>
                            </div>
                            <div className="col-12 d-grid gap-2 mt-2 mb-3">
                                <button className="btn btn-primary d-flex justify-content-start align-items-center" type="button">
                                    <div className="col-auto">
                                        <i className="bi bi-google"></i>
                                    </div>
                                    <div className="col flex-grow-1 d-flex justify-content-center">
                                        <span>Sign in with Google</span>
                                    </div>
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SigninPopup;