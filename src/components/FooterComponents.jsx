function FooterComponent() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer col-lg-12 col-md-12 flex-row">
      <div className="d-flex justify-content-center justify-content-sm-between align-items-center">
        <span className="text-muted text-center d-block d-sm-inline-block">
          &copy; Hendri_Permana {currentYear}
        </span>
        <span className="text-muted text-center d-block d-sm-inline-block">
          Powered by BOOTSTRAP
        </span>
      </div>
    </footer>
  );
}

export default FooterComponent;
