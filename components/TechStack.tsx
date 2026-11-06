'use client';

import React from 'react';
import Badge from './Badge';

interface TechStackProps {
  technologies: string[];
  maxVisible?: number;
}

const TechStack = ({ technologies, maxVisible = 4 }: TechStackProps) => {
  if (!technologies || technologies.length === 0) {
    return <Badge variant="info">No tech stack specified</Badge>;
  }

  const visibleTech = technologies.slice(0, maxVisible);
  const remainingCount = technologies.length - maxVisible;

  return (
    <div className="flex flex-wrap gap-2">
      {visibleTech.map((tech, index) => (
        <Badge key={index} variant="info">
          {tech}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge variant="default">
          +{remainingCount} more
        </Badge>
      )}
    </div>
  );
};

export default TechStack;
