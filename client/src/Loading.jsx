import React from 'react'

function Loading() {
    return (
        <div className="loading-container">
            <div className="spinner" aria-label="Loading"></div>

            <style>{`
        .loading-container{
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100%;
          background: transparent;
        }

        .spinner{
          width: 48px;
          height: 48px;
          border: 6px solid rgba(0,0,0,0.12);
          border-top-color: #4f46e5;
          border-radius: 50%;
          animation: spin 0.9s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    )
}

export default Loading
