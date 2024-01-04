function SideBarComponents() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="/dashboard">
            <i className="ti-shield menu-icon" />
            <span className="menu-title">Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/roompage">
            <i className="ti-agenda menu-icon" />
            <span className="menu-title">Student Room&apos;s</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/students">
            <i className="ti-file menu-icon" />
            <span className="menu-title">Student&apos;s Data</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/employes">
            <i className="ti-agenda menu-icon" />
            <span className="menu-title">Employee and Teacher&apos;s</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/kriteria">
            <i className="ti-agenda menu-icon" />
            <span className="menu-title">Kriteria dan Sub-Kriteria</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/permission">
            <i className="ti-ruler-pencil menu-icon" />
            <span className="menu-title">Permission</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/cpi-calculated">
            <i className="ti-star menu-icon" />
            <span className="menu-title">Calculated</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/documentation.html">
            <i className="ti-write menu-icon" />
            <span className="menu-title">Generate Report</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default SideBarComponents;
