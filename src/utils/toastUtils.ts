import { Slide, toast } from "react-toastify";

// Fonction de succès
export const notifySuccess = (message: string) => {
  toast.success(message, {
    transition: Slide,
    style: {
      backgroundColor: "#1d1b78", // Couleur de fond verte pour le succès
      color: "#fff", // Couleur du texte en blanc
    },
  });
};

// Fonction d'erreur
export const notifyError = (message: string) => {
  toast.error(message, {
    style: {
      backgroundColor: "#1d1b78", // Couleur de fond rouge pour l'erreur
      color: "#fff", // Couleur du texte en blanc
    },
  });
};

// Fonction d'information
export const notifyInfo = (message: string) => {
  toast.info(message, {
    style: {
      backgroundColor: "#1d1b78", // Couleur de fond bleue pour l'information
      color: "#fff", // Couleur du texte en blanc
    },
  });
};

// Fonction d'avertissement
export const notifyWarning = (message: string) => {
  toast.warn(message, {
    style: {
      backgroundColor: "#1d1b78", // Couleur de fond orange pour l'avertissement
      color: "#fff", // Couleur du texte en blanc
    },
  });
};
