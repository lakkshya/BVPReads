const AccountPopup = ({ handleSignout }) => {
    return (
        <div>
            <div className="account-popup container-fluid">
                <div className="row my-2">
                    <div className="col-12">
                        <button className="btn w-100" type="button">My Profile</button>
                    </div>
                    <div className="col-12">
                        <button className="btn w-100" onClick={handleSignout} type="button">Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountPopup;