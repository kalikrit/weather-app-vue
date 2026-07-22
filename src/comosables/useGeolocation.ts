import { ref } from "vue";

export function useGeolocation() {
  const coords = ref<{ lat: number; lon: number } | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  const getPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Геолокация не поддерживается вашим браузером"));
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      });
    });
  };

  const fetchGeolocation = async () => {
    loading.value = true;
    error.value = null;
    try {
      const position = await getPosition();
      coords.value = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
    } catch (err: any) {
      error.value = err.message || "Не удалось определить местоположение";
      coords.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    coords,
    error,
    loading,
    fetchGeolocation,
  };
}
