import { useState, useRef } from "react";
import Icon from "../../../components/Icon.jsx";
import { clients } from "../../../data/mockData.js";
import "./NewOrder.css";

// ─── Measurement field names matching the design ─────────────────────────
const MEASUREMENT_FIELDS = [
  { key: "chest",    label: "Chest"    },
  { key: "waist",    label: "Waist"    },
  { key: "hip",      label: "Hip"      },
  { key: "shoulder", label: "Shoulder" },
  { key: "sleeve",   label: "Sleeve"   },
  { key: "length",   label: "Length"   },
];

const EMPTY_MEASUREMENTS = MEASUREMENT_FIELDS.reduce(
  (acc, f) => ({ ...acc, [f.key]: "" }),
  {}
);

// ─── NewOrder component ───────────────────────────────────────────────────
export default function NewOrder({ onBack }) {
  // ── Form state ──────────────────────────────────────────────────────────
  const [selectedClientId, setSelectedClientId] = useState("");
  const [deliveryDate, setDeliveryDate]         = useState("");
  const [description, setDescription]           = useState("");
  const [notes, setNotes]                       = useState("");
  const [measurements, setMeasurements]         = useState(EMPTY_MEASUREMENTS);
  const [uploadedFile, setUploadedFile]         = useState(null);
  const [uploadPreview, setUploadPreview]       = useState(null);
  const [isDragging, setIsDragging]             = useState(false);
  const [selectOpen, setSelectOpen]             = useState(false);
  const fileInputRef = useRef(null);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const selectedClient = clients.find((c) => c.id === selectedClientId);

  const handleMeasurementChange = (key, val) => {
    // Allow digits and single decimal point only
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      setMeasurements((prev) => ({ ...prev, [key]: val }));
    }
  };

  const handleAutofill = () => {
    if (!selectedClient) return;
    const m = selectedClient.measurements;
    setMeasurements({
      chest:    String(m.chest),
      waist:    String(m.waist),
      hip:      String(m.hip),
      shoulder: String(m.shoulder),
      sleeve:   String(m.sleeve),
      length:   String(m.length),
    });
  };

  // ── File upload handlers ─────────────────────────────────────────────────
  const processFile = (file) => {
    if (!file) return;
    const allowed = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowed.includes(file.type)) { alert("Only PNG/JPG files are allowed."); return; }
    if (file.size > 5 * 1024 * 1024)  { alert("File must be under 5MB.");         return; }
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setUploadPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  const handleDragOver  = (e) => { e.preventDefault(); setIsDragging(true);  };
  const handleDragLeave = ()  => setIsDragging(false);

  const removeUpload = () => {
    setUploadedFile(null);
    setUploadPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedClientId) { alert("Please select a client."); return; }
    if (!deliveryDate)     { alert("Please set a delivery date."); return; }
    if (!description.trim()){ alert("Please add a style description."); return; }

    // TODO: POST /api/orders  with formData
    const payload = {
      clientId: selectedClientId,
      clientName: selectedClient?.name,
      deliveryDate,
      description,
      notes,
      measurements,
      styleImage: uploadedFile?.name ?? null,
    };
    console.log("New order payload:", payload);
    alert(`Order created for ${selectedClient?.name}!`);
    onBack?.();
  };

  const handleCancel = () => onBack?.();

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="no-page">
      {/* Back link */}
      <button className="no-back-btn" onClick={onBack} type="button">
        <Icon name="arrowLeft" />
        Back to orders
      </button>

      <form className="no-form" onSubmit={handleSubmit} noValidate>

        {/* ── Section: Order Information ────────────────────────────── */}
        <section className="no-section">
          <h2 className="no-section-title">Order Information</h2>

          <div className="no-row no-row--two-col">
            {/* Client select — custom dropdown */}
            <div className="no-field">
              <div
                className={`no-select ${selectOpen ? "no-select--open" : ""}`}
                onClick={() => setSelectOpen(!selectOpen)}
                role="combobox"
                aria-expanded={selectOpen}
                aria-haspopup="listbox"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectOpen(!selectOpen)}
              >
                <span className={`no-select__value ${!selectedClientId ? "no-select__value--placeholder" : ""}`}>
                  {selectedClient ? selectedClient.name : "Select a Client"}
                </span>
                <Icon name="chevronDown" />
              </div>

              {selectOpen && (
                <ul className="no-dropdown" role="listbox" aria-label="Select a client">
                  {clients.map((c) => (
                    <li
                      key={c.id}
                      role="option"
                      aria-selected={selectedClientId === c.id}
                      className={`no-dropdown__item ${selectedClientId === c.id ? "no-dropdown__item--selected" : ""}`}
                      onClick={() => {
                        setSelectedClientId(c.id);
                        setSelectOpen(false);
                      }}
                    >
                      <Icon name="userFill" />
                      {c.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Delivery date */}
            <div className="no-field">
              <label className="no-label" htmlFor="no-delivery-date">Delivery Date</label>
              <div className="no-date-wrap">
                <input
                  id="no-delivery-date"
                  className="no-input no-date-input"
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  placeholder="mm/dd/yyyy"
                />
                <Icon name="calendar" />
              </div>
            </div>
          </div>

          {/* Style description */}
          <div className="no-field">
            <label className="no-label" htmlFor="no-description">Style Description</label>
            <textarea
              id="no-description"
              className="no-textarea"
              placeholder="Describe the style, fabric and any other details"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Notes */}
          <div className="no-field">
            <label className="no-label" htmlFor="no-notes">Notes</label>
            <textarea
              id="no-notes"
              className="no-textarea"
              placeholder="Any additional notes for this order"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </section>

        {/* ── Section: Style Reference ──────────────────────────────── */}
        <section className="no-section">
          <h2 className="no-section-title">Style Reference</h2>

          <div
            className={`no-upload-zone ${isDragging ? "no-upload-zone--drag" : ""} ${uploadPreview ? "no-upload-zone--has-file" : ""}`}
            onClick={() => !uploadPreview && fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            role="button"
            tabIndex={0}
            aria-label="Upload style reference image"
            onKeyDown={(e) => e.key === "Enter" && !uploadPreview && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              className="no-upload-input"
              onChange={handleFileChange}
              tabIndex={-1}
            />

            {uploadPreview ? (
              <div className="no-upload-preview">
                <img src={uploadPreview} alt="Style reference preview" className="no-upload-preview__img" />
                <div className="no-upload-preview__overlay">
                  <button
                    type="button"
                    className="no-upload-preview__remove"
                    onClick={(e) => { e.stopPropagation(); removeUpload(); }}
                    aria-label="Remove uploaded image"
                  >
                    <Icon name="close" />
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-upload-idle">
                <span className="no-upload-icon">
                  <Icon name="upload" />
                </span>
                <p className="no-upload-label">Click or drag to upload style image</p>
                <p className="no-upload-hint">PNG, JPG UP TO 5MB</p>
              </div>
            )}
          </div>
        </section>

        {/* ── Section: Measurements ─────────────────────────────────── */}
        <section className="no-section">
          <div className="no-meas-header">
            <h2 className="no-section-title">Measurement (inches)</h2>
            <button
              type="button"
              className="no-autofill-btn"
              onClick={handleAutofill}
              disabled={!selectedClientId}
              title={!selectedClientId ? "Select a client first" : "Autofill from client profile"}
            >
              <Icon name="userFill" />
              Autofill from client
            </button>
          </div>

          <div className="no-measurements-grid">
            {MEASUREMENT_FIELDS.map((field) => (
              <div className="no-field" key={field.key}>
                <label className="no-label" htmlFor={`no-meas-${field.key}`}>
                  {field.label}
                </label>
                <input
                  id={`no-meas-${field.key}`}
                  className="no-input"
                  type="text"
                  inputMode="decimal"
                  value={measurements[field.key]}
                  onChange={(e) => handleMeasurementChange(field.key, e.target.value)}
                  placeholder="0"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer actions ─────────────────────────────────────────── */}
        <div className="no-footer">
          <button type="button" className="no-cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="no-submit-btn">
            Create Order
          </button>
        </div>

      </form>
    </div>
  );
}
