import { useEffect, useState } from "react";
import $ from 'jquery'
import { useUser } from "./userContext";

import { regex } from "./Registration";
import { updateData } from "./Registration";
import { firstNameCheck } from "./Registration";
import { lastNamecheck } from "./Registration";
import { phoneNumberCheck } from "./Registration";
import { pinCodeCheck } from "./Registration";

export default function Profile () {
    const userID = useUser().userID
    const [profile, setProfile] = useState({firstName: "", lastName: "", mobile: null, alternateMobile: null})
    const [editView, setEditView] = useState(false);

    console.log(profile)
    console.log(editView)

    console.log(regex.emailRx.test(profile.email))
    function getProfile() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/profile/getProfile.php",
            data: JSON.stringify(userID),
            xhrFields: {
                withCredentials: true
            },
            success: (data) => {
                setProfile(data)
            },
            error: () => {

            }
        })
    }

    useEffect(() => getProfile(), [])

    function editProfile(event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/profile/editProfile.php",
            data: JSON.stringify(profile),
            xhrFields: {
                withCredentials: true
            },
            success: (data) => {
                getProfile()
                setEditView(false)
            }
        })
    }

    return (
        <>
            <div className="bodyDiv">
                <div className="w-100 ps-2 py-2 rounded-2 bodyHeadingDiv">
                    <span className="mb-0 bodyHeading">Profile</span>
                </div>

                <div className="pt-2 ps-2">         
                    <form onSubmit={(event) => {}} action="" className="formProfile">                                              
                        <div>
                            <div id="email" className="fs-5">
                                <label htmlFor="" className="form-label d-block">Email</label>
                                <input disabled={!editView} onChange={(event) => {updateData(event, setProfile)}}
                                        type="email" name="" id="email" value={profile.email}
                                        className={"form-control fs-5 " + (editView && (regex.emailRx.test(profile.email) ? " accept" : " reject"))}/>
                            </div>
                            <div className="fs-5">
                                <label htmlFor="" className="form-label d-block">Mobile Number</label>
                                <input  disabled={!editView} onChange={(event) => {phoneNumberCheck(event, setProfile)}}
                                        type="number" maxLength={10} name="phonenumber" id="mobile" value={profile.mobile}
                                        className={"form-control fs-5 " + (editView && (profile.mobile && regex.numberRx.test(profile.mobile) ? " accept" : " reject"))}/>
                            </div>
                            <div className="fs-5">
                                <label htmlFor="" className="form-label d-block">Alternate Mobile Number</label>
                                <input disabled={!editView} onChange={(event) => {phoneNumberCheck(event, setProfile)}}
                                        type="number" name="phonenumber" id="alternateMobile" value={profile.alternateMobile || ""}
                                        className={"form-control fs-5 " + (editView && (profile.alternateMobile && regex.numberRx.test(profile.alternateMobile) ? " accept" : " reject"))}/>
                            </div>
                        </div>

                        <div className="divProfilePhoto">
                            
                            <img src="/profile.png" width="150" height="150"/> 
                            <div>
                                <h2 className="m-0">ABCD ABCD</h2>
                                <p>ID: <span>000000000</span></p>
                                <p>DD/MM/YYYY</p>
                            </div>
                        </div> 

                        <div className="divEditProfile">
                            {!editView ? <button onClick={(event) => {event.preventDefault(); setEditView(!editView)}} className="btn buttonSubmit">Edit</button>
                                        : (
                                            <>
                                                <button onClick={(event) => {editProfile(event)}} className="btn buttonSubmit">Save</button>
                                                <button onClick={(event) => {event.preventDefault(); setEditView(!editView); getProfile()}} className="btn buttonSubmit">Cancel</button>
                                            </>
                                        )
                            }
                        </div>

                        <h4 className="">Qualification and Category</h4>

                        <div className="fs-5">
                            <label htmlFor="" className="form-label d-block">Qualification</label>
                            <select disabled={!editView} className="form-control fs-5" 
                                onChange={(event) => {updateData(event, setProfile)}}
                                id="qualification"
                                >
                                <option value="12th">12th</option>
                                <option value="Graduate">Graduate</option>
                                <option value="Post Graduate">Post Graduate</option>
                                <option value="Doctorate">Doctorate</option>
                            </select>
                        </div>
        
                        <div className="fs-5">
                            <label htmlFor="" className="form-label d-block">Category</label>
                            <select disabled={!editView} className="form-control fs-5" 
                                onChange={(event) => {console.log(event); updateData(event, setProfile)}}
                                id="category"
                                >
                                <option value="GEN">GEN</option>
                                <option value="SC">SC</option>
                                <option value="ST">ST</option>
                                <option value="OBC">OBC</option>
                            </select>
                        </div>

                        <h4 className="">Address</h4>
                        <div className="fs-5">
                            <label htmlFor="" className="form-label d-block">Address Line 1</label>
                            <input disabled={!editView} onChange={(event) => {updateData(event, setProfile)}} type="text" name="" id="addressFirstLine" 
                                    className="form-control fs-5"
                                    value={profile.addressFirstLine}/>
                        </div>

                        <div className="fs-5">
                            <label htmlFor="" className="form-label d-block">Address Line 2</label>
                            <input disabled={!editView} onChange={(event) => {updateData(event, setProfile)}} type="text" name="" id="addressSecondLine" 
                                    className="form-control fs-5"
                                    value={profile.addressSecondLine}/>
                        </div>
                    
                        <div className="fs-5">
                            <label htmlFor="" className="form-label d-block">City</label>
                            <input disabled={!editView} onChange={(event) => {updateData(event, setProfile)}} type="text" name="" id="city" 
                                    className="form-control fs-5"
                                    value={profile.city || ""}/>
                        </div>

                        <div className="fs-5">
                            <label htmlFor="" className="form-label d-block">District</label>
                            <input disabled={!editView} onChange={(event) => {updateData(event, setProfile)}} type="text" name="" id="district" 
                                    className="form-control fs-5"
                                value={profile.district}/>
                        </div>

                        <div className="fs-5">
                            <label htmlFor="" className="form-label d-block">State</label>
                            <input disabled={!editView} onChange={(event) => {updateData(event, setProfile)}} type="text" name="" id="state" 
                                    className="form-control fs-5"
                                    value={profile.state}/>
                        </div>

                        <div className="fs-5">
                            <label htmlFor="" className="form-label d-block">Pin Code</label>
                            <input disabled={!editView} onChange={(event) => {pinCodeCheck(event, setProfile)}} type="text" name="" id="pinCode" 
                                    className="form-control fs-5"
                                    value={profile.pinCode}/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}