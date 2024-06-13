const OtpPopup = ({ closeOtpPopup, otp, setOtp, resendEnabled, validationMessage, handleResend, handleVerifyOTP }) => {
    return (
        <div className="screen-bg-2">
            <div className="container signin-popup" id="otpPopup">
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="close-btn-2" onClick={closeOtpPopup}><i className="bi bi-x fs-1"></i></button>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-12 px-4 px-lg-0 col-lg-8">
                        <div className="col-12 d-flex justify-content-center text-center">
                            <h3>BVICAM Library</h3>
                        </div>
                        <div className="col-12 mb-3 d-flex justify-content-center">
                            <h2>Enter OTP</h2>
                        </div>
                        <div className="col-12 text-center mb-3">
                            <span className="that-font">A 6-digit OTP has been sent to your email address. Please check your inbox and enter
                                the OTP below to proceed with signing in.</span>
                        </div>
                        <div className="col-12">
                            <form>
                                <div className="row mb-2">
                                    <label htmlFor="inputOTP" className="col-12 col-form-label">OTP</label>
                                    <div className="col-8">
                                        <input type="text" className="form-control" id="inputOTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                    </div>
                                    <div className="col-4">
                                        <a href="/" className={`btn btn-primary ${resendEnabled ? '' : 'disabled'}`} style={{ width: '100%' }} tabIndex="-1" role="button" aria-disabled="true" onClick={handleResend}>Resend</a>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12 validation-message">{validationMessage}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-12 d-grid gap-2">
                                        <button className="btn btn-primary" type="button" onClick={handleVerifyOTP}>Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OtpPopup;