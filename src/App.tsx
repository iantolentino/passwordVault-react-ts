import React, { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [masterPassword, setMasterPassword] = useState('');
  const [error, setError] = useState('');
  
  // PIN verification state
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [selectedItem, setSelectedItem] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Demo: Accept any non-empty password
    if (masterPassword.trim() !== '') {
      setIsAuthenticated(true);
    } else {
      setError('Please enter a password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setMasterPassword('');
  };

  const handleViewClick = (itemName: string) => {
    setSelectedItem(itemName);
    setShowPinModal(true);
    setPin('');
    setPinError('');
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    
    if (pin === '123456') {
      // PIN correct - show credentials
      let credentials = '';
      switch (selectedItem) {
        case 'Gmail Account':
          credentials = 'Username: user@gmail.com\nPassword: GmailPass123!';
          break;
        case 'Bank Account':
          credentials = 'Username: john.doe@bank.com\nPassword: BankSecure456!';
          break;
        case 'Netflix Account':
          credentials = 'Username: john.streamer@email.com\nPassword: NetflixPass789!';
          break;
        default:
          credentials = 'Username: demo@email.com\nPassword: DemoPassword123!';
      }
      
      alert(`Credentials for ${selectedItem}:\n\n${credentials}\n\nThis will auto-hide in 30 seconds.`);
      setShowPinModal(false);
      setPin('');
      setSelectedItem('');
    } else {
      setPinError('Invalid PIN! Try: 123456');
      setPin('');
    }
  };

  const closePinModal = () => {
    setShowPinModal(false);
    setPin('');
    setPinError('');
    setSelectedItem('');
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f9fafb',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '400px',
          margin: '0 auto',
          padding: '40px 20px',
          textAlign: 'center' as const
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#2563eb',
            borderRadius: '50%',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg style={{ width: '32px', height: '32px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#1f2937',
            marginBottom: '10px'
          }}>
            Secure Vault
          </h1>
          
          <p style={{ 
            color: '#6b7280',
            marginBottom: '30px'
          }}>
            Sign in to access your password vault
          </p>

          {/* Demo Instructions */}
          <div style={{
            backgroundColor: '#dbeafe',
            border: '1px solid #93c5fd',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '30px',
            textAlign: 'left' as const
          }}>
            <h3 style={{ 
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#1e40af',
              marginBottom: '8px'
            }}>
              🚀 Demo Mode - Test Credentials
            </h3>
            <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>
              <div><strong>Master Password:</strong> Any password (try "demo123")</div>
              <div><strong>Unlock PIN:</strong> 123456</div>
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px',
                textAlign: 'left' as const
              }}>
                Master Password
              </label>
              <input
                type="password"
                value={masterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem'
                }}
                placeholder="Enter any password for demo"
                required
              />
            </div>

            {error && (
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                padding: '12px',
                borderRadius: '6px',
                marginBottom: '20px',
                fontSize: '0.875rem'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px 16px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Show vault interface if authenticated
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb'
    }}>
      {/* PIN Verification Modal */}
      {showPinModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '12px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ 
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '8px',
              textAlign: 'center' as const
            }}>
              Enter PIN
            </h3>
            <p style={{
              color: '#6b7280',
              marginBottom: '24px',
              textAlign: 'center' as const
            }}>
              Please enter your 6-digit PIN to view {selectedItem}
            </p>
            
            <form onSubmit={handlePinSubmit}>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="••••••"
                style={{
                  width: '100%',
                  padding: '16px',
                  border: pinError ? '2px solid #dc2626' : '2px solid #d1d5db',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  textAlign: 'center' as const,
                  fontSize: '1.5rem',
                  letterSpacing: '8px',
                  fontWeight: '600'
                }}
                maxLength={6}
                autoFocus
              />
              
              {pinError && (
                <div style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  padding: '12px',
                  borderRadius: '6px',
                  marginBottom: '16px',
                  fontSize: '0.875rem',
                  textAlign: 'center' as const
                }}>
                  {pinError}
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={closePinModal}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  Unlock
                </button>
              </div>
            </form>
            
            <div style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: '#f0f9ff',
              borderRadius: '6px',
              textAlign: 'center' as const
            }}>
              <span style={{ fontSize: '0.75rem', color: '#0369a1' }}>
                Demo PIN: <strong>123456</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ 
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937'
          }}>
            Secure Vault
          </h1>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '0.875rem',
              cursor: 'pointer',
              backgroundColor: 'white'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px 20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{ 
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            Welcome to Secure Vault
          </h2>
          
          <p style={{ 
            color: '#6b7280',
            marginBottom: '32px',
            fontSize: '1.125rem'
          }}>
            Your password vault is ready. Click "View" to see credentials (PIN: 123456).
          </p>

          {/* Demo Vault Items */}
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '32px'
          }}>
            <h3 style={{ 
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#0f172a',
              marginBottom: '20px'
            }}>
              Your Vault Items
            </h3>
            
            <div style={{ display: 'grid', gap: '16px' }}>
              {/* Demo Item 1 */}
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                <div>
                  <div style={{ 
                    fontSize: '1.125rem',
                    fontWeight: '600', 
                    color: '#1f2937',
                    marginBottom: '4px'
                  }}>
                    Gmail Account
                  </div>
                  <div style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280' 
                  }}>
                    user@gmail.com • Personal
                  </div>
                </div>
                <button 
                  onClick={() => handleViewClick('Gmail Account')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                >
                  View Credentials
                </button>
              </div>

              {/* Demo Item 2 */}
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                <div>
                  <div style={{ 
                    fontSize: '1.125rem',
                    fontWeight: '600', 
                    color: '#1f2937',
                    marginBottom: '4px'
                  }}>
                    Bank Account
                  </div>
                  <div style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280' 
                  }}>
                    john.doe@bank.com • Finance
                  </div>
                </div>
                <button 
                  onClick={() => handleViewClick('Bank Account')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                >
                  View Credentials
                </button>
              </div>

              {/* Demo Item 3 */}
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                <div>
                  <div style={{ 
                    fontSize: '1.125rem',
                    fontWeight: '600', 
                    color: '#1f2937',
                    marginBottom: '4px'
                  }}>
                    Netflix Account
                  </div>
                  <div style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280' 
                  }}>
                    john.streamer@email.com • Entertainment
                  </div>
                </div>
                <button 
                  onClick={() => handleViewClick('Netflix Account')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                >
                  View Credentials
                </button>
              </div>
            </div>
          </div>

          {/* Demo Instructions */}
          <div style={{
            backgroundColor: '#fffbeb',
            border: '1px solid #fcd34d',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <h4 style={{ 
              fontSize: '1rem',
              fontWeight: '600',
              color: '#92400e',
              marginBottom: '12px'
            }}>
              💡 How to Use This Demo:
            </h4>
            <ul style={{ 
              color: '#92400e',
              fontSize: '0.875rem',
              paddingLeft: '20px',
              margin: 0,
              lineHeight: '1.6'
            }}>
              <li><strong>Click "View Credentials"</strong> on any item above</li>
              <li><strong>Enter PIN: 123456</strong> when prompted</li>
              <li>Credentials will be shown in a popup (auto-hides after 30 seconds)</li>
              <li><strong>Wrong PIN?</strong> Try exactly "123456"</li>
              <li><strong>Click "Logout"</strong> in top-right to return to login</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;