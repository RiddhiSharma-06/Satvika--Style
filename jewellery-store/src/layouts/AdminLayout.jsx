import AdminSidebar from "../components/AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <AdminSidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
          backgroundColor: "#f5f5f5",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;