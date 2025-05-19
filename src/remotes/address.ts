import { httpClient } from '@/utils/http-client';

export function getAddressByCoords(latitude: number, longitude: number) {
  return httpClient.post('/api/v1/addresses', {
    latitude,
    longitude,
  });
}

export function getPlacesByCoords({
  latitude,
  longitude,
  radius,
  categories,
}: {
  latitude: number;
  longitude: number;
  radius: number;
  categories: string[];
}) {
  return httpClient.get<{
    places: {
      addressName: string; // '서울 강남구 역삼동 824-11';
      categoryGroupCode: string; // 'MT1';
      categoryGroupName: string; //'대형마트';
      categoryName: string; //'가정,생활 > 슈퍼마켓 > 대형슈퍼 > 롯데슈퍼프레시';
      distance: string; //'297';
      id: string; // '1580062235';
      latitude: string; //'37.4971207255714';
      longitude: string; //'127.030555642102';
      phone: string; // '';
      placeName: string; //'롯데슈퍼 강남역가맹점';
      placeUrl: string; //'http://place.map.kakao.com/1580062235';
      roadAddressName: string; //'서울 강남구 강남대로84길 23';
    }[];
  }>('/api/v1/places', {
    params: { latitude, longitude, radius, categories },
    paramsSerializer: (params: string[]) => {
      let result = '';
      for (const key in params) {
        if (Array.isArray(params[key])) {
          params[key].forEach((value) => {
            result += `${key}=${value}&`;
          });
        } else {
          result += `${key}=${params[key]}&`;
        }
      }
      return result.slice(0, -1);
    },
  });
}
