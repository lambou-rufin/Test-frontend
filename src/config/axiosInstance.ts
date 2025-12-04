import axios from "axios";

// Créer une instance Axios
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3001",
  timeout: 0, // Pas de timeout pour gérer les uploads volumineux
});

// Fonction pour convertir un objet en FormData
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertToFormData = (data: any): FormData => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value instanceof File || value instanceof Blob) {
      // Ajouter les fichiers ou les blobs directement
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      // Ajouter les tableaux sous forme de champs multiples
      value.forEach((item, index) => formData.append(`${key}[${index}]`, item));
    } else if (typeof value === "object" && value !== null) {
      // Gérer les objets imbriqués en les sérialisant (stringifier)
      formData.append(key, JSON.stringify(value));
    } else {
      // Ajouter les valeurs primitives directement
      formData.append(key, value);
    }
  });
  return formData;
};

// Fonction pour détecter la présence de fichiers dans les données
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const containsFile = (data: any): boolean => {
  if (!data || typeof data !== "object") return false;

  return Object.values(data).some(
    (value) =>
      value instanceof File ||
      value instanceof Blob ||
      (Array.isArray(value) &&
        value.some((item) => item instanceof File || item instanceof Blob)),
  );
};

// Typage de la fonction d'intercepteur de requête
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const requestInterceptor = (config: any) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  // Convertir les données en FormData si des fichiers sont détectés
  if (config.data) {
    if (config.data instanceof FormData) {
      // Si c'est déjà une FormData, ne rien faire
      config.headers["Content-Type"] = "multipart/form-data";
    } else if (containsFile(config.data)) {
      // Convertir en FormData uniquement si des fichiers sont détectés
      config.data = convertToFormData(config.data);
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      // Si aucun fichier n'est détecté, gérer comme JSON
      config.headers["Content-Type"] = "application/json";
    }
  }
  return config;
};

// Typage de la fonction d'intercepteur de réponse
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const responseInterceptor = (response: any) => response;

// Typage de la fonction de gestion des erreurs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorInterceptor = (error: any) => {
  if (error.response) {
    if (error.response.status === 401) {
      localStorage.removeItem("accessToken");
    } else if (error.response.status === 500) {
      console.error("Erreur serveur :", error.response.data);
    }
  } else {
    console.error("Erreur réseau ou délai d’attente dépassé");
  }
  return Promise.reject(error);
};

// Ajouter les intercepteurs configurés
axiosInstance.interceptors.request.use(requestInterceptor, errorInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

export default axiosInstance;
