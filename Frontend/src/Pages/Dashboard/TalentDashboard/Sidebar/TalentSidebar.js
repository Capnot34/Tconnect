import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import images from "../../../../Components/images";
import "./TalentSidebar.css"
import {
  FaHome,
  FaUser,
  FaEnvelopeOpenText,
  FaRegListAlt,
  FaRegFileAlt,
  FaRegEnvelope,
  FaCog,
  FaSignOutAlt,
  FaArrowCircleRight,
  FaArrowCircleLeft,
} from "react-icons/fa";
import "../../TSidebar.css";
const TalentSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    localStorage.getItem("avatarUrl") || images.Talent1
  );

  useEffect(() => {
    const updateAvatar = () => {
      setAvatarUrl(localStorage.getItem("avatarUrl") || images.Talent1);
    };

    window.addEventListener("storage", updateAvatar);

    return () => {
      window.removeEventListener("storage", updateAvatar);
    };
  }, []);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };


  return (
    <>
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <button onClick={toggleCollapse}>
          <span className="toggle-icon">
            {collapsed ? <FaArrowCircleRight /> : <FaArrowCircleLeft />}
          </span>
        </button>
        <div className="avatar-container">
          <img src={avatarUrl} alt="Avatar" className="avatar" />{" "}
          {!collapsed && ""}
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/TalentDashboard" className="sidebar-link">
                <FaHome /> {!collapsed && "Dashboard"}
              </Link>
            </li>
            <li>
              <Link to="/Talentprofile" className="sidebar-link">
                <FaUser /> {!collapsed && "Profile"}
              </Link>
            </li>

            <li>
              <Link to="/TApplications" className="sidebar-link">
                <FaEnvelopeOpenText /> {!collapsed && "Applications"}
              </Link>
            </li>
            <li>
              <Link to="/TShortlisted" className="sidebar-link">
                <FaRegListAlt /> {!collapsed && "Shortlisted "}
              </Link>
            </li>
            <li>
              <Link to="/TOpportunities" className="sidebar-link">
                <FaRegFileAlt /> {!collapsed && "Opportunities"}
              </Link>
            </li>
            <li>
              <Link to="/TMessages" className="sidebar-link">
                <FaRegEnvelope /> {!collapsed && "Messages"}
              </Link>
            </li>
            <li>
              <Link to="/Talentsettings" className="sidebar-link">
                <FaCog /> {!collapsed && "Settings"}
              </Link>
            </li>
            <li>
              <Link to="/" className="sidebar-link">
                <FaSignOutAlt /> {!collapsed && "Logout"}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default TalentSidebar;