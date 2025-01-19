/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function useSuspenseNaverMap({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const { data: map } = useSuspenseQuery({
    queryKey: ['naverMap', latitude, longitude],
    queryFn: () => {
      return new naver.maps.Map('map', {
        center: new naver.maps.LatLng(latitude, longitude),
        zoomControl: false,
        zoom: 17,
        scaleControl: false,
        mapDataControl: false,
      });
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: Infinity,
  });

  return map;
}
