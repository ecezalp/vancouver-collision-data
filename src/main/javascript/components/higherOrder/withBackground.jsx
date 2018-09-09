import React from 'react';

export default function withBackground(Wrapped) {

  const logo = <div className="logo-container">
    <div className="text-container">
      <div className="zero">ZERO</div>
      <div className="collisions">COLLISIONS</div>
    </div>
  </div>;

  const bell = <div className="users-container">
    <i className="fas fa-bell nav-icon"/>
    <div className="notification">7</div>
  </div>;

  const renderIcon = (className, iconClassName, text, href) => {
    const appIcon = <div className={`${className}-container nav-icon`}>
      <i className={iconClassName}/>
      {text && <div className="icon-text">{text}</div>}
    </div>;
    return href ? <a href={href}>{appIcon}</a> : appIcon;
  };

  const topNav = <div className="top-nav">
    {renderIcon("cog", "fas fa-cog")}
    <div className="filler"/>
    {logo}
    {renderIcon("users", "fas fa-user-friends")}
    {bell}
  </div>;

  const body = <div className="body-background">
    <Wrapped/>
  </div>;

  const bottomNav = <div className="bottom-nav">
    {renderIcon("user", "far fa-user", "Profile", "/")}
    {renderIcon("bike", "fas fa-bicycle", "My Routes", "/bikeRoutes")}
    {renderIcon("record", "far fa-dot-circle", "Record")}
    {renderIcon("route", "fas fa-route", "New Route", "/map")}
    {renderIcon("ellipsis", "fas fa-ellipsis-h", "More")}
  </div>;

  return <div className="background-container">
    {topNav}
    {body}
    {bottomNav}
  </div>
}