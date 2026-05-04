export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <h2 className="footer-logo">Stella Bistro</h2>
        <div className="footer-info">
          <div className="footer-info-block">
            <h4>Location</h4>
            <p>Near Tariq Rd</p>
            <p>Karachi, Pakistan</p>
          </div>
          <div className="footer-info-block">
            <h4>Hours</h4>
            <p>Mon - Sun</p>
            <p>12:00 PM - 1:00 AM</p>
          </div>
          <div className="footer-info-block">
            <h4>Contact</h4>
            <p>info@stellabistro.pk</p>
            <p>+92 123 4567890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Stella Bistro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
