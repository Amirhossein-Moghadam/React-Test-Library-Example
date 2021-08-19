import React from "react";
import { Alert } from "bootstrap";

const AlertBanner = ({ message, variant }) => {
  const alertVariant = variant || "danger";
  const alertMessage = message || "an unexpected error";
  
  return <Alert variant={alertVariant}>{alertMessage}</Alert>;
};

export default AlertBanner;
