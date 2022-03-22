import React from "react";

export default function userProfile(props) {
    
    const Logout = () => {
        global.auth.logout();
        props.close('logout');
    }


    return(
        <div className="user-profile">
            <p className="title has-text-centered">Profile</p>
            <fieldset disabled>
                <div className="field">
                    <div className="control has-text-left">
                        <label className="label">NickName</label>
                        <input type="text" className="input" defaultValue={props.user.nickname} />    
                    </div>
                </div>
                <div className="field">
                    <div className="control has-text-left">
                        <label className="label">Email</label>
                        <input type="text" className="input" defaultValue={props.user.email} />    
                    </div>
                </div>
                <div className="field">
                    <div className="control has-text-left">
                        <label className="label">Type</label>
                        <input type="text" className="input" defaultValue={props.user.type === 1? 'Manger': 'General User'} />    
                    </div>
                </div>
            </fieldset>

            <br />
            <div className="field is-grouped is-grouped-centered">
                <div className="control">
                    <button className="button is-danger" type="button" onClick={Logout}>Logout</button>
                </div>
                <div className="control">
                    <button className="button" type='button' onClick={ () => {props.close()}}>Cancel</button>
                </div>
            </div>
        </div>
    )
}