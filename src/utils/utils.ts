import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractErrorMessage = (error: any): string => {
  if (error.response && error.response.data && error.response.data.message) {
    return Array.isArray(error.response.data.message)
      ? error.response.data.message.join(", ") // Pour un tableau de messages
      : error.response.data.message; // Pour un message unique
  }
  return "Une erreur inattendue s'est produite. Veuillez réessayer.";
};

// Fonction utilitaire pour formater les erreurs
export const formatError = (error: unknown, context: string) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  return new Error(`[${context}] ${errorMessage}`);
};

export const extractErrorTryCatch = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const formatFrenchDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("fr-FR", {
    weekday: "long", // jour de la semaine complet
    year: "numeric", // année complète
    month: "long", // mois complet
    day: "numeric", // jour du mois
  });
};

export const formatDateToYYYYMMDD = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
};

export const formatKeyToLabel = (key: string): string => {
  return key
    .replace(/_/g, " ")
    .replace(/(?:^\w|\s\w)/g, (match) => match.toUpperCase());
};

export const timeAgo = (date: string) => {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals = [
    { label: "an", seconds: 31536000 }, // 60*60*24*365
    { label: "mois", seconds: 2592000 }, // 60*60*24*30
    { label: "semaine", seconds: 604800 }, // 60*60*24*7
    { label: "jour", seconds: 86400 }, // 60*60*24
    { label: "heure", seconds: 3600 }, // 60*60
    { label: "minute", seconds: 60 },
    { label: "seconde", seconds: 1 },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const time = Math.floor(seconds / interval.seconds);
    if (time >= 1) {
      return `Il y a ${time} ${interval.label}${time > 1 ? "s" : ""}`;
    }
  }

  return "Il y a quelques secondes"; // Par défaut si aucune condition n'est remplie
};

export const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export function generateRandomFileName(originalFile: string) {
  const timestamp = Date.now();
  const uid = uuidv4(); // Génère un UID unique
  const extension = originalFile.split(".").pop(); // Récupère l'extension du fichier
  const uniqueName = `${timestamp}@${uid}.${extension}`; // Nom du fichier avec date et UID
  return uniqueName;
}

export const formatNumberWithThousandSeparator = (
  number: number | undefined,
): string | null => {
  if (!number) return null;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  let browserName = "Unknown";
  let browserVersion = "Unknown";

  // Détection du navigateur via userAgent (simplifiée)
  if (userAgent.includes("Chrome")) {
    browserName = "Chrome";
    browserVersion = userAgent.split("Chrome/")[1]?.split(" ")[0] || "Unknown";
  } else if (userAgent.includes("Firefox")) {
    browserName = "Firefox";
    browserVersion = userAgent.split("Firefox/")[1] || "Unknown";
  } else if (userAgent.includes("Safari")) {
    browserName = "Safari";
    browserVersion = userAgent.split("Version/")[1]?.split(" ")[0] || "Unknown";
  }

  return { browserName, browserVersion };
};

export const generateDeviceId = () => {
  // Vérifie si un `deviceId` est déjà stocké dans localStorage
  let deviceId = localStorage.getItem("deviceId");

  // Si le `deviceId` n'existe pas, génère un nouveau UUID
  if (!deviceId) {
    deviceId = uuidv4(); // Génère un identifiant unique
    localStorage.setItem("deviceId", deviceId); // Sauvegarde le UUID dans localStorage pour le rendre persistant
  }

  return deviceId; // Renvoie l'identifiant unique
};

// Formate le prix
export const formatPrice = (price: number, currency = "MGA") => {
  return new Intl.NumberFormat("fr-MG", {
    style: "currency",
    currency: currency,
  }).format(price);
};
