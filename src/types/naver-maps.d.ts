export {};

declare global {
  namespace naver.maps {
    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }

    interface MapOptions {
      center: LatLng;
      zoom?: number;
    }

    class Map {
      constructor(element: HTMLElement | string, options: MapOptions);
      setCenter(latlng: LatLng): void;
    }

    interface MarkerOptions {
      position: LatLng;
      map?: Map;
    }

    class Marker {
      constructor(options: MarkerOptions);
    }
  }

  interface Window {
    naver?: typeof naver;
  }
}
