import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import propTypes from "prop-types";
import { useRef } from "react";

const ExportPDF = ({ data, fileName }) => {
  const contentRef = useRef(null);

  const handleExportToPdf = () => {
    const contentElement = contentRef.current;

    if (contentElement) {
      html2canvas(contentElement).then((canvas) => {
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297); // A4 size: 210 x 297 mm
        pdf.save(`${fileName}.pdf`);
      });
    }
  };

  return (
    <div>
      <button
        className="btn btn-secondary me-3 my-3"
        onClick={handleExportToPdf}
      >
        Generate Report
      </button>
      <div ref={contentRef}>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ExportPDF.propTypes = {
  data: propTypes.array.isRequired,
  fileName: propTypes.string.isRequired,
};

export default ExportPDF;
