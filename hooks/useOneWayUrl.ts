import { useState, useEffect } from 'react';
import { formatDateForApi } from '../utils/dateUtils';
import { LoadingState } from '../types';

// Using wsrv.nl as a CORS and Referer proxy.
// This is critical because img.owspace.com does not support direct browser fetches 
// without the correct Referer, and browsers block modifying Referer for <img> tags easily.
// wsrv.nl is a high-performance image proxy (based on images.weserv.nl).
const PROXY_BASE = 'https://wsrv.nl/?url=';
const OWSPACE_BASE = 'http://img.owspace.com/Public/uploads/Download/';

export const useOneWayUrl = (date: Date) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);

  useEffect(() => {
    let isMounted = true;
    setLoadingState(LoadingState.LOADING);

    const { year, dateStr } = formatDateForApi(date);
    
    // Construct the target URL
    const targetUrl = `${OWSPACE_BASE}${year}/${dateStr}.jpg`;
    
    // Construct the Proxy URL
    // We append &output=webp for better performance if possible, 
    // and &q=90 for quality.
    const proxyUrl = `${PROXY_BASE}${targetUrl}&output=webp&q=85`;

    // Preload image to check existence
    const img = new Image();
    img.src = proxyUrl;

    img.onload = () => {
      if (isMounted) {
        setImageUrl(proxyUrl);
        setLoadingState(LoadingState.SUCCESS);
      }
    };

    img.onerror = () => {
      if (isMounted) {
        // Fallback: Sometimes newer images might be png or different casing,
        // but for this specific API, it's usually strictly .jpg.
        // If it fails, it usually means the date is invalid or image doesn't exist yet.
        setLoadingState(LoadingState.ERROR);
      }
    };

    return () => {
      isMounted = false;
      img.onload = null;
      img.onerror = null;
    };
  }, [date]);

  return { imageUrl, loadingState, retry: () => setLoadingState(LoadingState.LOADING) }; // Trigger re-render effectively
};
