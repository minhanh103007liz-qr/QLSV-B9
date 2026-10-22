import React, { useState } from "react";
import useFetch from "./useFetch.js";
import { useTheme } from "./ThemeContext.jsx";

const API_URL = "https://6ad8ec55f89c5702ed9a4554.mockapi.io/students";

const QLSV = () => {
  const { data: students, setData, loading, error } = useFetch(API_URL);
  const { theme, toggleTheme } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("CNTT");

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Vui lòng nhập họ tên!");

    const newStudent = { name, email, class: major };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      if (res.ok) {
        const addedData = await res.json();
        setData([...students, addedData]);
        setName("");
        setEmail("");
      }
    } catch (err) {
      alert("Thêm thất bại!");
    }
  };

  // Xóa sinh viên (DELETE)
  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setData(students.filter((student) => student.id !== id));
      }
    } catch (err) {
      alert("Xóa thất bại!");
    }
  };

  if (loading)
    return <div className="status">Đang tải danh sách sinh viên...</div>;
  if (error) return <div className="status error">Lỗi: {error}</div>;

  return (
    <div className="content-box">
      <div className="header">
        <h2>Quản Lý Sinh Viên</h2>
        <button className="theme-btn" onClick={toggleTheme}>
          Chuyển sang chế độ {theme === "light" ? "Tối 🌙" : "Sáng ☀️"}
        </button>
      </div>

      {/* Form thêm sinh viên */}
      <form onSubmit={handleAddStudent} className="form-container">
        <h3>Thêm sinh viên</h3>
        <div className="form-group">
          <label>Họ tên</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nguyễn Văn A"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="an@ptit.edu.vn"
          />
        </div>
        <div className="form-group">
          <label>Ngành</label>
          <select value={major} onChange={(e) => setMajor(e.target.value)}>
            <option value="CNTT">CNTT</option>
            <option value="ATTT">ATTT</option>
            <option value="DTVT">DTVT</option>
            <option value="AIoT">AIoT</option>
          </select>
        </div>
        <button type="submit" className="add-btn">
          Thêm
        </button>
      </form>

      {/* Danh sách sinh viên */}
      <ul className="student-list">
        {Array.isArray(students) &&
          students.map((student) => (
            <li key={student.id} className="student-card">
              <span>
                <strong>{student.name}</strong> –{" "}
                {student.class || student.email || "CNTT"}
              </span>
              <button
                className="delete-btn"
                onClick={() => handleDeleteStudent(student.id)}
              >
                [Xóa]
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default QLSV;
