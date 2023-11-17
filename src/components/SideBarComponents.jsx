function SideBarComponents() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="/admin">
            <i className="ti-shield menu-icon" />
            <span className="menu-title">Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/roompage">
            <i className="ti-agenda menu-icon" />
            Student Room&apos;s
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/students">
            <i className="ti-file menu-icon" />
            <span className="menu-title">Student&apos;s Data</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/employes">
            <i className="ti-agenda menu-icon" />
            <span className="menu-title">Employee and Teacher&apos;s</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/permission">
            <i className="ti-ruler-pencil menu-icon" />
            <span className="menu-title">Permission</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/cpi-calculated">
            <i className="ti-star menu-icon" />
            <span className="menu-title">Calculated</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="documentation/documentation.html">
            <i className="ti-write menu-icon" />
            <span className="menu-title">Generate Report</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default SideBarComponents;
