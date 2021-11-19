import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Popover} from "antd";
import {userSignOut} from "appRedux/actions/Auth";
import {getCurrentMember} from "../../appRedux/actions";
import {getImageURL} from "../../util/ParseUtils";

const UserInfo = () => {
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/englishcenter-2021.appspot.com/o/images%2Favatar.png?alt=media";
    const dispatch = useDispatch();
    const {authUser} = useSelector(({auth}) => auth);
    const {member} = useSelector(({common}) => common);
    const [urlAvatar, setUrlAvatar] = useState(null);
    const [name, setName] = useState("Not Found");

    useEffect(() => {
        dispatch(getCurrentMember());
        // eslint-disable-next-line
    }, [authUser])

    useEffect(() => {
        if (member != null) {
            const url = getImageURL(member.avatar);
            setUrlAvatar(url === "" ? defaultImage : url);
            setName(member.name);
        }
    }, [member])

    const userMenuOptions = (
        <ul className="gx-user-popover">
            <li>My Account</li>
            <li onClick={() => dispatch(userSignOut())}>Logout</li>
        </ul>
    );

    return (
        <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
            <span className="gx-avatar-name" style={{color: "#fa8c15", fontSize: "15px", marginRight: "10px"}}>{name}</span>
            <Avatar src={urlAvatar} className="gx-size-40 gx-pointer gx-mr-3" alt="avatar"/>
        </Popover>
    );
};

export default UserInfo;
