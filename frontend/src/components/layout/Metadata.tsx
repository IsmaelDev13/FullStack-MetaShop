import React from "react";
import Helmet from "react-helmet";

interface MetadataProps {
  title: string;
}

export const Metadata: React.FC<MetadataProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};
