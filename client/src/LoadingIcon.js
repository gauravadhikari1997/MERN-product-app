import React from "react";

function LoadingIcon() {
  return (
    <div className="d-flex justify-content-center py-5">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingIcon;
