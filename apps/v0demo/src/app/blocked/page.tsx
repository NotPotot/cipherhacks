export default function BlockedPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui' }}>
      <div style={{ textAlign: 'center', maxWidth: 420, padding: 24 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🛡️</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Access Blocked</h1>
        <p style={{ color: '#666', lineHeight: 1.6 }}>
          CipherHacks has detected automated or suspicious activity from your
          session. This request has been blocked to protect sensitive data.
        </p>
      </div>
    </div>
  )
}
