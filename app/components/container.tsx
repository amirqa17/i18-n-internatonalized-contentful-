import React from "react";

interface ContainerProps {
    className?: string;
    children: React.ReactNode;
  }
  
  const Container: React.FC<ContainerProps> = ({ className, children }) => {
    return (
      <div className="container mx-auto" >
        {children}
      </div>
    );
  };
  
export default Container;