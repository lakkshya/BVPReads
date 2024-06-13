const SignupSuccessPopup = ({ closeSignupSuccessPopup }) => {
    return (
        <div className="screen-bg-4">
            <div className="container success-popup">
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="close-btn-2" onClick={closeSignupSuccessPopup}><i className="bi bi-x fs-1"></i></button>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-12 px-4 px-lg-0 col-lg-8">
                        <div className="col-12 mb-1 d-flex justify-content-center">
                            <span><i className="bi bi-check-circle"></i></span>
                        </div>
                        <div className="col-12 mb-1 d-flex justify-content-center">
                            <h5 className="text-center">Account Created Successfully</h5>
                        </div>
                        <div className="col-12 text-center mb-3">
                            <span className="that-font">Your account has been created successfully. Sign in now.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupSuccessPopup;