import * as React from 'react';
import Button from '@mui/material/Button';

type ButtonComponentProps = {
  onAjout?: () => void;
  onDelete?: () => void;
  onAnnuler?: () => void;
  label?: string;
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  onAjout,
  onDelete,
  onAnnuler,
  label = "Hello world",
}) => {
  // Exemple simple, selon le label on appelle la bonne fonction
  const handleClick = () => {
    if (label.toLowerCase() === "ajout" && onAjout) {
      onAjout();
    } else if (label.toLowerCase() === "delete" && onDelete) {
      onDelete();
    } else if (label.toLowerCase() === "annuler" && onAnnuler) {
      onAnnuler();
    }
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      {label}
    </Button>
  );
};

export default ButtonComponent;
